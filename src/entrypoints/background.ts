import { browser, type Browser } from 'wxt/browser';
import { defineBackground } from 'wxt/utils/define-background';
import { SAVE_ALL_TABS_ACTION, SAVE_LEFT_TABS_ACTION, SAVE_RIGHT_TABS_ACTION, getTabsToGroup } from '../tabs/groupTabs';

const SAVE_TABS_MENU_ID = 'saveTabsToGroup';

// Menu item IDs are the action names so the click handler can pass them through.
const SAVE_TABS_MENU_ITEMS = [
  { id: SAVE_ALL_TABS_ACTION, title: browser.i18n.getMessage('allTabs') },
  { id: SAVE_LEFT_TABS_ACTION, title: browser.i18n.getMessage('tabsToTheLeft') },
  { id: SAVE_RIGHT_TABS_ACTION, title: browser.i18n.getMessage('tabsToTheRight') },
];

// Firefox also lets extensions extend the tab strip menu; Chrome and Edge
// reject the 'tab' context, so it is only added to the Firefox build.
const MENU_CONTEXTS = (import.meta.env.BROWSER === 'firefox' ? ['all', 'tab'] : ['all']) as [
  Browser.contextMenus.ContextType,
  ...Browser.contextMenus.ContextType[],
];

async function getCurrentTab() {
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab;
}

async function getCandidateTabs(windowId: number) {
  return browser.tabs.query({
    pinned: false,
    windowId,
  });
}

async function saveTabsToGroup(action: string, currentTab: Browser.tabs.Tab | undefined) {
  if (currentTab?.windowId == null) {
    return;
  }

  // Pinned tabs cannot live in a group, so they are never candidates.
  const candidateTabs = await getCandidateTabs(currentTab.windowId);
  const tabIds = getTabsToGroup(action, currentTab.index, candidateTabs);

  if (tabIds.length === 0) {
    return;
  }

  const groupId = await browser.tabs.group({ tabIds: tabIds as [number, ...number[]] });
  await browser.tabGroups.update(groupId, { title: browser.i18n.getMessage('defaultGroupTitle') });
}

async function createContextMenus() {
  await browser.contextMenus.removeAll();

  browser.contextMenus.create({
    id: SAVE_TABS_MENU_ID,
    title: browser.i18n.getMessage('saveTabsToGroup'),
    contexts: MENU_CONTEXTS,
  });

  for (const item of SAVE_TABS_MENU_ITEMS) {
    browser.contextMenus.create({
      ...item,
      parentId: SAVE_TABS_MENU_ID,
      contexts: MENU_CONTEXTS,
    });
  }
}

/**
 * Registers context menu items that save ungrouped, non-pinned tabs into a new
 * tab group. Browser API access stays in this entrypoint; tab selection stays
 * testable in the pure groupTabs helper.
 */
export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    void createContextMenus();
  });

  // `tab` is the right-clicked tab in Firefox's tab strip menu, otherwise the
  // active tab of the page the menu was opened on.
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    await saveTabsToGroup(String(info.menuItemId), tab ?? (await getCurrentTab()));
  });
});
