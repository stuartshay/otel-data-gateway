// ===========================================================================
// GraphQL Query Definitions for k6 Load Tests
// ===========================================================================
//
// Queries are organized by tier based on otel-data-ui usage frequency:
//   Tier 1 (Dashboard): health, devices, locationCount, garminSports
//   Tier 2 (Primary):   locations, garminActivities, unifiedGps, dailySummary
//   Tier 3 (Detail):    location, garminActivity, garminTrackPoints, garminChartData
//   Tier 4 (Low):       referenceLocations, nearbyPoints, calculateDistance
// ===========================================================================

// ── Tier 1: Dashboard queries ─────────────────────────────

export const HEALTH = `
  query Health {
    health {
      status
      version
    }
  }
`;

export const DEVICES = `
  query Devices {
    devices {
      device_id
    }
  }
`;

export const LOCATION_COUNT = `
  query LocationCount {
    locationCount {
      count
      date
      device_id
    }
  }
`;

export const GARMIN_SPORTS = `
  query GarminSports {
    garminSports {
      sport
      activity_count
    }
  }
`;

// ── Tier 2: Primary navigation queries ────────────────────

export const LOCATIONS = `
  query Locations($limit: Int, $offset: Int, $device_id: String, $date_from: String, $date_to: String, $sort: String, $order: SortOrder) {
    locations(limit: $limit, offset: $offset, device_id: $device_id, date_from: $date_from, date_to: $date_to, sort: $sort, order: $order) {
      items {
        id
        device_id
        latitude
        longitude
        accuracy
        battery
        velocity
        timestamp
        created_at
      }
      total
      limit
      offset
    }
  }
`;

export const GARMIN_ACTIVITIES = `
  query GarminActivities($limit: Int, $offset: Int, $sport: String, $date_from: String, $date_to: String, $sort: String, $order: SortOrder) {
    garminActivities(limit: $limit, offset: $offset, sport: $sport, date_from: $date_from, date_to: $date_to, sort: $sort, order: $order) {
      items {
        activity_id
        sport
        sub_sport
        start_time
        distance_km
        duration_seconds
        avg_heart_rate
        max_heart_rate
        calories
        avg_speed_kmh
        max_speed_kmh
      }
      total
      limit
      offset
    }
  }
`;

export const UNIFIED_GPS = `
  query UnifiedGps($limit: Int, $offset: Int, $source: String, $date_from: String, $date_to: String, $order: SortOrder) {
    unifiedGps(limit: $limit, offset: $offset, source: $source, date_from: $date_from, date_to: $date_to, order: $order) {
      items {
        source
        identifier
        latitude
        longitude
        timestamp
        accuracy
        battery
        speed_kmh
        heart_rate
      }
      total
      limit
      offset
    }
  }
`;

export const DAILY_SUMMARY = `
  query DailySummary($date_from: String, $date_to: String, $limit: Int) {
    dailySummary(date_from: $date_from, date_to: $date_to, limit: $limit) {
      activity_date
      owntracks_device
      owntracks_points
      min_battery
      max_battery
      avg_accuracy
      garmin_sport
      garmin_activities
      total_distance_km
      total_duration_seconds
      avg_heart_rate
      total_calories
    }
  }
`;

// ── Tier 3: Detail queries ────────────────────────────────

export const LOCATION_DETAIL = `
  query LocationDetail($id: Int!) {
    location(id: $id) {
      id
      device_id
      latitude
      longitude
      accuracy
      altitude
      battery
      velocity
      connection_type
      trigger
      timestamp
      created_at
      raw_payload
    }
  }
`;

export const GARMIN_ACTIVITY = `
  query GarminActivity($activity_id: String!) {
    garminActivity(activity_id: $activity_id) {
      activity_id
      sport
      sub_sport
      start_time
      distance_km
      duration_seconds
      avg_heart_rate
      max_heart_rate
      calories
      avg_speed_kmh
      max_speed_kmh
      total_ascent_m
      total_descent_m
      avg_cadence
      max_cadence
      total_timer_time
      track_point_count
    }
  }
`;

export const GARMIN_TRACK_POINTS = `
  query GarminTrackPoints($activity_id: String!, $limit: Int, $offset: Int) {
    garminTrackPoints(activity_id: $activity_id, limit: $limit, offset: $offset) {
      items {
        timestamp
        latitude
        longitude
        altitude
        heart_rate
        speed_kmh
        distance_from_start_km
      }
      total
      limit
      offset
    }
  }
`;

export const GARMIN_CHART_DATA = `
  query GarminChartData($activity_id: String!) {
    garminChartData(activity_id: $activity_id) {
      timestamp
      distance_from_start_km
      altitude
      heart_rate
      speed_kmh
      cadence
      temperature_c
      latitude
      longitude
    }
  }
`;

// ── Tier 4: Low-frequency queries ─────────────────────────

export const REFERENCE_LOCATIONS = `
  query ReferenceLocations {
    referenceLocations {
      id
      name
      latitude
      longitude
      radius_meters
      description
    }
  }
`;

export const NEARBY_POINTS = `
  query NearbyPoints($lat: Float!, $lon: Float!, $radius_meters: Float, $source: String, $limit: Int) {
    nearbyPoints(lat: $lat, lon: $lon, radius_meters: $radius_meters, source: $source, limit: $limit) {
      source
      id
      latitude
      longitude
      distance_meters
      timestamp
    }
  }
`;

export const CALCULATE_DISTANCE = `
  query CalculateDistance($from_lat: Float!, $from_lon: Float!, $to_lat: Float!, $to_lon: Float!) {
    calculateDistance(from_lat: $from_lat, from_lon: $from_lon, to_lat: $to_lat, to_lon: $to_lon) {
      distance_meters
      from_lat
      from_lon
      to_lat
      to_lon
    }
  }
`;
