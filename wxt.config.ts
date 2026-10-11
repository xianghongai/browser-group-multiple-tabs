import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  manifest: ({ browser }) => ({
    name: '__MSG_appName__',
    description: '__MSG_appDesc__',
    default_locale: 'en',
    permissions: ['tabGroups', 'contextMenus'],
    icons: {
      16: '16.png',
      32: '32.png',
      48: '48.png',
      128: '128.png',
    },
    browser_specific_settings: browser === 'firefox'
      ? {
        gecko: {
          // tabs.group() landed in Firefox 138, the tabGroups namespace in 139.
          strict_min_version: '139.0',
          data_collection_permissions: {
            required: ['none'],
          },
        },
      }
      : undefined,
  }),
});
