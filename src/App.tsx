import { useState, useRef, useEffect } from 'react';
import { Play, FastForward, Info, Download, Code, Smartphone } from 'lucide-react';

// Simulation of the Facebook Reel Player
const ReelSimulator = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="relative w-[300px] h-[533px] bg-black rounded-lg overflow-hidden shadow-2xl mx-auto border-4 border-gray-800 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Fake Video Content */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        loop
        playsInline
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <Play className="w-16 h-16 text-white opacity-80" fill="currentColor" />
        </div>
      )}

      {/* THE INJECTED CONTROLLER SIMULATION */}
      <div className="absolute top-4 right-4 z-50 flex gap-1 bg-black/60 p-1 rounded-lg backdrop-blur-sm transition-opacity duration-300">
        {[0.5, 1, 1.5, 2, 3].map((speed) => (
          <button
            key={speed}
            onClick={(e) => {
              e.stopPropagation();
              setPlaybackRate(speed);
            }}
            className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
              playbackRate === speed
                ? 'text-green-400 bg-white/10'
                : 'text-white hover:bg-white/20'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>

      {/* Fake UI Elements (Like/Comment/Share) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col gap-4 items-end absolute right-4 bottom-20">
          <div className="flex flex-col items-center gap-1">
             <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
             <span className="text-white text-xs">12K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
             <span className="text-white text-xs">450</span>
          </div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
             <span className="text-white text-xs">Share</span>
          </div>
        </div>
        <div className="pr-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-400" />
            <span className="text-white font-semibold text-sm">Demo User</span>
            <span className="text-gray-300 text-xs">• Follow</span>
          </div>
          <p className="text-white text-sm line-clamp-2">
            Testing the playback speed controller extension! #demo #coding
          </p>
        </div>
      </div>
    </div>
  );
};

// Code Block Component
const CodeBlock = ({ filename, code }: { filename: string; code: string }) => (
  <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#1e1e1e] text-slate-300 my-4 shadow-lg">
    <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-700">
      <span className="text-xs font-mono text-slate-400">{filename}</span>
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-green-500/20" />
      </div>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// Content Script Code String
const CONTENT_SCRIPT_CODE = `export default defineContentScript({
  matches: ['https://www.facebook.com/*'],
  main() {
    const createSpeedController = (video) => {
      if (video.parentElement?.querySelector('.fb-speed-controller')) return;

      const container = document.createElement('div');
      // Styles for container...
      container.style.cssText = 'position:absolute;top:10px;right:10px;z-index:9999;display:flex;gap:4px;background:rgba(0,0,0,0.6);padding:4px;border-radius:8px;';

      [0.5, 1, 1.5, 2, 3].forEach(speed => {
        const btn = document.createElement('button');
        btn.innerText = speed + 'x';
        btn.onclick = (e) => {
          e.preventDefault();
          video.playbackRate = speed;
          // UI updates...
        };
        container.appendChild(btn);
      });

      video.parentElement?.appendChild(container);
    };

    // Watch for new videos
    const observer = new MutationObserver((mutations) => {
      document.querySelectorAll('video').forEach(createSpeedController);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
});`;

const WXT_CONFIG_CODE = `import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'FB Reels Speed',
    permissions: ['activeTab', 'scripting'],
    host_permissions: ['https://www.facebook.com/*'],
  },
});`;

function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FastForward className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">FB Reels Speed <span className="text-slate-500 font-normal">Extension</span></h1>
          </div>
          <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'demo' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:text-white text-slate-400'}`}
            >
              Live Demo
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:text-white text-slate-400'}`}
            >
              Source Code
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'demo' ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white tracking-tight">Control Facebook Reels Playback Speed</h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  A lightweight Chrome extension that injects native playback controls into Facebook Reels.
                  Binge-watch faster or slow down to catch details.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="bg-green-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Native Feel</h3>
                  <p className="text-sm text-slate-400">Controls blend seamlessly with Facebook's UI.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="bg-blue-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Code className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">WXT Framework</h3>
                  <p className="text-sm text-slate-400">Built using the modern WXT extension framework.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Extension
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
                  <Info className="w-4 h-4" />
                  How to Install
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50" />
              <ReelSimulator />
              <div className="text-center mt-6">
                <p className="text-sm text-slate-500 font-mono">Interactive Demo • Try the controls above 👆</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">Extension Source Code</h2>
              <p className="text-slate-400">
                The full source code has been generated in your project files. 
                Below are the key components implementing the functionality.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">#</span> Content Script
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Located in <code className="bg-slate-800 px-1 py-0.5 rounded text-xs">entrypoints/content.ts</code>. 
                  This script injects the speed controller overlay onto video elements.
                </p>
                <CodeBlock filename="entrypoints/content.ts" code={CONTENT_SCRIPT_CODE} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">#</span> WXT Configuration
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Located in <code className="bg-slate-800 px-1 py-0.5 rounded text-xs">wxt.config.ts</code>. 
                  Defines permissions and manifest settings.
                </p>
                <CodeBlock filename="wxt.config.ts" code={WXT_CONFIG_CODE} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
