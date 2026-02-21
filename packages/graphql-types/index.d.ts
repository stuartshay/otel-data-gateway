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

export interface DailyActivitySummary {
  __typename?: 'DailyActivitySummary';
  activity_date?: Maybe<Scalars['String']['output']>;
  avg_accuracy?: Maybe<Scalars['Float']['output']>;
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  garmin_activities?: Maybe<Scalars['Int']['output']>;
  garmin_sport?: Maybe<Scalars['String']['output']>;
  max_battery?: Maybe<Scalars['Int']['output']>;
  min_battery?: Maybe<Scalars['Int']['output']>;
  owntracks_device?: Maybe<Scalars['String']['output']>;
  owntracks_points?: Maybe<Scalars['Int']['output']>;
  total_calories?: Maybe<Scalars['Int']['output']>;
  total_distance_km?: Maybe<Scalars['Float']['output']>;
  total_duration_seconds?: Maybe<Scalars['Float']['output']>;
}

export interface DeviceInfo {
  __typename?: 'DeviceInfo';
  device_id: Scalars['String']['output'];
}

export interface DistanceResult {
  __typename?: 'DistanceResult';
  distance_meters: Scalars['Float']['output'];
  from_lat: Scalars['Float']['output'];
  from_lon: Scalars['Float']['output'];
  to_lat: Scalars['Float']['output'];
  to_lon: Scalars['Float']['output'];
}

export interface GarminActivity {
  __typename?: 'GarminActivity';
  activity_id: Scalars['String']['output'];
  avg_cadence?: Maybe<Scalars['Int']['output']>;
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  avg_pace?: Maybe<Scalars['Float']['output']>;
  avg_speed_kmh?: Maybe<Scalars['Float']['output']>;
  avg_temperature_c?: Maybe<Scalars['Int']['output']>;
  calories?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  device_manufacturer?: Maybe<Scalars['String']['output']>;
  distance_km?: Maybe<Scalars['Float']['output']>;
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  end_time?: Maybe<Scalars['String']['output']>;
  max_cadence?: Maybe<Scalars['Int']['output']>;
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  max_speed_kmh?: Maybe<Scalars['Float']['output']>;
  max_temperature_c?: Maybe<Scalars['Int']['output']>;
  min_temperature_c?: Maybe<Scalars['Int']['output']>;
  sport: Scalars['String']['output'];
  start_time?: Maybe<Scalars['String']['output']>;
  sub_sport?: Maybe<Scalars['String']['output']>;
  total_ascent_m?: Maybe<Scalars['Float']['output']>;
  total_descent_m?: Maybe<Scalars['Float']['output']>;
  total_distance?: Maybe<Scalars['Float']['output']>;
  total_elapsed_time?: Maybe<Scalars['Float']['output']>;
  total_timer_time?: Maybe<Scalars['Float']['output']>;
  track_point_count?: Maybe<Scalars['Int']['output']>;
  uploaded_at?: Maybe<Scalars['String']['output']>;
}

export interface GarminActivityConnection {
  __typename?: 'GarminActivityConnection';
  items: Array<GarminActivity>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
}

export interface GarminTrackPoint {
  __typename?: 'GarminTrackPoint';
  activity_id: Scalars['String']['output'];
  altitude?: Maybe<Scalars['Float']['output']>;
  cadence?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  distance_from_start_km?: Maybe<Scalars['Float']['output']>;
  heart_rate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  temperature_c?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['DateTime']['output'];
}

export interface GarminTrackPointConnection {
  __typename?: 'GarminTrackPointConnection';
  items: Array<GarminTrackPoint>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
}

export interface HealthStatus {
  __typename?: 'HealthStatus';
  status: Scalars['String']['output'];
  version: Scalars['String']['output'];
}

export interface Location {
  __typename?: 'Location';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  battery_status?: Maybe<Scalars['Int']['output']>;
  connection_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  device_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  tid?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  trigger?: Maybe<Scalars['String']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
}

export interface LocationConnection {
  __typename?: 'LocationConnection';
  items: Array<Location>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
}

export interface LocationCount {
  __typename?: 'LocationCount';
  count: Scalars['Int']['output'];
  date?: Maybe<Scalars['String']['output']>;
  device_id?: Maybe<Scalars['String']['output']>;
}

export interface LocationDetail {
  __typename?: 'LocationDetail';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  battery_status?: Maybe<Scalars['Int']['output']>;
  connection_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  device_id: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  raw_payload?: Maybe<Scalars['JSON']['output']>;
  tid?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  trigger?: Maybe<Scalars['String']['output']>;
  velocity?: Maybe<Scalars['Float']['output']>;
}

export interface NearbyPoint {
  __typename?: 'NearbyPoint';
  distance_meters: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  source: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
}

export interface PaginationInfo {
  __typename?: 'PaginationInfo';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
}

export interface Query {
  __typename?: 'Query';
  calculateDistance: DistanceResult;
  dailySummary: Array<DailyActivitySummary>;
  devices: Array<DeviceInfo>;
  garminActivities: GarminActivityConnection;
  garminActivity?: Maybe<GarminActivity>;
  garminSports: Array<SportInfo>;
  garminTrackPoints: GarminTrackPointConnection;
  health: HealthStatus;
  location?: Maybe<LocationDetail>;
  locationCount: LocationCount;
  locations: LocationConnection;
  nearbyPoints: Array<NearbyPoint>;
  ready: ReadyStatus;
  referenceLocation?: Maybe<ReferenceLocation>;
  referenceLocations: Array<ReferenceLocation>;
  unifiedGps: UnifiedGpsConnection;
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

export interface ReadyStatus {
  __typename?: 'ReadyStatus';
  database?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
}

export interface ReferenceLocation {
  __typename?: 'ReferenceLocation';
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  radius_meters: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
}

export type SortOrder = 'asc' | 'desc';

export interface SportInfo {
  __typename?: 'SportInfo';
  activity_count: Scalars['Int']['output'];
  sport: Scalars['String']['output'];
}

export interface UnifiedGpsConnection {
  __typename?: 'UnifiedGpsConnection';
  items: Array<UnifiedGpsPoint>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
}

export interface UnifiedGpsPoint {
  __typename?: 'UnifiedGpsPoint';
  accuracy?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  heart_rate?: Maybe<Scalars['Int']['output']>;
  identifier: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  source: Scalars['String']['output'];
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['DateTime']['output'];
}

export interface WithinReferenceResult {
  __typename?: 'WithinReferenceResult';
  points: Array<NearbyPoint>;
  radius_meters: Scalars['Float']['output'];
  reference_name: Scalars['String']['output'];
  total_points: Scalars['Int']['output'];
}
