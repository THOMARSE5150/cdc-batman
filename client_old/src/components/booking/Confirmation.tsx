import { useState } from "react";
import { motion } from "framer-motion";
import { format, addMinutes } from "date-fns";
import { 
  CheckCircleIcon, 
  ChevronLeftIcon, 
  ClockIcon, 
  CalendarIcon, 
  UserIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  PlusIcon,
  CalendarPlusIcon,
  CalendarDaysIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  withRebate: number | null;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasMedicare: boolean;
  medicareNumber?: string;
  notes?: string;
  // For backward compatibility with existing code
  haveReferral?: boolean;
  referralDetails?: string;
  additionalNotes?: string;
}

interface ConfirmationProps {
  service: Service;
  date: Date;
  time: string;
  personalDetails: PersonalDetails;
  onBack: () => void;
}

export default function Confirmation({ service, date, time, personalDetails, onBack }: ConfirmationProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const bookingMutation = useMutation({
    mutationFn: (bookingData: any) => {
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      setBookingComplete(true);
      toast({
        title: "Booking Confirmed",
        description: "Your appointment has been successfully booked. You'll receive a confirmation email shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleConfirmBooking = () => {
    const bookingData = {
      service,
      date,
      time,
      client: personalDetails,
    };
    
    bookingMutation.mutate(bookingData);
  };
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "EEEE, MMMM d, yyyy");
  };

  const formatShortDate = (date: Date) => {
    return format(new Date(date), "EEEE, MMMM d, yyyy");
  };
  
  // Generate calendar file URLs
  const generateCalendarUrls = () => {
    // Parse time string (e.g., "10:00 AM")
    const timeRegex = /(\d+):(\d+)\s*(AM|PM)/i;
    const match = time.match(timeRegex);
    
    if (!match) return null;
    
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    // Create start and end dates
    const startDate = new Date(date);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = addMinutes(startDate, service.duration);
    
    // Format dates for calendar links
    const formatForCalendar = (date: Date): string => {
      return format(date, "yyyyMMdd'T'HHmmss");
    };
    
    const startDateFormatted = formatForCalendar(startDate);
    const endDateFormatted = formatForCalendar(endDate);
    
    // Create event details
    const title = encodeURIComponent(`Counselling: ${service.name}`);
    const description = encodeURIComponent(`Appointment with Celia Dunsmore Counselling\nService: ${service.name}\nDuration: ${service.duration} minutes`);
    const location = encodeURIComponent("Celia Dunsmore Counselling Practice");
    
    // Generate Google Calendar link
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateFormatted}/${endDateFormatted}&details=${description}&location=${location}`;
    
    // Generate iCal data (for Apple Calendar, Outlook)
    const icalData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startDateFormatted}`,
      `DTEND:${endDateFormatted}`,
      `SUMMARY:${title.replace(/%20/g, ' ')}`,
      `DESCRIPTION:${description.replace(/%20/g, ' ')}`,
      `LOCATION:${location.replace(/%20/g, ' ')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const icalBlob = new Blob([icalData], { type: 'text/calendar;charset=utf-8' });
    const icalUrl = URL.createObjectURL(icalBlob);
    
    return {
      google: googleUrl,
      ical: icalUrl
    };
  };
  
  const calendarUrls = generateCalendarUrls();
  
  if (bookingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="py-10">
          <div className="flex flex-col items-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f0f9f0] mb-6">
              <CheckCircleIcon className="h-10 w-10 text-primary" />
            </div>
            
            <h2 className="text-3xl font-semibold text-text-primary mb-3">Booking Confirmed!</h2>
            <p className="text-text-secondary text-center max-w-2xl">
              Thank you for booking an appointment with Celia Dunsmore Counselling. You will receive a confirmation
              email with all the details.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-xl font-medium text-text-primary mb-6">Appointment Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-2 mr-4">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Date</p>
                      <p className="font-medium">{formatShortDate(date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-2 mr-4">
                      <ClockIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Time</p>
                      <p className="font-medium">{time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-2 mr-4">
                      <FileTextIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Service</p>
                      <p className="font-medium">{service.name}</p>
                    </div>
                  </div>
                </div>
                
                {calendarUrls && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-medium mb-4 flex items-center">
                      <CalendarPlusIcon className="h-5 w-5 mr-2 text-primary" />
                      Add to Calendar
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={calendarUrls.google} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Google Calendar
                      </a>
                      <a 
                        href={calendarUrls.ical} 
                        download="appointment.ics"
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        Apple/Outlook Calendar
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary-dark text-white">
                      Return to Home
                    </Button>
                  </Link>
                  
                  <Link href="/contact">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary-light hover:text-white">
                      Contact Celia
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <PhoneIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">0438 593 071</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MailIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">info@celiadunsmorecounselling.com.au</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-medium mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    To avoid cancellation fees, please provide at least 48 hours notice for any changes or cancellations to your appointment.
                  </p>
                  <p className="text-xs text-gray-500">
                    Late cancellations (less than 24 hours notice) or non-attendance will incur a fee of $90.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-3">Confirm Your Booking</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Please review your appointment details below before confirming.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="font-medium text-lg text-text-primary mb-4">Appointment Details</h3>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <FileTextIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Service</p>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.duration} minutes - ${service.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Date</p>
                  <p className="font-medium">{formatDate(date)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <ClockIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="font-medium text-lg text-text-primary mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <UserIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="font-medium">{personalDetails.firstName} {personalDetails.lastName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <MailIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{personalDetails.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-primary/10 p-2 mr-4">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-medium">{personalDetails.phone}</p>
                </div>
              </div>
            </div>
            
            {personalDetails.hasMedicare && (
              <div className="mt-4 p-4 bg-[#e6f5f3] rounded-lg">
                <p className="font-medium">Medicare Rebate</p>
                <p className="text-gray-600">You've indicated you have a Mental Health Care Plan</p>
                {personalDetails.medicareNumber && (
                  <p className="text-sm text-gray-500 mt-1">Medicare #: {personalDetails.medicareNumber}</p>
                )}
              </div>
            )}
            
            {personalDetails.notes && (
              <div className="mt-4">
                <p className="font-medium text-sm text-gray-700">Additional Notes</p>
                <p className="text-sm text-gray-600">{personalDetails.notes}</p>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8"
          >
            <h3 className="font-medium text-lg text-text-primary mb-4">Appointment Policy</h3>
            <p className="text-sm text-gray-600 mb-4">
              To avoid being charged a late notification or non-attendance cancellation fee for a scheduled appointment, 
              a minimum of 48hrs notice must be provided to either reschedule or cancel.
            </p>
            <p className="text-sm text-gray-700 font-medium">
              When you provide 24hrs or less notice (including non-attendance) for a booked appointment, 
              this will incur a Cancellation Fee of $110.
            </p>
            
            <div className="mt-8 flex flex-col gap-3">
              <Button
                onClick={handleConfirmBooking}
                disabled={bookingMutation.isPending}
                className="bg-primary hover:bg-primary-dark text-white w-full py-6"
                size="lg"
              >
                {bookingMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onBack}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
