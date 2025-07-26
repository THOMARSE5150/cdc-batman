import { Link, useLocation } from "wouter";
import Logo from "@/components/ui/Logo";
import { MailIcon, PhoneIcon, MapPinIcon, Calendar, Heart, ArrowRight, ExternalLink, Phone, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices for optimized rendering
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get current location to check if we're on admin or booking pages
  const [location] = useLocation();
  const isBookingPage = location.includes('/booking');
  const isAdminPage = location.includes('/admin');
  
  // Mobile footer with floating action buttons - 2025 style
  if (isMobile) {
    // Don't show the fixed footer buttons on the booking page or admin pages
    if (isBookingPage || isAdminPage) {
      return null;
    }
    
    return (
      <footer className="glass-effect text-text-primary pt-2 pb-4 safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-white/30">
        <div className="mx-auto px-4 pb-safe">
          {/* Floating CTA buttons with 2025 styling */}
          <div className="flex gap-3">
            <Link 
              href="/contact"
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark text-white py-3.5 rounded-xl font-medium text-base touch-manipulation shadow-colored-md shadow-primary/60 active:scale-[0.98] transition-all duration-200"
            >
              <Heart className="h-5 w-5 mr-2" />
              <span>Contact Me</span>
            </Link>
            
            <a 
              href="tel:(03) 9123 4567" 
              className="flex-1 flex items-center justify-center glass-effect border-transparent text-primary py-3.5 rounded-xl font-medium text-base touch-manipulation shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Call Me Now</span>
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
  // Desktop footer with modern 2025 design trends
  return (
    <footer className={`text-text-primary ${isAdminPage ? 'pt-12' : 'pt-24'} pb-12 safe-bottom bg-gradient-to-b from-background via-background to-primary/5`}>
      {/* CTA Section - Floating card with glass effect - Hidden on admin pages */}
      {!isAdminPage && (
        <div className="container mx-auto px-6 lg:px-8 relative z-10 -mt-16 mb-20">
          <div className="glass-effect rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-text-primary">Ready to start your healing journey?</h3>
              <p className="text-text-secondary md:text-lg">Take the first step toward positive change today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link 
                href="/contact" 
                className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-colored-md shadow-primary/30 hover:shadow-colored-lg hover:shadow-primary/40 whitespace-nowrap flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Contact Me</span>
                <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="tel:(03) 9123 4567" 
                className="flex items-center justify-center glass-effect border-transparent hover:border-primary/20 text-primary hover:text-primary-dark px-8 py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span>Call Me Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Main footer content */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Logo and tagline */}
          <div>
            <Logo variant="circular" className="mb-5" />
            <p className="text-text-secondary text-sm leading-relaxed">
              Creating positive change through compassionate counselling and mental health support.
            </p>
            
            {/* Membership badge with modern 2025 styling */}
            <div className="mt-6 inline-flex items-center glass-effect p-3.5 rounded-xl shadow-md border-transparent">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3 backdrop-blur-sm">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Proudly a member of</p>
                <p className="text-sm font-medium">Australian Association of Social Workers</p>
              </div>
            </div>
          </div>
          
          {/* Column 2: Contact info */}
          <div>
            <h4 className="text-base font-bold mb-5 text-primary">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@celiadunsmorecounselling.com.au" className="group flex items-center gap-3 text-sm glass-effect text-primary py-3 px-4 rounded-xl border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <span>Email Me</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="tel:(03) 9123 4567" className="group flex items-center gap-3 text-sm glass-effect text-primary py-3 px-4 rounded-xl border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>Call (03) 9123 4567</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Quick links */}
          <div>
            <h4 className="text-base font-bold mb-5 text-primary">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/meet-celia" className="group text-text-secondary hover:text-primary transition-colors text-sm inline-block py-1.5 relative">
                  <span>Meet Celia</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="group text-text-secondary hover:text-primary transition-colors text-sm inline-block py-1.5 relative">
                  <span>Services</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/fees" className="group text-text-secondary hover:text-primary transition-colors text-sm inline-block py-1.5 relative">
                  <span>Fees</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group text-text-secondary hover:text-primary transition-colors text-sm inline-block py-1.5 relative">
                  <span>Contact Me</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Location */}
          <div>
            <h4 className="text-base font-bold mb-5 text-primary">Location</h4>
            <div className="group glass-effect p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-transparent">
              <div className="flex items-center mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mr-3 flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <h5 className="font-medium">Office Address</h5>
              </div>
              <address className="not-italic text-sm leading-relaxed text-text-secondary pl-11">
                Melbourne Integrated Therapies<br />
                503 Sydney Road<br />
                Brunswick, VIC<br />
                Australia
              </address>
            </div>
          </div>
        </div>
        
        {/* Footer bottom: Copyright and links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/30">
          <div className="text-text-secondary/70 text-xs order-2 md:order-1 mt-6 md:mt-0">
            &copy; {currentYear} Celia Dunsmore Counselling. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 order-1 md:order-2">
            <Link href="/privacy-policy" className="group text-text-secondary hover:text-primary text-xs transition-colors relative">
              <span>Privacy Policy</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full opacity-70"></span>
            </Link>
            <Link href="/terms" className="group text-text-secondary hover:text-primary text-xs transition-colors relative">
              <span>Terms of Service</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full opacity-70"></span>
            </Link>
            <div className="flex gap-3">
              <Link 
                href="/admin/calendar" 
                className="glass-effect border-transparent text-text-secondary hover:text-primary transition-colors hover:shadow-sm px-3 py-1.5 rounded-full group" 
                title="Admin Calendar Management"
              >
                <div className="flex items-center text-xs">
                  <Calendar className="h-3 w-3 mr-1.5" />
                  <span className="group-hover:underline">Calendar</span>
                </div>
              </Link>
              <Link 
                href="/admin/contacts" 
                className="glass-effect border-transparent text-text-secondary hover:text-primary transition-colors hover:shadow-sm px-3 py-1.5 rounded-full group" 
                title="Contact Form Submissions"
              >
                <div className="flex items-center text-xs">
                  <MailIcon className="h-3 w-3 mr-1.5" />
                  <span className="group-hover:underline">Contacts</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}