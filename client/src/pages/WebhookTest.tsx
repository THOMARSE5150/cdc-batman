import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WebhookResponse {
  status: number;
  data: any;
  timestamp: string;
}

export default function WebhookTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<WebhookResponse[]>([]);

  const testWebhook = async (endpoint: string, payload?: any) => {
    setIsLoading(true);
    const timestamp = new Date().toISOString();
    
    try {
      const response = await fetch(endpoint, {
        method: payload ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      
      const data = await response.json();
      
      setResults(prev => [{
        status: response.status,
        data,
        timestamp
      }, ...prev]);
      
    } catch (error) {
      setResults(prev => [{
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp
      }, ...prev]);
    }
    
    setIsLoading(false);
  };

  const testHealthCheck = () => {
    testWebhook('/webhooks/health');
  };

  const testBasicWebhook = () => {
    testWebhook('/webhooks/test', { 
      test: 'Manual test from admin interface',
      timestamp: new Date().toISOString()
    });
  };

  const testDeploymentSuccess = () => {
    testWebhook('/webhooks/railway', {
      type: "deployment",
      data: {
        deployment: {
          id: "test-deploy-" + Date.now(),
          status: "SUCCESS",
          url: "https://celiadunsmorecounselling.com.au",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        project: {
          id: "project-test",
          name: "Celia Dunsmore Counselling"
        },
        environment: {
          id: "env-production",
          name: "production"
        }
      }
    });
  };

  const testDeploymentFailure = () => {
    testWebhook('/webhooks/railway', {
      type: "deployment",
      data: {
        deployment: {
          id: "test-deploy-fail-" + Date.now(),
          status: "FAILED",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        project: {
          id: "project-test",
          name: "Celia Dunsmore Counselling"
        },
        environment: {
          id: "env-production",
          name: "production"
        }
      }
    });
  };

  const testVolumeAlert = () => {
    testWebhook('/webhooks/railway', {
      type: "volume_alert",
      data: {
        volume: {
          id: "vol-test-" + Date.now(),
          name: "Database",
          usagePercent: 85,
          threshold: 80
        },
        project: {
          id: "project-test",
          name: "Celia Dunsmore Counselling"
        }
      }
    });
  };

  const clearResults = () => {
    setResults([]);
  };

  const getStatusColor = (status: number) => {
    if (status === 200) return 'bg-green-100 text-green-800';
    if (status >= 400) return 'bg-red-100 text-red-800';
    if (status === 0) return 'bg-gray-100 text-gray-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Webhook Testing Interface
          </h1>
          <p className="text-gray-600">
            Test your Railway deployment monitoring webhooks
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Test Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Webhook Tests</CardTitle>
              <CardDescription>
                Test different webhook scenarios to verify the system is working
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-700">System Health</h3>
                <Button 
                  onClick={testHealthCheck}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  Test Health Check
                </Button>
                <Button 
                  onClick={testBasicWebhook}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  Test Basic Webhook
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-700">Deployment Events</h3>
                <Button 
                  onClick={testDeploymentSuccess}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Test Successful Deployment
                </Button>
                <Button 
                  onClick={testDeploymentFailure}
                  disabled={isLoading}
                  variant="destructive"
                  className="w-full"
                >
                  Test Failed Deployment
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-700">Resource Alerts</h3>
                <Button 
                  onClick={testVolumeAlert}
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Test Storage Alert
                </Button>
              </div>

              {results.length > 0 && (
                <>
                  <Separator />
                  <Button 
                    onClick={clearResults}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Results
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Webhook responses and status codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No tests run yet. Click a test button to begin.
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getStatusColor(result.status)}>
                          {result.status === 0 ? 'ERROR' : `${result.status}`}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Railway Webhook Setup</CardTitle>
            <CardDescription>
              Next steps to configure Railway webhooks in production
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Railway Dashboard:</strong> Go to your project settings and add a webhook
              </li>
              <li>
                <strong>Webhook URL:</strong> <code>https://your-domain.com/webhooks/railway</code>
              </li>
              <li>
                <strong>Events:</strong> Select "Deployment Status" and "Volume Alerts"
              </li>
              <li>
                <strong>Environment Variables:</strong> Add <code>PRACTICE_EMAIL</code> for notifications
              </li>
              <li>
                <strong>Optional:</strong> Add <code>RAILWAY_WEBHOOK_SECRET</code> for security
              </li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm mb-1">
                <strong>Note:</strong> Email notifications require SendGrid configuration.
              </p>
              <p className="text-blue-700 text-xs">
                The webhook system will log all events even if email delivery fails.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}