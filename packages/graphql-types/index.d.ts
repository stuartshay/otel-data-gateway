export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> };
}

/** Per-day aggregate combining OwnTracks location stats and Garmin activity metrics. */
export interface DailyActivitySummary {
  __typename?: 'DailyActivitySummary';
  /** Calendar date in YYYY-MM-DD format */
  activity_date?: Maybe<Scalars['String']['output']>;
  /** Mean horizontal GPS accuracy in meters */
  avg_accuracy?: Maybe<Scalars['Float']['output']>;
  /** Mean heart rate across Garmin activities in BPM */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Number of Garmin activities recorded */
  garmin_activities?: Maybe<Scalars['Int']['output']>;
  /** Garmin sport type for activities on this day */
  garmin_sport?: Maybe<Scalars['String']['output']>;
  /** Highest device battery percentage observed */
  max_battery?: Maybe<Scalars['Int']['output']>;
  /** Lowest device battery percentage observed */
  min_battery?: Maybe<Scalars['Int']['output']>;
  /** OwnTracks device that reported data for this day */
  owntracks_device?: Maybe<Scalars['String']['output']>;
  /** Number of OwnTracks GPS points recorded */
  owntracks_points?: Maybe<Scalars['Int']['output']>;
  /** Total calories burned across Garmin activities */
  total_calories?: Maybe<Scalars['Int']['output']>;
  /** Combined Garmin activity distance in km */
  total_distance_km?: Maybe<Scalars['Float']['output']>;
  /** Combined Garmin activity duration in seconds */
  total_duration_seconds?: Maybe<Scalars['Float']['output']>;
}

/** Distinct OwnTracks device identifier. */
export interface DeviceInfo {
  __typename?: 'DeviceInfo';
  /** OwnTracks device identifier */
  device_id: Scalars['String']['output'];
}

/** Geodesic distance calculation result between two geographic points. */
export interface DistanceResult {
  __typename?: 'DistanceResult';
  /** Geodesic distance between the two points in meters */
  distance_meters: Scalars['Float']['output'];
  /** Origin latitude in decimal degrees */
  from_lat: Scalars['Float']['output'];
  /** Origin longitude in decimal degrees */
  from_lon: Scalars['Float']['output'];
  /** Destination latitude in decimal degrees */
  to_lat: Scalars['Float']['output'];
  /** Destination longitude in decimal degrees */
  to_lon: Scalars['Float']['output'];
}

/** Summary of a Garmin Connect activity parsed from a FIT file. */
export interface GarminActivity {
  __typename?: 'GarminActivity';
  /** Garmin Connect activity identifier */
  activity_id: Scalars['String']['output'];
  /** Average cadence in RPM */
  avg_cadence?: Maybe<Scalars['Int']['output']>;
  /** Average heart rate in beats per minute */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Average pace in minutes per kilometre */
  avg_pace?: Maybe<Scalars['Float']['output']>;
  /** Average speed in km/h */
  avg_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Average ambient temperature in degrees C */
  avg_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Total calories burned */
  calories?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the record was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Device manufacturer (e.g. garmin) */
  device_manufacturer?: Maybe<Scalars['String']['output']>;
  /** Total distance in kilometres */
  distance_km?: Maybe<Scalars['Float']['output']>;
  /** Active duration in seconds (excludes pauses) */
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Activity end time in UTC */
  end_time?: Maybe<Scalars['String']['output']>;
  /** Maximum cadence in RPM */
  max_cadence?: Maybe<Scalars['Int']['output']>;
  /** Maximum heart rate in beats per minute */
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Maximum speed in km/h */
  max_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Maximum ambient temperature in degrees C */
  max_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Minimum ambient temperature in degrees C */
  min_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Primary sport type (e.g. cycling, running) */
  sport: Scalars['String']['output'];
  /** Activity start time in UTC */
  start_time?: Maybe<Scalars['String']['output']>;
  /** Sub-sport classification (e.g. road, trail) */
  sub_sport?: Maybe<Scalars['String']['output']>;
  /** Total elevation gain in meters */
  total_ascent_m?: Maybe<Scalars['Float']['output']>;
  /** Total elevation loss in meters */
  total_descent_m?: Maybe<Scalars['Float']['output']>;
  /** Raw total distance in meters from FIT file */
  total_distance?: Maybe<Scalars['Float']['output']>;
  /** Total elapsed time in seconds (includes pauses) */
  total_elapsed_time?: Maybe<Scalars['Float']['output']>;
  /** Total timer time in seconds (active recording) */
  total_timer_time?: Maybe<Scalars['Float']['output']>;
  /** Number of GPS track points in this activity */
  track_point_count?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the FIT file was uploaded */
  uploaded_at?: Maybe<Scalars['String']['output']>;
}

