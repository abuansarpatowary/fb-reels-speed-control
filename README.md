# FB Reels Speed Control Extension

A browser extension to control playback speed of Facebook Reels videos.

## Features

- Speed control buttons (0.5x, 1x, 1.5x, 2x, 2.5x, 3x) overlaid on Facebook Reels videos
- Clean, minimal UI that doesn't interfere with the viewing experience
- Automatic detection of new videos as you scroll

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Setup

```bash
npm install
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build extension for production
- `npm run zip` - Build and create a zip file for distribution
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues

### Installation

1. Build the extension:
   ```bash
   npm run build
   ```

2. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `.output/chrome-mv3` folder

3. Visit Facebook Reels and enjoy speed controls!

## Tech Stack

- **WXT** - Modern web extension framework
- **React** - UI library for popup
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

## Project Structure

```
├── entrypoints/
│   ├── content.ts          # Content script injected into Facebook
│   └── popup/              # Extension popup UI
├── src/                    # Additional source files
├── .output/                # Build output (gitignored)
├── wxt.config.ts           # WXT configuration
└── package.json            # Dependencies and scripts
```

## License

MIT
