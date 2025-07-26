import { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMobileAnimations } from '@/hooks/use-mobile-performance';

interface MobileOptimizedButtonProps extends ButtonProps, Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  mobileSize?: 'sm' | 'default' | 'lg' | 'icon';
  touchFriendly?: boolean;
}

/**
 * Mobile-optimized button with touch-friendly interactions and performance optimizations
 */
const MobileOptimizedButton = forwardRef<HTMLButtonElement, MobileOptimizedButtonProps>(
  ({ 
    children, 
    className, 
    size = 'default',
    mobileSize,
    touchFriendly = true,
    disabled,
    ...props 
  }, ref) => {
    const { shouldReduceAnimations, getAnimationDuration } = useMobileAnimations();

    // Use mobile-specific size on smaller screens
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const finalSize = isMobile && mobileSize ? mobileSize : size;

    // Animation variants optimized for mobile performance
    const buttonVariants = {
      initial: { scale: 1 },
      tap: { 
        scale: shouldReduceAnimations ? 0.98 : 0.95,
        transition: { duration: getAnimationDuration(100) / 1000 }
      },
      hover: { 
        scale: shouldReduceAnimations ? 1 : 1.02,
        transition: { duration: getAnimationDuration(150) / 1000 }
      }
    };

    const mobileClasses = cn(
      // Base mobile optimizations
      touchFriendly && [
        'touch-manipulation', // Optimizes touch events
        'select-none', // Prevents text selection on touch
        '-webkit-tap-highlight-color-transparent', // Removes iOS tap highlight
        'active:scale-95', // Provides touch feedback
        'transition-transform', // Smooth transform transitions
      ],
      
      // Mobile-specific sizing
      isMobile && touchFriendly && [
        'min-h-[44px]', // Minimum touch target size
        'min-w-[44px]', // Minimum touch target width
        'px-6 py-3', // Generous padding for touch
      ],
      
      // Performance optimizations
      [
        'will-change-transform', // Optimize for animations
        'backface-visibility-hidden', // Prevent flickering
      ],
      
      className
    );

    const MotionButton = motion(Button);

    return (
      <MotionButton
        ref={ref}
        size={finalSize}
        disabled={disabled}
        className={mobileClasses}
        variants={!disabled && !shouldReduceAnimations ? buttonVariants : undefined}
        initial="initial"
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        {...props}
      >
        {children}
      </MotionButton>
    );
  }
);

MobileOptimizedButton.displayName = 'MobileOptimizedButton';

export default MobileOptimizedButton;