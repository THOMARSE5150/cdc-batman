import { motion } from "framer-motion";
import { useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { CheckIcon, GraduationCap, BookOpen, Heart, DollarSign, Award, BadgeCheck, Info } from "lucide-react";
import AASWBadge from "@/components/ui/AASWBadge";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateProfessionalServiceStructuredData } from "@/lib/structuredData";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MeetCelia() {
  useEffect(() => {
    // Add structured data for the Meet Celia page - ProfessionalService
    const url = window.location.href;
    const structuredData = generateProfessionalServiceStructuredData({ 
      url,
      imageUrl: "/images/celia-portrait.png"
    });
    addStructuredData(structuredData);
  }, []);
  return (
    <>
      <SEO
        title="Meet Celia Dunsmore | Accredited Mental Health Social Worker"
        description="Learn about Celia Dunsmore's qualifications, experience, and therapeutic approach as an Accredited Mental Health Social Worker in Geelong."
        canonicalPath="/meet-celia"
      />
      <PageHeader 
        title="Meet Celia Dunsmore" 
        description="Get to know more about my background, qualifications and approach to counselling"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Portrait and Credentials Section - Enhanced with modern styling */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center relative"
          >
            {/* Decorative elements */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-xl transform scale-125"></div>
            
            {/* Main portrait with improved styling */}
            <div className="relative">
              <OptimizedImage 
                src="/images/celia-portrait.png" 
                alt="Celia Dunsmore" 
                className="w-full max-w-[280px] rounded-full shadow-xl border-4 border-white mb-6 hover:scale-105 transition-transform duration-500"
                width={280}
                height={280}
                priority={true}
                loadingClassName="animate-pulse bg-blue-50 w-[280px] h-[280px] rounded-full"
              />
              <div className="absolute top-2 left-2 w-full h-full rounded-full border-4 border-primary/20 -z-10"></div>
            </div>
            
            <div className="max-w-[180px] mt-4 transform hover:scale-105 transition-transform duration-300 drop-shadow-md">
              <AASWBadge />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium relative group overflow-hidden hover:bg-primary/15 transition-colors duration-300"
              style={{
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></div>
              Accredited Mental Health Social Worker
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 relative">
              Professional Counsellor & Accredited Mental Health Social Worker
              <div className="absolute -bottom-3 left-0 h-1 w-24 bg-primary rounded-full"></div>
            </h2>
            
            <p className="text-lg text-text-secondary mb-4 leading-relaxed">
              With over 20 years of experience in the mental health field, I provide a safe, 
              compassionate, and non-judgmental space for individuals aged 16 and up to explore their concerns 
              and work towards positive change. As an Accredited Mental Health Social Worker, 
              I bring specialised training and expertise to support your mental health journey.
            </p>
            
            <p className="text-lg text-text-secondary leading-relaxed">
              I am deeply committed to creating a therapeutic relationship based on trust, 
              respect, and collaboration. My goal is to help you develop a deeper understanding 
              of yourself and your experiences, while providing practical strategies to address 
              your concerns and enhance your wellbeing.
            </p>
          </motion.div>
        </div>
        
        {/* Two-column section with improved visual separation and hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100/80 group relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute -z-10 -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -z-10 right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-8 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md transform -rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl text-white shadow-sm">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">My Approach</h2>
              </div>
              
              <div className="relative px-5 py-3 bg-white/70 rounded-xl border-l-4 border-primary/50 shadow-sm">
                <p className="text-text-secondary text-lg leading-relaxed relative z-10">
                  I am an Accredited Mental Health Social Worker and feel deeply passionate about supporting 
                  people to create positive change in their lives. I provide a non-judgmental, safe space for 
                  all people to feel heard and understood. I carefully attune to the person and help them achieve 
                  their goals for therapy.
                </p>
                
                {/* Decorative quote symbol */}
                <div className="absolute -left-3 -top-2 bg-white p-1 rounded-full shadow-sm z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
              
              {/* Modern tag highlighting */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Person-centred</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Non-judgmental</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Safe space</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 p-8 md:p-10 rounded-[2rem] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100/80 backdrop-blur-sm group relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute -z-10 -bottom-24 -left-24 w-48 h-48 bg-blue-100/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -z-10 right-10 top-10 w-20 h-20 bg-primary/5 rounded-full blur-lg"></div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-8 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-md transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-sm">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Education & Credentials</h2>
              </div>
              
              <div className="space-y-8">
                {/* Academic Qualifications */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
                    <div className="h-10 w-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-4"></div>
                    Academic Qualifications
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="relative group bg-white/80 p-5 rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden border border-gray-100">
                      <div className="absolute -right-6 -top-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex gap-4 items-start">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">Master of Counselling</p>
                          <p className="text-blue-600/70">La Trobe University</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group bg-white/80 p-5 rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden border border-gray-100">
                      <div className="absolute -right-6 -top-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex gap-4 items-start">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">Bachelor of Social Work</p>
                          <p className="text-blue-600/70">RMIT University</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group bg-white/80 p-5 rounded-2xl transition-all duration-300 hover:shadow-md overflow-hidden border border-gray-100">
                      <div className="absolute -right-6 -top-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex gap-4 items-start">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">Bachelor of Arts</p>
                          <p className="text-blue-600/70">The University of Melbourne</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Professional Memberships */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
                    <div className="h-10 w-2 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-4"></div>
                    Professional Memberships
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="bg-white p-2 rounded-lg shadow-sm z-10">
                        <CheckIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium z-10">Australian Association of Social Workers (AASW)</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="bg-white p-2 rounded-lg shadow-sm z-10">
                        <CheckIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium z-10">Accredited Mental Health Social Worker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Professional Credentials Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <div className="bg-primary/10 p-3 rounded-2xl mr-4">
              <BadgeCheck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary relative">
              Professional Credentials
              <div className="absolute -bottom-3 left-0 h-1 w-16 bg-primary rounded-full"></div>
            </h2>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <div className="w-40 md:w-48 flex-shrink-0">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <AASWBadge />
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Medicare Registered
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-lg text-text-secondary mb-4">
                  As an <span className="font-semibold">Accredited Mental Health Social Worker</span> and <span className="font-semibold">Registered Medicare Provider</span>, I meet the high standards required by the Australian Association of Social Workers (AASW) and Medicare.
                </p>
                <p className="text-text-secondary">
                  This accreditation recognises my specialised training and expertise in providing mental health services, and enables eligible clients to access Medicare rebates for counselling sessions.
                </p>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="medicare-rebates" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center text-left">
                    <DollarSign className="h-5 w-5 text-primary mr-3" />
                    <span className="font-medium text-lg text-text-primary">Medicare Rebates</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h4 className="font-medium text-lg mb-3">Medicare Rebate Information</h4>
                    <p className="mb-3">
                      Medicare rebates of <span className="font-medium">$85.20 per session</span> are available with a valid Mental Health Care Plan from your GP.
                    </p>
                    <p className="mb-4">
                      To access Medicare rebates for counselling sessions:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                      <li>Visit your GP and discuss your mental health concerns</li>
                      <li>Ask your GP for a Mental Health Care Plan</li>
                      <li>Your GP will assess your eligibility and can refer you for up to 10 individual sessions per calendar year</li>
                      <li>Bring your referral and Medicare card to your first appointment</li>
                    </ol>
                    <Link href="/fees" className="inline-flex items-center text-primary font-medium hover:underline">
                      Learn more about fees and rebates
                      <CheckIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="memberships" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center text-left">
                    <Award className="h-5 w-5 text-primary mr-3" />
                    <span className="font-medium text-lg text-text-primary">Professional Memberships</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Australian Association of Social Workers (AASW)</p>
                        <p className="text-sm text-text-secondary">Full member in good standing</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Accredited Mental Health Social Worker</p>
                        <p className="text-sm text-text-secondary">Specialised accreditation recognising advanced skills in mental health</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Registered Medicare Provider</p>
                        <p className="text-sm text-text-secondary">Authorised to provide Medicare-rebatable mental health services</p>
                      </div>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="additional-info" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center text-left">
                    <Info className="h-5 w-5 text-primary mr-3" />
                    <span className="font-medium text-lg text-text-primary">Additional Information</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Private Health Insurance</h4>
                      <p className="text-text-secondary">
                        Some private health insurance providers offer rebates for counselling services with an Accredited Mental Health Social Worker. Please check with your insurer for coverage details.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">NDIS Clients</h4>
                      <p className="text-text-secondary">
                        I work with self-funded and plan-managed NDIS clients. Please inquire about services tailored to your specific needs and plan.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Payment Options</h4>
                      <p className="text-text-secondary mb-3">
                        Payment is processed through the Halaxy platform. Medicare rebates can be processed directly through Halaxy for eligible clients.
                      </p>
                      <div className="flex items-center">
                        <div className="flex items-center bg-white py-2 px-3 rounded-md shadow-sm mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                          <span className="font-medium text-blue-600">Halaxy</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-light p-4 rounded-xl mt-4">
                      <p className="text-sm">
                        Have questions about Medicare rebates, private health insurance, or other payment options? Please don't hesitate to contact me.
                      </p>
                      <Link href="/contact" className="inline-flex items-center text-primary text-sm font-medium hover:underline mt-2">
                        Contact for more information
                        <CheckIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>

        {/* Journey section with 2025 modern visuals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-24 relative"
        >
          <div className="flex items-center justify-center mb-10">
            <div className="absolute h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full max-w-xs"></div>
            <div className="relative bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                My Professional Journey
              </h2>
            </div>
          </div>
          
          <div className="relative max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_80px_-10px_rgba(0,0,0,0.08)] border border-gray-100/80 backdrop-blur-sm">
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-blue-100/20 rounded-full blur-xl"></div>
            
            <div className="space-y-8">
              {/* Section 1: Career Background */}
              <div className="relative group">
                <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-16 flex-shrink-0 bg-primary/10 p-3 rounded-2xl flex items-center justify-center md:sticky md:top-6">
                    <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      My career as a counsellor has been shaped by my work in the child protection and adoption and permanent care and community health sectors, supporting children and their families. I am passionate about connecting and working with young people, aged 16 and over and adults.
                      I am currently a tertiary level student counsellor and continue to work with young people at headspace, where I have provided counselling for over 10 years.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Section 2: Approach */}
              <div className="relative group">
                <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-16 flex-shrink-0 bg-primary/10 p-3 rounded-2xl flex items-center justify-center md:sticky md:top-6">
                    <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-secondary text-lg leading-relaxed">
                      I honour that the development of a secure therapeutic alliance is integral to the counselling process to build trust and safety. My approach is ultimately person centred, working collaboratively to strengthen each person's innate capacity to achieve and experience their counselling goals.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* EMDR Badge - Modern callout */}
              <div className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-5 border border-blue-200/70 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className="bg-white p-3 rounded-xl shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-blue-800 uppercase tracking-wider">Fully Qualified</span>
                  <p className="font-semibold text-xl text-blue-900">Eye Movement Desensitisation and Reprocessing Therapy (EMDR)</p>
                  <p className="text-sm text-blue-700 mt-1">An evidence-based approach particularly effective for trauma recovery</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        

      </div>
    </>
  );
}
