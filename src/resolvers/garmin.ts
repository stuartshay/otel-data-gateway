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
    | 'garminActivityClimbs'
    | 'garminActivityLaps'
    | 'garminActivityWeather'
    | 'garminLapsComparison'
    | 'garminSegments'
    | 'garminSegment'
    | 'garminSegmentEfforts'
    | 'garminActivityTotals'
    | 'garminActivityAddresses'
  >;
  Mutation: Pick<
    MutationResolvers,
    'triggerGarminSync' | 'createGarminSegment' | 'deleteGarminSegment'
  >;
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

    garminActivityClimbs: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivityClimbs(args.activity_id);
    },

    garminActivityLaps: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivityLaps(args.activity_id);
    },

    garminActivityWeather: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminActivityWeather(args.activity_id);
    },

    garminLapsComparison: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminLapsComparison(args);
    },

    garminSegments: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminSegments(args);
    },

    garminSegment: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getGarminSegment(args.id);
    },

    garminSegmentEfforts: async (_parent, args, { dataSources }) => {
      const { id, ...params } = args;
      return dataSources.otelAPI.getGarminSegmentEfforts(id, params);
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

    createGarminSegment: async (_parent, args, { dataSources, token }) => {
      return dataSources.otelAPI.createGarminSegment(args.input, token);
    },

    deleteGarminSegment: async (_parent, args, { dataSources, token }) => {
      return dataSources.otelAPI.deleteGarminSegment(args.id, token);
    },
  },
};
