import { useEffect } from 'react';

export default function AccessibilityEnhancements() {
  useEffect(() => {
    // Skip links for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50';
    skipLink.setAttribute('tabindex', '0');
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhance focus management
    const enhanceFocus = () => {
      // Add focus ring styles for keyboard navigation
      const style = document.createElement('style');
      style.textContent = `
        .js-focus-visible :focus:not(.focus-visible) {
          outline: none;
        }
        
        .js-focus-visible .focus-visible {
          outline: 2px solid #4EB3A5;
          outline-offset: 2px;
        }
        
        /* Ensure interactive elements have proper focus indicators */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #4EB3A5;
          outline-offset: 2px;
        }
        
        /* Ensure sufficient contrast for text */
        .text-gray-600 {
          color: #4b5563 !important;
        }
        
        .text-gray-500 {
          color: #374151 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Add ARIA live region for dynamic content announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);

    // Announce page changes for screen readers
    const announcePageChange = () => {
      const title = document.title;
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        setTimeout(() => {
          liveRegion.textContent = `Navigated to ${title}`;
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }, 100);
      }
    };

    // Monitor for route changes
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        announcePageChange();
      }
    }).observe(document, { subtree: true, childList: true });

    enhanceFocus();

    // Cleanup
    return () => {
      const skipLinkEl = document.querySelector('a[href="#main-content"]');
      if (skipLinkEl) {
        skipLinkEl.remove();
      }
      const liveRegionEl = document.getElementById('live-region');
      if (liveRegionEl) {
        liveRegionEl.remove();
      }
    };
  }, []);

  return null;
}