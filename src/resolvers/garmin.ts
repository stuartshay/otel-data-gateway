import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const garminResolvers: {
  Query: Pick<
    QueryResolvers,
    'garminActivities' | 'garminActivity' | 'garminTrackPoints' | 'garminSports'
  >;
} = {
  Query: {
    garminActivities: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivities(args);
    },

    garminActivity: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivity(args.activity_id);
    },

    garminTrackPoints: async (_parent, args, { dataSources }) => {
      const { activity_id, ...params } = args;
      return dataSources.otelAPI.getGarminTrackPoints(activity_id, params);
    },

    garminSports: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGarminSports();
    },
  },
};
