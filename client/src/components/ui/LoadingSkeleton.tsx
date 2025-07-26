interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  width?: string;
  height?: string;
  variant?: 'text' | 'card' | 'circle' | 'button';
}

export default function LoadingSkeleton({ 
  className = "", 
  lines = 1, 
  width = "100%", 
  height = "1rem",
  variant = "text"
}: LoadingSkeletonProps) {
  const getSkeletonClasses = () => {
    const baseClasses = "loading-skeleton animate-pulse bg-gray-200 rounded";
    
    switch (variant) {
      case 'card':
        return `${baseClasses} p-6 h-32`;
      case 'circle':
        return `${baseClasses} rounded-full w-12 h-12`;
      case 'button':
        return `${baseClasses} h-10 px-6 py-2`;
      default:
        return `${baseClasses}`;
    }
  };

  if (lines === 1) {
    return (
      <div 
        className={`${getSkeletonClasses()} ${className}`}
        style={{ width, height }}
        aria-label="Loading content"
      />
    );
  }

  return (
    <div className={`space-y-2 ${className}`} aria-label="Loading content">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={getSkeletonClasses()}
          style={{ 
            width: index === lines - 1 ? '75%' : width, 
            height 
          }}
        />
      ))}
    </div>
  );
}