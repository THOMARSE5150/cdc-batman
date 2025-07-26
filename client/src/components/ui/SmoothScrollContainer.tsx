import { useEffect, useRef } from 'react';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothScrollContainer({ 
  children, 
  className = "" 
}: SmoothScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add smooth scrolling classes
    container.classList.add('scroll-smooth', 'no-overscroll');

    // Enhance scroll performance on mobile
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        container.style.pointerEvents = 'none';
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        container.style.pointerEvents = 'auto';
      }, 150);
    };

    container.addEventListener('scroll', handleScrollStart, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`mobile-scroll ${className}`}
    >
      {children}
    </div>
  );
}