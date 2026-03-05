// ===========================================================================
// k6 Stress Test — otel-data-gateway GraphQL BFF (Step Load)
// ===========================================================================
//
// Ramps virtual users through escalating stages to find capacity limits.
// Mirrors the otel-data-api Locust stress test pattern:
//   10 → 25 → 50 → 75 → 100 → 150 → 200 VUs  (2 min each = ~14 min total)
//
// Usage:
//   k6 run loadtest/stress-test.js
//   k6 run loadtest/stress-test.js --env BASE_URL=http://localhost:4000
//
// CSV output (for Semaphore/Ansible):
//   k6 run loadtest/stress-test.js --out csv=results/stress.csv
//
// ===========================================================================

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import {
  HEALTH,
  DEVICES,
  LOCATION_COUNT,
  GARMIN_SPORTS,
  LOCATIONS,
  GARMIN_ACTIVITIES,
  UNIFIED_GPS,
  DAILY_SUMMARY,
  GARMIN_ACTIVITY,
  GARMIN_TRACK_POINTS,
  GARMIN_CHART_DATA,
  REFERENCE_LOCATIONS,
  NEARBY_POINTS,
  CALCULATE_DISTANCE,
} from './queries.js';

// ── Configuration ───────────────────────────────────────
const BASE_URL = __ENV.BASE_URL || 'https://gateway.lab.informationcart.com';

// ── Custom metrics ──────────────────────────────────────
const graphqlErrors = new Rate('graphql_errors');
const queryDuration = new Trend('graphql_query_duration', true);
const totalRequests = new Counter('graphql_total_requests');

// ── k6 options: step load shape ─────────────────────────
export const options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '2m', target: 25 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 75 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 150 },
    { duration: '2m', target: 200 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    graphql_errors: ['rate<0.5'],
  },
};

// ── Helpers ─────────────────────────────────────────────
function graphql(query, variables = {}, operationName = '') {
  const payload = JSON.stringify({ query, variables });
  const params = {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: operationName || 'graphql' },
  };

  const res = http.post(BASE_URL, payload, params);
  totalRequests.add(1);
  queryDuration.add(res.timings.duration, { query: operationName });

  const body = res.json();
  const hasErrors = body && body.errors && body.errors.length > 0;
  graphqlErrors.add(hasErrors ? 1 : 0);

  check(res, {
    [`${operationName}: status 200`]: (r) => r.status === 200,
    [`${operationName}: no errors`]: () => !hasErrors,
  });

  return body;
}

// ── Date helpers ────────────────────────────────────────
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

const today = new Date().toISOString().split('T')[0];

// ── Default function: mixed workload ────────────────────
// Each VU randomly selects a user flow per iteration, weighted
// to match real-world usage patterns from otel-data-ui.
export default function () {
  const roll = Math.random();

  if (roll < 0.3) {
    // 30% — Dashboard flow (Tier 1 queries)
    dashboardFlow();
  } else if (roll < 0.55) {
    // 25% — Location browsing (Tier 2)
    locationFlow();
  } else if (roll < 0.8) {
    // 25% — Garmin browsing (Tier 2 + 3)
    garminFlow();
  } else if (roll < 0.9) {
    // 10% — Unified map view (Tier 2)
    unifiedFlow();
  } else {
    // 10% — Spatial queries (Tier 4)
    spatialFlow();
  }
}

// ── Flow: Dashboard ─────────────────────────────────────
function dashboardFlow() {
  graphql(HEALTH, {}, 'Health');
  graphql(DEVICES, {}, 'Devices');
  graphql(LOCATION_COUNT, {}, 'LocationCount');
  graphql(GARMIN_SPORTS, {}, 'GarminSports');
  sleep(Math.random() * 2 + 1);
}

// ── Flow: Location browsing ─────────────────────────────
function locationFlow() {
  graphql(
    LOCATIONS,
    { limit: 25, offset: 0, order: 'desc' },
    'Locations',
  );
  sleep(0.5);

  graphql(
    LOCATIONS,
    { limit: 25, offset: 25, order: 'desc' },
    'Locations',
  );
  sleep(0.5);

  graphql(
    DAILY_SUMMARY,
    { date_from: daysAgo(30), date_to: today, limit: 30 },
    'DailySummary',
  );
  sleep(Math.random() * 2 + 1);
}

// ── Flow: Garmin browsing ───────────────────────────────
function garminFlow() {
  const result = graphql(
    GARMIN_ACTIVITIES,
    { limit: 25, offset: 0, order: 'desc' },
    'GarminActivities',
  );
  sleep(0.5);

  const items =
    result && result.data && result.data.garminActivities
      ? result.data.garminActivities.items
      : [];

  if (items.length > 0) {
    const idx = Math.floor(Math.random() * Math.min(items.length, 5));
    const activityId = items[idx].activity_id;

    graphql(GARMIN_ACTIVITY, { activity_id: activityId }, 'GarminActivity');
    sleep(0.3);

    graphql(
      GARMIN_TRACK_POINTS,
      { activity_id: activityId, limit: 100, offset: 0 },
      'GarminTrackPoints',
    );
    sleep(0.3);

    graphql(GARMIN_CHART_DATA, { activity_id: activityId }, 'GarminChartData');
  }

  sleep(Math.random() * 2 + 1);
}

// ── Flow: Unified map ───────────────────────────────────
function unifiedFlow() {
  graphql(
    UNIFIED_GPS,
    {
      limit: 100,
      offset: 0,
      date_from: daysAgo(7),
      date_to: today,
    },
    'UnifiedGps',
  );
  sleep(1);

  graphql(REFERENCE_LOCATIONS, {}, 'ReferenceLocations');
  sleep(Math.random() * 2 + 1);
}

// ── Flow: Spatial queries ───────────────────────────────
function spatialFlow() {
  // Central Park, NYC area
  graphql(
    NEARBY_POINTS,
    { lat: 40.7829, lon: -73.9654, radius_meters: 500, limit: 50 },
    'NearbyPoints',
  );
  sleep(0.5);

  graphql(
    CALCULATE_DISTANCE,
    { from_lat: 40.7829, from_lon: -73.9654, to_lat: 40.7484, to_lon: -73.9857 },
    'CalculateDistance',
  );
  sleep(Math.random() * 2 + 1);
}
