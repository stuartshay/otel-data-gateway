export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

/** Input for creating a saved Garmin segment (e.g. from an activity lap or climb). */
export interface CreateGarminSegmentInput {
  /** Segment length in meters (optional metadata) */
  distance_meters?: InputMaybe<Scalars['Float']['input']>;
  /** Segment end latitude */
  end_latitude: Scalars['Float']['input'];
  /** Segment end longitude */
  end_longitude: Scalars['Float']['input'];
  /** Corridor radius (m) used to match traversing activities (default 35) */
  match_tolerance_meters?: InputMaybe<Scalars['Float']['input']>;
  /** Human-readable segment name */
  name: Scalars['String']['input'];
  /** Garmin activity this segment is created from, if any */
  source_activity_id?: InputMaybe<Scalars['String']['input']>;
  /** Zero-based ClimbPro split index the segment is created from, if any */
  source_climb_index?: InputMaybe<Scalars['Int']['input']>;
  /** Zero-based lap index the segment is created from, if any */
  source_lap_index?: InputMaybe<Scalars['Int']['input']>;
  /** Sport this segment applies to (e.g. cycling); null matches all sports */
  sport?: InputMaybe<Scalars['String']['input']>;
  /** Segment start latitude */
  start_latitude: Scalars['Float']['input'];
  /** Segment start longitude */
  start_longitude: Scalars['Float']['input'];
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

/** Paginated list of daily activity summaries. */
export interface DailySummaryConnection {
  __typename?: 'DailySummaryConnection';
  /** List of daily activity summary items in the current page */
  items: Array<DailyActivitySummary>;
  /** Maximum number of items per page */
  limit: Scalars['Int']['output'];
  /** Number of items skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of items matching the query */
  total: Scalars['Int']['output'];
}

/** Earliest and latest activity dates available in the daily activity summary view. */
export interface DailySummaryDateRange {
  __typename?: 'DailySummaryDateRange';
  /** Latest activity date with daily summary data (YYYY-MM-DD) */
  max_date: Scalars['String']['output'];
  /** Earliest activity date with daily summary data (YYYY-MM-DD) */
  min_date: Scalars['String']['output'];
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
  /** Aerobic training effect score */
  aerobic_training_effect?: Maybe<Scalars['Float']['output']>;
  /** Anaerobic training effect score */
  anaerobic_training_effect?: Maybe<Scalars['Float']['output']>;
  /** Average cadence in RPM */
  avg_cadence?: Maybe<Scalars['Int']['output']>;
  /** Average heart rate in beats per minute */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Average pace in minutes per kilometre */
  avg_pace?: Maybe<Scalars['Float']['output']>;
  /** Average respiration rate in breaths per minute */
  avg_respiration_rate?: Maybe<Scalars['Int']['output']>;
  /** Average speed in km/h */
  avg_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Average ambient temperature in degrees C */
  avg_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Total calories burned */
  calories?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the record was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Recording device metadata (manufacturer, model, firmware) */
  device?: Maybe<GarminDevice>;
  /** Device manufacturer (e.g. garmin) */
  device_manufacturer?: Maybe<Scalars['String']['output']>;
  /** Total distance in kilometres */
  distance_km?: Maybe<Scalars['Float']['output']>;
  /** Active duration in seconds (excludes pauses) */
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Activity end time in UTC */
  end_time?: Maybe<Scalars['String']['output']>;
  /** Exercise load score */
  exercise_load?: Maybe<Scalars['Int']['output']>;
  /** Whether this activity has usable heart-rate data in summary or track points */
  hr_available: Scalars['Boolean']['output'];
  /** Maximum cadence in RPM */
  max_cadence?: Maybe<Scalars['Int']['output']>;
  /** Maximum heart rate in beats per minute */
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Maximum respiration rate in breaths per minute */
  max_respiration_rate?: Maybe<Scalars['Int']['output']>;
  /** Maximum speed in km/h */
  max_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Maximum ambient temperature in degrees C */
  max_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Minimum heart rate in beats per minute */
  min_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Minimum respiration rate in breaths per minute */
  min_respiration_rate?: Maybe<Scalars['Int']['output']>;
  /** Minimum ambient temperature in degrees C */
  min_temperature_c?: Maybe<Scalars['Int']['output']>;
  /** Moderate intensity minutes */
  moderate_intensity_minutes?: Maybe<Scalars['Int']['output']>;
  /** Distance over paved surfaces in kilometres */
  paved_distance_km?: Maybe<Scalars['Float']['output']>;
  /** Primary sport type (e.g. cycling, running) */
  sport: Scalars['String']['output'];
  /** Activity start time in UTC */
  start_time?: Maybe<Scalars['String']['output']>;
  /** Sub-sport classification (e.g. road, trail) */
  sub_sport?: Maybe<Scalars['String']['output']>;
  /** Estimated sweat loss in millilitres */
  sweat_loss_ml?: Maybe<Scalars['Int']['output']>;
  /** Total elevation gain in meters */
  total_ascent_m?: Maybe<Scalars['Float']['output']>;
  /** Total elevation loss in meters */
  total_descent_m?: Maybe<Scalars['Float']['output']>;
  /** Raw total distance in meters from FIT file */
  total_distance?: Maybe<Scalars['Float']['output']>;
  /** Total elapsed time in seconds (includes pauses) */
  total_elapsed_time?: Maybe<Scalars['Float']['output']>;
  /** Total intensity minutes */
  total_intensity_minutes?: Maybe<Scalars['Int']['output']>;
  /** Total activity strokes */
  total_strokes?: Maybe<Scalars['Int']['output']>;
  /** Total timer time in seconds (active recording) */
  total_timer_time?: Maybe<Scalars['Float']['output']>;
  /** Number of GPS track points in this activity */
  track_point_count?: Maybe<Scalars['Int']['output']>;
  /** Distance over unpaved surfaces in kilometres */
  unpaved_distance_km?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the FIT file was uploaded */
  uploaded_at?: Maybe<Scalars['String']['output']>;
  /** Vigorous intensity minutes */
  vigorous_intensity_minutes?: Maybe<Scalars['Int']['output']>;
}

/** Full reverse-geocoded address attached to a Garmin activity waypoint. */
export interface GarminActivityAddress {
  __typename?: 'GarminActivityAddress';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Pelias confidence score (0-1) */
  confidence?: Maybe<Scalars['Float']['output']>;
  /** Country name */
  country?: Maybe<Scalars['String']['output']>;
  /** Full formatted address label from Pelias */
  display_address?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when geocoding was performed */
  geocoded_at?: Maybe<Scalars['String']['output']>;
  /** House or building number */
  housenumber?: Maybe<Scalars['String']['output']>;
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** City or town */
  locality?: Maybe<Scalars['String']['output']>;
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Neighbourhood name */
  neighbourhood?: Maybe<Scalars['String']['output']>;
  /** Postal or ZIP code */
  postalcode?: Maybe<Scalars['String']['output']>;
  /** State or province */
  region?: Maybe<Scalars['String']['output']>;
  /** Geocoding status: success, no_coverage, error, pending */
  status: Scalars['String']['output'];
  /** Street name */
  street?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp of the track point this address was derived from */
  timestamp: Scalars['DateTime']['output'];
  /** garmin_track_points.id this address was geocoded from */
  track_point_id: Scalars['Int']['output'];
  /** Role of this waypoint within the activity: start, end, or waypoint */
  waypoint_kind: Scalars['String']['output'];
}

/** Garmin-native ClimbPro typed split for an activity. */
export interface GarminActivityClimb {
  __typename?: 'GarminActivityClimb';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Average elapsed vertical speed in meters per second */
  average_elapsed_vertical_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** Average climb grade percent */
  average_grade_percent?: Maybe<Scalars['Float']['output']>;
  /** Average moving speed in meters per second */
  average_moving_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** Average speed in meters per second */
  average_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** Average temperature in degrees C */
  average_temperature_c?: Maybe<Scalars['Float']['output']>;
  /** Average vertical speed in meters per second */
  average_vertical_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** BMR calories recorded for this climb */
  bmr_calories?: Maybe<Scalars['Float']['output']>;
  /** Calories recorded for this climb */
  calories?: Maybe<Scalars['Float']['output']>;
  /** Garmin ClimbPro difficulty */
  climb_pro_difficulty?: Maybe<Scalars['String']['output']>;
  /** Garmin ClimbPro typed split type */
  climb_type?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the row was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Climb distance in meters */
  distance_meters?: Maybe<Scalars['Float']['output']>;
  /** Climb duration in seconds */
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Elapsed climb duration in seconds */
  elapsed_duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Climb elevation gain in meters */
  elevation_gain_meters?: Maybe<Scalars['Float']['output']>;
  /** Climb elevation loss in meters */
  elevation_loss_meters?: Maybe<Scalars['Float']['output']>;
  /** Climb end latitude */
  end_latitude?: Maybe<Scalars['Float']['output']>;
  /** Climb end longitude */
  end_longitude?: Maybe<Scalars['Float']['output']>;
  /** UTC climb end time */
  end_time?: Maybe<Scalars['String']['output']>;
  /** Unique climb row identifier */
  id: Scalars['Float']['output'];
  /** Maximum climb grade percent */
  max_grade_percent?: Maybe<Scalars['Float']['output']>;
  /** Maximum speed in meters per second */
  max_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** Maximum temperature in degrees C */
  max_temperature_c?: Maybe<Scalars['Float']['output']>;
  /** Garmin message index */
  message_index?: Maybe<Scalars['Int']['output']>;
  /** Minimum temperature in degrees C */
  min_temperature_c?: Maybe<Scalars['Float']['output']>;
  /** Moving climb duration in seconds */
  moving_duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Zero-based Garmin typed split order */
  source_split_index: Scalars['Int']['output'];
  /** Garmin split type label when provided */
  split_type?: Maybe<Scalars['String']['output']>;
  /** Climb start elevation in meters */
  start_elevation_meters?: Maybe<Scalars['Float']['output']>;
  /** Climb start latitude */
  start_latitude?: Maybe<Scalars['Float']['output']>;
  /** Climb start longitude */
  start_longitude?: Maybe<Scalars['Float']['output']>;
  /** UTC climb start time */
  start_time?: Maybe<Scalars['String']['output']>;
  /** Local climb start time from Garmin */
  start_time_local?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when the row was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
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

/** Garmin-native or derived activity lap row. */
export interface GarminActivityLap {
  __typename?: 'GarminActivityLap';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Average lap heart rate in bpm */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Average lap speed in meters per second */
  avg_speed_mps?: Maybe<Scalars['Float']['output']>;
  /** Calories recorded for this lap */
  calories?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Lap distance in meters */
  distance_meters?: Maybe<Scalars['Float']['output']>;
  /** Lap timer duration in seconds */
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Lap elapsed duration in seconds */
  elapsed_duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** UTC lap end time */
  end_time?: Maybe<Scalars['String']['output']>;
  /** Unique lap row identifier */
  id: Scalars['Float']['output'];
  /** One-based lap order within the activity */
  lap_index: Scalars['Int']['output'];
  /** Maximum lap heart rate in bpm */
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Lap moving duration in seconds */
  moving_duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Lap paved distance in meters */
  paved_distance_meters?: Maybe<Scalars['Float']['output']>;
  /** UTC lap start time */
  start_time?: Maybe<Scalars['String']['output']>;
  /** Lap elevation gain in meters */
  total_ascent_meters?: Maybe<Scalars['Float']['output']>;
  /** Lap elevation loss in meters */
  total_descent_meters?: Maybe<Scalars['Float']['output']>;
  /** Lap unpaved distance in meters */
  unpaved_distance_meters?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
}

/** Laps for a single activity within the batch laps comparison response. */
export interface GarminActivityLapsGroup {
  __typename?: 'GarminActivityLapsGroup';
  /** Parent activity summary */
  activity: GarminLapsActivity;
  /** Laps ordered by lap_index ascending */
  laps: Array<GarminActivityLap>;
}

/** Aggregated Garmin activity totals for a single time bucket (week, month, or year). */
export interface GarminActivityTotal {
  __typename?: 'GarminActivityTotal';
  /** Number of activities in the period */
  activity_count: Scalars['Int']['output'];
  /** Start date of the period bucket (DATE_TRUNC of week/month/year) */
  period_start: Scalars['String']['output'];
  /** Sum of elevation gain in meters */
  total_ascent_m?: Maybe<Scalars['Int']['output']>;
  /** Sum of calories burned */
  total_calories?: Maybe<Scalars['Int']['output']>;
  /** Sum of distance in kilometres */
  total_distance_km?: Maybe<Scalars['Float']['output']>;
  /** Sum of active duration in seconds (excludes pauses) */
  total_duration_seconds?: Maybe<Scalars['Int']['output']>;
}

/** Open-Meteo weather conditions matched to an activity's start location/time. */
export interface GarminActivityWeather {
  __typename?: 'GarminActivityWeather';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Feels-like temperature in degrees C */
  apparent_temperature_c?: Maybe<Scalars['Float']['output']>;
  /** Total cloud cover percent */
  cloud_cover_pct?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** True when sourced from the forecast API pending ERA5 archive settlement */
  is_provisional: Scalars['Boolean']['output'];
  /** Latitude the weather was looked up for */
  latitude: Scalars['Float']['output'];
  /** Longitude the weather was looked up for */
  longitude: Scalars['Float']['output'];
  /** UTC hourly bucket the reading was taken from */
  observed_at: Scalars['String']['output'];
  /** Total precipitation in millimeters */
  precipitation_mm?: Maybe<Scalars['Float']['output']>;
  /** Rainfall in millimeters */
  rain_mm?: Maybe<Scalars['Float']['output']>;
  /** Relative humidity percent */
  relative_humidity_pct?: Maybe<Scalars['Float']['output']>;
  /** Snowfall in centimeters */
  snowfall_cm?: Maybe<Scalars['Float']['output']>;
  /** Open-Meteo API the row came from: archive or forecast */
  source: Scalars['String']['output'];
  /** Surface pressure in hPa */
  surface_pressure_hpa?: Maybe<Scalars['Float']['output']>;
  /** Air temperature in degrees C */
  temperature_c?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** WMO weather interpretation code */
  weather_code?: Maybe<Scalars['Int']['output']>;
  /** Wind direction in degrees */
  wind_direction_deg?: Maybe<Scalars['Float']['output']>;
  /** Wind gust speed in km/h */
  wind_gusts_kmh?: Maybe<Scalars['Float']['output']>;
  /** Wind speed in km/h */
  wind_speed_kmh?: Maybe<Scalars['Float']['output']>;
}

/**
 * Route-sampled, hour-by-hour Open-Meteo weather for an activity. Unlike
 * GarminActivityWeather (a single "conditions at the start" snapshot), each
 * row is sampled at the GPS location the athlete was actually at during that
 * hour.
 */
export interface GarminActivityWeatherHourly {
  __typename?: 'GarminActivityWeatherHourly';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Feels-like temperature in degrees C */
  apparent_temperature_c?: Maybe<Scalars['Float']['output']>;
  /** Total cloud cover percent */
  cloud_cover_pct?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Zero-based hour offset from the activity start */
  hour_index: Scalars['Int']['output'];
  /** True when sourced from the forecast API pending ERA5 archive settlement */
  is_provisional: Scalars['Boolean']['output'];
  /** Latitude sampled from the nearest track point for this hour */
  latitude: Scalars['Float']['output'];
  /** Longitude sampled from the nearest track point for this hour */
  longitude: Scalars['Float']['output'];
  /** UTC hourly bucket the reading was taken from */
  observed_at: Scalars['String']['output'];
  /** Total precipitation in millimeters */
  precipitation_mm?: Maybe<Scalars['Float']['output']>;
  /** Rainfall in millimeters */
  rain_mm?: Maybe<Scalars['Float']['output']>;
  /** Relative humidity percent */
  relative_humidity_pct?: Maybe<Scalars['Float']['output']>;
  /** Snowfall in centimeters */
  snowfall_cm?: Maybe<Scalars['Float']['output']>;
  /** Open-Meteo API the row came from: archive or forecast */
  source: Scalars['String']['output'];
  /** Surface pressure in hPa */
  surface_pressure_hpa?: Maybe<Scalars['Float']['output']>;
  /** Air temperature in degrees C */
  temperature_c?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp when the row was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
  /** WMO weather interpretation code */
  weather_code?: Maybe<Scalars['Int']['output']>;
  /** Wind direction in degrees */
  wind_direction_deg?: Maybe<Scalars['Float']['output']>;
  /** Wind gust speed in km/h */
  wind_gusts_kmh?: Maybe<Scalars['Float']['output']>;
  /** Wind speed in km/h */
  wind_speed_kmh?: Maybe<Scalars['Float']['output']>;
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
  /** Heart-rate zone index (1-5) */
  hr_zone?: Maybe<Scalars['Int']['output']>;
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Respiration rate in breaths per minute */
  respiration_rate?: Maybe<Scalars['Int']['output']>;
  /** Instantaneous speed in km/h */
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Ambient temperature in degrees C */
  temperature_c?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp of the data point */
  timestamp: Scalars['DateTime']['output'];
}

/** Earliest and latest timestamps in the Garmin activities table. */
export interface GarminDateRange {
  __typename?: 'GarminDateRange';
  /** Latest Garmin activity timestamp (ISO 8601) */
  max_date: Scalars['DateTime']['output'];
  /** Earliest Garmin activity timestamp (ISO 8601) */
  min_date: Scalars['DateTime']['output'];
}

/** Recording device metadata captured from a Garmin activity's FIT file. */
export interface GarminDevice {
  __typename?: 'GarminDevice';
  /** Recording device serial number */
  device_id?: Maybe<Scalars['Float']['output']>;
  /** Raw Garmin product enum id from the FIT file (e.g. 4061) */
  garmin_product?: Maybe<Scalars['Int']['output']>;
  /** Device manufacturer (e.g. garmin) */
  manufacturer?: Maybe<Scalars['String']['output']>;
  /** Friendly device model name (e.g. Edge 540 Solar) */
  model?: Maybe<Scalars['String']['output']>;
  /** Device firmware/software version (e.g. 31.30) */
  software_version?: Maybe<Scalars['String']['output']>;
}

/** Garmin activity count grouped by recording device model. */
export interface GarminDeviceCount {
  __typename?: 'GarminDeviceCount';
  /** Number of activities for this device label. */
  activity_count: Scalars['Int']['output'];
  /** Device model label, or Manual when an activity has no recording device. */
  label: Scalars['String']['output'];
}

/** Activity summary metadata for a batch laps comparison item. */
export interface GarminLapsActivity {
  __typename?: 'GarminLapsActivity';
  /** Garmin Connect activity identifier */
  activity_id: Scalars['String']['output'];
  /** Average activity heart rate in bpm */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Average activity speed in km/h */
  avg_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Total activity distance in kilometers */
  distance_km?: Maybe<Scalars['Float']['output']>;
  /** Total activity duration in seconds */
  duration_seconds?: Maybe<Scalars['Float']['output']>;
  /** Maximum activity heart rate in bpm */
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Sport type (e.g. cycling) */
  sport?: Maybe<Scalars['String']['output']>;
  /** UTC activity start time */
  start_time?: Maybe<Scalars['String']['output']>;
  /** Sub-sport type (e.g. road) */
  sub_sport?: Maybe<Scalars['String']['output']>;
  /** Total activity elevation gain in meters */
  total_ascent_m?: Maybe<Scalars['Float']['output']>;
}

/** Paginated batch of activities (each with their laps) for cross-activity lap comparison. */
export interface GarminLapsComparisonConnection {
  __typename?: 'GarminLapsComparisonConnection';
  /** Activities (newest first), each with their laps ordered by lap_index */
  items: Array<GarminActivityLapsGroup>;
  /** Maximum number of activities per page */
  limit: Scalars['Int']['output'];
  /** Number of activities skipped from the start */
  offset: Scalars['Int']['output'];
  /** Total number of activities matching the query */
  total: Scalars['Int']['output'];
}

/**
 * A saved (named) Garmin segment: a start→end corridor used to compare efforts
 * across all activities that traverse the same route.
 */
export interface GarminSegment {
  __typename?: 'GarminSegment';
  /** UTC timestamp when the segment was created */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Segment length in meters (optional metadata) */
  distance_meters?: Maybe<Scalars['Float']['output']>;
  /** Segment end latitude */
  end_latitude: Scalars['Float']['output'];
  /** Segment end longitude */
  end_longitude: Scalars['Float']['output'];
  /** Unique segment identifier */
  id: Scalars['Int']['output'];
  /** Corridor radius (m) used to match traversing activities */
  match_tolerance_meters: Scalars['Float']['output'];
  /** Human-readable segment name (e.g. "Harlem Hill") */
  name: Scalars['String']['output'];
  /**
   * Ordered [latitude, longitude] pairs tracing the segment path, recovered and
   * simplified from the source activity's GPS track. Null when no source activity
   * track can be matched (clients fall back to a straight start→end line).
   */
  route?: Maybe<Array<Array<Scalars['Float']['output']>>>;
  /** Garmin activity this segment was created from, if any */
  source_activity_id?: Maybe<Scalars['String']['output']>;
  /** Zero-based ClimbPro split index the segment was created from, if any */
  source_climb_index?: Maybe<Scalars['Int']['output']>;
  /** Zero-based lap index the segment was created from, if any */
  source_lap_index?: Maybe<Scalars['Int']['output']>;
  /** Sport this segment applies to (e.g. cycling); null matches all sports */
  sport?: Maybe<Scalars['String']['output']>;
  /** Segment start latitude */
  start_latitude: Scalars['Float']['output'];
  /** Segment start longitude */
  start_longitude: Scalars['Float']['output'];
  /** UTC timestamp when the segment was last updated */
  updated_at?: Maybe<Scalars['String']['output']>;
}

/** The start→end corridor a segment-efforts query was matched against. */
export interface GarminSegmentDefinition {
  __typename?: 'GarminSegmentDefinition';
  /** Corridor end latitude */
  end_lat: Scalars['Float']['output'];
  /** Corridor end longitude */
  end_lon: Scalars['Float']['output'];
  /** Corridor start latitude */
  start_lat: Scalars['Float']['output'];
  /** Corridor start longitude */
  start_lon: Scalars['Float']['output'];
  /** Corridor radius in meters used for matching */
  tolerance_meters: Scalars['Float']['output'];
}

/** A single activity's best traversal of a segment, ranked against all others. */
export interface GarminSegmentEffort {
  __typename?: 'GarminSegmentEffort';
  /** Garmin activity identifier for this effort */
  activity_id: Scalars['String']['output'];
  /** UTC start time of the parent activity */
  activity_start_time?: Maybe<Scalars['String']['output']>;
  /** Average heart rate across the segment in bpm */
  avg_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Average speed across the segment in km/h */
  avg_speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Distance covered across the segment in km */
  distance_km?: Maybe<Scalars['Float']['output']>;
  /** UTC timestamp reaching the segment end corridor */
  effort_end: Scalars['String']['output'];
  /** UTC timestamp entering the segment start corridor */
  effort_start: Scalars['String']['output'];
  /** Segment elapsed time in seconds */
  elapsed_seconds: Scalars['Float']['output'];
  /** Maximum heart rate across the segment in bpm */
  max_heart_rate?: Maybe<Scalars['Int']['output']>;
  /** 1-based rank by elapsed time (1 = fastest) */
  rank: Scalars['Int']['output'];
  /** Sport type (e.g. cycling) */
  sport?: Maybe<Scalars['String']['output']>;
}

/** Ranked efforts for a segment across all matching activities (fastest first). */
export interface GarminSegmentEffortsConnection {
  __typename?: 'GarminSegmentEffortsConnection';
  /** Efforts ordered fastest-first */
  items: Array<GarminSegmentEffort>;
  /** The corridor the efforts were matched against */
  segment: GarminSegmentDefinition;
  /** Total number of matching efforts */
  total: Scalars['Int']['output'];
}

/** Result payload returned when triggering an on-demand Garmin sync. */
export interface GarminSyncTriggerResult {
  __typename?: 'GarminSyncTriggerResult';
  /** True when a new sync run was accepted and triggered */
  accepted: Scalars['Boolean']['output'];
  /** Effective lookback value, when provided */
  lookback?: Maybe<Scalars['Int']['output']>;
  /** Human-readable status message from upstream sync service */
  message: Scalars['String']['output'];
  /** UTC timestamp when an already-running sync started */
  started_at?: Maybe<Scalars['String']['output']>;
  /** Sync trigger status (e.g. accepted, conflict, bad_request, error) */
  status: Scalars['String']['output'];
  /** UTC timestamp when sync was triggered */
  triggered_at?: Maybe<Scalars['String']['output']>;
  /** Effective sync window in hours */
  window_hours?: Maybe<Scalars['Int']['output']>;
  /** Window start timestamp computed by upstream service, when available */
  window_start?: Maybe<Scalars['String']['output']>;
}

/** Individual GPS track point within a Garmin activity. */
export interface GarminTrackPoint {
  __typename?: 'GarminTrackPoint';
  /** Parent Garmin activity identifier */
  activity_id: Scalars['String']['output'];
  /** Compact reverse-geocoded address summary, when geocoded */
  address?: Maybe<GeocodedAddressSummary>;
  /** Elevation above sea level in meters */
  altitude?: Maybe<Scalars['Float']['output']>;
  /** Pedal/step cadence in RPM */
  cadence?: Maybe<Scalars['Int']['output']>;
  /** UTC timestamp when the record was inserted */
  created_at?: Maybe<Scalars['String']['output']>;
  /** Cumulative distance from activity start in km */
  distance_from_start_km?: Maybe<Scalars['Float']['output']>;
  /** Effort classification label */
  effort_level?: Maybe<Scalars['String']['output']>;
  /** Heart rate in beats per minute */
  heart_rate?: Maybe<Scalars['Int']['output']>;
  /** Heart-rate zone index (1-5) */
  hr_zone?: Maybe<Scalars['Int']['output']>;
  /** Unique track point record identifier */
  id: Scalars['Int']['output'];
  /** GPS latitude in decimal degrees (WGS 84) */
  latitude: Scalars['Float']['output'];
  /** GPS longitude in decimal degrees (WGS 84) */
  longitude: Scalars['Float']['output'];
  /** Respiration rate in breaths per minute */
  respiration_rate?: Maybe<Scalars['Int']['output']>;
  /** Instantaneous speed in km/h */
  speed_kmh?: Maybe<Scalars['Float']['output']>;
  /** Road or terrain type */
  surface_type?: Maybe<Scalars['String']['output']>;
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

/** Reverse-geocoded address components from Pelias. */
export interface GeocodedAddress {
  __typename?: 'GeocodedAddress';
  /** Pelias confidence score (0-1) */
  confidence?: Maybe<Scalars['Float']['output']>;
  /** Country name */
  country?: Maybe<Scalars['String']['output']>;
  /** Full formatted address label from Pelias */
  display_address?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when geocoding was performed */
  geocoded_at?: Maybe<Scalars['String']['output']>;
  /** House or building number */
  housenumber?: Maybe<Scalars['String']['output']>;
  /** City or town */
  locality?: Maybe<Scalars['String']['output']>;
  /** Neighbourhood name */
  neighbourhood?: Maybe<Scalars['String']['output']>;
  /** Postal or ZIP code */
  postalcode?: Maybe<Scalars['String']['output']>;
  /** State or province */
  region?: Maybe<Scalars['String']['output']>;
  /** Geocoding status: success, no_coverage, error, pending */
  status: Scalars['String']['output'];
  /** Street name */
  street?: Maybe<Scalars['String']['output']>;
}

/** Compact reverse-geocoded address summary embedded in track-point payloads. */
export interface GeocodedAddressSummary {
  __typename?: 'GeocodedAddressSummary';
  /** Pelias confidence score (0-1) */
  confidence?: Maybe<Scalars['Float']['output']>;
  /** Country name */
  country?: Maybe<Scalars['String']['output']>;
  /** Full formatted address label from Pelias */
  display_address?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when geocoding was performed */
  geocoded_at?: Maybe<Scalars['String']['output']>;
  /** House or building number */
  housenumber?: Maybe<Scalars['String']['output']>;
  /** City or town */
  locality?: Maybe<Scalars['String']['output']>;
  /** Neighbourhood name */
  neighbourhood?: Maybe<Scalars['String']['output']>;
  /** Postal or ZIP code */
  postalcode?: Maybe<Scalars['String']['output']>;
  /** State or province */
  region?: Maybe<Scalars['String']['output']>;
  /** Geocoding status: success, no_coverage, error, pending */
  status: Scalars['String']['output'];
  /** Street name */
  street?: Maybe<Scalars['String']['output']>;
  /** Role of this waypoint within a Garmin activity (start, end, waypoint). Null for OwnTracks records. */
  waypoint_kind?: Maybe<Scalars['String']['output']>;
}

/** Reverse-geocoded address for a 4-decimal coordinate cell. */
export interface GeocodedPointAddress {
  __typename?: 'GeocodedPointAddress';
  /** Pelias confidence score from 0 to 1. */
  confidence?: Maybe<Scalars['Float']['output']>;
  /** Country name. */
  country?: Maybe<Scalars['String']['output']>;
  /** Full formatted address label. */
  display_address?: Maybe<Scalars['String']['output']>;
  /** UTC timestamp when geocoding was performed. */
  geocoded_at?: Maybe<Scalars['String']['output']>;
  /** House or building number. */
  housenumber?: Maybe<Scalars['String']['output']>;
  /** Resolved 4-decimal cell latitude. */
  latitude: Scalars['Float']['output'];
  /** City or town. */
  locality?: Maybe<Scalars['String']['output']>;
  /** Resolved 4-decimal cell longitude. */
  longitude: Scalars['Float']['output'];
  /** Neighbourhood name. */
  neighbourhood?: Maybe<Scalars['String']['output']>;
  /** Postal or ZIP code. */
  postalcode?: Maybe<Scalars['String']['output']>;
  /** State or province. */
  region?: Maybe<Scalars['String']['output']>;
  /** Whether the address came from the cache or Pelias fallback. */
  resolution_source: PointAddressSource;
  /** Geocoding status: success, no_coverage, error, or pending. */
  status: Scalars['String']['output'];
  /** Street name. */
  street?: Maybe<Scalars['String']['output']>;
}

/** Coverage statistics for a single geocoding source (owntracks or garmin). */
export interface GeocodingSourceStatus {
  __typename?: 'GeocodingSourceStatus';
  /** Number of records that failed geocoding */
  errors: Scalars['Int']['output'];
  /** Number of records outside Pelias coverage area */
  no_coverage: Scalars['Int']['output'];
  /** Number of records awaiting geocoding for this source */
  pending: Scalars['Int']['output'];
  /** Number of successfully geocoded records for this source */
  success: Scalars['Int']['output'];
  /** Total number of geocoded_addresses rows for this source */
  total: Scalars['Int']['output'];
}

/** Coverage statistics for geocoded location records. */
export interface GeocodingStatus {
  __typename?: 'GeocodingStatus';
  /** Per-source breakdown of geocoding coverage (owntracks, garmin) */
  by_source: GeocodingStatusBySource;
  /** Percentage of locations with a geocoded address */
  coverage_percent: Scalars['Float']['output'];
  /** Number of locations that failed geocoding */
  errors: Scalars['Int']['output'];
  /** Number of locations with a geocoded address (any status) */
  geocoded: Scalars['Int']['output'];
  /** Number of locations outside Pelias coverage area */
  no_coverage: Scalars['Int']['output'];
  /** Number of locations awaiting geocoding */
  pending: Scalars['Int']['output'];
  /** Number of successfully geocoded locations */
  success: Scalars['Int']['output'];
  /** Total number of OwnTracks location records */
  total_locations: Scalars['Int']['output'];
}

/** Per-source breakdown of geocoding coverage. */
export interface GeocodingStatusBySource {
  __typename?: 'GeocodingStatusBySource';
  /** Coverage stats for Garmin rows */
  garmin: GeocodingSourceStatus;
  /** Number of Garmin activities that have at least one address row */
  garmin_activities_geocoded: Scalars['Int']['output'];
  /** Total number of Garmin activities (denominator for activity-level coverage) */
  garmin_activities_total: Scalars['Int']['output'];
  /** Percentage of Garmin activities with at least one geocoded address */
  garmin_coverage_percent: Scalars['Float']['output'];
  /** Coverage stats for OwnTracks rows */
  owntracks: GeocodingSourceStatus;
}

/** Result of triggering a batch geocoding operation. */
export interface GeocodingTriggerResult {
  __typename?: 'GeocodingTriggerResult';
  /** Number of records processed in this batch */
  processed: Scalars['Int']['output'];
  /** Number of records still awaiting geocoding */
  remaining: Scalars['Int']['output'];
  /** Number of records skipped via proximity deduplication */
  skipped_dedup: Scalars['Int']['output'];
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
  /** Short formatted address from reverse geocoding */
  display_address?: Maybe<Scalars['String']['output']>;
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

/** Earliest and latest timestamps in the locations table. */
export interface LocationDateRange {
  __typename?: 'LocationDateRange';
  /** Latest location timestamp (ISO 8601) */
  max_date: Scalars['DateTime']['output'];
  /** Earliest location timestamp (ISO 8601) */
  min_date: Scalars['DateTime']['output'];
}

/** Full location detail including the original OwnTracks JSON payload. */
export interface LocationDetail {
  __typename?: 'LocationDetail';
  /** Horizontal accuracy of the GPS fix in meters */
  accuracy?: Maybe<Scalars['Float']['output']>;
  /** Full reverse-geocoded address components from Pelias */
  address?: Maybe<GeocodedAddress>;
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

export interface Mutation {
  __typename?: 'Mutation';
  /**
   * Create a saved Garmin segment (requires authentication). Typically called with
   * the start/end coordinates of an activity lap or ClimbPro split to "save this
   * lap as a segment".
   */
  createGarminSegment: GarminSegment;
  /** Delete a saved Garmin segment by id (requires authentication). Returns true on success. */
  deleteGarminSegment: Scalars['Boolean']['output'];
  /** Trigger an on-demand Garmin sync in the upstream API. */
  triggerGarminSync: GarminSyncTriggerResult;
  /** Trigger batch reverse-geocoding of un-geocoded location records. */
  triggerGeocoding: GeocodingTriggerResult;
}

export interface MutationCreateGarminSegmentArgs {
  input: CreateGarminSegmentInput;
}

export interface MutationDeleteGarminSegmentArgs {
  id: Scalars['Int']['input'];
}

export interface MutationTriggerGarminSyncArgs {
  lookback?: InputMaybe<Scalars['Int']['input']>;
  window_hours?: InputMaybe<Scalars['Int']['input']>;
}

export interface MutationTriggerGeocodingArgs {
  batch_size?: InputMaybe<Scalars['Int']['input']>;
  retry_failed?: InputMaybe<Scalars['Boolean']['input']>;
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

/** Source used to resolve a point address. */
export type PointAddressSource =
  /** Address was returned from the persisted dense-cell cache. */
  | 'database'
  /** Address was resolved through the Pelias fallback and persisted. */
  | 'pelias';

export interface Query {
  __typename?: 'Query';
  /** Calculate the geodesic distance between two geographic points. */
  calculateDistance: DistanceResult;
  /** Retrieve daily activity summaries combining OwnTracks and Garmin data. */
  dailySummary: DailySummaryConnection;
  /** Get the earliest and latest activity dates available in the daily activity summary view. */
  dailySummaryDateRange: DailySummaryDateRange;
  /** List all distinct OwnTracks device identifiers. */
  devices: Array<DeviceInfo>;
  /** Retrieve a paginated list of Garmin activities. */
  garminActivities: GarminActivityConnection;
  /** Retrieve a single Garmin activity by its ID. */
  garminActivity?: Maybe<GarminActivity>;
  /** Retrieve all reverse-geocoded addresses for a Garmin activity (start, mid-route waypoints, and end). */
  garminActivityAddresses: Array<GarminActivityAddress>;
  /** Retrieve Garmin-native ClimbPro typed splits for a Garmin activity. */
  garminActivityClimbs: Array<GarminActivityClimb>;
  /** Retrieve Garmin-native or derived laps for a Garmin activity. */
  garminActivityLaps: Array<GarminActivityLap>;
  /** Aggregate Garmin activity totals grouped by week, month, or year. */
  garminActivityTotals: Array<GarminActivityTotal>;
  /**
   * Retrieve Open-Meteo weather conditions for a Garmin activity's start location/time.
   * Returns null if the activity exists but hasn't been weather-backfilled yet.
   */
  garminActivityWeather?: Maybe<GarminActivityWeather>;
  /**
   * Retrieve route-sampled, hour-by-hour Open-Meteo weather for a Garmin activity.
   * Unlike garminActivityWeather (a single "conditions at the start" snapshot), each
   * row is sampled at the GPS location the athlete was actually at during that hour.
   * Returns an empty list if the activity exists but hasn't been hourly-backfilled yet.
   */
  garminActivityWeatherHourly: Array<GarminActivityWeatherHourly>;
  /** Retrieve chart-optimised track points for a Garmin activity. */
  garminChartData: Array<GarminChartPoint>;
  /** Get the earliest and latest Garmin activity timestamps. */
  garminDateRange: GarminDateRange;
  /** List Garmin recording device labels with activity counts. */
  garminDeviceCounts: Array<GarminDeviceCount>;
  /** Batch laps across activities for cross-activity comparison (matrix of activities x lap_index). */
  garminLapsComparison: GarminLapsComparisonConnection;
  /** Fetch a single saved Garmin segment by id. Returns null if it does not exist. */
  garminSegment?: Maybe<GarminSegment>;
  /** Rank all historical activity efforts over a saved segment (fastest first). */
  garminSegmentEfforts: GarminSegmentEffortsConnection;
  /** List saved Garmin segments, optionally filtered by sport. */
  garminSegments: Array<GarminSegment>;
  /** List all distinct sport types with activity counts. */
  garminSports: Array<SportInfo>;
  /** Retrieve paginated GPS track points for a Garmin activity. */
  garminTrackPoints: GarminTrackPointConnection;
  /** Get geocoding coverage statistics. */
  geocodingStatus: GeocodingStatus;
  /** Get service health status. */
  health: HealthStatus;
  /** Retrieve a single location by its ID, including raw payload. */
  location?: Maybe<LocationDetail>;
  /** Get aggregate count of location records with optional filters. */
  locationCount: LocationCount;
  /** Get the earliest and latest location timestamps. */
  locationDateRange: LocationDateRange;
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
  /**
   * Resolve an address from the dense point-cell cache, with Pelias fallback.
   * Requires the caller's Authorization header because a fallback can persist data.
   */
  reverseGeocodePoint: GeocodedPointAddress;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export interface QueryGarminActivityAddressesArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminActivityClimbsArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminActivityLapsArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminActivityTotalsArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  period: Scalars['String']['input'];
  sport?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryGarminActivityWeatherArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminActivityWeatherHourlyArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminChartDataArgs {
  activity_id: Scalars['String']['input'];
}

export interface QueryGarminLapsComparisonArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sport?: InputMaybe<Scalars['String']['input']>;
}

export interface QueryGarminSegmentArgs {
  id: Scalars['Int']['input'];
}

export interface QueryGarminSegmentEffortsArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  max_effort_seconds?: InputMaybe<Scalars['Int']['input']>;
}

export interface QueryGarminSegmentsArgs {
  sport?: InputMaybe<Scalars['String']['input']>;
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

export interface QueryReverseGeocodePointArgs {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}

export interface QueryUnifiedGpsArgs {
  date_from?: InputMaybe<Scalars['String']['input']>;
  date_to?: InputMaybe<Scalars['String']['input']>;
  deduplicate?: InputMaybe<Scalars['Boolean']['input']>;
  exclude_stationary?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Database readiness payload returned by otel-data-api */
  database?: Maybe<Scalars['JSON']['output']>;
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
