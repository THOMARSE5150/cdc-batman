import { Link } from "wouter";
import { useState, useEffect } from "react";

const ArrowDownCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 12 4 4 4-4"/>
  </svg>
);

/**
 * Lightweight hero section without Framer Motion for better mobile performance
 * Optimized for LCP < 2.5s and FCP < 1.8s
 */
export default function HeroSectionLightweight() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate visibility for better LCP
    setIsVisible(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section relative min-h-[100svh] flex items-center justify-center w-full max-w-full overflow-x-hidden bg-gradient-to-br from-[#50c2b9]/10 via-background to-background">
      {/* Simplified background without heavy animations */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#50c2b9]/8 blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#50c2b9]/6 blur-3xl opacity-40" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10 pt-28 pb-16 md:py-28 lg:py-32">
        <div className="grid-mobile lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Text Content - Optimized for immediate visibility */}
          <div className={`order-2 lg:order-1 mb-mobile-8 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center mb-8 bg-white/80 backdrop-blur-sm px-5 py-2.5 text-primary rounded-full text-sm font-medium shadow-sm border border-primary/20 mx-auto lg:mx-0">
              <span>Accredited Mental Health Social Worker</span>
            </div>

            {/* Main Heading - Optimized for LCP */}
            <h1 className="hero-text-primary text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mb-8 tracking-tight text-mobile-center lg:text-left">
              Creating positive
              <span className="hero-text-accent block">
                change through
              </span>
              <span className="block">compassionate counselling</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-text-secondary mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Professional mental health support in Brunswick and Coburg, Melbourne. 
              Individual therapy, trauma recovery, and emotional wellbeing with Medicare rebates available.
            </p>

            {/* CTA Buttons - Optimized for mobile touch */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <Link href="/book-now" className="btn-primary text-center">
                Book Consultation
              </Link>
              
              <Link href="/meet-celia" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary/5 transition-colors duration-200 shadow-sm min-h-[48px] touch-manipulation">
                Meet Celia
              </Link>
            </div>
          </div>

          {/* Image - Optimized loading */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              
              {/* Optimized image with proper sizing */}
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet="/images/celia-portrait-mobile.webp"
                  type="image/webp"
                />
                <source 
                  srcSet="/images/celia-portrait-optimized.webp"
                  type="image/webp"
                />
                <img
                  src="/images/celia-portrait-optimized.webp"
                  alt="Celia Dunsmore - Accredited Mental Health Social Worker"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  width="600"
                  height="800"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ aspectRatio: '3/4', objectFit: 'cover' }}
                />
              </picture>

              {/* Simplified decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl -z-10 blur-xl opacity-60" />
            </div>
          </div>
        </div>

        {/* Scroll indicator - Simplified */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
          <button
            onClick={scrollToNext}
            className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 text-primary hover:bg-white group"
            aria-label="Scroll to next section"
          >
            <ArrowDownCircle />
          </button>
        </div>
      </div>
    </section>
  );
}