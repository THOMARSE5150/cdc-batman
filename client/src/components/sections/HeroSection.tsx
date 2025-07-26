import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import heroCanvaImageWebp from "../../assets/images/hero_image_canva_optimized.webp";

const ArrowDownCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m8 12 4 4 4-4"/>
  </svg>
);

export default function HeroSection() {
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
      className="relative min-h-fit flex items-center justify-center w-full max-w-full overflow-x-hidden bg-gradient-radial from-[#50c2b9]/10 via-background to-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#50c2b9]/10 blur-3xl opacity-70 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#50c2b9]/8 blur-3xl opacity-60 animate-float" />
        <div className="absolute top-1/3 right-1/5 w-[25vw] h-[25vw] rounded-full bg-[#50c2b9]/5 blur-3xl opacity-40 animate-float" />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10 pt-16 sm:pt-18 md:pt-20 pb-6 sm:pb-8 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full min-w-0">
          
          {/* Text Content */}
          <div className={`order-2 lg:order-1 text-center lg:text-left min-w-0 w-full transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Badge */}
            <div className={`inline-flex items-center mb-3 glass-effect px-5 py-2.5 text-primary rounded-full text-sm font-medium relative overflow-hidden group mx-auto lg:mx-0 transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="relative z-10">Accredited Mental Health Social Worker</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] mb-3 sm:mb-4 tracking-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="inline-block relative text-balance">
                Creating positive change through
              </span>{" "}
              <span className="inline-block text-primary">compassionate counselling</span>
            </h1>

            {/* Description */}
            <p className={`text-lg text-text-secondary max-w-2xl mb-5 sm:mb-6 mx-auto lg:mx-0 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Non-judgmental and compassionate attunement style of counselling to help you achieve and experience your therapy goals.
            </p>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Your Journey
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/meet-celia"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                About Celia
              </Link>
            </div>

            {/* Credentials */}
            <div className={`flex flex-wrap gap-6 justify-center lg:justify-start mt-4 text-sm text-text-secondary transition-all duration-700 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Medicare Provider</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>AASW Member</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>25+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className={`order-1 lg:order-2 w-full flex justify-center lg:justify-end transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={heroCanvaImageWebp}
                  alt="Compassionate counselling - hands reaching towards each other in a supportive gesture"
                  className="w-full h-auto object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-sm font-medium">Discover More</span>
            <div className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300">
              <ArrowDownCircle />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}