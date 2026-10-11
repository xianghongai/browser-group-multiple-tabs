import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/auto-icons'],
  manifest: ({ browser }) => ({
    name: '__MSG_appName__',
    description: '__MSG_appDesc__',
    default_locale: 'en',
    permissions: ['tabGroups', 'contextMenus'],
    browser_specific_settings:
      browser === 'firefox'
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
