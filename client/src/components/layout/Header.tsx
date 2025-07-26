import { useState, useEffect, useCallback, memo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useOptimizedScroll } from "@/hooks/useOptimizedScroll";

// Memoized nav item component for performance
const NavItem = memo(({ item, isActive, onClick }: { 
  item: { name: string; href: string }; 
  isActive: boolean; 
  onClick?: () => void;
}) => (
  <Link 
    href={item.href}
    onClick={onClick}
    className={`
      relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
      ${isActive 
        ? "text-primary bg-primary/10 shadow-sm" 
        : "text-gray-700 hover:text-primary hover:bg-primary/5"
      }
      focus:outline-none focus:ring-2 focus:ring-primary/20
    `}
  >
    {item.name}
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg -z-10"
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </Link>
));

NavItem.displayName = "NavItem";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isScrolled = useOptimizedScroll({ threshold: 10 });

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Debug logging
  useEffect(() => {
    console.log('Mobile menu open state:', mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Meet Celia", href: "/meet-celia" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/locations" },
    { name: "Client Diversity", href: "/client-diversity" },
    { name: "Fees", href: "/fees" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const isNavItemActive = (href: string): boolean => {
    return location === href;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 gpu-accelerated ${
        isScrolled 
          ? "glass-nav py-2" 
          : "bg-white/90 backdrop-blur-sm py-3"
      }`}
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: '0.75rem'
      }}
    >
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-500 text-white px-4 py-2 rounded-md z-[100] focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>
          
          {/* Mobile Menu Button - Properly contained within viewport */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => {
                console.log('Mobile menu button clicked!');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white p-2.5 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-500 touch-manipulation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              style={{
                minWidth: '44px',
                minHeight: '44px',
                maxWidth: '44px',
                maxHeight: '44px'
              }}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center mx-4" role="navigation" aria-label="Main navigation">
            <div className="flex gap-2 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`relative flex items-center transition-all px-3 py-2.5 rounded-full text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 whitespace-nowrap ${
                    isNavItemActive(item.href) 
                      ? "text-white bg-teal-500 shadow-[0_2px_10px_rgba(0,0,0,0.1)]" 
                      : "text-gray-600 hover:text-teal-500 hover:bg-white/80"
                  }`}
                  aria-current={isNavItemActive(item.href) ? "page" : undefined}
                >
                  <div className="relative z-10">
                    {item.name}
                  </div>
                  {isNavItemActive(item.href) && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-teal-500 -z-0"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link 
              href="/contact"
              className="group overflow-hidden relative bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-3 rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 flex items-center font-medium hover:scale-105"
            >
              <span className="relative z-10 text-sm">Connect With Me</span>
              <ChevronRight className="relative z-10 ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - 2025 Redesign */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-[60] lg:hidden safe-top safe-bottom"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              paddingTop: 'env(safe-area-inset-top, 0)',
              paddingBottom: 'env(safe-area-inset-bottom, 0)'
            }}
          >
            <div className="container mx-auto px-4 py-6 h-full flex flex-col">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center">
                  <Logo />
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary bg-white p-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col space-y-3 mt-10 flex-grow justify-center"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  >
                    <Link 
                      href={item.href}
                      className={`touch-target flex items-center py-4 px-5 rounded-xl transition-all relative overflow-hidden touch-manipulation min-h-[56px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 active:scale-98 ${
                        isNavItemActive(item.href) 
                          ? "text-white bg-teal-500 shadow-md shadow-teal-500/25" 
                          : "text-gray-800 bg-white/60 hover:bg-white hover:shadow-sm"
                      }`}
                      aria-current={isNavItemActive(item.href) ? "page" : undefined}
                    >
                      <div className="relative z-10 flex items-center w-full">
                        {isNavItemActive(item.href) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-white mr-2"
                          />
                        )}
                        <span className="text-lg font-medium">{item.name}</span>
                        <ChevronRight className="ml-auto h-5 w-5 opacity-60" />
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + navItems.length * 0.05, duration: 0.4 }}
                  className="pt-4 mt-auto"
                >
                  <Link
                    href="/contact"
                    className="touch-target bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center shadow-lg shadow-teal-500/15 active:scale-98 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-500"
                  >
                    <span className="text-lg font-medium">Connect With Me</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}