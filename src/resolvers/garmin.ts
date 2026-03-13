import type { MutationResolvers, QueryResolvers } from '../__generated__/resolvers-types.js';

export const garminResolvers: {
  Query: Pick<
    QueryResolvers,
    'garminActivities' | 'garminActivity' | 'garminTrackPoints' | 'garminSports' | 'garminChartData'
  >;
  Mutation: Pick<MutationResolvers, 'triggerGarminSync'>;
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

    garminChartData: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminChartData(args.activity_id);
    },
  },
  Mutation: {
    triggerGarminSync: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.triggerGarminSync(args);
    },
  },
};
