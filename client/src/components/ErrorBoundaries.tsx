import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, ChevronLeft } from '@/components/icons';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component' | 'critical';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Base Error Boundary with enhanced error handling
export class BaseErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${this.props.level || 'Component'} Error Boundary caught an error:`, error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    const errorData = {
      level: this.props.level || 'component',
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId: sessionStorage.getItem('sessionId') || 'unknown',
    };

    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    }).catch(console.error);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return this.renderDefaultError();
    }

    return this.props.children;
  }

  private renderDefaultError() {
    const { level = 'component' } = this.props;
    
    if (level === 'critical') {
      return this.renderCriticalError();
    }

    if (level === 'page') {
      return this.renderPageError();
    }

    return this.renderComponentError();
  }

  private renderCriticalError() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Critical System Error
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            We're experiencing technical difficulties with our counselling platform. 
            Your session data is safe, but please reload the page to continue.
          </p>
          <div className="space-y-3">
            <Button onClick={this.handleReload} className="w-full" size="lg">
              🔄 Reload Application
            </Button>
            <Button onClick={this.handleGoHome} variant="outline" className="w-full">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            If this persists, please contact our support team at{' '}
            <a href="mailto:hello@celiadunsmorecounselling.com.au" className="text-teal-600 hover:underline">
              hello@celiadunsmorecounselling.com.au
            </a>
          </p>
        </Card>
      </div>
    );
  }

  private renderPageError() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Page Loading Error
          </h2>
          <p className="text-gray-600 mb-6">
            This page encountered an issue while loading. Please try refreshing or return to the homepage.
          </p>
          <div className="space-y-2">
            <Button onClick={this.handleReset} className="w-full">
              Try Again
            </Button>
            <Button onClick={this.handleGoHome} variant="outline" className="w-full">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Need help? Contact{' '}
            <a href="mailto:hello@celiadunsmorecounselling.com.au" className="text-teal-600 hover:underline">
              support
            </a>
          </p>
        </Card>
      </div>
    );
  }

  private renderComponentError() {
    return (
      <Card className="p-6 border-orange-200 bg-orange-50 m-4">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-orange-800">Component Error</h3>
        </div>
        <p className="text-orange-700 mb-4">
          A component on this page encountered an error. You can try reloading the component or continue using other parts of the site.
        </p>
        <div className="flex space-x-2">
          <Button onClick={this.handleReset} size="sm" variant="outline" className="border-orange-300 text-orange-700">
            Retry Component
          </Button>
          <Button onClick={this.handleReload} size="sm" variant="outline" className="border-orange-300 text-orange-700">
            Refresh Page
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && this.state.error && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-orange-600 hover:text-orange-800">
              Error details (development only)
            </summary>
            <div className="mt-2 p-3 bg-white rounded border text-xs font-mono overflow-auto">
              <p className="font-semibold text-red-600">{this.state.error.message}</p>
              <pre className="mt-2 whitespace-pre-wrap text-gray-700">{this.state.error.stack}</pre>
              {this.state.errorInfo && (
                <pre className="mt-2 whitespace-pre-wrap text-gray-600">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          </details>
        )}
      </Card>
    );
  }
}

// Specialized Error Boundaries

// Mental Health Counselling Platform Error Boundary
export const CounsellingPlatformErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BaseErrorBoundary
      level="critical"
      onError={(error, errorInfo) => {
        // Additional logging for critical counselling platform errors
        console.error('Counselling Platform Error:', {
          error: error.message,
          stack: error.stack,
          component: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
        });
      }}
    >
      {children}
    </BaseErrorBoundary>
  );
};

// Page-level Error Boundary
export const PageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <BaseErrorBoundary level="page">{children}</BaseErrorBoundary>;
};

// Component-level Error Boundary
export const ComponentErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <BaseErrorBoundary level="component">{children}</BaseErrorBoundary>;
};

// Contact Form Error Boundary (specialized for contact forms)
export const ContactFormErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BaseErrorBoundary
      level="component"
      fallback={
        <Card className="p-8 border-red-200 bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Contact Form Error</h3>
          </div>
          <p className="text-red-700 mb-4">
            There was an error with the contact form. Please try refreshing the page or contact us directly.
          </p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()} variant="outline" className="border-red-300 text-red-700 w-full">
              Refresh Page
            </Button>
            <div className="text-sm text-red-600">
              <p>Alternative contact methods:</p>
              <p>📞 <a href="tel:+61438593071" className="hover:underline">0438 593 071</a></p>
              <p>✉️ <a href="mailto:hello@celiadunsmorecounselling.com.au" className="hover:underline">hello@celiadunsmorecounselling.com.au</a></p>
            </div>
          </div>
        </Card>
      }
    >
      {children}
    </BaseErrorBoundary>
  );
};

// Hook for functional components to handle errors
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const resetError = () => setError(null);
  const captureError = (error: Error) => setError(error);

  return { resetError, captureError };
}

// Global Error Handler Hook for window errors
export function useGlobalErrorHandler() {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      
      // Log to error service
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: 'global',
            message: event.error?.message || event.message,
            stack: event.error?.stack,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
          }),
        }).catch(console.error);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Log to error service
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: 'promise',
            message: String(event.reason),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
          }),
        }).catch(console.error);
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
}