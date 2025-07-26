import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AASWBadge from "@/components/ui/AASWBadge";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-6 relative inline-block">
              Meet Celia Dunsmore
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light to-primary rounded-full"></span>
            </h2>
            <p className="text-text-secondary mb-4 text-lg leading-relaxed">
              I am an Accredited Mental Health Social Worker and feel deeply passionate about supporting 
              people aged 16 and up to create positive change in their lives. I provide a non-judgmental, safe space for 
              clients to feel heard and understood. I carefully attune to the person and help them achieve 
              their goals for therapy.
            </p>
            <div className="mb-8 mt-6">
              <h3 className="text-xl font-medium text-text-primary mb-4">My Qualifications</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-text-secondary">Bachelor of Arts, The University of Melbourne</span>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-text-secondary">Bachelor of Social Work, RMIT University</span>
                </li>
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                  <span className="text-text-secondary">Master of Counselling, La Trobe University</span>
                </li>
              </ul>
            </div>
            <Link href="/meet-celia">
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 hover:shadow-lg transition-all duration-300 group"
              >
                Learn More About My Approach
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Button>
            </Link>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main profile image with enhanced mobile optimization */}
              <div className="rounded-full overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto relative z-10 border-4 border-primary/20 shadow-xl transition-transform duration-700 hover:scale-105">
                <div className="w-full h-full overflow-hidden bg-primary/5">
                  <picture>
                    <source 
                      srcSet="/images/celia-portrait-optimized.webp" 
                      type="image/webp"
                      media="(min-width: 640px)"
                    />
                    <source 
                      srcSet="/images/celia-portrait-optimized.webp" 
                      type="image/webp"
                      sizes="(max-width: 639px) 224px, (max-width: 767px) 256px, 320px"
                    />
                    <img 
                      src="/images/celia-portrait.png" 
                      alt="Celia Dunsmore" 
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                      loading="eager"
                      width="320" 
                      height="320"
                    />
                  </picture>
                </div>
              </div>
              
              {/* AASW badge */}
              <div className="absolute -bottom-6 -right-6 z-20">
                <div className="w-36 h-36">
                  <AASWBadge />
                </div>
              </div>
              
              {/* Background circle */}
              <div className="absolute -z-10 w-72 h-72 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full -top-6 -left-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
