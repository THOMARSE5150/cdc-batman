import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sendContactFormEmail } from "@/lib/emailService";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// Form schema for static bookings
const staticBookingSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  notes: z.string().optional(),
  hasMedicare: z.boolean().default(false),
  medicareNumber: z.string().optional(),
  haveReferral: z.boolean().default(false),
  referralDetails: z.string().optional(),
});

type StaticBookingFormValues = z.infer<typeof staticBookingSchema>;

// Mock available times - would be fetched from API in real implementation
const AVAILABLE_TIMES = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

// Mock services - would be fetched from API in real implementation 
const SERVICES = [
  { id: "individual", name: "Individual Counselling", description: "50-minute session focused on personal issues", price: 160 },
  { id: "couples", name: "Couples Counselling", description: "60-minute session for relationship issues", price: 180 },
  { id: "family", name: "Family Counselling", description: "75-minute session for family dynamics", price: 200 },
];

export default function StaticBookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const form = useForm<StaticBookingFormValues>({
    resolver: zodResolver(staticBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      time: "",
      service: "",
      hasMedicare: false,
      haveReferral: false,
    },
  });

  async function onSubmit(data: StaticBookingFormValues) {
    setIsSubmitting(true);
    
    try {
      // Prepare formatted data for email
      const selectedService = SERVICES.find(s => s.id === data.service);
      
      const emailContent = `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service: ${selectedService?.name || data.service}
Date: ${format(data.date, "MMMM do, yyyy")}
Time: ${data.time}
Medicare: ${data.hasMedicare ? 'Yes' + (data.medicareNumber ? ' - ' + data.medicareNumber : '') : 'No'}
Referral: ${data.haveReferral ? 'Yes' + (data.referralDetails ? ' - ' + data.referralDetails : '') : 'No'}
Notes: ${data.notes || 'None'}
      `;
      
      // Send booking email using static approach
      const success = await sendContactFormEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: `BOOKING REQUEST:\n${emailContent}`
      });
      
      if (!success) {
        throw new Error("Failed to send booking request");
      }
      
      toast({
        title: "Booking Request Sent",
        description: "Thank you for your booking request. We will confirm your appointment shortly.",
      });
      
      setSubmitted(true);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your booking request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // Function to disable past dates
  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <Card className="p-6 shadow-md bg-white rounded-lg">
      {submitted ? (
        <div className="text-center py-8">
          <div className="mx-auto mb-4 bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Booking Request Received</h3>
          <p className="mb-4 text-gray-600">Thank you for your booking request. I'll review your request and confirm your appointment by email shortly.</p>
          <Button onClick={() => setSubmitted(false)}>Make Another Booking</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Book an Appointment</h2>
            <p className="text-center text-gray-600 mb-6">Complete the form below to request an appointment.</p>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.smith@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(03) 9123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Date</FormLabel>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            field.onChange(date);
                          }}
                          disabled={disablePastDates}
                          className="border rounded-md"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AVAILABLE_TIMES.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <FormField
                  control={form.control}
                  name="hasMedicare"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Medicare Card</FormLabel>
                        <div className="text-sm text-gray-500">
                          Do you have a Medicare card?
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("hasMedicare") && (
                  <FormField
                    control={form.control}
                    name="medicareNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicare Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Medicare number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="haveReferral"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Referral</FormLabel>
                        <div className="text-sm text-gray-500">
                          Do you have a referral from a healthcare provider?
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("haveReferral") && (
                  <FormField
                    control={form.control}
                    name="referralDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referral Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your referral"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide any additional information that might be helpful"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-center">
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Appointment"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
}