import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'wouter';

/**
 * A minimal progress indicator that appears at the top of the page during navigation
 * Follows 2025 design trends with subtle, fluid animations
 */
export default function NavigationProgress() {
  const [location] = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Start the animation when location changes
    const startAnimation = async () => {
      setIsNavigating(true);

      // Animate to 30% quickly to show immediate feedback
      await controls.start({ 
        scaleX: 0.3, 
        transition: { duration: 0.2, ease: "easeOut" } 
      });

      // Then progress more slowly to 90% (gives perception of loading)
      await controls.start({ 
        scaleX: 0.9, 
        transition: { duration: 0.8, ease: "easeOut" } 
      });

      // Complete the progress and fade out
      timeout = setTimeout(() => {
        controls.start({ 
          scaleX: 1, 
          opacity: 0,
          transition: { 
            scaleX: { duration: 0.2, ease: "easeOut" },
            opacity: { duration: 0.3, delay: 0.2 }
          } 
        }).then(() => {
          setIsNavigating(false);
          controls.set({ scaleX: 0, opacity: 1 });
        });
      }, 500);
    };

    startAnimation();

    return () => {
      clearTimeout(timeout);
    };
  }, [location, controls]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 safe-top"> {/* Added safe-top class */}
      <motion.div 
        className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={controls}
        style={{ 
          transformOrigin: "left",
          boxShadow: "0 0 8px rgba(78, 179, 165, 0.5)"
        }}
      />
    </div>
  );
}