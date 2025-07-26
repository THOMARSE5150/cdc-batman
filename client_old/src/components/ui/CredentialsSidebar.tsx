import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import AASWBadge from './AASWBadge';

type CredentialsSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CredentialsSidebar({ isOpen = true, onClose }: CredentialsSidebarProps) {
  return (
    <div className={`fixed right-0 top-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={onClose}
      ></div>
      
      <motion.div 
        initial={{ x: 300 }}
        animate={{ x: isOpen ? 0 : 300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative h-full w-80 md:w-96 bg-white shadow-xl z-40 overflow-y-auto"
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          {/* Sidebar Header */}
          <div className="mb-6 mt-4">
            <h2 className="text-xl font-medium text-primary">Professional Credentials</h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full mt-2"></div>
          </div>
          
          {/* AASW Badge */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="h-40 w-40 mx-auto mb-4">
              <AASWBadge />
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-gray-200"></div>
              <div className="px-3 text-sm font-medium text-primary">Medicare Rebates Available</div>
              <div className="h-px w-12 bg-gray-200"></div>
            </div>
            
            <p className="text-sm text-text-secondary mb-4">
              As an <span className="font-semibold">Accredited Mental Health Social Worker</span> and <span className="font-semibold">Registered Medicare Provider</span>, I can provide Medicare-related sessions with a Mental Health Treatment Plan from your GP.
            </p>
          </div>
          
          {/* Medicare Information */}
          <div className="bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-100 mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-3">Medicare Rebates</h3>
            <p className="text-sm mb-2">Medicare rebates of <span className="font-medium">$85.20 per session</span> are available with a valid Mental Health Care Plan from your GP.</p>
            <Link href="/fees" className="text-sm inline-flex items-center text-primary font-medium hover:underline mt-2">
              Learn more about fees and rebates
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          
          {/* Additional Information */}
          <div className="mt-auto">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-medium text-text-primary mb-2">Need help?</h3>
              <p className="text-xs text-text-secondary mb-3">Have questions about Medicare rebates or my professional credentials? Don't hesitate to get in touch.</p>
              <Link href="/contact" className="text-xs inline-flex items-center text-primary font-medium hover:underline">
                Contact me
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}