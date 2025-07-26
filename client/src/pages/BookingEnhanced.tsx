import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/ui/SEO";

// Enhanced service data with more details
const enhancedServices = [
  {
    id: "initial-consultation",
    name: "Initial Consultation",
    description: "Comprehensive 75-minute assessment to understand your needs and develop a treatment plan",
    duration: 75,
    price: 200,
    withRebate: 113.05,
    features: ["Detailed assessment", "Treatment planning", "Goal setting", "Resource recommendations"],
    icon: "👋",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-200"
  },
  {
    id: "individual-therapy",
    name: "Individual Therapy Session",
    description: "Standard 50-minute individual counselling session",
    duration: 50,
    price: 160,
    withRebate: 90.45,
    features: ["One-on-one support", "Evidence-based therapy", "Personalized approach", "Progress tracking"],
    icon: "🧠",
    color: "from-green-50 to-green-100",
    border: "border-green-200"
  },
  {
    id: "telehealth-session",
    name: "Telehealth Session",
    description: "Online counselling session from the comfort of your home",
    duration: 50,
    price: 160,
    withRebate: 90.45,
    features: ["Secure video call", "Flexible scheduling", "No travel required", "Same quality care"],
    icon: "💻",
    color: "from-purple-50 to-purple-100",
    border: "border-purple-200"
  },
  {
    id: "extended-session",
    name: "Extended Session",
    description: "90-minute session for intensive work or complex issues",
    duration: 90,
    price: 240,
    withRebate: 135.70,
    features: ["Extended time", "Deep exploration", "Complex issue focus", "Comprehensive support"],
    icon: "⏰",
    color: "from-amber-50 to-amber-100",
    border: "border-amber-200"
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const locations = [
  { id: "brunswick", name: "Brunswick - 503 Sydney Road", available: true },
  { id: "coburg-bell", name: "Coburg - 81B Bell Street", available: true },
  { id: "coburg-solana", name: "Coburg - Solana Psychology", available: true },
  { id: "telehealth", name: "Telehealth Session", available: true }
];

interface FormData {
  service: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasMedicare: string;
  medicareNumber: string;
  notes: string;
}

export default function BookingEnhanced() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hasMedicare: "",
    medicareNumber: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const selectedService = enhancedServices.find(s => s.id === formData.service);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsCompleted(true);
      toast({
        title: "Booking Request Submitted",
        description: "I'll contact you within 24 hours to confirm your appointment.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.service !== "";
      case 2: return formData.location !== "";
      case 3: return formData.preferredDate !== "" && formData.preferredTime !== "";
      case 4: return formData.firstName !== "" && formData.lastName !== "" && 
                     formData.email !== "" && formData.phone !== "";
      default: return false;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <SEO
          title="Booking Confirmation | Celia Dunsmore Counselling"
          description="Your booking request has been submitted successfully."
          canonicalPath="/book-now"
        />
        
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-8 border-0 shadow-xl bg-white/95">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Booking Request Submitted!
              </h1>
              <p className="text-gray-600 mb-8">
                Thank you for your booking request. I'll review your details and contact you within 24 hours to confirm your appointment.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Service:</span> {selectedService?.name}</div>
                  <div><span className="font-medium">Location:</span> {locations.find(l => l.id === formData.location)?.name}</div>
                  <div><span className="font-medium">Preferred Date:</span> {formData.preferredDate}</div>
                  <div><span className="font-medium">Preferred Time:</span> {formData.preferredTime}</div>
                  <div><span className="font-medium">Contact:</span> {formData.firstName} {formData.lastName}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white"
                >
                  Return Home
                </Button>
                <Button 
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentStep(1);
                    setFormData({
                      service: "", location: "", preferredDate: "", preferredTime: "",
                      firstName: "", lastName: "", email: "", phone: "",
                      hasMedicare: "", medicareNumber: "", notes: ""
                    });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Book Another Session
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <SEO
        title="Book an Appointment | Celia Dunsmore Counselling"
        description="Schedule your counselling appointment with Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne."
        canonicalPath="/book-now"
      />
      
      <PageHeader 
        title="Book Your Appointment" 
        description="Schedule a session that works for you"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`hidden sm:block w-20 h-1 mx-4 transition-all ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Service</span>
            <span className="hidden sm:inline">Location</span>
            <span className="hidden sm:inline">Date & Time</span>
            <span>Details</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-0 shadow-xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Service</h2>
                  <div className="space-y-4">
                    {enhancedServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => updateFormData('service', service.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                          formData.service === service.id
                            ? `${service.border} bg-gradient-to-r ${service.color}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{service.icon}</span>
                              <h3 className="font-semibold text-gray-900">{service.name}</h3>
                              <Badge variant="secondary">{service.duration} min</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {service.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium text-gray-900">${service.price}</span>
                              {service.withRebate && (
                                <span className="text-green-600">
                                  ${service.withRebate} with Medicare rebate
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Location Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-0 shadow-xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Location</h2>
                  <div className="space-y-4">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        onClick={() => updateFormData('location', location.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                          formData.location === location.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{location.name}</h3>
                            <p className="text-sm text-gray-600">
                              {location.id === 'telehealth' ? 'Online session' : 'In-person session'}
                            </p>
                          </div>
                          <Badge variant={location.available ? "default" : "secondary"}>
                            {location.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Date & Time Selection */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-0 shadow-xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => updateFormData('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mobile-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => updateFormData('preferredTime', time)}
                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                              formData.preferredTime === time
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Personal Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-0 shadow-xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          placeholder="Your first name"
                          className="mobile-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          placeholder="Your last name"
                          className="mobile-input"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="your@email.com"
                          className="mobile-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="0400 000 000"
                          className="mobile-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you have Medicare?
                      </label>
                      <Select onValueChange={(value) => updateFormData('hasMedicare', value)}>
                        <SelectTrigger className="mobile-input">
                          <SelectValue placeholder="Select option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, I have Medicare</SelectItem>
                          <SelectItem value="no">No, I don't have Medicare</SelectItem>
                          <SelectItem value="unsure">I'm not sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.hasMedicare === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medicare Number (optional)
                        </label>
                        <Input
                          value={formData.medicareNumber}
                          onChange={(e) => updateFormData('medicareNumber', e.target.value)}
                          placeholder="0000 00000 0"
                          className="mobile-input"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (optional)
                      </label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                        placeholder="Any additional information you'd like to share..."
                        className="mobile-textarea"
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className="px-8"
            >
              Back
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 bg-primary hover:bg-primary-dark text-white"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="px-8 bg-primary hover:bg-primary-dark text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Booking"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}