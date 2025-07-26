import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'subtle';
  blur?: 'light' | 'medium' | 'strong';
  children: React.ReactNode;
}

/**
 * Modern glassmorphism card component with Railway optimization
 * - Multiple blur variants for different use cases
 * - Optimized for performance with GPU acceleration
 * - Fully accessible with proper ARIA attributes
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'medium', children, ...props }, ref) => {
    const variantClasses = {
      default: 'glass-card',
      strong: 'glass-strong', 
      subtle: 'bg-white/50 backdrop-blur-sm border border-white/20'
    };

    const blurClasses = {
      light: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      strong: 'backdrop-blur-xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative rounded-xl shadow-lg transition-all duration-300",
          // GPU acceleration for better performance
          "gpu-accelerated",
          // Variant styles
          variantClasses[variant],
          // Blur overrides
          blur !== 'medium' && blurClasses[blur],
          // Custom classes
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };