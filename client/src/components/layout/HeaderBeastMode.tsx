import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/ui/Logo";

// Ultra-simple, bulletproof icons - responsive sizing
const MenuIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

export default function HeaderBeastMode() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Debug logging for desktop
      if (window.innerWidth >= 1024) {
        console.log('Desktop scroll detected:', scrollY, 'Header scrolled state:', scrollY > 20);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Meet Celia", href: "/meet-celia" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/locations" },
    { name: "Client Diversity", href: "/client-diversity" },
    { name: "Fees", href: "/fees" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      {/* BEAST MODE STICKY HEADER */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-[9999] 
          transition-all duration-300 ease-out
          ${isScrolled 
            ? 'bg-white shadow-xl border-b border-teal-100' 
            : 'bg-white shadow-lg'
          }
        `}
        style={{
          position: 'fixed !important' as any,
          top: '0 !important' as any,
          left: '0 !important' as any,
          right: '0 !important' as any,
          width: '100vw',
          maxWidth: '100vw',
          minHeight: '64px',
          paddingTop: 'env(safe-area-inset-top, 0)',
          boxSizing: 'border-box',
          zIndex: 9999
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            
            {/* LOGO - Perfectly positioned and sized for mobile and desktop */}
            <Link 
              href="/" 
              className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity z-10 pl-1 sm:pl-0"
            >
              <div className="transform scale-80 sm:scale-90 md:scale-100 origin-left transition-transform duration-200">
                <Logo />
              </div>
            </Link>
            
            {/* BEAST MODE MOBILE HAMBURGER - Properly positioned and sized */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-full 
                  bg-teal-500 hover:bg-teal-600 active:bg-teal-700
                  text-white shadow-lg hover:shadow-xl
                  transition-all duration-200 ease-out
                  transform hover:scale-105 active:scale-95
                  border-2 border-white/20
                  flex-shrink-0
                  ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}
                `}
                style={{
                  minWidth: '48px',
                  minHeight: '48px',
                  maxWidth: '48px',
                  maxHeight: '48px',
                  zIndex: 10000
                }}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="transform transition-transform duration-300">
                  {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
                </div>
              </button>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center mx-6 xl:mx-8">
              <div className="flex items-center bg-white/70 rounded-full px-3 py-2 shadow-sm border border-teal-100">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive(item.href)
                        ? 'bg-teal-500 text-white shadow-md transform scale-105'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-white/90'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Connect With Me
              </Link>
            </div>


          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE MENU */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9998] lg:hidden"
          style={{
            paddingTop: 'calc(64px + env(safe-area-inset-top, 0))',
            paddingBottom: 'env(safe-area-inset-bottom, 0)'
          }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative bg-white w-full h-full overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between w-full p-5 rounded-2xl 
                      transition-all duration-200 group
                      ${isActive(item.href)
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-900'
                      }
                    `}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-lg font-semibold">{item.name}</span>
                    <ChevronRight />
                  </Link>
                ))}
              </div>
              
              {/* Mobile CTA */}
              <div className="pt-8 mt-6 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white p-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connect With Me Today
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}