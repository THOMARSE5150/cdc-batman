import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, getYear, getMonth, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ManualAuthForm from '@/components/google/ManualAuthForm';

const DEFAULT_TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', 
  '4:00 PM', '5:00 PM'
];

export default function AdminCalendarPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [selectedCalendarId, setSelectedCalendarId] = useState<string>('');
  const [googleCalendars, setGoogleCalendars] = useState<{id: string, summary: string}[]>([]);
  const [syncPeriod, setSyncPeriod] = useState<string>('1');

  const loadMonthAvailability = async (date: Date) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/admin/availability/dates?year=${getYear(date)}&month=${getMonth(date) + 1}`
      );
      if (!response.ok) throw new Error('Failed to load availability');
      const data = await response.json();
      
      // Convert array to record for easier lookup
      const dateMap: Record<string, string[]> = {};
      data.forEach((item: any) => {
        dateMap[item.date] = item.availableSlots;
      });
      setAvailableDates(dateMap);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load availability",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check Google Calendar connection status
  useEffect(() => {
    const checkGoogleConnection = async () => {
      try {
        const response = await fetch('/api/google/status');
        if (!response.ok) throw new Error('Failed to check Google connection');
        const data = await response.json();
        setIsGoogleConnected(data.connected);
        
        if (data.connected) {
          // Also load calendars if connected
          await loadGoogleCalendars();
        }
      } catch (error) {
        console.error('Failed to check Google connection status', error);
      }
    };
    
    checkGoogleConnection();
    loadMonthAvailability(selectedDate);
  }, []);
  
  // Load Google Calendars
  const loadGoogleCalendars = async () => {
    try {
      const response = await fetch('/api/google/calendars');
      if (!response.ok) throw new Error('Failed to load calendars');
      const data = await response.json();
      
      setGoogleCalendars(data.map((cal: any) => ({
        id: cal.id,
        summary: cal.summary
      })));
      
      // Set first calendar as default if there are any
      if (data.length > 0 && !selectedCalendarId) {
        setSelectedCalendarId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load Google calendars', error);
    }
  };
  
  // State for manual auth form visibility
  const [isManualAuth, setIsManualAuth] = useState(false);
  
  // Disconnect from Google Calendar
  const disconnectFromGoogle = async () => {
    try {
      const response = await fetch('/api/google/disconnect', {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to disconnect');
      
      setIsGoogleConnected(false);
      setGoogleCalendars([]);
      setSelectedCalendarId('');
      
      toast({
        title: "Disconnected",
        description: "Google Calendar has been disconnected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect from Google Calendar",
        variant: "destructive"
      });
    }
  };
  
  // Sync with Google Calendar
  const syncWithGoogleCalendar = async () => {
    if (!selectedCalendarId) {
      toast({
        title: "Error",
        description: "Please select a calendar",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const startDate = new Date();
      const endDate = addMonths(startDate, parseInt(syncPeriod));
      
      const response = await fetch('/api/google/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calendarId: selectedCalendarId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })
      });
      
      if (!response.ok) throw new Error('Sync failed');
      
      toast({
        title: "Success",
        description: `Synced availability for the next ${syncPeriod} month(s)`,
      });
      
      // Reload the current month's availability
      await loadMonthAvailability(selectedDate);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync with Google Calendar",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedSlots(availableDates[formattedDate] || []);
  };

  const handleSaveAvailability = async () => {
    try {
      setIsLoading(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formattedDate,
          slots: selectedSlots
        })
      });

      if (!response.ok) throw new Error('Failed to save availability');
      
      // Update local state
      setAvailableDates(prev => ({
        ...prev,
        [formattedDate]: selectedSlots
      }));

      toast({
        title: "Success",
        description: "Availability updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Availability</h1>
        <p className="text-gray-600 mt-2">Control your available appointment times</p>
      </div>
      
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-2 h-auto p-1">
          <TabsTrigger value="manual" className="py-3 text-sm sm:text-base">Manual Settings</TabsTrigger>
          <TabsTrigger value="google" className="py-3 text-sm sm:text-base">Google Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-4">
              {isLoading ? (
                <div className="h-[350px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ReactCalendar
                  onChange={(value) => {
                    if (value instanceof Date) {
                      handleDateChange(value);
                    }
                  }}
                  value={selectedDate}
                  className="rounded-lg w-full border-none"
                  tileClassName={({ date }) => {
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    const hasSlots = availableDates[formattedDate]?.length;
                    const dateStr = format(selectedDate, 'yyyy-MM-dd');
                    const isSelected = formattedDate === dateStr;
                    
                    return `
                      ${hasSlots ? 'bg-primary/10 font-medium' : ''}
                      ${isSelected ? 'bg-primary text-white rounded-full' : ''}
                    `;
                  }}
                  onActiveStartDateChange={({ activeStartDate }) => {
                    if (activeStartDate) {
                      loadMonthAvailability(activeStartDate);
                    }
                  }}
                />
              )}
            </Card>
            
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">
                Time Slots for {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              
              <div className="grid grid-cols-2 gap-2">
                {DEFAULT_TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlots.includes(slot);
                  return (
                    <Button
                      key={slot}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => {
                        setSelectedSlots(prev => 
                          prev.includes(slot) 
                            ? prev.filter(s => s !== slot)
                            : [...prev, slot]
                        );
                      }}
                      className={`w-full ${isSelected ? 'shadow-sm ring-1 ring-primary/30' : ''}`}
                      disabled={isLoading}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                onClick={handleSaveAvailability}
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Availability'}
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="google" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Google Calendar Integration</h2>
            
            {!isGoogleConnected ? (
              <div className="space-y-4">
                {isManualAuth ? (
                  <ManualAuthForm 
                    onSuccess={() => {
                      setIsGoogleConnected(true);
                      loadGoogleCalendars();
                    }}
                    onCancel={() => {
                      setIsManualAuth(false);
                    }}
                  />
                ) : (
                  <>
                    <p className="text-gray-700">
                      Connect your Google Calendar to automatically sync your availability.
                      This allows you to manage your schedule in one place.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/api/auth/google';
                        }}
                      >
                        Connect with Google
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsManualAuth(true);
                        }}
                      >
                        Connect Manually
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            // Call to directly connect with mock implementation
                            const response = await fetch('/api/google/manual-auth', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ useMock: true })
                            });
                            
                            if (response.ok) {
                              toast({
                                title: "Success",
                                description: "Connected to calendar with mock implementation",
                              });
                              setIsGoogleConnected(true);
                              loadGoogleCalendars();
                            } else {
                              throw new Error('Failed to connect');
                            }
                          } catch (error) {
                            toast({
                              title: "Error",
                              description: "Failed to connect to calendar",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        Use Mock Service
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      For development, you can use the real Google OAuth, connect manually, or use the mock service.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Connected to Google Calendar
                  </span>
                  <Button variant="outline" onClick={disconnectFromGoogle}>
                    Disconnect
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select Calendar
                      </label>
                      <Select
                        value={selectedCalendarId}
                        onValueChange={setSelectedCalendarId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a calendar" />
                        </SelectTrigger>
                        <SelectContent>
                          {googleCalendars.map(cal => (
                            <SelectItem key={cal.id} value={cal.id}>
                              {cal.summary}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Sync Period
                      </label>
                      <Select
                        value={syncPeriod}
                        onValueChange={setSyncPeriod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select months" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Month</SelectItem>
                          <SelectItem value="3">3 Months</SelectItem>
                          <SelectItem value="6">6 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={syncWithGoogleCalendar}
                    className="w-full"
                    disabled={isLoading || !selectedCalendarId}
                  >
                    {isLoading ? 'Syncing...' : 'Sync Availability'}
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        How Calendar Sync Works
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>About Calendar Sync</AlertDialogTitle>
                        <AlertDialogDescription>
                          <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Google Calendar sync imports your busy times from your calendar.</li>
                            <li>The system marks all standard business hours (9am-5pm) as available, except when you have events.</li>
                            <li>Events marked as "Free" in Google Calendar won't block availability.</li>
                            <li>You can still manually adjust availability after syncing.</li>
                            <li>Sync regularly to keep your availability up to date.</li>
                          </ul>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button>Close</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}