import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Component that scrolls the window to the top when the route changes
 * with a smooth scrolling effect for better user experience
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Use instant scrolling for better performance
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}