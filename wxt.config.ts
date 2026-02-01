import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'FB Reels Speed',
    description: 'Control playback speed of Facebook Reels',
    permissions: ['activeTab', 'scripting'],
    host_permissions: ['*://*.facebook.com/*'],
    icons: {
      16: '/icon.png',
      32: '/icon.png',
      48: '/icon.png',
      96: '/icon.png',
      128: '/icon.png',
    },
  },
});
