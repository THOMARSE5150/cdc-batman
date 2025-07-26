import { useState, useCallback, useRef, useEffect } from 'react';

interface MicroInteractionState {
  isHovered: boolean;
  isActive: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  ripplePosition: { x: number; y: number } | null;
}

interface MicroInteractionHandlers {
  onHover: () => void;
  onLeave: () => void;
  onActive: () => void;
  onInactive: () => void;
  onLoading: () => void;
  onSuccess: () => void;
  onError: () => void;
  onRipple: (event: React.MouseEvent) => void;
  reset: () => void;
}

interface UseMicroInteractionsOptions {
  successDuration?: number;
  errorDuration?: number;
  loadingTimeout?: number;
  enableRipple?: boolean;
  enableHaptics?: boolean;
}

export function useMicroInteractions(options: UseMicroInteractionsOptions = {}): [MicroInteractionState, MicroInteractionHandlers] {
  const {
    successDuration = 2000,
    errorDuration = 3000,
    loadingTimeout = 10000,
    enableRipple = true,
    enableHaptics = true
  } = options;

  const [state, setState] = useState<MicroInteractionState>({
    isHovered: false,
    isActive: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    ripplePosition: null
  });

  const timeoutRef = useRef<NodeJS.Timeout>();
  const rippleTimeoutRef = useRef<NodeJS.Timeout>();

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (rippleTimeoutRef.current) {
      clearTimeout(rippleTimeoutRef.current);
    }
  }, []);

  const triggerHapticFeedback = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!enableHaptics || !navigator.vibrate) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30, 10, 30]
    };
    
    navigator.vibrate(patterns[intensity]);
  }, [enableHaptics]);

  const handlers: MicroInteractionHandlers = {
    onHover: useCallback(() => {
      setState(prev => ({ ...prev, isHovered: true }));
    }, []),

    onLeave: useCallback(() => {
      setState(prev => ({ 
        ...prev, 
        isHovered: false, 
        isActive: false,
        ripplePosition: null 
      }));
    }, []),

    onActive: useCallback(() => {
      setState(prev => ({ ...prev, isActive: true }));
      triggerHapticFeedback('light');
    }, [triggerHapticFeedback]),

    onInactive: useCallback(() => {
      setState(prev => ({ ...prev, isActive: false }));
    }, []),

    onLoading: useCallback(() => {
      clearTimeouts();
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        isSuccess: false, 
        isError: false 
      }));
      
      // Auto-clear loading after timeout
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, isLoading: false }));
      }, loadingTimeout);
    }, [clearTimeouts, loadingTimeout]),

    onSuccess: useCallback(() => {
      clearTimeouts();
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSuccess: true, 
        isError: false 
      }));
      triggerHapticFeedback('medium');
      
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, isSuccess: false }));
      }, successDuration);
    }, [clearTimeouts, successDuration, triggerHapticFeedback]),

    onError: useCallback(() => {
      clearTimeouts();
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSuccess: false, 
        isError: true 
      }));
      triggerHapticFeedback('heavy');
      
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, isError: false }));
      }, errorDuration);
    }, [clearTimeouts, errorDuration, triggerHapticFeedback]),

    onRipple: useCallback((event: React.MouseEvent) => {
      if (!enableRipple) return;
      
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      setState(prev => ({ 
        ...prev, 
        ripplePosition: { x, y } 
      }));
      
      // Clear ripple after animation
      rippleTimeoutRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, ripplePosition: null }));
      }, 600);
    }, [enableRipple]),

    reset: useCallback(() => {
      clearTimeouts();
      setState({
        isHovered: false,
        isActive: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
        ripplePosition: null
      });
    }, [clearTimeouts])
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return [state, handlers];
}

// Utility function to generate microinteraction class names
export function getMicroInteractionClasses(
  state: MicroInteractionState,
  baseClasses: string = '',
  options: {
    hover?: string;
    active?: string;
    loading?: string;
    success?: string;
    error?: string;
  } = {}
): string {
  const classes = [baseClasses];
  
  if (state.isHovered && options.hover) {
    classes.push(options.hover);
  }
  
  if (state.isActive && options.active) {
    classes.push(options.active);
  }
  
  if (state.isLoading && options.loading) {
    classes.push(options.loading);
  }
  
  if (state.isSuccess && options.success) {
    classes.push(options.success);
  }
  
  if (state.isError && options.error) {
    classes.push(options.error);
  }
  
  return classes.filter(Boolean).join(' ');
}

// Utility to apply microinteraction props to elements
export function getMicroInteractionProps(handlers: MicroInteractionHandlers) {
  return {
    onMouseEnter: handlers.onHover,
    onMouseLeave: handlers.onLeave,
    onMouseDown: handlers.onActive,
    onMouseUp: handlers.onInactive,
    onClick: (e: React.MouseEvent) => {
      handlers.onRipple(e);
    }
  };
}