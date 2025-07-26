import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { services, therapeuticApproaches } from "@/lib/data";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateProfessionalServiceStructuredData } from "@/lib/structuredData";
import { 
  ArrowRight, 
  CheckCircle, 
  CircleIcon, 
  BrainIcon, 
  HeartIcon, 
  Sparkles, 
  Globe, 
  Users, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  Accessibility, 
  Laugh,
  Lightbulb,
  CloudRain
} from "lucide-react";
import AASWBadge from "@/components/ui/AASWBadge";

export default function Services() {
  const [location] = useLocation();
  
  // Add SEO structured data
  useEffect(() => {
    const url = window.location.href;
    const structuredData = generateProfessionalServiceStructuredData({ 
      url,
      name: "Celia Dunsmore Counselling Services",
      description: "Professional counselling services for anxiety, depression, trauma, and other mental health concerns."
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
        title="Professional Counselling Services | Celia Dunsmore Counselling"
        description="Discover how Celia Dunsmore can help with anxiety, depression, trauma, and other mental health concerns through professional counselling services in Geelong."
        canonicalPath="/services"
      />
      <PageHeader 
        title="How I Can Help" 
        description="Discover how I can support you to wellness, treating the following difficulties through counselling"
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        
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
              "anxiety": <CloudRain className="h-8 w-8 text-blue-500" />,
              "depression": <Lightbulb className="h-8 w-8 text-green-500" />,
              "trauma": <ShieldCheck className="h-8 w-8 text-amber-500" />,
              "emotion-regulation": <HeartIcon className="h-8 w-8 text-purple-500" />,
              "interpersonal": <Users className="h-8 w-8 text-teal-500" />,
              "self-esteem": <Sparkles className="h-8 w-8 text-rose-500" />,
              "eating": <Globe className="h-8 w-8 text-indigo-500" />,
              "perfectionism": <CheckCircle className="h-8 w-8 text-fuchsia-500" />,
              "grief": <Calendar className="h-8 w-8 text-stone-500" />,
              "life-transitions": <BrainIcon className="h-8 w-8 text-cyan-500" />
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
                    {serviceIcons[service.id] || <CircleIcon className="h-9 w-9 text-gray-500" />}
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
                          <CheckCircle className={`h-5 w-5 ${textColors[service.id] || 'text-primary'} mr-2 flex-shrink-0 mt-0.5`} />
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
                <BrainIcon className={`h-6 w-6 ${scheme.iconColor}`} />,
                <HeartIcon className={`h-6 w-6 ${scheme.iconColor}`} />,
                <Sparkles className={`h-6 w-6 ${scheme.iconColor}`} />,
                <CloudRain className={`h-6 w-6 ${scheme.iconColor}`} />,
                <Lightbulb className={`h-6 w-6 ${scheme.iconColor}`} />
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
                    <Globe className="h-7 w-7 text-blue-500" />
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
                    <HeartIcon className="h-7 w-7 text-rose-500" />
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
                    <BrainIcon className="h-7 w-7 text-purple-500" />
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
                    <ShieldCheck className="h-7 w-7 text-amber-500" />
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
              <Globe className="h-10 w-10 text-primary" />
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
            <Laugh className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Start Your Healing Journey</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Taking the first step can be difficult, but seeking support is a sign of strength. 
            I'm here to accompany you on your journey toward healing and growth.
          </p>
          <Link href="/contact" className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl transition-colors shadow-md hover:shadow-lg font-medium">
            Contact Me
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
