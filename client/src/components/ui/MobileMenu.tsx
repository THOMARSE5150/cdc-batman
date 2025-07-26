import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobilePerformance } from '@/hooks/use-mobile-performance';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * High-performance mobile menu with optimized animations
 */
export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const [location] = useLocation();
  const { shouldReduceAnimations, getAnimationDuration } = useMobilePerformance();

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/meet-celia', label: 'Meet Celia' },
    { href: '/services', label: 'Services' },
    { href: '/fees', label: 'Fees & Medicare' },
    { href: '/locations', label: 'Locations' },
    { href: '/contact', label: 'Contact' }
  ];

  // Close menu on navigation
  useEffect(() => {
    if (isOpen) {
      onToggle();
    }
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: shouldReduceAnimations ? 'tween' : 'spring',
        duration: getAnimationDuration(300) / 1000,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: shouldReduceAnimations ? 'tween' : 'spring',
        duration: getAnimationDuration(300) / 1000,
        ease: 'easeOut'
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: shouldReduceAnimations ? 0 : i * 0.1,
        duration: getAnimationDuration(200) / 1000
      }
    })
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden relative z-50 p-2"
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: getAnimationDuration(200) / 1000 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onToggle}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary-healing to-primary-compassion">
                  <h2 id="mobile-menu-title" className="text-xl font-semibold text-white">
                    Menu
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="text-white hover:bg-white/20 p-2"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6" role="navigation">
                  <ul className="space-y-2 px-6">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item.href}
                          className={`
                            block py-3 px-4 rounded-lg text-lg font-medium transition-colors
                            ${location === item.href
                              ? 'bg-primary-healing/10 text-primary-healing border-l-4 border-primary-healing'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-healing'
                            }
                          `}
                          role="menuitem"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Contact Information */}
                <div className="border-t bg-gray-50 p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-3">
                    <a
                      href="tel:+61438593071"
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Phone className="h-5 w-5 text-primary-healing" />
                      <span className="text-gray-700 font-medium">0438 593 071</span>
                    </a>
                    
                    <a
                      href="mailto:hello@celiadunsmorecounselling.com.au"
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Mail className="h-5 w-5 text-primary-healing" />
                      <span className="text-gray-700 font-medium text-sm">hello@celiaduns...</span>
                    </a>
                    
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                      <MapPin className="h-5 w-5 text-primary-healing" />
                      <span className="text-gray-700 font-medium">Brunswick & Coburg</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/contact">
                    <Button 
                      className="w-full mt-4 bg-primary-healing hover:bg-primary-healing/90 text-white"
                      size="lg"
                    >
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}