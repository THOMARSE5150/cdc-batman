import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, X } from '@/components/icons';
import { 
  ComponentErrorBoundary, 
  PageErrorBoundary, 
  ContactFormErrorBoundary,
  useErrorHandler 
} from '@/components/ErrorBoundaries';
import PageHeader from '@/components/ui/PageHeader';

// Component that throws an error when button is clicked
const ErrorComponent: React.FC<{ errorType: string }> = ({ errorType }) => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    if (errorType === 'runtime') {
      throw new Error('This is a runtime error for testing the error boundary system');
    } else if (errorType === 'network') {
      throw new Error('Network request failed - simulating API error');
    } else if (errorType === 'rendering') {
      // This will cause a rendering error
      const invalidData: any = null;
      return <div>{invalidData.nonExistentProperty.map(() => {})}</div>;
    }
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Test {errorType} Error</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the button below to trigger a {errorType} error and see how the error boundary handles it.
      </p>
      <Button 
        onClick={() => setShouldError(true)}
        variant="destructive"
        size="sm"
      >
        <X className="mr-2 h-4 w-4" />
        Trigger {errorType} Error
      </Button>
    </Card>
  );
};

// Component that uses the error handler hook
const HookErrorComponent: React.FC = () => {
  const { captureError, resetError } = useErrorHandler();
  const [hasTriggered, setHasTriggered] = useState(false);

  const triggerError = () => {
    setHasTriggered(true);
    const error = new Error('Error triggered using useErrorHandler hook');
    captureError(error);
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Error Handler Hook Test</h3>
      <p className="text-sm text-gray-600 mb-4">
        This demonstrates the useErrorHandler hook for functional components.
      </p>
      <div className="space-y-2">
        <Button onClick={triggerError} variant="destructive" size="sm">
          <X className="mr-2 h-4 w-4" />
          Trigger Hook Error
        </Button>
        {hasTriggered && (
          <Button onClick={() => { resetError(); setHasTriggered(false); }} variant="outline" size="sm">
            Reset Error
          </Button>
        )}
      </div>
    </Card>
  );
};

export default function ErrorBoundaryDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Error Boundary System Demo" />
      
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Error Boundary System Overview
            </CardTitle>
            <CardDescription>
              This page demonstrates the comprehensive error boundary system implemented for Celia Dunsmore's counselling platform.
              Each section below shows different types of error boundaries and how they handle various error scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold">Critical Level</h4>
                <p className="text-sm text-gray-600">Platform-wide errors</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold">Page Level</h4>
                <p className="text-sm text-gray-600">Individual page errors</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">Component Level</h4>
                <p className="text-sm text-gray-600">Individual component errors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Error Boundary Demo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Component-Level Error Boundaries</h2>
          <p className="text-gray-600 mb-6">
            These error boundaries catch errors in individual components without affecting the rest of the page.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ComponentErrorBoundary>
              <ErrorComponent errorType="runtime" />
            </ComponentErrorBoundary>
            
            <ComponentErrorBoundary>
              <ErrorComponent errorType="network" />
            </ComponentErrorBoundary>
            
            <ComponentErrorBoundary>
              <ErrorComponent errorType="rendering" />
            </ComponentErrorBoundary>
            
            <ComponentErrorBoundary>
              <HookErrorComponent />
            </ComponentErrorBoundary>
          </div>
        </div>

        {/* Contact Form Error Boundary Demo */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Form Error Boundary</h2>
          <p className="text-gray-600 mb-6">
            Specialized error boundary for contact forms with alternative contact methods.
          </p>
          
          <ContactFormErrorBoundary>
            <ErrorComponent errorType="runtime" />
          </ContactFormErrorBoundary>
        </div>

        {/* Error Logging Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Error Logging System</CardTitle>
            <CardDescription>
              All errors are automatically logged to the `/api/errors` endpoint with detailed information for monitoring and debugging.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Logged Error Data Includes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Error message and stack trace</li>
                <li>Component stack for React errors</li>
                <li>User agent and browser information</li>
                <li>Current URL and timestamp</li>
                <li>Session ID for tracking</li>
                <li>Error level (critical, page, component)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Return to Homepage
          </Button>
        </div>
        
      </div>
    </div>
  );
}