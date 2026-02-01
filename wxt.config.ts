import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: 'FB Reels Speed',
    description: 'Control playback speed of Facebook Reels',
    permissions: ['activeTab', 'scripting'],
    host_permissions: ['https://www.facebook.com/*'],
  },
});
