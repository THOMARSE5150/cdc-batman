import { motion } from "framer-motion";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { config } from "@/shared/config";

const InfoIcon = ({ className = "" }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

export default function HalaxyIntegration() {
  // Using the centralized configuration
  const halaxyBookingUrl = config.urls.halaxyBooking;
  const contactEmail = config.urls.bookingEmail;
  const isDirectBookingAvailable = config.halaxy.directBookingAvailable;
  const pendingMessage = config.halaxy.pendingMessage;

  return (
    <section className="py-8 md:py-24 bg-gradient-to-b from-white to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-medium text-center text-text-primary mb-12"
          >
            Start Your Healing Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Booking Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl p-1 shadow-xl shadow-primary/5 overflow-hidden"
            >
              <div className="relative bg-gradient-to-br from-white to-secondary/5 rounded-[22px] p-8 h-full border border-white/40">
                {/* Header with gradient accent */}
                <div className="flex items-start mb-8 relative">
                  <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-2xl mr-4">
                    <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-text-primary">Contact for a Session</h3>
                    <p className="text-text-secondary mt-1 opacity-90">
                      Simple, secure consultation booking
                    </p>
                  </div>
                </div>
                
                {/* Benefits list with animations */}
                <div className="mb-8">
                  {[
                    { icon: <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "Choose from available time slots" },
                    { icon: <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "Receive appointment reminders via SMS or email" },
                    { icon: <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "Securely manage your personal information" },
                    { icon: <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: "Easy rebate processing through Medicare" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center mb-4 last:mb-0"
                    >
                      <div className="p-1.5 bg-primary/10 rounded-full mr-3">
                        {item.icon}
                      </div>
                      <span className="text-text-primary">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Conditional notice for when online booking isn't available yet */}
                {!isDirectBookingAvailable && (
                  <div className="mb-6 p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
                    <div className="flex items-start">
                      <div className="p-1.5 bg-amber-100 rounded-full mr-3 mt-0.5">
                        <InfoIcon className="h-4 w-4 text-amber-700" />
                      </div>
                      <p className="text-sm text-amber-800">
                        {pendingMessage}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* CTA Button - Different options based on booking availability */}
                <div className="mb-3 text-center text-xs text-text-secondary/70">
                  {isDirectBookingAvailable 
                    ? "You'll be redirected to a secure booking service" 
                    : "Send an email to request an appointment"}
                </div>
                
                {/* Direct booking button (when available) */}
                {isDirectBookingAvailable ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href={halaxyBookingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center space-x-2"
                    >
                      <span className="font-medium">Book a Session</span>
                      <svg className="h-4 w-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </motion.div>
                ) : (
                  // Email booking button (interim solution)
                  (<motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href={`mailto:${contactEmail}?subject=Appointment Request&body=Hello Celia,%0D%0A%0D%0AI'm interested in booking a counselling session. Here are some details:%0D%0A%0D%0APreferred days/times:%0D%0A%0D%0AIn-person or telehealth:%0D%0A%0D%0ABrief reason for consultation (optional):%0D%0A%0D%0AThank you.`} 
                      className="group bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center space-x-2"
                    >
                      <span className="font-medium">Request Appointment</span>
                      <svg className="h-4 w-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </a>
                  </motion.div>)
                )}
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-tl-[80px] -z-10"></div>
              </div>
            </motion.div>
            
            {/* Session Information Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-1 shadow-xl shadow-primary/5 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-white to-secondary/5 rounded-[22px] p-8 h-full border border-white/40 flex flex-col">
                <h3 className="text-xl font-medium text-text-primary mb-6">Counselling Sessions</h3>
                
                {/* Session pricing with subtle shadow and hover effect */}
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm border border-white/60 p-6 mb-6 transition-all"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-primary/10 rounded-xl mr-4">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">ALL Sessions</h4>
                      <div className="mt-1 mb-2">
                        <span className="text-2xl font-medium text-text-primary">$225.57</span>
                        <span className="text-sm text-text-secondary ml-2">50 minutes</span>
                      </div>
                      <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-sm">
                        <span className="font-medium">$140.37</span> after Medicare rebate
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Location information with modern icons */}
                <div className="bg-secondary/10 backdrop-blur-sm rounded-2xl p-5 mb-6">
                  <h4 className="font-medium text-text-primary mb-3">Available At</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="p-1.5 bg-primary/10 rounded-lg mr-3">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Brunswick:</span> 503 Sydney Road
                          <span className="text-xs text-primary block">Primary location: by appointment</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-1.5 bg-primary/10 rounded-lg mr-3">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Coburg - Bell Street:</span> 81B Bell Street
                          <span className="text-xs text-primary block">By appointment</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-1.5 bg-primary/10 rounded-lg mr-3">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Coburg - Solana Psychology:</span> 420 Sydney Road
                          <span className="text-xs text-primary block">By appointment</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="p-1.5 bg-primary/10 rounded-lg mr-3">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Telehealth</span> for your convenience
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Questions button with hover animation */}
                <div className="mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href="/contact">
                      <div className="bg-white border border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 text-center">
                        <span className="font-medium">Have Questions? Contact Me</span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}