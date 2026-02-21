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

export type DailyActivitySummary = {
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
};

export type DeviceInfo = {
  __typename?: 'DeviceInfo';
  device_id: Scalars['String']['output'];
};

export type DistanceResult = {
  __typename?: 'DistanceResult';
  distance_meters: Scalars['Float']['output'];
  from_lat: Scalars['Float']['output'];
  from_lon: Scalars['Float']['output'];
  to_lat: Scalars['Float']['output'];
  to_lon: Scalars['Float']['output'];
};

export type GarminActivity = {
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
};

export type GarminActivityConnection = {
  __typename?: 'GarminActivityConnection';
  items: Array<GarminActivity>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GarminTrackPoint = {
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
};

export type GarminTrackPointConnection = {
  __typename?: 'GarminTrackPointConnection';
  items: Array<GarminTrackPoint>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  status: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Location = {
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
};

export type LocationConnection = {
  __typename?: 'LocationConnection';
  items: Array<Location>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LocationCount = {
  __typename?: 'LocationCount';
  count: Scalars['Int']['output'];
  date?: Maybe<Scalars['String']['output']>;
  device_id?: Maybe<Scalars['String']['output']>;
};

export type LocationDetail = {
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
};

export type NearbyPoint = {
  __typename?: 'NearbyPoint';
  distance_meters: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  source: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
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

export type ReadyStatus = {
  __typename?: 'ReadyStatus';
  database?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

export type ReferenceLocation = {
  __typename?: 'ReferenceLocation';
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  radius_meters: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SportInfo = {
  __typename?: 'SportInfo';
  activity_count: Scalars['Int']['output'];
  sport: Scalars['String']['output'];
};

export type UnifiedGpsConnection = {
  __typename?: 'UnifiedGpsConnection';
  items: Array<UnifiedGpsPoint>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UnifiedGpsPoint = {
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
};

export type WithinReferenceResult = {
  __typename?: 'WithinReferenceResult';
  points: Array<NearbyPoint>;
  radius_meters: Scalars['Float']['output'];
  reference_name: Scalars['String']['output'];
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