/** Paginated list of Garmin activities. */
export interface GarminActivityConnection {
  __typename?: 'GarminActivityConnection';
  /** List of Garmin activity items in the current page */
  items: Array<GarminActivity>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

/** Lightweight track point optimised for time-series chart rendering. */
export interface GarminChartPoint {
  __typename?: 'GarminChartPoint';
  /** Elevation above sea level in meters */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Pedal/step cadence in RPM */
  cadence?: Maybe<Scalars['Int']['output']>;
  /** Cumulative distance from activity start in km */
  distance_from_start_km?: Maybe<Scalars['Float']['output']>;
  /** Heart rate in beats per minute */
  heart_rate?: Maybe<Scalars['Int']['output']>;
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Instantaneous speed in km/h */
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Ambient temperature in degrees C */
  temperature_c?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp of the data point */
  timestamp: Scalars['DateTime']['output'];
}

/** Individual GPS track point within a Garmin activity. */
export interface GarminTrackPoint {
  __typename?: 'GarminTrackPoint';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Elevation above sea level in meters */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Pedal/step cadence in RPM */
  cadence?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the record was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Cumulative distance from activity start in km */
  distance_from_start_km?: Maybe<Scalars['Float']['output']>;
  /** Heart rate in beats per minute */
  heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Unique track point record identifier */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Instantaneous speed in km/h */
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Ambient temperature in degrees C */
  temperature_c?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp of the track point recording */
  timestamp: Scalars['DateTime']['output'];
}

/** Paginated list of Garmin track points. */
export interface GarminTrackPointConnection {
  __typename?: 'GarminTrackPointConnection';
  /** List of track point items in the current page */
  items: Array<GarminTrackPoint>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

/** Service health status. */
export interface HealthStatus {
  __typename?: 'HealthStatus';
  /** Service health status (healthy or unhealthy) */
  status: Scalars['String']['output'];
  /** Application version from VERSION file */
  version: Scalars['String']['output'];
}

/** GPS location recorded by the OwnTracks mobile app. */
export interface Location {
  __typename?: 'Location';
  /** Horizontal accuracy of the GPS fix in meters */
  accuracy?: Maybe<Scalars['Float']['output']>;
  /** Altitude above sea level in meters */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Device battery level as a percentage (0-100) */
  battery?: Maybe<Scalars['Int']['output']>;
  /** Battery charging state (0=unknown, 1=unplugged, 2=charging, 3=full) */
  battery_status?: Maybe<Scalars['Int']['output']>;
  /** Network connection type (w=WiFi, m=mobile) */
  connection_type?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the record was inserted into the database */
  created_at?: Maybe<Scalars['String']['output']>;
  /** OwnTracks device identifier (e.g. iphone_stuart) */
  device_id: Scalars['String']['output'];
  /** Unique location record identifier */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Two-character tracker ID set in the OwnTracks app */
  tid?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the device recorded the location */
  timestamp: Scalars['DateTime']['output'];
  /** What triggered this location report (p=ping, c=circular, t=timer) */
  trigger?: Maybe<Scalars['String']['output']>;
  /** Device velocity in km/h at time of report */
  velocity?: Maybe<Scalars['Float']['output']>;
}

/** Paginated list of OwnTracks location records. */
export interface LocationConnection {
  __typename?: 'LocationConnection';
  /** List of location items in the current page */
  items: Array<Location>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

/** Aggregate location count with optional filter context. */
export interface LocationCount {
  __typename?: 'LocationCount';
  /** Total number of location records matching the filter */
  count: Scalars['Int']['output'];
  /** Date filter applied (YYYY-MM-DD), if any */
  date?: Maybe<Scalars['String']['output']>;
  /** Device ID filter applied, if any */
  device_id?: Maybe<Scalars['String']['output']>;
}

/** Full location detail including the original OwnTracks JSON payload. */
export interface LocationDetail {
  __typename?: 'LocationDetail';
  /** Horizontal accuracy of the GPS fix in meters */
  accuracy?: Maybe<Scalars['Float']['output']>;
  /** Altitude above sea level in meters */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Device battery level as a percentage (0-100) */
  battery?: Maybe<Scalars['Int']['output']>;
  /** Battery charging state (0=unknown, 1=unplugged, 2=charging, 3=full) */
  battery_status?: Maybe<Scalars['Int']['output']>;
  /** Network connection type (w=WiFi, m=mobile) */
  connection_type?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the record was inserted into the database */
  created_at?: Maybe<Scalars['String']['output']>;
  /** OwnTracks device identifier (e.g. iphone_stuart) */
  device_id: Scalars['String']['output'];
  /** Unique location record identifier */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Original OwnTracks JSON payload as received from the MQTT broker */
  raw_payload?: Maybe<Scalars['JSON']['output']>;
  /** Two-character tracker ID set in the OwnTracks app */
  tid?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the device recorded the location */
  timestamp: Scalars['DateTime']['output'];
  /** What triggered this location report (p=ping, c=circular, t=timer) */
  trigger?: Maybe<Scalars['String']['output']>;
  /** Device velocity in km/h at time of report */
  velocity?: Maybe<Scalars['Float']['output']>;
}

/** GPS point found within a spatial proximity search. */
export interface NearbyPoint {
  __typename?: 'NearbyPoint';
  /** Distance from the search center point in meters */
  distance_meters: Scalars['Float']['output'];
  /** Record identifier in the source table */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Data source: 'owntracks' or 'garmin' */
  source: Scalars['String']['output'];
  /** UTC timestamp of the GPS recording */
  timestamp: Scalars['DateTime']['output'];
}

/** Pagination metadata for paginated list responses. */
export interface PaginationInfo {
  __typename?: 'PaginationInfo';
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

export interface Query {
  __typename?: 'Query';
  /** Calculate the geodesic distance between two geographic points. */
  calculateDistance: DistanceResult;
  /** Retrieve daily activity summaries combining OwnTracks and Garmin data. */
  dailySummary: Array<DailyActivitySummary>;
  /** List all distinct OwnTracks device identifiers. */
  devices: Array<DeviceInfo>;
  /** Retrieve a paginated list of Garmin activities. */
  garminActivities: GarminActivityConnection;
  /** Retrieve a single Garmin activity by its ID. */
  garminActivity?: Maybe<GarminActivity>;
  /** Retrieve chart-optimised track points for a Garmin activity. */
  garminChartData: Array<GarminChartPoint>;
  /** List all distinct sport types with activity counts. */
  garminSports: Array<SportInfo>;
  /** Retrieve paginated GPS track points for a Garmin activity. */
  garminTrackPoints: GarminTrackPointConnection;
  /** Get service health status. */
  health: HealthStatus;
  /** Retrieve a single location by its ID, including raw payload. */
  location?: Maybe<LocationDetail>;
  /** Get aggregate count of location records with optional filters. */
  locationCount: LocationCount;
  /** Retrieve a paginated list of OwnTracks location records. */
  locations: LocationConnection;
  /** Find GPS points within a radius of a geographic coordinate. */
  nearbyPoints: Array<NearbyPoint>;
  /** Get service readiness status including database connectivity. */
  ready: ReadyStatus;
  /** Retrieve a single reference location by its ID. */
  referenceLocation?: Maybe<ReferenceLocation>;
  /** List all named reference locations. */
  referenceLocations: Array<ReferenceLocation>;
  /** Retrieve a paginated list of unified GPS points from all sources. */
  unifiedGps: UnifiedGpsConnection;
  /** Find GPS points within a named reference location's geofence. */
  withinReference: WithinReferenceResult;
}

export interface QueryCalculateDistanceArgs {
  from_lat: Scalars['Float']['input'];
  from_lon: Scalars['Float']['input'];
  to_lat: Scalars['Float']['input'];
  to_lon: Scalars['Float']['input'];
}

export interface QueryDailySummaryArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGarminActivitiesArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  sort?: InputMaybe<Scalars['String']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryGarminActivityArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminChartDataArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminTrackPointsArgs {
  activity_id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  simplify?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryLocationArgs {
  id: Scalars['Int']['input'];
}

export interface QueryLocationCountArgs {
  date?: InputMaybe<Scalars['String']['input']>;
  device_id?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryLocationsArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  device_id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  sort?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryNearbyPointsArgs {
  lat: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  lon: Scalars['Float']['input'];
  radius_meters?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryReferenceLocationArgs {
  id: Scalars['Int']['input'];
}

export interface QueryUnifiedGpsArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  source?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryWithinReferenceArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
}

/** Service readiness status including database connectivity. */
export interface ReadyStatus {
  __typename?: 'ReadyStatus';
  /** Database connection status */
  database?: Maybe<Scalars['String']['output']>;
  /** Service readiness status */
  status: Scalars['String']['output'];
  /** Application version from VERSION file */
  version?: Maybe<Scalars['String']['output']>;
}

/** Named geographic reference point used for spatial queries (e.g. home, office). */
export interface ReferenceLocation {
  __typename?: 'ReferenceLocation';
  /** UTC timestamp when the record was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Optional human-readable description of the location */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique reference location identifier */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Short, unique name for the location (e.g. home, office) */
  name: Scalars['String']['output'];
  /** Geofence radius in meters for proximity queries */
  radius_meters: Scalars['Float']['output'];
  /** UTC timestamp when the record was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
}

/** Sort direction for query results. */
export type SortOrder =
  /** Ascending order (oldest first, A-Z) */
  | 'asc'
  /** Descending order (newest first, Z-A) */
  | 'desc';

/** Sport type with its activity count. */
export interface SportInfo {
  __typename?: 'SportInfo';
  /** Number of activities for this sport */
  activity_count: Scalars['Int']['output'];
  /** Sport type name (e.g. cycling, running) */
  sport: Scalars['String']['output'];
}

/** Paginated list of unified GPS data points. */
export interface UnifiedGpsConnection {
  __typename?: 'UnifiedGpsConnection';
  /** List of unified GPS items in the current page */
  items: Array<UnifiedGpsPoint>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

/** Single GPS data point from the unified view combining OwnTracks and Garmin sources. */
export interface UnifiedGpsPoint {
  __typename?: 'UnifiedGpsPoint';
  /** Horizontal GPS accuracy in meters (OwnTracks only) */
  accuracy?: Maybe<Scalars['Float']['output']>;
  /** Device battery percentage (OwnTracks only) */
  battery?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the record was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Heart rate in BPM (Garmin only) */
  heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Device or activity identifier from the source */
  identifier: Scalars['String']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Data source: 'owntracks' or 'garmin' */
  source: Scalars['String']['output'];
  /** Instantaneous speed in km/h (Garmin only) */
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp of the GPS recording */
  timestamp: Scalars['DateTime']['output'];
}

/** GPS points found within a named reference location's geofence radius. */
export interface WithinReferenceResult {
  __typename?: 'WithinReferenceResult';
  /** GPS points within the radius, sorted by distance */
  points: Array<NearbyPoint>;
  /** Geofence radius used for the search in meters */
  radius_meters: Scalars['Float']['output'];
  /** Name of the reference location searched */
  reference_name: Scalars['String']['output'];
  /** Number of GPS points found within the radius */
  total_points: Scalars['Int']['output'];
}
