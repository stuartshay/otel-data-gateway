import { healthResolvers } from './health.js';
import { locationResolvers } from './location.js';
import { garminResolvers } from './garmin.js';
import { gpsResolvers } from './gps.js';
import { referenceResolvers } from './reference.js';
import { spatialResolvers } from './spatial.js';

// Merge all resolver Query fields into a single resolvers object
const resolvers = {
  Query: {
    ...healthResolvers.Query,
    ...locationResolvers.Query,
    ...garminResolvers.Query,
    ...gpsResolvers.Query,
    ...referenceResolvers.Query,
    ...spatialResolvers.Query,
  },
};

export default resolvers;
