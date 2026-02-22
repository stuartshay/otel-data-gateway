import { describe, expect, it } from '@jest/globals';
import typeDefs from '../../src/schema/typeDefs.js';

describe('typeDefs', () => {
  it('exposes gateway schema SDL', () => {
    expect(typeDefs).toContain('type Query');
    expect(typeDefs).toContain('health');
    expect(typeDefs).toContain('garminActivities');
  });
});
