import React from 'react';
import { Award } from 'lucide-react';

interface CredentialsSidebarButtonProps {
  onClick: () => void;
}

export default function CredentialsSidebarButton({ onClick }: CredentialsSidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-0 top-1/3 transform -translate-y-1/2 z-30 bg-primary text-white hover:bg-primary-dark rounded-l-lg py-3 px-3 shadow-lg transition-all duration-300 hover:px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      aria-label="View Professional Credentials"
    >
      <div className="flex flex-col items-center">
        <Award className="h-5 w-5 mb-1" />
        <span className="text-xs font-medium writing-vertical-lr transform rotate-180">Credentials</span>
      </div>
    </button>
  );
}