import { defineContentScript } from 'wxt/utils/define-content-script';

export default defineContentScript({
  matches: ['https://www.facebook.com/*'],
  main() {
    console.log('FB Reels Speed Extension Loaded');

    const OBSERVER_CONFIG = { childList: true, subtree: true };

    const createSpeedController = (video: HTMLVideoElement) => {
      if (video.parentElement?.querySelector('.fb-speed-controller')) return;

      const container = document.createElement('div');
      container.className = 'fb-speed-controller';
      Object.assign(container.style, {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: '9999',
        display: 'flex',
        gap: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '4px',
        borderRadius: '8px',
        backdropFilter: 'blur(4px)',
      });

      const speeds = [0.5, 1, 1.5, 2, 2.5, 3];
      
      speeds.forEach(speed => {
        const btn = document.createElement('button');
        btn.innerText = `${speed}x`;
        Object.assign(btn.style, {
          background: 'transparent',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '4px',
          transition: 'background 0.2s',
        });

        btn.onmouseenter = () => btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
        btn.onmouseleave = () => btn.style.backgroundColor = 'transparent';

        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          video.playbackRate = speed;
          
          // Visual feedback
          Array.from(container.children).forEach((c) => {
            if (c instanceof HTMLElement) {
              c.style.color = 'white';
            }
          });
          btn.style.color = '#4ade80'; // Green-400
        };

        if (speed === 1) btn.style.color = '#4ade80';

        container.appendChild(btn);
      });

      // Try to append to the wrapper of the video for better positioning
      // Facebook Reels structure varies, but usually video is inside a div
      const wrapper = video.parentElement;
      if (wrapper) {
        wrapper.style.position = 'relative'; // Ensure relative positioning
        wrapper.appendChild(container);
      }
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const videos = document.querySelectorAll('video');
          videos.forEach(createSpeedController);
        }
      }
    });

    observer.observe(document.body, OBSERVER_CONFIG);
    
    // Initial run
    document.querySelectorAll('video').forEach(createSpeedController);
  },
});
