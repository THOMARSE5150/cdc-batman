import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Security Fix: OAuth URL should be fetched from backend API instead of hardcoded
// This avoids exposing client credentials in frontend code
// Use the current client implementation which fetches from /api/auth/google endpoint

interface ManualAuthFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ManualAuthForm({ onSuccess, onCancel }: ManualAuthFormProps) {
  const { toast } = useToast();
  const [authCode, setAuthCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'instructions' | 'code'>('instructions');

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
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertTitle>Special Instructions Needed</AlertTitle>
            <AlertDescription>
              Due to development environment restrictions, please follow these special steps to connect your calendar.
            </AlertDescription>
          </Alert>
          
          <ol className="list-decimal pl-5 space-y-4">
            <li className="pb-2 border-b border-gray-100">
              <p className="font-medium mb-1">Open Google authorization page</p>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(GOOGLE_AUTH_URL, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Open Google Authorization
              </Button>
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
            <label className="block text-sm font-medium">
              Authorization Code:
            </label>
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Example: 4/0AbCD..."
              className="w-full p-2 border rounded-md"
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
            >
              Back to Instructions
            </Button>
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}