import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A subtle custom cursor effect for links following 2025 design trends
 * Only visible when hovering over interactive elements
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Add spring physics for smoother, natural movement
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only apply custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      const handleMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if hovering over a link or button
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          !!target.closest('a') || 
          !!target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive');

        setIsLink(isInteractive);
        setIsVisible(true);
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };

      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseenter', handleMouseEnter, true);
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseenter', handleMouseEnter, true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? (isLink ? 1 : 0.5) : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="w-full h-full rounded-full bg-white"
        style={{
          boxShadow: isLink ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' : 'none',
        }}
      />
    </motion.div>
  );
}