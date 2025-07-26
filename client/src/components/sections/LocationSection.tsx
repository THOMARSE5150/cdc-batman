import React, { useState, useEffect } from 'react';


export default function LocationSection() {
  const address = "503 Sydney Road Brunswick, VIC Australia";
  const [apiKey, setApiKey] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Fetch Google Maps API key securely from server
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('/api/config/maps');
        const config = await response.json();
        
        if (response.ok && config.apiKey) {
          setApiKey(config.apiKey);
        } else {
          console.error('Failed to fetch Google Maps API key:', config.error);
        }
      } catch (error) {
        console.error('Error fetching API configuration:', error);
      }
    };

    fetchApiKey();
  }, []);
  
  // Generate map URL only when API key is available
  const mapUrl = apiKey ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}&zoom=15` : '';
  
  // Handle map loading state
  const handleMapLoad = () => {
    setMapLoaded(true);
  };
  
  return (
    <section className="bg-gradient-to-b from-white to-[#f0f7f7] py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Location Information
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">In person sessions are located at</h2>
          <p className="text-text-secondary">
            Melbourne Integrated Therapies provides a comfortable and welcoming environment for your in-person counselling sessions.
          </p>
        </div>
        
        {/* Mobile-optimized card with better touch targets */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg mx-auto">
          {/* Reversed order on mobile for better UX - map first, then info */}
          <div className="grid grid-cols-1 md:grid-cols-5 md:grid-flow-col-dense">
            {/* Map comes first on mobile for immediate visual context */}
            <div className="order-1 md:order-2 md:col-span-3 h-[250px] sm:h-[300px] md:min-h-[400px] relative">
              {/* Loading placeholder */}
              {(!apiKey || !mapLoaded) && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <svg className="h-10 w-10 text-primary/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-text-secondary/60">Loading map...</span>
                  </div>
                </div>
              )}
              
              {apiKey && (
                <iframe
                  title="Practice Location"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0, 
                    display: 'block', 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%'
                  }}
                  loading="lazy"
                  src={mapUrl}
                  allowFullScreen
                  onLoad={handleMapLoad}
                  className={`transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                ></iframe>
              )}
            </div>
            
            {/* Address and Info - comes second on mobile */}
            <div className="order-2 md:order-1 md:col-span-2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="font-medium">Location for in person sessions</span>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-text-primary">
                Celia Dunsmore Counselling @ Melbourne Integrated Therapies
              </h3>
              
              <address className="not-italic text-text-secondary mb-3">
                503 Sydney Road<br />
                Brunswick, VIC<br />
                Australia
              </address>
              
              <div className="mb-6 text-text-secondary bg-primary/5 p-3 rounded-lg flex items-center">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>Telehealth sessions also available</span>
              </div>
              
              {/* Mobile-optimized action buttons with larger touch targets */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-primary text-white px-5 py-3.5 rounded-xl hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg active:translate-y-0.5 touch-manipulation"
                  aria-label="Get directions to our practice"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  <span className="font-medium">Get Directions</span>
                </a>
                
                <a 
                  href="tel:(03) 9123 4567"
                  className="inline-flex items-center justify-center border-2 border-primary text-primary px-5 py-3 rounded-xl hover:bg-primary-light hover:text-white transition-colors active:translate-y-0.5 touch-manipulation"
                  aria-label="Call our practice"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="font-medium">Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}