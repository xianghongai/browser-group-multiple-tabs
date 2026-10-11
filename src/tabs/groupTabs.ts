export const SAVE_ALL_TABS_ACTION = 'saveAllTabs';
export const SAVE_LEFT_TABS_ACTION = 'saveLeftTabs';
export const SAVE_RIGHT_TABS_ACTION = 'saveRightTabs';

export type SaveTabsAction =
  | typeof SAVE_ALL_TABS_ACTION
  | typeof SAVE_LEFT_TABS_ACTION
  | typeof SAVE_RIGHT_TABS_ACTION;

// Mirrors tabGroups.TAB_GROUP_ID_NONE without touching the browser API.
const TAB_GROUP_ID_NONE = -1;

export type CandidateTab = {
  id?: number;
  index: number;
  groupId: number;
};

function getTabIds(tabs: readonly CandidateTab[]) {
  return tabs.map((tab) => tab.id).filter((tabId): tabId is number => typeof tabId === 'number');
}

/**
 * Selects tab IDs for a menu action from tabs already scoped by the caller.
 * The background entrypoint passes only non-pinned tabs of one window, so this
 * helper skips tabs that already belong to a group and decides relative
 * position. The current tab is included on both sides.
 */
export function getTabsToGroup(
  action: string,
  currentTabIndex: number,
  tabs: readonly CandidateTab[],
): number[] {
  const ungroupedTabs = tabs.filter((tab) => tab.groupId === TAB_GROUP_ID_NONE);

  switch (action) {
    case SAVE_ALL_TABS_ACTION:
      return getTabIds(ungroupedTabs);
    case SAVE_LEFT_TABS_ACTION:
      return getTabIds(ungroupedTabs.filter((tab) => tab.index <= currentTabIndex));
    case SAVE_RIGHT_TABS_ACTION:
      return getTabIds(ungroupedTabs.filter((tab) => tab.index >= currentTabIndex));
    default:
      return [];
  }
}
