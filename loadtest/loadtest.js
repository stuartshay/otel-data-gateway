// ===========================================================================
// k6 Load Test — otel-data-gateway GraphQL BFF
// ===========================================================================
//
// Standard load test with realistic user scenarios matching otel-data-ui
// navigation patterns. Simulates concurrent users browsing the dashboard,
// location lists, and Garmin activity pages.
//
// Usage:
//   k6 run loadtest/loadtest.js
//   k6 run loadtest/loadtest.js --env BASE_URL=http://localhost:4000
//   k6 run loadtest/loadtest.js -e USERS=20 -e DURATION=5m
//
// ===========================================================================

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
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
  REFERENCE_LOCATIONS,
} from './queries.js';

// ── Configuration ───────────────────────────────────────
const BASE_URL = __ENV.BASE_URL || 'https://gateway.lab.informationcart.com';
const USERS = parseInt(__ENV.USERS || '10', 10);
const DURATION = __ENV.DURATION || '5m';

// ── Custom metrics ──────────────────────────────────────
const graphqlErrors = new Rate('graphql_errors');
const queryDuration = new Trend('graphql_query_duration', true);

// ── k6 options ──────────────────────────────────────────
const dashboardVus = Math.floor(USERS * 0.4);
const locationVus = Math.floor(USERS * 0.3);
const garminVus = Math.max(1, USERS - dashboardVus - locationVus);

export const options = {
  scenarios: {
    dashboard_users: {
      executor: 'constant-vus',
      vus: dashboardVus,
      duration: DURATION,
      exec: 'dashboardFlow',
    },
    location_browsers: {
      executor: 'constant-vus',
      vus: locationVus,
      duration: DURATION,
      exec: 'locationFlow',
    },
    garmin_explorers: {
      executor: 'constant-vus',
      vus: garminVus,
      duration: DURATION,
      exec: 'garminFlow',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    graphql_errors: ['rate<0.1'],
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
  queryDuration.add(res.timings.duration, { query: operationName });

  let body;
  let hasErrors = false;
  try {
    body = res.json();
    hasErrors = !!(body && body.errors && body.errors.length > 0);
  } catch (e) {
    // Treat JSON parsing failure as a GraphQL error for metrics purposes
    hasErrors = true;
  }
  graphqlErrors.add(hasErrors ? 1 : 0);

  check(res, {
    [`${operationName}: status 200`]: (r) => r.status === 200,
    [`${operationName}: no errors`]: () => !hasErrors,
  });

  return body;
}

// ── Scenario: Dashboard ─────────────────────────────────
// Simulates a user landing on the dashboard page. Fires the same
// parallel queries that otel-data-ui sends on mount.
export function dashboardFlow() {
  graphql(HEALTH, {}, 'Health');
  graphql(DEVICES, {}, 'Devices');
  graphql(LOCATION_COUNT, {}, 'LocationCount');
  graphql(GARMIN_SPORTS, {}, 'GarminSports');
  sleep(Math.random() * 3 + 2);
}

// ── Scenario: Location browsing ─────────────────────────
// Simulates a user paginating through the locations list, then
// viewing the unified map with date filters.
export function locationFlow() {
  // Page 1
  graphql(LOCATIONS, { limit: 25, offset: 0, order: 'desc' }, 'Locations');
  sleep(1);

  // Page 2
  graphql(LOCATIONS, { limit: 25, offset: 25, order: 'desc' }, 'Locations');
  sleep(1);

  // Unified GPS with date filter (last 7 days)
  const now = new Date();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  graphql(
    UNIFIED_GPS,
    {
      limit: 100,
      offset: 0,
      date_from: weekAgo.toISOString().split('T')[0],
      date_to: now.toISOString().split('T')[0],
    },
    'UnifiedGps',
  );
  sleep(1);

  // Daily summary
  graphql(
    DAILY_SUMMARY,
    {
      date_from: weekAgo.toISOString().split('T')[0],
      date_to: now.toISOString().split('T')[0],
      limit: 30,
    },
    'DailySummary',
  );
  sleep(Math.random() * 2 + 1);

  // Reference locations
  graphql(REFERENCE_LOCATIONS, {}, 'ReferenceLocations');
  sleep(Math.random() * 2 + 1);
}

// ── Scenario: Garmin activity browsing ──────────────────
// Simulates a user browsing Garmin activities, then drilling into
// a specific activity for track points.
export function garminFlow() {
  // List activities
  const result = graphql(
    GARMIN_ACTIVITIES,
    { limit: 25, offset: 0, order: 'desc' },
    'GarminActivities',
  );
  sleep(1);

  // Drill into first activity if available
  const items =
    result && result.data && result.data.garminActivities
      ? result.data.garminActivities.items
      : [];

  if (items.length > 0) {
    const activityId = items[0].activity_id;

    graphql(GARMIN_ACTIVITY, { activity_id: activityId }, 'GarminActivity');
    sleep(0.5);

    graphql(
      GARMIN_TRACK_POINTS,
      { activity_id: activityId, limit: 100, offset: 0 },
      'GarminTrackPoints',
    );
    sleep(1);
  }

  sleep(Math.random() * 2 + 1);
}
