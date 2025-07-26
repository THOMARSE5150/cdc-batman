import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Meet Celia", href: "/meet-celia" },
    { name: "Services", href: "/services" },
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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "glass-effect py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center transition-all duration-300 relative">
            <div className="absolute -inset-2 rounded-xl bg-white/0 group-hover:bg-white/50 group-hover:backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 -z-10"></div>
            <Logo />
          </Link>

          {/* Desktop Navigation - 2025 Styling */}
          <nav className="hidden md:flex items-center">
            <div className="flex gap-1 p-1.5 bg-white/50 backdrop-blur-sm rounded-full">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`relative flex items-center transition-all px-4 py-2.5 rounded-full text-sm font-medium tracking-wide ${
                    isNavItemActive(item.href) 
                      ? "text-white bg-primary shadow-[0_2px_10px_rgba(0,0,0,0.1)]" 
                      : "text-text-secondary hover:text-primary hover:bg-white"
                  }`}
                >
                  <div className="relative z-10">
                    {item.name}
                  </div>
                  {isNavItemActive(item.href) && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-primary -z-0"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:block">
            <Link 
              href="/contact"
              className="group overflow-hidden relative bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light via-primary to-primary-light bg-[length:200%_100%] animate-shimmer-slow"></div>
              <span className="relative z-10">Connect With Me</span>
              <ChevronRight className="relative z-10 ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button - Modern 2025 Style */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden relative overflow-hidden bg-white/80 backdrop-blur-sm text-primary p-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="absolute inset-0 bg-primary/5 scale-0 rounded-xl group-hover:scale-100 transition-transform duration-300"></span>
          </button>
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
            className="fixed inset-0 bg-white/80 z-50 md:hidden safe-top safe-bottom"
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
                  <XIcon className="h-6 w-6" />
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
                      className={`flex items-center py-4 px-5 rounded-xl transition-all relative overflow-hidden touch-manipulation ${
                        isNavItemActive(item.href) 
                          ? "text-white bg-primary shadow-md shadow-primary/25" 
                          : "text-text-primary bg-white/60 hover:bg-white hover:shadow-sm"
                      }`}
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
                    className="bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center shadow-lg shadow-primary/15"
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