import { describe, expect, it } from 'vitest';

import { getTabsToGroup } from './groupTabs';

describe('getTabsToGroup', () => {
  const candidateTabs = [
    { id: 10, index: 0, groupId: -1 },
    { id: 11, index: 1, groupId: -1 },
    { id: 12, index: 2, groupId: -1 },
    { id: 13, index: 3, groupId: -1 },
  ];

  it('returns every ungrouped tab id for saveAllTabs', () => {
    expect(getTabsToGroup('saveAllTabs', 1, candidateTabs)).toEqual([10, 11, 12, 13]);
  });

  it('returns the current tab and tabs to its left', () => {
    expect(getTabsToGroup('saveLeftTabs', 2, candidateTabs)).toEqual([10, 11, 12]);
  });

  it('returns the current tab and tabs to its right', () => {
    expect(getTabsToGroup('saveRightTabs', 1, candidateTabs)).toEqual([11, 12, 13]);
  });

  it('returns only the current tab at either edge', () => {
    expect(getTabsToGroup('saveLeftTabs', 0, candidateTabs)).toEqual([10]);
    expect(getTabsToGroup('saveRightTabs', 3, candidateTabs)).toEqual([13]);
  });

  it('skips tabs that already belong to a group', () => {
    expect(getTabsToGroup('saveAllTabs', 1, [
      { id: 21, index: 0, groupId: 5 },
      { id: 22, index: 1, groupId: -1 },
      { id: 23, index: 2, groupId: 5 },
      { id: 24, index: 3, groupId: -1 },
    ])).toEqual([22, 24]);
  });

  it('returns an empty array for unknown actions', () => {
    expect(getTabsToGroup('saveTabsToGroup', 1, candidateTabs)).toEqual([]);
  });

  it('skips candidate tabs without numeric ids', () => {
    expect(getTabsToGroup('saveAllTabs', 1, [
      { id: 31, index: 0, groupId: -1 },
      { index: 1, groupId: -1 },
      { id: 32, index: 2, groupId: -1 },
    ])).toEqual([31, 32]);
  });
});
