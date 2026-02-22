import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GatewayContext } from '../resolvers/types.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

/** Per-day aggregate combining OwnTracks location stats and Garmin activity metrics. */
export type DailyActivitySummary = {
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
};

/** Distinct OwnTracks device identifier. */
export type DeviceInfo = {
  __typename?: 'DeviceInfo';
  /** OwnTracks device identifier */
  device_id: Scalars['String']['output'];
};

/** Geodesic distance calculation result between two geographic points. */
export type DistanceResult = {
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
};

/** Summary of a Garmin Connect activity parsed from a FIT file. */
export type GarminActivity = {
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
};

/** Paginated list of Garmin activities. */
export type GarminActivityConnection = {
  __typename?: 'GarminActivityConnection';
  /** List of Garmin activity items in the current page */
  items: Array<GarminActivity>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
};

/** Lightweight track point optimised for time-series chart rendering. */
export type GarminChartPoint = {
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
};

/** Individual GPS track point within a Garmin activity. */
export type GarminTrackPoint = {
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
};

/** Paginated list of Garmin track points. */
export type GarminTrackPointConnection = {
  __typename?: 'GarminTrackPointConnection';
  /** List of track point items in the current page */
  items: Array<GarminTrackPoint>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
};

/** Service health status. */
export type HealthStatus = {
  __typename?: 'HealthStatus';
  /** Service health status (healthy or unhealthy) */
  status: Scalars['String']['output'];
  /** Application version from VERSION file */
  version: Scalars['String']['output'];
};

/** GPS location recorded by the OwnTracks mobile app. */
export type Location = {
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
};

/** Paginated list of OwnTracks location records. */
export type LocationConnection = {
  __typename?: 'LocationConnection';
  /** List of location items in the current page */
  items: Array<Location>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
};

/** Aggregate location count with optional filter context. */
export type LocationCount = {
  __typename?: 'LocationCount';
  /** Total number of location records matching the filter */
  count: Scalars['Int']['output'];
  /** Date filter applied (YYYY-MM-DD), if any */
  date?: Maybe<Scalars['String']['output']>;
  /** Device ID filter applied, if any */
  device_id?: Maybe<Scalars['String']['output']>;
};

/** Full location detail including the original OwnTracks JSON payload. */
export type LocationDetail = {
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
};

/** GPS point found within a spatial proximity search. */
export type NearbyPoint = {
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
};

/** Pagination metadata for paginated list responses. */
export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
};

export type Query = {
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
};


export type QueryCalculateDistanceArgs = {
  from_lat: Scalars['Float']['input'];
  from_lon: Scalars['Float']['input'];
  to_lat: Scalars['Float']['input'];
  to_lon: Scalars['Float']['input'];
};


