import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import heroCanvaImageWebp from "../../assets/images/hero_image_canva_optimized.webp";

const ArrowDownCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 12 4 4 4-4"/>
  </svg>
);

export default function HeroSectionOptimized() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={heroRef}
      className="hero-optimized relative min-h-[100svh] flex items-center justify-center w-full max-w-full overflow-x-hidden bg-gradient-radial from-[#50c2b9]/10 via-background to-background"
    >
      {/* Optimized background elements */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#50c2b9]/10 blur-3xl opacity-70" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#50c2b9]/8 blur-3xl opacity-60" />
        <div className="absolute top-1/3 right-1/5 w-[25vw] h-[25vw] rounded-full bg-[#50c2b9]/5 blur-3xl opacity-40" />
      </div>

      <div className="hero-content w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 lg:py-32 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full min-w-0">
          
          {/* Text Content */}
          <div className={`order-2 lg:order-1 text-center lg:text-left min-w-0 w-full transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Badge */}
            <div className={`inline-flex items-center mb-8 glass-effect px-5 py-2.5 text-primary rounded-full text-sm font-medium relative overflow-hidden group mx-auto lg:mx-0 transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="relative z-10">Accredited Mental Health Social Worker</span>
            </div>

            {/* Main Heading */}
            <h1 className={`hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.15] mb-8 tracking-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Creating positive change through
              <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                compassionate counselling
              </span>
            </h1>

            {/* Description */}
            <p className={`hero-description text-lg sm:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Professional mental health support in Melbourne's inner north. 
              I provide a safe, non-judgmental space for you to explore your thoughts, 
              feelings, and experiences while working towards positive change.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 justify-center lg:justify-start transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link 
                href="/contact" 
                className="cta-button inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
              >
                Start Your Journey
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/meet-celia" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              >
                About Celia
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-text-secondary transition-all duration-700 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Medicare Provider</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>AASW Member</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>25+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative w-full max-w-lg">
              <div className="glass-card p-4 rounded-3xl">
                <img
                  src={heroCanvaImageWebp}
                  alt="Professional counselling environment - a serene therapy space"
                  className="w-full h-auto rounded-2xl object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="500"
                  height="600"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Scroll to next section"
      >
        <ArrowDownCircle />
      </button>
    </section>
  );
}