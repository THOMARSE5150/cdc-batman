import { useState } from "react";
import { 
  CheckCircle2, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  ArrowLeft,
  User,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/ui/SEO";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    preferredLocation: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ 
    email?: boolean; 
    firstName?: boolean;
    lastName?: boolean;
    message?: boolean;
    enquiryType?: boolean;
  }>({});

  const enquiryTypes = [
    { value: "Individual Counselling", label: "Individual Counselling" },
    { value: "Relationship Counselling", label: "Relationship Counselling" },
    { value: "Supervision", label: "Supervision" },
    { value: "General Enquiry", label: "General Enquiry" },
    { value: "Other", label: "Other" }
  ];
  
  const locationOptions = [
    { value: "brunswick", label: "Brunswick - 503 Sydney Road" },
    { value: "coburg-bell", label: "Coburg - 81B Bell Street" },
    { value: "coburg-solana", label: "Coburg - Solana Psychology" },
    { value: "telehealth", label: "Telehealth Session" },
    { value: "no-preference", label: "No Preference" }
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    // Email validation
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: value ? !/\S+@\S+\.\S+/.test(value) : false }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim()) newErrors.email = true;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;
    if (!formData.enquiryType) newErrors.enquiryType = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const formDataForSubmission = new FormData();
      formDataForSubmission.append('firstName', formData.firstName);
      formDataForSubmission.append('lastName', formData.lastName);
      formDataForSubmission.append('email', formData.email);
      formDataForSubmission.append('phone', formData.phone);
      formDataForSubmission.append('enquiryType', formData.enquiryType);
      formDataForSubmission.append('preferredLocation', formData.preferredLocation);
      formDataForSubmission.append('message', formData.message);

      const res = await fetch("https://formspree.io/f/myzpwbrp", {
        method: "POST",
        body: formDataForSubmission,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        console.error('Form submission error:', errorData);
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert("Something went wrong. Please refresh and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50">
        <SEO 
          title="Thank You - Message Sent Successfully"
          description="Thank you for your message. I'll respond within 24-48 hours."
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
              className="relative w-24 h-24 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="absolute inset-2 bg-white rounded-full flex items-center justify-center"
              >
                <motion.svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  />
                </motion.svg>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Message Sent!
              </h1>
              <p className="text-lg text-gray-600 mb-12 max-w-md mx-auto">
                Thank you for reaching out. I'll respond within 24-48 hours during business days.
              </p>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <Mail className="w-5 h-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Your Message Summary</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name</span>
                        <p className="text-gray-900">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <p className="text-gray-900">{formData.email}</p>
                      </div>
                      {formData.phone && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                          <p className="text-gray-900">{formData.phone}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Enquiry Type</span>
                        <p className="text-gray-900">{formData.enquiryType}</p>
                      </div>
                      {formData.preferredLocation && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Preferred Location</span>
                          <p className="text-gray-900">
                            {locationOptions.find(opt => opt.value === formData.preferredLocation)?.label || formData.preferredLocation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-500">Message</span>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap leading-relaxed">
                      {formData.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = "/"}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium flex items-center justify-center shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
                className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <SEO 
        title="Contact - Celia Dunsmore Counselling"
        description="Ready to take the first step? Get in touch to book your session or ask any questions about counselling services."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Ready to start your healing journey?
          </h1>
          <p className="text-lg sm:text-xl lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            I'm here to support you every step of the way. Get in touch to book your session or ask any questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 order-2 lg:order-1"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl h-fit">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Let's Connect</h2>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Phone</h3>
                      <p className="text-gray-600 text-sm sm:text-base">+61 438 693 071</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Available during business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base break-all">celia@celiadunsmoreecounselling.com.au</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">I'll respond within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Locations</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Brunswick & Coburg</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Plus telehealth options</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">What to Expect</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      Quick response within 24-48 hours
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      Confidential and judgment-free discussion
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      Personalized approach to your needs
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 order-1 lg:order-2"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Send me a message</h2>
                  <p className="text-sm sm:text-base text-gray-600">Fill out the form below and I'll get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                          errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      <AnimatePresence>
                        {errors.firstName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center mt-2 text-red-600 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            First name is required
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                          errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      <AnimatePresence>
                        {errors.lastName && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center mt-2 text-red-600 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Last name is required
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                          errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center mt-2 text-red-600 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Please enter a valid email address
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 text-sm sm:text-base"
                        placeholder="0400 000 000 (optional)"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        What can I help you with? *
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base ${
                          errors.enquiryType ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option value="">Choose an option</option>
                        {enquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <AnimatePresence>
                        {errors.enquiryType && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center mt-2 text-red-600 text-sm"
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Please select an enquiry type
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                        Preferred Location
                      </label>
                      <select
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 text-sm sm:text-base"
                      >
                        <option value="">Any location is fine</option>
                        {locationOptions.map((location) => (
                          <option key={location.value} value={location.value}>
                            {location.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                      Tell me more about what you're looking for *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 border-2 rounded-xl bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base ${
                        errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Share what's on your mind, any specific concerns, or questions you have. I'm here to listen and help..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center mt-2 text-red-600 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Please share what you're looking for
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold text-base sm:text-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 animate-spin" />
                        <span className="text-sm sm:text-base">Sending your message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        <span className="text-sm sm:text-base">Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 px-4 sm:px-0">
                    Your information is kept confidential and secure. I'll respond within 24-48 hours.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}