export type QueryDailySummaryArgs = {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGarminActivitiesArgs = {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  sort?: InputMaybe<Scalars['String']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGarminActivityArgs = {
  activity_id: Scalars['String']['input'];
};


export type QueryGarminChartDataArgs = {
  activity_id: Scalars['String']['input'];
};


export type QueryGarminTrackPointsArgs = {
  activity_id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  simplify?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLocationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLocationCountArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  device_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLocationsArgs = {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  device_id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNearbyPointsArgs = {
  lat: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  lon: Scalars['Float']['input'];
  radius_meters?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReferenceLocationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUnifiedGpsArgs = {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
  source?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWithinReferenceArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};

/** Service readiness status including database connectivity. */
export type ReadyStatus = {
  __typename?: 'ReadyStatus';
  /** Database connection status */
  database?: Maybe<Scalars['String']['output']>;
  /** Service readiness status */
  status: Scalars['String']['output'];
  /** Application version from VERSION file */
  version?: Maybe<Scalars['String']['output']>;
};

/** Named geographic reference point used for spatial queries (e.g. home, office). */
export type ReferenceLocation = {
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
};

/** Sort direction for query results. */
export enum SortOrder {
  /** Ascending order (oldest first, A-Z) */
  Asc = 'asc',
  /** Descending order (newest first, Z-A) */
  Desc = 'desc'
}

/** Sport type with its activity count. */
export type SportInfo = {
  __typename?: 'SportInfo';
  /** Number of activities for this sport */
  activity_count: Scalars['Int']['output'];
  /** Sport type name (e.g. cycling, running) */
  sport: Scalars['String']['output'];
};

/** Paginated list of unified GPS data points. */
export type UnifiedGpsConnection = {
  __typename?: 'UnifiedGpsConnection';
  /** List of unified GPS items in the current page */
  items: Array<UnifiedGpsPoint>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
};

/** Single GPS data point from the unified view combining OwnTracks and Garmin sources. */
export type UnifiedGpsPoint = {
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
};

/** GPS points found within a named reference location's geofence radius. */
export type WithinReferenceResult = {
  __typename?: 'WithinReferenceResult';
  /** GPS points within the radius, sorted by distance */
  points: Array<NearbyPoint>;
  /** Geofence radius used for the search in meters */
  radius_meters: Scalars['Float']['output'];
  /** Name of the reference location searched */
  reference_name: Scalars['String']['output'];
  /** Number of GPS points found within the radius */
  total_points: Scalars['Int']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DailyActivitySummary: ResolverTypeWrapper<DailyActivitySummary>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeviceInfo: ResolverTypeWrapper<DeviceInfo>;
  DistanceResult: ResolverTypeWrapper<DistanceResult>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GarminActivity: ResolverTypeWrapper<GarminActivity>;
  GarminActivityConnection: ResolverTypeWrapper<GarminActivityConnection>;
  GarminChartPoint: ResolverTypeWrapper<GarminChartPoint>;
  GarminTrackPoint: ResolverTypeWrapper<GarminTrackPoint>;
  GarminTrackPointConnection: ResolverTypeWrapper<GarminTrackPointConnection>;
  HealthStatus: ResolverTypeWrapper<HealthStatus>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationConnection: ResolverTypeWrapper<LocationConnection>;
  LocationCount: ResolverTypeWrapper<LocationCount>;
  LocationDetail: ResolverTypeWrapper<LocationDetail>;
  NearbyPoint: ResolverTypeWrapper<NearbyPoint>;
  PaginationInfo: ResolverTypeWrapper<PaginationInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  ReadyStatus: ResolverTypeWrapper<ReadyStatus>;
  ReferenceLocation: ResolverTypeWrapper<ReferenceLocation>;
  SortOrder: SortOrder;
  SportInfo: ResolverTypeWrapper<SportInfo>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UnifiedGpsConnection: ResolverTypeWrapper<UnifiedGpsConnection>;
  UnifiedGpsPoint: ResolverTypeWrapper<UnifiedGpsPoint>;
  WithinReferenceResult: ResolverTypeWrapper<WithinReferenceResult>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  DailyActivitySummary: DailyActivitySummary;
  DateTime: Scalars['DateTime']['output'];
  DeviceInfo: DeviceInfo;
  DistanceResult: DistanceResult;
  Float: Scalars['Float']['output'];
  GarminActivity: GarminActivity;
  GarminActivityConnection: GarminActivityConnection;
  GarminChartPoint: GarminChartPoint;
  GarminTrackPoint: GarminTrackPoint;
  GarminTrackPointConnection: GarminTrackPointConnection;
  HealthStatus: HealthStatus;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Location: Location;
  LocationConnection: LocationConnection;
  LocationCount: LocationCount;
  LocationDetail: LocationDetail;
  NearbyPoint: NearbyPoint;
  PaginationInfo: PaginationInfo;
  Query: Record<PropertyKey, never>;
  ReadyStatus: ReadyStatus;
  ReferenceLocation: ReferenceLocation;
  SportInfo: SportInfo;
  String: Scalars['String']['output'];
  UnifiedGpsConnection: UnifiedGpsConnection;
  UnifiedGpsPoint: UnifiedGpsPoint;
  WithinReferenceResult: WithinReferenceResult;
}>;

export type DailyActivitySummaryResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['DailyActivitySummary'] = ResolversParentTypes['DailyActivitySummary']> = ResolversObject<{
  activity_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avg_accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avg_heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  garmin_activities?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  garmin_sport?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max_battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min_battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  owntracks_device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owntracks_points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_calories?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_distance_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_duration_seconds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeviceInfoResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['DeviceInfo'] = ResolversParentTypes['DeviceInfo']> = ResolversObject<{
  device_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type DistanceResultResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['DistanceResult'] = ResolversParentTypes['DistanceResult']> = ResolversObject<{
  distance_meters?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  from_lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  from_lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  to_lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  to_lon?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
}>;

export type GarminActivityResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['GarminActivity'] = ResolversParentTypes['GarminActivity']> = ResolversObject<{
  activity_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avg_cadence?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  avg_heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  avg_pace?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avg_speed_kmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  avg_temperature_c?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  calories?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_manufacturer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  duration_seconds?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  end_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max_cadence?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  max_heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  max_speed_kmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_temperature_c?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min_temperature_c?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sub_sport?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_ascent_m?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_descent_m?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_elapsed_time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total_timer_time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  track_point_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  uploaded_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type GarminActivityConnectionResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['GarminActivityConnection'] = ResolversParentTypes['GarminActivityConnection']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['GarminActivity']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type GarminChartPointResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['GarminChartPoint'] = ResolversParentTypes['GarminChartPoint']> = ResolversObject<{
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cadence?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  distance_from_start_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  speed_kmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type GarminTrackPointResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['GarminTrackPoint'] = ResolversParentTypes['GarminTrackPoint']> = ResolversObject<{
  activity_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cadence?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  distance_from_start_km?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  speed_kmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature_c?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type GarminTrackPointConnectionResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['GarminTrackPointConnection'] = ResolversParentTypes['GarminTrackPointConnection']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['GarminTrackPoint']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type HealthStatusResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['HealthStatus'] = ResolversParentTypes['HealthStatus']> = ResolversObject<{
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocationResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  battery_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  connection_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  trigger?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  velocity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type LocationConnectionResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['LocationConnection'] = ResolversParentTypes['LocationConnection']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type LocationCountResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['LocationCount'] = ResolversParentTypes['LocationCount']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type LocationDetailResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['LocationDetail'] = ResolversParentTypes['LocationDetail']> = ResolversObject<{
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  battery_status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  connection_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  raw_payload?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  tid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  trigger?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  velocity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
}>;

export type NearbyPointResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['NearbyPoint'] = ResolversParentTypes['NearbyPoint']> = ResolversObject<{
  distance_meters?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type PaginationInfoResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['PaginationInfo'] = ResolversParentTypes['PaginationInfo']> = ResolversObject<{
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  calculateDistance?: Resolver<ResolversTypes['DistanceResult'], ParentType, ContextType, RequireFields<QueryCalculateDistanceArgs, 'from_lat' | 'from_lon' | 'to_lat' | 'to_lon'>>;
  dailySummary?: Resolver<Array<ResolversTypes['DailyActivitySummary']>, ParentType, ContextType, Partial<QueryDailySummaryArgs>>;
  devices?: Resolver<Array<ResolversTypes['DeviceInfo']>, ParentType, ContextType>;
  garminActivities?: Resolver<ResolversTypes['GarminActivityConnection'], ParentType, ContextType, Partial<QueryGarminActivitiesArgs>>;
  garminActivity?: Resolver<Maybe<ResolversTypes['GarminActivity']>, ParentType, ContextType, RequireFields<QueryGarminActivityArgs, 'activity_id'>>;
  garminChartData?: Resolver<Array<ResolversTypes['GarminChartPoint']>, ParentType, ContextType, RequireFields<QueryGarminChartDataArgs, 'activity_id'>>;
  garminSports?: Resolver<Array<ResolversTypes['SportInfo']>, ParentType, ContextType>;
  garminTrackPoints?: Resolver<ResolversTypes['GarminTrackPointConnection'], ParentType, ContextType, RequireFields<QueryGarminTrackPointsArgs, 'activity_id'>>;
  health?: Resolver<ResolversTypes['HealthStatus'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LocationDetail']>, ParentType, ContextType, RequireFields<QueryLocationArgs, 'id'>>;
  locationCount?: Resolver<ResolversTypes['LocationCount'], ParentType, ContextType, Partial<QueryLocationCountArgs>>;
  locations?: Resolver<ResolversTypes['LocationConnection'], ParentType, ContextType, Partial<QueryLocationsArgs>>;
  nearbyPoints?: Resolver<Array<ResolversTypes['NearbyPoint']>, ParentType, ContextType, RequireFields<QueryNearbyPointsArgs, 'lat' | 'lon'>>;
  ready?: Resolver<ResolversTypes['ReadyStatus'], ParentType, ContextType>;
  referenceLocation?: Resolver<Maybe<ResolversTypes['ReferenceLocation']>, ParentType, ContextType, RequireFields<QueryReferenceLocationArgs, 'id'>>;
  referenceLocations?: Resolver<Array<ResolversTypes['ReferenceLocation']>, ParentType, ContextType>;
  unifiedGps?: Resolver<ResolversTypes['UnifiedGpsConnection'], ParentType, ContextType, Partial<QueryUnifiedGpsArgs>>;
  withinReference?: Resolver<ResolversTypes['WithinReferenceResult'], ParentType, ContextType, RequireFields<QueryWithinReferenceArgs, 'name'>>;
}>;

export type ReadyStatusResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['ReadyStatus'] = ResolversParentTypes['ReadyStatus']> = ResolversObject<{
  database?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type ReferenceLocationResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['ReferenceLocation'] = ResolversParentTypes['ReferenceLocation']> = ResolversObject<{
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  radius_meters?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SportInfoResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['SportInfo'] = ResolversParentTypes['SportInfo']> = ResolversObject<{
  activity_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UnifiedGpsConnectionResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['UnifiedGpsConnection'] = ResolversParentTypes['UnifiedGpsConnection']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['UnifiedGpsPoint']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type UnifiedGpsPointResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['UnifiedGpsPoint'] = ResolversParentTypes['UnifiedGpsPoint']> = ResolversObject<{
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  battery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heart_rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  speed_kmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
}>;

export type WithinReferenceResultResolvers<ContextType = GatewayContext, ParentType extends ResolversParentTypes['WithinReferenceResult'] = ResolversParentTypes['WithinReferenceResult']> = ResolversObject<{
  points?: Resolver<Array<ResolversTypes['NearbyPoint']>, ParentType, ContextType>;
  radius_meters?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reference_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GatewayContext> = ResolversObject<{
  DailyActivitySummary?: DailyActivitySummaryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeviceInfo?: DeviceInfoResolvers<ContextType>;
  DistanceResult?: DistanceResultResolvers<ContextType>;
  GarminActivity?: GarminActivityResolvers<ContextType>;
  GarminActivityConnection?: GarminActivityConnectionResolvers<ContextType>;
  GarminChartPoint?: GarminChartPointResolvers<ContextType>;
  GarminTrackPoint?: GarminTrackPointResolvers<ContextType>;
  GarminTrackPointConnection?: GarminTrackPointConnectionResolvers<ContextType>;
  HealthStatus?: HealthStatusResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Location?: LocationResolvers<ContextType>;
  LocationConnection?: LocationConnectionResolvers<ContextType>;
  LocationCount?: LocationCountResolvers<ContextType>;
  LocationDetail?: LocationDetailResolvers<ContextType>;
  NearbyPoint?: NearbyPointResolvers<ContextType>;
  PaginationInfo?: PaginationInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReadyStatus?: ReadyStatusResolvers<ContextType>;
  ReferenceLocation?: ReferenceLocationResolvers<ContextType>;
  SportInfo?: SportInfoResolvers<ContextType>;
  UnifiedGpsConnection?: UnifiedGpsConnectionResolvers<ContextType>;
  UnifiedGpsPoint?: UnifiedGpsPointResolvers<ContextType>;
  WithinReferenceResult?: WithinReferenceResultResolvers<ContextType>;
}>;

