import { useState, useEffect } from 'react';
import { isStaticEnvironment } from '@/lib/environment';

export function StaticModeBanner() {
  const [isStatic, setIsStatic] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    setIsStatic(isStaticEnvironment());
    
    const hasDismissed = localStorage.getItem('staticBannerDismissed');
    if (hasDismissed) {
      setDismissed(true);
    }
  }, []);
  
  if (dismissed || !isStatic) {
    return null;
  }
  
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('staticBannerDismissed', 'true');
  };
  
  return (
    <div className="bg-primary/10 text-primary-dark px-4 py-3 text-center relative">
      <p className="text-sm">
        <span className="font-semibold">Static Mode:</span> The site is running in static mode. Some features like real-time booking may be limited.
      </p>
      <button 
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-dark hover:text-primary"
        aria-label="Dismiss banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}