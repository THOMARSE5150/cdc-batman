import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import PageHeader from "@/components/ui/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  Clock, 
  User, 
  UserRound, 
  Send, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateLocalBusinessStructuredData } from "@/lib/structuredData";
import { sendContactFormEmail } from "@/lib/emailService";

const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Try the API endpoint first (for development environment)
      if (process.env.NODE_ENV === 'development') {
        try {
          return await apiRequest("POST", "/api/contact", data);
        } catch (error) {
          console.log('API endpoint not available in static mode, using static email service');
        }
      }
      
      // Fall back to static email service for production/static deployment
      const success = await sendContactFormEmail(data);
      if (!success) {
        throw new Error('Failed to send email');
      }
      return { success: true, message: "Message sent successfully" };
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setSubmittedData(variables);
      setFormSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: ContactFormValues) {
    contactMutation.mutate(data);
  }
  
  useEffect(() => {
    const url = window.location.href;
    const structuredData = generateLocalBusinessStructuredData({
      url,
      name: "Contact Celia Dunsmore Counselling",
      description: "Contact Celia Dunsmore for counselling services in Geelong. Get in touch to schedule an appointment or inquire about services."
    });
    addStructuredData(structuredData);
  }, []);

  function resetForm() {
    setFormSubmitted(false);
    setSubmittedData(null);
  }
  
  return (
    <>
      <SEO
        title="Contact | Celia Dunsmore Counselling"
        description="Contact Celia Dunsmore for counselling services in Geelong. Get in touch to schedule an appointment or inquire about mental health support services."
        canonicalPath="/contact"
      />
      <PageHeader 
        title="Contact Me" 
        description="Get in touch with any questions or to schedule an appointment"
      />
      
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {formSubmitted && submittedData ? (
            // Confirmation screen - modern success card with animation
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <Card className="overflow-hidden border-0 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-black/50">
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-8 border-b">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-70"></div>
                  <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-70"></div>
                  
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                    className="relative flex items-center justify-center mb-6"
                  >
                    <div className="h-20 w-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold text-center mb-2">Message Sent Successfully</h2>
                    <p className="text-center text-text-secondary mb-4">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                </div>

                <div className="p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h3 className="font-medium text-lg mb-4 flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                      Message Details
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start">
                            <UserRound className="h-5 w-5 text-primary mr-2 mt-1" />
                            <div>
                              <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">First Name</p>
                              <p className="font-medium">{submittedData.firstName}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <UserRound className="h-5 w-5 text-primary mr-2 mt-1" />
                            <div>
                              <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">Last Name</p>
                              <p className="font-medium">{submittedData.lastName}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-4">
                          <MailIcon className="h-5 w-5 text-primary mr-2 mt-1" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">Email</p>
                            <p className="font-medium">{submittedData.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-4">
                          <PhoneIcon className="h-5 w-5 text-primary mr-2 mt-1" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">Phone</p>
                            <p className="font-medium">{submittedData.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <MessageSquare className="h-5 w-5 text-primary mr-2" />
                            <p className="text-xs uppercase tracking-wider text-text-secondary font-medium">Message</p>
                          </div>
                          <p className="bg-white dark:bg-gray-800 p-4 rounded-md whitespace-pre-wrap border border-gray-100 dark:border-gray-700/50">{submittedData.message}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 mb-6 border border-primary/10">
                      <h3 className="font-medium text-text-primary mb-3 flex items-center">
                        <Clock className="h-5 w-5 text-primary mr-2" />
                        What happens next?
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>Your message has been received and will be reviewed promptly</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>I'll respond to your inquiry within 24-48 hours during business days</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>If you need immediate assistance, please call (03) 9123 4567</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <Button 
                      onClick={resetForm}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Another Message
                    </Button>
                    <Link href="/">
                      <Button className="bg-primary hover:bg-primary-dark text-white w-full sm:w-auto flex items-center gap-2">
                        Return to Homepage
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ) : (
            // Contact form - modern floating label design
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="backdrop-blur-sm bg-white/90 dark:bg-black/50 border-0 shadow-lg overflow-hidden">
                <div className="p-8 relative">
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8 text-center"
                  >
                    <h2 className="text-3xl font-medium text-text-primary">Send a Message</h2>
                    <p className="text-text-secondary mt-2">I'm here to answer any questions you might have</p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
                    <div className="lg:col-span-3">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <FormLabel className="absolute z-10 left-3 top-1 text-xs text-text-secondary font-medium uppercase tracking-wider">
                                    First Name
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative mt-1">
                                      <User className="absolute left-3 top-3 h-4 w-4 text-primary/50" />
                                      <Input 
                                        placeholder="Your first name" 
                                        className="pl-10 pt-6 pb-2 bg-gray-50/80 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/20" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <FormLabel className="absolute z-10 left-3 top-1 text-xs text-text-secondary font-medium uppercase tracking-wider">
                                    Last Name
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative mt-1">
                                      <User className="absolute left-3 top-3 h-4 w-4 text-primary/50" />
                                      <Input 
                                        placeholder="Your last name" 
                                        className="pl-10 pt-6 pb-2 bg-gray-50/80 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/20" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="relative">
                                <FormLabel className="absolute z-10 left-3 top-1 text-xs text-text-secondary font-medium uppercase tracking-wider">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <div className="relative mt-1">
                                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-primary/50" />
                                    <Input 
                                      placeholder="Your email address" 
                                      className="pl-10 pt-6 pb-2 bg-gray-50/80 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/20" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="relative">
                                <FormLabel className="absolute z-10 left-3 top-1 text-xs text-text-secondary font-medium uppercase tracking-wider">
                                  Phone
                                </FormLabel>
                                <FormControl>
                                  <div className="relative mt-1">
                                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-primary/50" />
                                    <Input 
                                      placeholder="Your phone number" 
                                      className="pl-10 pt-6 pb-2 bg-gray-50/80 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/20" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem className="relative">
                                <FormLabel className="absolute z-10 left-3 top-1 text-xs text-text-secondary font-medium uppercase tracking-wider">
                                  Message
                                </FormLabel>
                                <FormControl>
                                  <div className="relative mt-1">
                                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary/50" />
                                    <Textarea 
                                      placeholder="How can I help you?" 
                                      className="pl-10 pt-6 pb-2 min-h-[150px] bg-gray-50/80 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/20" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            disabled={contactMutation.isPending}
                            className="bg-primary hover:bg-primary-dark text-white w-full py-6 rounded-lg group relative overflow-hidden shadow-md"
                          >
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary-dark group-hover:translate-x-full"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-primary group-hover:translate-x-full"></span>
                            <span className="absolute bottom-0 left-0 w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-primary-light opacity-20 rounded-full group-hover:translate-x-40"></span>
                            <span className="absolute bottom-0 right-0 w-10 h-20 transition-all duration-100 ease-out transform translate-x-8 translate-y-10 bg-primary-light opacity-20 rounded-full group-hover:translate-x-40"></span>
                            <span className="relative flex items-center justify-center">
                              {contactMutation.isPending ? (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              ) : (
                                <Send className="mr-2 h-4 w-4" />
                              )}
                              <span>{contactMutation.isPending ? "Sending..." : "Send Message"}</span>
                            </span>
                          </Button>
                        </form>
                      </Form>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 backdrop-blur-sm border border-primary/10 h-full">
                        <h3 className="text-xl font-medium text-text-primary mb-6">Contact Information</h3>
                        
                        <div className="space-y-8">
                          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-primary/5 p-5 border border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Decorative elements */}
                            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center mb-4">
                              <div className="relative flex-shrink-0">
                                <div className="h-16 w-16 rounded-full bg-[#f0f7f7] flex items-center justify-center mr-4">
                                  <MailIcon className="h-7 w-7 text-primary" />
                                </div>
                              </div>
                              <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Email</h4>
                            </div>
                            
                            <div className="ml-1">
                              <div className="rounded-xl bg-white/80 dark:bg-gray-800/30 p-3 backdrop-blur-sm border border-gray-100 dark:border-gray-800/50 mb-4">
                                <p className="font-medium">hello@celiadunsmorecounselling.com.au</p>
                              </div>
                              <a 
                                href="mailto:hello@celiadunsmorecounselling.com.au" 
                                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1 active:translate-y-0"
                              >
                                <MailIcon className="h-4 w-4" />
                                <span className="font-medium">Send an email</span>
                              </a>
                            </div>
                          </div>
                          
                          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-primary/5 p-5 border border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Decorative elements */}
                            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center mb-4">
                              <div className="relative flex-shrink-0">
                                <div className="h-16 w-16 rounded-full bg-[#f0f7f7] flex items-center justify-center mr-4">
                                  <PhoneIcon className="h-7 w-7 text-primary" />
                                </div>
                              </div>
                              <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Phone</h4>
                            </div>
                            
                            <div className="ml-1">
                              <div className="rounded-xl bg-white/80 dark:bg-gray-800/30 p-3 backdrop-blur-sm border border-gray-100 dark:border-gray-800/50 mb-4">
                                <p className="font-medium">(03) 9123 4567</p>
                              </div>
                              <a 
                                href="tel:+61391234567" 
                                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors active:translate-y-0.5"
                              >
                                <PhoneIcon className="h-4 w-4" />
                                <span className="font-medium">Call me</span>
                              </a>
                            </div>
                          </div>
                          
                          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-primary/5 p-5 border border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Decorative elements */}
                            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center mb-4">
                              <div className="relative flex-shrink-0">
                                <div className="h-16 w-16 rounded-full bg-[#f0f7f7] flex items-center justify-center mr-4">
                                  <MapPinIcon className="h-7 w-7 text-primary" />
                                </div>
                              </div>
                              <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Location</h4>
                            </div>
                            
                            <div className="ml-1">
                              <div className="rounded-xl bg-white/80 dark:bg-gray-800/30 p-3 backdrop-blur-sm border border-gray-100 dark:border-gray-800/50">
                                <address className="not-italic font-medium flex flex-col space-y-1">
                                  <span className="text-primary-dark font-semibold">Melbourne Integrated Therapies</span>
                                  <span>503 Sydney Road</span>
                                  <span>Brunswick, VIC</span>
                                  <span>Australia</span>
                                </address>
                              </div>
                            </div>
                          </div>
                          
                          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-primary/5 p-5 border border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                            {/* Decorative elements */}
                            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-center mb-4">
                              <div className="relative flex-shrink-0">
                                <div className="h-16 w-16 rounded-full bg-[#f0f7f7] flex items-center justify-center mr-4">
                                  <Clock className="h-7 w-7 text-primary" />
                                </div>
                              </div>
                              <h4 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">Practice Hours</h4>
                            </div>
                            
                            <div className="ml-1 space-y-3">
                              <div className="flex items-center rounded-xl bg-white/80 dark:bg-gray-800/30 p-3 backdrop-blur-sm border border-gray-100 dark:border-gray-800/50">
                                <div className="w-3 h-3 rounded-full bg-primary/70 mr-3 animate-pulse"></div>
                                <p className="font-medium">Mondays and Thursdays with some flexibility</p>
                              </div>
                              <div className="flex items-center rounded-xl bg-white/80 dark:bg-gray-800/30 p-3 backdrop-blur-sm border border-gray-100 dark:border-gray-800/50">
                                <div className="w-3 h-3 rounded-full bg-primary/70 mr-3 animate-pulse"></div>
                                <p className="font-medium">Hours to be discussed at first contact/enquiry</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}