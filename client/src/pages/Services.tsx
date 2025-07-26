import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import SimpleBreadcrumb from "@/components/ui/SimpleBreadcrumb";
import { services, therapeuticApproaches } from "@/lib/data";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateServiceStructuredData } from "@/lib/structuredData";

import AASWBadge from "@/components/ui/AASWBadge";

export default function Services() {
  const [location] = useLocation();
  
  // Add SEO structured data
  useEffect(() => {
    const url = window.location.href;
    const structuredData = generateServiceStructuredData({ 
      name: "Celia Dunsmore Counselling Services",
      description: "Professional counselling services for anxiety, depression, trauma, and other mental health concerns.",
      provider: "Celia Dunsmore",
      areaServed: ["Melbourne", "Carlton", "Fitzroy", "Brunswick", "Coburg", "Preston", "Thornbury"]
    });
    addStructuredData(structuredData);
  }, []);

  // Scroll to the specified service card when the component mounts or location changes
  useEffect(() => {
    // Check if location has a hash
    if (location.includes('#')) {
      const id = location.split('#')[1];
      console.log("Looking for element with ID:", id);
      
      // Add a slight delay to ensure the page is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        
        if (element) {
          // Scroll to the element with smooth behavior
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          console.log("Scrolled to element:", id);
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <SEO
        title="Professional Counselling Services | Accredited Mental Health Social Worker Melbourne"
        description="Discover how Celia Dunsmore, Accredited Mental Health Social Worker, can help with anxiety, depression, trauma, and other mental health concerns in Melbourne's inner north and via Telehealth."
        canonicalPath="/services"
      />
      <PageHeader 
        title="How I Can Help" 
        description="Discover how I can support you to wellness, treating the following difficulties through counselling"
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <SimpleBreadcrumb />
        
        {/* Service cards with modern 2025 styling - adjusted for even distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            // Special handling for the last item if we have 10 services (center it)
            const isLastItem = index === services.length - 1 && services.length % 3 === 1;
            const specialGridClass = isLastItem ? "md:col-span-2 lg:col-span-3 max-w-md mx-auto" : "";
            // Background gradient colors for each service (more vibrant)
            const gradientClasses: Record<string, string> = {
              "anxiety": "from-blue-50 via-blue-50 to-white border-blue-200",
              "depression": "from-green-50 via-green-50 to-white border-green-200",
              "trauma": "from-amber-50 via-amber-50 to-white border-amber-200",
              "emotion-regulation": "from-purple-50 via-purple-50 to-white border-purple-200",
              "interpersonal": "from-teal-50 via-teal-50 to-white border-teal-200",
              "self-esteem": "from-rose-50 via-rose-50 to-white border-rose-200",
              "eating": "from-indigo-50 via-indigo-50 to-white border-indigo-200",
              "perfectionism": "from-fuchsia-50 via-fuchsia-50 to-white border-fuchsia-200",
              "grief": "from-stone-50 via-stone-50 to-white border-stone-200",
              "life-transitions": "from-cyan-50 via-cyan-50 to-white border-cyan-200"
            };
            
            // Text colors for each service to match the theme
            const textColors: Record<string, string> = {
              "anxiety": "text-blue-600",
              "depression": "text-green-600",
              "trauma": "text-amber-600",
              "emotion-regulation": "text-purple-600",
              "interpersonal": "text-teal-600",
              "self-esteem": "text-rose-600",
              "eating": "text-indigo-600",
              "perfectionism": "text-fuchsia-600",
              "grief": "text-stone-600",
              "life-transitions": "text-cyan-600"
            };
            
            // Define icons for each service
            const serviceIcons: Record<string, JSX.Element> = {
              "anxiety": <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
              "depression": <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
              "trauma": <svg className="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
              "emotion-regulation": <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              "interpersonal": <svg className="h-8 w-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>,
              "self-esteem": <svg className="h-8 w-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
              "eating": <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>,
              "perfectionism": <svg className="h-8 w-8 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              "grief": <svg className="h-8 w-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
              "life-transitions": <svg className="h-8 w-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            };
            
            return (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
                className={`bg-gradient-to-br ${gradientClasses[service.id] || 'from-gray-50 to-white border-gray-200'} 
                  rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border
                  hover:translate-y-[-4px] group relative overflow-hidden ${specialGridClass}`}
              >
                {/* Background decorative element */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full 
                  bg-white/50 opacity-40 transition-all duration-700 group-hover:scale-150"></div>
                
                {/* Icon with modern styling */}
                <div className="relative z-10">
                  <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 
                    shadow-md group-hover:shadow-lg transition-all duration-300 transform 
                    group-hover:rotate-6">
                    {serviceIcons[service.id] || <svg className="h-9 w-9 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>}
                  </div>
                  
                  <h3 className={`text-2xl font-bold text-center mb-4 ${textColors[service.id] || 'text-text-primary'}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary text-center mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* List of benefits if available */}
                  {service.points && service.points.length > 0 && (
                    <ul className="text-left space-y-2 mt-4">
                      {service.points.map((point, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + (idx * 0.1) }}
                          className="flex items-start"
                        >
                          <svg className="h-5 w-5 ${textColors[service.id] || 'text-primary'} mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span className="text-text-secondary text-sm">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Therapeutic Approaches Section - Modern 2025 Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-24 relative"
        >
          {/* Background decorative elements */}
          <div className="absolute -z-10 left-1/4 top-20 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -z-10 right-1/4 bottom-20 w-60 h-60 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2 bg-white/40 backdrop-blur-sm text-primary border border-primary/20 rounded-full text-sm font-medium shadow-sm mb-4"
            >
              Evidence-Based Methods
            </motion.div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              My Counselling Approach
            </h2>
            
            <p className="text-text-secondary max-w-2xl mx-auto">
              I draw on and integrate a range of evidence-based therapeutic approaches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {therapeuticApproaches.map((approach, index) => {
              // Generate color schemes for each approach
              const colorSchemes = [
                {
                  gradient: "from-[#e0f2fe] to-white",
                  border: "border-blue-200",
                  iconBg: "bg-blue-50",
                  iconColor: "text-blue-500",
                  hoverShadow: "group-hover:shadow-blue-100"
                },
                {
                  gradient: "from-[#dcfce7] to-white",
                  border: "border-green-200",
                  iconBg: "bg-green-50",
                  iconColor: "text-green-500",
                  hoverShadow: "group-hover:shadow-green-100"
                },
                {
                  gradient: "from-[#f3e8ff] to-white",
                  border: "border-purple-200",
                  iconBg: "bg-purple-50",
                  iconColor: "text-purple-500",
                  hoverShadow: "group-hover:shadow-purple-100"
                },
                {
                  gradient: "from-[#fff7ed] to-white",
                  border: "border-orange-200",
                  iconBg: "bg-orange-50",
                  iconColor: "text-orange-500",
                  hoverShadow: "group-hover:shadow-orange-100"
                },
                {
                  gradient: "from-[#ecfeff] to-white",
                  border: "border-teal-200",
                  iconBg: "bg-teal-50",
                  iconColor: "text-teal-500",
                  hoverShadow: "group-hover:shadow-teal-100"
                }
              ];
              
              const scheme = colorSchemes[index % colorSchemes.length];
              
              // Icons for each therapeutic approach
              const icons = [
                <svg className={`h-6 w-6 ${scheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
                <svg className={`h-6 w-6 ${scheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
                <svg className={`h-6 w-6 ${scheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
                <svg className={`h-6 w-6 ${scheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
                <svg className={`h-6 w-6 ${scheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              ];
              
              return (
                <motion.div
                  key={approach.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`bg-gradient-to-b ${scheme.gradient} rounded-3xl p-8 
                    shadow-md hover:shadow-xl transition-all duration-500 border ${scheme.border}
                    hover:translate-y-[-4px] group relative overflow-hidden`}
                >
                  {/* Decorative background element */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full 
                    bg-white/50 opacity-40 transition-all duration-700 
                    group-hover:scale-150"></div>
                  
                  <div className="relative z-10">
                    <div className={`${scheme.iconBg} w-16 h-16 rounded-2xl 
                      flex items-center justify-center mx-auto mb-5 shadow-sm
                      group-hover:shadow-md ${scheme.hoverShadow} transition-all duration-300 
                      transform group-hover:rotate-[-5deg]`}>
                      {icons[index % icons.length]}
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-3 text-center">
                      {approach.name}
                    </h3>
                    
                    <p className="text-text-secondary text-center leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Diversity Approach Section - Modern 2025 Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-24 relative"
        >
          {/* Background decorative elements */}
          <div className="absolute -z-10 -left-10 top-40 w-64 h-64 bg-gradient-to-tr from-rose-50 to-transparent rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -z-10 -right-10 bottom-20 w-80 h-80 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-70"></div>
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2 bg-white/40 backdrop-blur-sm text-rose-600 border border-rose-300/40 rounded-full text-sm font-medium shadow-sm mb-4"
            >
              Inclusive Practice
            </motion.div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              My Approach to Diversity
            </h2>
            
            <p className="text-text-secondary max-w-2xl mx-auto">
              I am committed to creating a safe, respectful, and affirming space for clients aged 16 and up from all backgrounds, identities, and experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Cultural Sensitivity Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-500 border border-blue-100 hover:border-blue-200
                group relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70"></div>
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shadow-sm
                    group-hover:shadow-md group-hover:shadow-blue-100 transform group-hover:rotate-[-5deg] transition-all duration-300">
                    <svg className="h-7 w-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-600">Cultural Sensitivity</h3>
                </div>
                
                <p className="text-text-secondary leading-relaxed pl-2">
                  I recognise the important role that cultural background plays in shaping our experiences and perspectives. I strive to understand each person's cultural identity and how it influences their approach to the counselling process, honouring our differences.
                </p>
              </div>
            </motion.div>
            
            {/* LGBTQIA+ Affirming & Informed Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-500 border border-rose-100 hover:border-rose-200
                group relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-70"></div>
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-rose-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shadow-sm
                    group-hover:shadow-md group-hover:shadow-rose-100 transform group-hover:rotate-[-5deg] transition-all duration-300">
                    <svg className="h-7 w-7 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-rose-600">LGBTQIA+ Affirming & Informed</h3>
                </div>
                
                <p className="text-text-secondary leading-relaxed pl-2">
                  I provide affirming and knowledgeable support for individuals of all gender identities and sexual orientations. 
                  I understand the unique challenges that may arise and create a safe space where you can explore these freely.
                </p>
              </div>
            </motion.div>
            
            {/* Neurodivergent Affirming & Informed Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-500 border border-purple-100 hover:border-purple-200
                group relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-70"></div>
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-purple-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shadow-sm
                    group-hover:shadow-md group-hover:shadow-purple-100 transform group-hover:rotate-[-5deg] transition-all duration-300">
                    <svg className="h-7 w-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-purple-600">Neurodivergent Affirming & Informed</h3>
                </div>
                
                <p className="text-text-secondary leading-relaxed pl-2">
                  I recognise and value neurodiversity, adapting my approach to accommodate different thinking styles, 
                  sensory needs, and communication preferences. My goal is to create an environment where neurodivergent 
                  individuals feel understood and supported.
                </p>
              </div>
            </motion.div>
            
            {/* Trauma-Informed Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl 
                transition-all duration-500 border border-amber-100 hover:border-amber-200
                group relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-70"></div>
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-amber-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shadow-sm
                    group-hover:shadow-md group-hover:shadow-amber-100 transform group-hover:rotate-[-5deg] transition-all duration-300">
                    <svg className="h-7 w-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-amber-600">Trauma-Informed</h3>
                </div>
                
                <p className="text-text-secondary leading-relaxed pl-2">
                  My practice is trauma informed, ensuring a strong therapeutic alliance and safe space is established before traumatic past experiences are reprocessed for integration and healing.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        

        
        {/* Telehealth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-lg border border-primary/10 max-w-4xl mx-auto mb-16 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center justify-center gap-6 flex-col md:flex-row">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9"/></svg>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-primary mb-2">Telehealth Appointments Available</h3>
              <p className="text-text-secondary max-w-2xl">
                For your convenience, I offer online counselling sessions via secure video conferencing. 
                Telehealth provides the same quality of care as in-person sessions, with the added benefit of accessing support from the comfort of your own space.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-10 text-center shadow-lg max-w-4xl mx-auto"
        >
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
          </div>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Start Your Healing Journey</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Taking the first step can be difficult, but seeking support is a sign of strength. 
            I'm here to accompany you on your journey toward healing and growth.
          </p>
          <Link href="/contact" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl transition-colors shadow-md hover:shadow-lg font-medium">
            Contact Me
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
