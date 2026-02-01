import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'FB Reels Speed',
    description: 'Control playback speed of Facebook Reels',
    permissions: ['activeTab', 'scripting', 'storage'],
    host_permissions: ['*://*.facebook.com/*'],
    icons: {
      "16": "./icon16.png",
      "32": "./icon32.png",
      "48": "./icon48.png",
      "128": "./icon128.png"
    },

  },
});
