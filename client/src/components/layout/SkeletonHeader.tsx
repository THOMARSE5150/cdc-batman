import React from 'react';

/**
 * A lightweight skeleton version of the header for faster initial rendering
 */
export default function SkeletonHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo placeholder */}
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
          
          {/* Nav items placeholders */}
          <nav className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </nav>
          
          {/* Mobile menu button placeholder */}
          <div className="flex md:hidden">
            <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}