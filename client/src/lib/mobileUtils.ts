/**
 * Mobile optimization utility functions
 * Used to enhance the mobile user experience, particularly for iOS and Android
 */

/**
 * Determines if the current device is an iOS device
 * @returns {boolean} True if the device is running iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Determines if the current device is an Android device
 * @returns {boolean} True if the device is running Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android/.test(navigator.userAgent);
}

/**
 * Determines if the current device is a mobile device
 * @returns {boolean} True if the device is a mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return isIOS() || isAndroid() || /Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Returns CSS classes optimized for iOS touch interactions
 * @returns {string} CSS classes for iOS optimization
 */
export function getIOSTouchClasses(): string {
  return 'cursor-pointer -webkit-tap-highlight-color-transparent active:opacity-70 touch-manipulation';
}

/**
 * Delays execution of a function until device is idle
 * Useful for non-critical operations on mobile
 * @param fn Function to execute
 * @param timeout Maximum timeout in milliseconds
 */
export function executeWhenIdle(fn: () => void, timeout = 2000): void {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => fn(), { timeout });
  } else {
    setTimeout(fn, 100); // Fallback for browsers without requestIdleCallback
  }
}

/**
 * Adds a CSS variable with vh that doesn't change when the mobile 
 * URL bar appears/disappears (iOS Safari issue)
 */
export function setTrueViewportHeight(): void {
  if (typeof window === 'undefined') return;
  
  // Function to update the CSS variable
  const updateViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Set initial value
  updateViewportHeight();
  
  // Update on resize
  window.addEventListener('resize', updateViewportHeight);
}

/**
 * Fixes iOS momentum scrolling in overflow areas
 * @param element The element to apply the fix to
 */
export function applyIOSScrollFix(element: HTMLElement): void {
  if (!isIOS()) return;
  
  // Prevent the whole page from scrolling when scrolling inside the element
  element.addEventListener('touchmove', (e) => {
    if (element.scrollHeight > element.clientHeight) {
      e.stopPropagation();
    }
  }, { passive: false });
}