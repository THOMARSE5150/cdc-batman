import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6m16 0l-4-4v6h6m-20 6v6h6m16 0l-4-4v6h6"/>
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-8h-4M4 12H0m15.66-7.66l-2.83 2.83m0 9.66l2.83 2.83M8.34 4.34l2.83 2.83m0 9.66L8.34 19.66"/>
  </svg>
);

// Fallback URL in case server fetch completely fails after all retries
const FALLBACK_GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&prompt=consent&response_type=code&client_id=1083748795834-9sdqkgt413it0nosnoart9ij551s1nrg.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fworkspace.thomarse5150.repl.co%2Fapi%2Fgoogle%2Foauth%2Fcallback';

interface ManualAuthFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Logger function for OAuth errors
const logError = (message: string, error?: any) => {
  console.error(`[OAuth Error] ${message}`, error);
  // Future integration point for more robust logging (e.g., Sentry)
};

export default function ManualAuthForm({ onSuccess, onCancel }: ManualAuthFormProps) {
  const { toast } = useToast();
  const [authCode, setAuthCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'instructions' | 'code'>('instructions');
  const [googleAuthUrl, setGoogleAuthUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [urlFetchFailed, setUrlFetchFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Function to fetch OAuth URL with exponential backoff
  const fetchOAuthUrl = async (attempt = 1): Promise<string | null> => {
    // Maximum 3 retry attempts (4 total attempts including initial try)
    const MAX_RETRIES = 3;
    // Calculate exponential backoff delay: 1s, 2s, 4s
    const delay = attempt <= 1 ? 0 : Math.pow(2, attempt - 1) * 1000;
    
    if (attempt > 1) {
      // Wait for the calculated delay before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    try {
      const response = await fetch('/api/auth/google?manual=true');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch authorization URL');
      }
      
      const data = await response.json();
      return data.authUrl;
    } catch (error) {
      // Log the error for monitoring
      logError(`Fetch OAuth URL attempt ${attempt} failed`, error);
      
      // If we haven't exhausted retries, try again
      if (attempt < MAX_RETRIES) {
        return fetchOAuthUrl(attempt + 1);
      }
      
      // All retries failed
      return null;
    }
  };

  // Effect to fetch the OAuth URL when component mounts
  useEffect(() => {
    const getOAuthUrl = async () => {
      setIsLoadingUrl(true);
      setUrlFetchFailed(false);
      
      try {
        const url = await fetchOAuthUrl();
        if (url) {
          setGoogleAuthUrl(url);
          setUrlFetchFailed(false);
        } else {
          setUrlFetchFailed(true);
          // Fall back to the hardcoded URL after all retries fail
          setGoogleAuthUrl(FALLBACK_GOOGLE_AUTH_URL);
          logError('All OAuth URL fetch attempts failed, using fallback URL');
        }
      } catch (error) {
        setUrlFetchFailed(true);
        // Fall back to the hardcoded URL
        setGoogleAuthUrl(FALLBACK_GOOGLE_AUTH_URL);
        logError('Unexpected error fetching OAuth URL', error);
      } finally {
        setIsLoadingUrl(false);
      }
    };
    
    getOAuthUrl();
  }, [retryCount]); // Re-run when retryCount changes (for manual retry)

  // Handle manual retry when URL fetch fails
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!authCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter the authorization code",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/google/manual-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode.trim() })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate');
      }

      toast({
        title: "Success",
        description: "Google Calendar connected successfully",
      });

      onSuccess();
    } catch (error) {
      logError('Authentication submission failed', error);
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Invalid authorization code",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Connect to Google Calendar</h3>
      
      {step === 'instructions' ? (
        <div className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <AlertTitle>Special Instructions Needed</AlertTitle>
            <AlertDescription>
              Due to development environment restrictions, please follow these special steps to connect your calendar.
            </AlertDescription>
          </Alert>
          
          {urlFetchFailed && (
            <Alert variant="destructive" className="mb-4">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <AlertTitle>Connection Issue</AlertTitle>
              <AlertDescription>
                There was a problem connecting to Google authorization services. 
                Using fallback connection method.
              </AlertDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 flex items-center gap-2"
                onClick={handleRetry}
                aria-label="Retry connection to Google authorization services"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </Button>
            </Alert>
          )}
          
          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-2 border-b border-gray-100">
              <p className="font-medium mb-1">Open Google authorization page</p>
              {isLoadingUrl ? (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  disabled
                  aria-busy="true"
                  aria-label="Loading Google authorization page, please wait"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => googleAuthUrl && window.open(googleAuthUrl, '_blank')}
                  disabled={!googleAuthUrl}
                  aria-label="Open Google authorization page in a new tab"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Open Google Authorization
                </Button>
              )}
              <p className="text-sm text-gray-500 mt-1">
                (You'll see a "Google hasn't verified this app" warning - this is normal in development)
              </p>
            </li>
            
            <li className="pb-2 border-b border-gray-100">
              <p className="font-medium mb-1">Click "Continue" and sign in to your Google account</p>
              <p className="text-sm text-gray-500">
                Select your Google account and allow the requested permissions
              </p>
            </li>
            
            <li className="pb-2 border-b border-gray-100">
              <p className="font-medium mb-1">Ignore the redirect error</p>
              <p className="text-sm text-gray-500">
                You'll see "Safari Can't Find the Server" or similar error - this is expected
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded text-sm font-mono break-all">
                <p className="text-xs text-gray-500 mb-1">The URL will look something like:</p>
                https://workspace.thomarse5150.repl.co/api/google/oauth/callback?code=4/0Ab....
              </div>
            </li>
            
            <li>
              <p className="font-medium mb-1">Copy the authorization code</p>
              <p className="text-sm text-gray-500">
                Look at the URL in your address bar. Find the "code=" parameter and copy everything after it until
                any "&" character or the end of the URL.
              </p>
            </li>
          </ol>
          
          <div className="text-center">
            <Button 
              onClick={() => setStep('code')}
              className="mt-2"
              disabled={isLoadingUrl || !googleAuthUrl}
              aria-label="Continue to next step after copying authorization code"
            >
              I've copied the code - Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">
            Paste the authorization code from the URL:
          </p>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="auth-code">
              Authorization Code:
            </label>
            <input
              id="auth-code"
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Example: 4/0AbCD..."
              className="w-full p-2 border rounded-md"
              aria-required="true"
              aria-invalid={!authCode.trim()}
            />
            <p className="text-xs text-gray-500">
              The code starts with "4/0Ab" or similar and is part of the URL after "code="
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !authCode.trim()}
              className="w-full sm:w-auto"
              aria-busy={isSubmitting ? "true" : "false"}
              aria-label={isSubmitting ? "Connecting to Google Calendar" : "Connect Google Calendar with authorization code"}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Calendar'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setStep('instructions')}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
              aria-label="Return to instructions page"
            >
              Back to Instructions
            </Button>
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
              aria-label="Cancel connecting to Google Calendar"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}