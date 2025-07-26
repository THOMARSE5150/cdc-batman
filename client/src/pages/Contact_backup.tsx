import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { SEO } from "@/components/ui/SEO";
import PageHeader from "@/components/ui/PageHeader";

// Create form schema based on the backend insertContactSchema
const contactFormSchema = insertContactSchema.extend({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  preferredLocation: z.string().optional(),
  message: z.string().min(1, "Please enter a message").max(2000, "Message must be less than 2000 characters"),
  privacyConsent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const enquiryTypes = [
  { value: "General", label: "General Enquiry" },
  { value: "Appointment Booking", label: "Appointment Booking" },
  { value: "Other", label: "Other" }
];

const locationOptions = [
  { value: "brunswick", label: "Brunswick - 503 Sydney Road" },
  { value: "coburg-bell", label: "Coburg - 81B Bell Street" },
  { value: "coburg-solana", label: "Coburg - Solana Psychology" },
  { value: "telehealth", label: "Telehealth Session" },
  { value: "no-preference", label: "No Preference" }
];

function ContactSuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <PageHeader
        title="Message Sent Successfully!"
        subtitle="Thank you for reaching out. I'll get back to you within 24-48 hours."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h2>
                <p className="text-gray-600">
                  Thank you for reaching out. I'll get back to you within 24-48 hours.
                </p>
                <p className="text-sm text-gray-500">
                  If this is urgent, please call me directly at{" "}
                  <a href="tel:+61390415031" className="text-primary hover:underline">
                    (03) 9041 5031
                  </a>
                </p>
              </div>
              <Button onClick={onReset} variant="outline" size="lg">
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      enquiryType: "",
      preferredLocation: "",
      message: "",
      privacyConsent: false,
    },
    mode: "onChange",
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      console.log("Submitting contact form data:", data);
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: (response) => {
      console.log("Contact form submission successful:", response);
      setFormSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    },
    onError: (error: any) => {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error",
        description:
          error?.message ||
          "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form data being submitted:", data);
    contactMutation.mutate(data);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    form.reset();
  };

  if (formSubmitted) {
    return <ContactSuccessMessage onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <SEO
        title="Contact | Celia Dunsmore Counselling"
        description="Get in touch with Celia Dunsmore for counselling services in Brunswick and Coburg. Professional mental health support with Medicare rebates available."
        keywords="contact celia dunsmore, counselling brunswick, counselling coburg, mental health support melbourne"
      />
      
      <PageHeader
        title="Contact"
        subtitle="Get in touch to start your journey towards better mental health"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Ready to take the first step? I'd love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href="tel:+61390415031" 
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      (03) 9041 5031
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:hello@celiadunsmorecounselling.com.au" 
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      hello@celiadunsmorecounselling.com.au
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Locations</p>
                    <div className="text-gray-600 space-y-1">
                      <p>Brunswick - 503 Sydney Road</p>
                      <p>Coburg - 81B Bell Street</p>
                      <p>Coburg - Solana Psychology</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-gray-600">Within 24-48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your first name" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
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
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your last name" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Enter your email address" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
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
                              <Input 
                                type="tel"
                                placeholder="Enter your phone number (optional)" 
                                {...field} 
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="enquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Enquiry *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Select enquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {enquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Select preferred location (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {locationOptions.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                  {location.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please tell me about what you're looking for, any questions you have, or how I can help you..."
                              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="privacyConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I agree to the privacy policy and consent to my information being used to respond to my enquiry. *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}