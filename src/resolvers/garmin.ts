import type { MutationResolvers, QueryResolvers } from '../__generated__/resolvers-types.js';

export const garminResolvers: {
  Query: Pick<
    QueryResolvers,
    | 'garminDateRange'
    | 'garminActivities'
    | 'garminActivity'
    | 'garminTrackPoints'
    | 'garminSports'
    | 'garminDeviceCounts'
    | 'garminChartData'
    | 'garminActivityTotals'
    | 'garminActivityAddresses'
  >;
  Mutation: Pick<MutationResolvers, 'triggerGarminSync'>;
} = {
  Query: {
    garminDateRange: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGarminDateRange();
    },

    garminActivities: async (_parent, args, { dataSources }) => {
      const connection = await dataSources.otelAPI.getGarminActivities(args);
      return {
        ...connection,
        items: connection.items.map((item) => {
          const source = item as Record<string, unknown>;
          const avgHr = source['avg_heart_rate'];
          const maxHr = source['max_heart_rate'];
          const hrAvailable = source['hr_available'];

          return {
            ...item,
            hr_available:
              typeof hrAvailable === 'boolean' ? hrAvailable : avgHr != null || maxHr != null,
          };
        }),
      };
    },

    garminActivity: async (_parent, args, { dataSources }) => {
      const activity = await dataSources.otelAPI.getGarminActivity(args.activity_id);
      const source = activity as Record<string, unknown>;
      const avgHr = source['avg_heart_rate'];
      const maxHr = source['max_heart_rate'];
      const hrAvailable = source['hr_available'];

      return {
        ...activity,
        hr_available:
          typeof hrAvailable === 'boolean' ? hrAvailable : avgHr != null || maxHr != null,
      };
    },

    garminTrackPoints: async (_parent, args, { dataSources }) => {
      const { activity_id, ...params } = args;
      return dataSources.otelAPI.getGarminTrackPoints(activity_id, params);
    },

    garminSports: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGarminSports();
    },

    garminDeviceCounts: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGarminDeviceCounts();
    },

    garminChartData: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminChartData(args.activity_id);
    },

    garminActivityTotals: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivityTotals(args);
    },

    garminActivityAddresses: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivityAddresses(args.activity_id);
    },
  },
  Mutation: {
    triggerGarminSync: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.triggerGarminSync(args);
    },
  },
};
