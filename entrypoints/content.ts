import { defineContentScript } from 'wxt/utils/define-content-script';
import '../assets/content.css';

export default defineContentScript({
  matches: ['*://*.facebook.com/*'],

  main() {
    console.log('FB Reels Speed Extension Loaded');

    const OBSERVER_CONFIG = { childList: true, subtree: true };

    const createSpeedController = (video: HTMLVideoElement) => {
      // Check if controller already exists for this video
      if (video.parentElement?.querySelector('.fb-speed-controller')) return;

      const container = document.createElement('div');
      container.className = 'fb-speed-controller';

      // Icon/Value wrapper
      const icon = document.createElement('div');
      icon.className = 'fb-speed-icon';
      icon.innerText = `${video.playbackRate}x`; // Initial value

      // Slider container
      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'fb-speed-slider-container';

      // Slider input
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.className = 'fb-speed-slider';
      slider.min = '0.5';
      slider.max = '4.0';
      slider.step = '0.25';
      slider.value = video.playbackRate.toString();

      // Events
      slider.addEventListener('input', (e) => {
        const speed = parseFloat((e.target as HTMLInputElement).value);
        video.playbackRate = speed;
        icon.innerText = `${speed}x`;
      });

      // Stop propagation to prevent pausing/muting when interacting with slider
      container.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
      });

      // Assemble UI
      sliderContainer.appendChild(slider);
      container.appendChild(icon);
      container.appendChild(sliderContainer);

      // Append to video wrapper
      const wrapper = video.parentElement;
      if (wrapper) {
        // Ensure the wrapper is positioned to hold the absolute controller
        const style = window.getComputedStyle(wrapper);
        if (style.position === 'static') {
          wrapper.style.position = 'relative';
        }
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
