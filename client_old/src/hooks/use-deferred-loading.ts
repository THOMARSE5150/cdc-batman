import { useState, useEffect } from 'react';

/**
 * Hook to defer loading of non-critical resources until after page load
 * @param {number} delay - Delay in milliseconds before loading
 * @returns {boolean} - Whether to load the deferred content
 */
export function useDeferredLoading(delay: number = 1000) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise use setTimeout
    let timeoutId: number;
    
    if ('requestIdleCallback' in window) {
      timeoutId = window.requestIdleCallback(() => setShouldLoad(true), { timeout: delay });
    } else {
      timeoutId = setTimeout(() => setShouldLoad(true), delay) as unknown as number;
    }

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(timeoutId);
      } else {
        clearTimeout(timeoutId as unknown as NodeJS.Timeout);
      }
    };
  }, [delay]);

  return shouldLoad;
}

// TypeScript definitions for requestIdleCallback and cancelIdleCallback
declare global {
  interface Window {
    requestIdleCallback: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback: (handle: number) => void;
  }
}