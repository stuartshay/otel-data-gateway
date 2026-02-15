const typeDefs = `#graphql
  # -------------------------------------------------------
  # Scalars
  # -------------------------------------------------------
  scalar DateTime

  # -------------------------------------------------------
  # Common Types
  # -------------------------------------------------------
  type PaginationInfo {
    total: Int!
    limit: Int!
    offset: Int!
  }

  # -------------------------------------------------------
  # Health
  # -------------------------------------------------------
  type HealthStatus {
    status: String!
    version: String!
  }

  type ReadyStatus {
    status: String!
    database: String
    version: String
  }

  # -------------------------------------------------------
  # Locations (OwnTracks)
  # -------------------------------------------------------
  type Location {
    id: Int!
    device_id: String!
    tid: String
    latitude: Float!
    longitude: Float!
    accuracy: Float
    altitude: Float
    velocity: Float
    battery: Int
    battery_status: Int
    connection_type: String
    trigger: String
    timestamp: DateTime!
    created_at: String
  }

  type LocationDetail {
    id: Int!
    device_id: String!
    tid: String
    latitude: Float!
    longitude: Float!
    accuracy: Float
    altitude: Float
    velocity: Float
    battery: Int
    battery_status: Int
    connection_type: String
    trigger: String
    timestamp: DateTime!
    created_at: String
    raw_payload: JSON
  }

  scalar JSON

  type LocationConnection {
    items: [Location!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type DeviceInfo {
    device_id: String!
  }

  type LocationCount {
    count: Int!
    date: String
    device_id: String
  }

  # -------------------------------------------------------
  # Garmin
  # -------------------------------------------------------
  type GarminActivity {
    activity_id: String!
    sport: String!
    sub_sport: String
    start_time: String
    end_time: String
    distance_km: Float
    duration_seconds: Float
    avg_heart_rate: Int
    max_heart_rate: Int
    avg_cadence: Int
    max_cadence: Int
    calories: Int
    avg_speed_kmh: Float
    max_speed_kmh: Float
    total_ascent_m: Float
    total_descent_m: Float
    total_distance: Float
    avg_pace: Float
    device_manufacturer: String
    avg_temperature_c: Int
    min_temperature_c: Int
    max_temperature_c: Int
    total_elapsed_time: Float
    total_timer_time: Float
    created_at: String
    uploaded_at: String
    track_point_count: Int
  }

  type GarminActivityConnection {
    items: [GarminActivity!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type GarminTrackPoint {
    id: Int!
    activity_id: String!
    latitude: Float!
    longitude: Float!
    timestamp: DateTime!
    altitude: Float
    distance_from_start_km: Float
    speed_kmh: Float
    heart_rate: Int
    cadence: Int
    temperature_c: Float
    created_at: String
  }

  type GarminTrackPointConnection {
    items: [GarminTrackPoint!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type SportInfo {
    sport: String!
    activity_count: Int!
  }

  # -------------------------------------------------------
  # Unified GPS
  # -------------------------------------------------------
  type UnifiedGpsPoint {
    source: String!
    identifier: String!
    latitude: Float!
    longitude: Float!
    timestamp: DateTime!
    accuracy: Float
    battery: Int
    speed_kmh: Float
    heart_rate: Int
    created_at: String
  }

  type UnifiedGpsConnection {
    items: [UnifiedGpsPoint!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type DailyActivitySummary {
    activity_date: String
    owntracks_device: String
    owntracks_points: Int
    min_battery: Int
    max_battery: Int
    avg_accuracy: Float
    garmin_sport: String
    garmin_activities: Int
    total_distance_km: Float
    total_duration_seconds: Float
    avg_heart_rate: Int
    total_calories: Int
  }

  # -------------------------------------------------------
  # Reference Locations
  # -------------------------------------------------------
  type ReferenceLocation {
    id: Int!
    name: String!
    latitude: Float!
    longitude: Float!
    radius_meters: Float!
    description: String
    created_at: String
    updated_at: String
  }

  # -------------------------------------------------------
  # Spatial
  # -------------------------------------------------------
  type NearbyPoint {
    source: String!
    id: Int!
    latitude: Float!
    longitude: Float!
    distance_meters: Float!
    timestamp: DateTime!
  }

  type DistanceResult {
    distance_meters: Float!
    from_lat: Float!
    from_lon: Float!
    to_lat: Float!
    to_lon: Float!
  }

  type WithinReferenceResult {
    reference_name: String!
    radius_meters: Float!
    total_points: Int!
    points: [NearbyPoint!]!
  }

  # -------------------------------------------------------
  # Enums
  # -------------------------------------------------------
  enum SortOrder {
    asc
    desc
  }

  # -------------------------------------------------------
  # Queries
  # -------------------------------------------------------
  type Query {
    # Health
    health: HealthStatus!
    ready: ReadyStatus!

    # Locations
    locations(
      device_id: String
      date_from: String
      date_to: String
      limit: Int
      offset: Int
      sort: String
      order: SortOrder
    ): LocationConnection!

    location(id: Int!): LocationDetail

    devices: [DeviceInfo!]!

    locationCount(
      date: String
      device_id: String
    ): LocationCount!

    # Garmin
    garminActivities(
      sport: String
      date_from: String
      date_to: String
      limit: Int
      offset: Int
      sort: String
      order: SortOrder
    ): GarminActivityConnection!

    garminActivity(activity_id: String!): GarminActivity

    garminTrackPoints(
      activity_id: String!
      limit: Int
      offset: Int
      sort: String
      order: SortOrder
      simplify: Float
    ): GarminTrackPointConnection!

    garminSports: [SportInfo!]!

    # Unified GPS
    unifiedGps(
      source: String
      date_from: String
      date_to: String
      limit: Int
      offset: Int
      order: SortOrder
    ): UnifiedGpsConnection!

    dailySummary(
      date_from: String
      date_to: String
      limit: Int
    ): [DailyActivitySummary!]!

    # Reference Locations
    referenceLocations: [ReferenceLocation!]!
    referenceLocation(id: Int!): ReferenceLocation

    # Spatial
    nearbyPoints(
      lat: Float!
      lon: Float!
      radius_meters: Float
      source: String
      limit: Int
    ): [NearbyPoint!]!

    calculateDistance(
      from_lat: Float!
      from_lon: Float!
      to_lat: Float!
      to_lon: Float!
    ): DistanceResult!

    withinReference(
      name: String!
      source: String
      limit: Int
    ): WithinReferenceResult!
  }
`;

export default typeDefs;
