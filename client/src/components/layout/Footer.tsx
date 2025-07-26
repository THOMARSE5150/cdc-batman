import { Link, useLocation } from "wouter";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get current location to check if we're on admin or booking pages
  const [location] = useLocation();
  const isBookingPage = location.includes('/booking');
  const isAdminPage = location.includes('/admin');
  
  // Don't show footer on booking page or admin pages
  if (isBookingPage || isAdminPage) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-50/80 via-white/90 to-emerald-50/60 backdrop-blur-xl border-t border-white/20">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      
      {/* CTA Section - Compact */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/30 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800">Ready to start your healing journey?</h3>
            <p className="text-sm sm:text-base text-gray-600">Take the first step toward positive change today.</p>
          </div>
          <div className="flex flex-col w-full sm:flex-row gap-3 md:w-auto">
            <Link 
              href="/contact" 
              className="group bg-[#74B7A7] hover:bg-[#5fa394] text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Contact Me
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a 
              href="tel:+61438593071" 
              className="group bg-white/80 backdrop-blur-sm border-2 border-[#74B7A7] text-[#74B7A7] hover:bg-[#74B7A7] hover:text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden xs:inline">Call Me Now</span>
              <span className="xs:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main footer content - Mobile-optimized layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          
          {/* Logo and Company Info - Optimized for mobile */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Logo variant="circular" className="flex-shrink-0 self-center sm:self-start" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Celia Dunsmore Counselling</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Creating positive change through compassionate counselling and mental health support.
                </p>
                
                {/* Contact Methods - Mobile-optimized */}
                <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <a href="mailto:hello@celiadunsmorecounselling.com.au" className="inline-flex items-center gap-3 text-[#74B7A7] hover:text-[#5fa394] transition-colors group justify-center sm:justify-start">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#74B7A7]/10 flex items-center justify-center group-hover:bg-[#74B7A7]/20 transition-colors">
                      <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base font-medium group-hover:underline">Email Me</span>
                  </a>
                  
                  <a href="tel:+61438593071" className="inline-flex items-center gap-3 text-[#74B7A7] hover:text-[#5fa394] transition-colors group justify-center sm:justify-start">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#74B7A7]/10 flex items-center justify-center group-hover:bg-[#74B7A7]/20 transition-colors">
                      <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base font-medium group-hover:underline">+61 438 593 071</span>
                  </a>
                </div>
                
                {/* Membership badge - Mobile-optimized */}
                <div className="bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-white/30">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#74B7A7]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 sm:h-6 w-5 sm:w-6 text-[#74B7A7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Accredited Member</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">Australian Association of Social Workers</p>
                      <p className="text-xs text-gray-600 mt-1">Registered Mental Health Social Worker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation - Mobile-optimized */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#74B7A7] flex items-center justify-center sm:justify-start">
              <svg className="h-4 sm:h-5 w-4 sm:w-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Quick Links
            </h4>
            
            <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/30 shadow-sm">
              <div className="space-y-1">
                <Link href="/meet-celia" className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-[#74B7A7] transition-colors group py-1.5 justify-center sm:justify-start">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 group-hover:text-[#74B7A7] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:underline font-medium text-sm sm:text-base">Meet Celia</span>
                </Link>
                <Link href="/services" className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-[#74B7A7] transition-colors group py-1.5 justify-center sm:justify-start">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 group-hover:text-[#74B7A7] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:underline font-medium text-sm sm:text-base">Services</span>
                </Link>
                <Link href="/locations" className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-[#74B7A7] transition-colors group py-1.5 justify-center sm:justify-start">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 group-hover:text-[#74B7A7] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:underline font-medium text-sm sm:text-base">Locations</span>
                </Link>
                <Link href="/fees" className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-[#74B7A7] transition-colors group py-1.5 justify-center sm:justify-start">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 group-hover:text-[#74B7A7] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:underline font-medium text-sm sm:text-base">Fees</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3 text-gray-700 hover:text-[#74B7A7] transition-colors group py-1.5 justify-center sm:justify-start">
                  <svg className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400 group-hover:text-[#74B7A7] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:underline font-medium text-sm sm:text-base">Contact Me</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer bottom - Mobile-optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-3 sm:pt-4 border-t border-white/30 gap-2 sm:gap-0">
          <div className="text-gray-500 text-xs order-2 sm:order-1 text-center sm:text-left">
            © {currentYear} Celia Dunsmore Counselling. All rights reserved.
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 order-1 sm:order-2">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-[#74B7A7] text-xs transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-[#74B7A7] text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}