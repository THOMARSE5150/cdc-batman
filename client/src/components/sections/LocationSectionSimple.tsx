import React, { useState, useEffect, useRef, useCallback } from 'react';

interface LocationData {
  id: string;
  name: string;
  address: string;
  description: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  phone?: string;
  hours?: { [key: string]: string };
  parking?: string;
  transport?: string[];
}

export default function LocationSectionSimple() {
  const [activeTab, setActiveTab] = useState<string>('brunswick');
  const [apiKey, setApiKey] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState<Record<string, boolean>>({});
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const locations: LocationData[] = [
    {
      id: 'brunswick',
      name: "Brunswick",
      address: "503 Sydney Road, Brunswick VIC",
      description: "Primary location with excellent public transport access",
      features: ["Ground floor access", "Tram stop directly outside", "Street parking available"],
      coordinates: { lat: -37.7749, lng: 144.9631 },
      phone: "(03) 9041 5031",
      hours: {
        'Monday': '9:00 AM - 5:00 PM',
        'Tuesday': '9:00 AM - 5:00 PM',
        'Wednesday': '9:00 AM - 5:00 PM',
        'Thursday': '9:00 AM - 5:00 PM',
        'Friday': '9:00 AM - 5:00 PM'
      },
      parking: "Street parking available on Sydney Road",
      transport: ["Tram 19", "Bus 506"]
    },
    {
      id: 'coburg-bell',
      name: "Coburg - Bell Street", 
      address: "81B Bell Street, Coburg VIC 3058",
      description: "New location with on-site parking available",
      features: ["On-site parking", "8 minute walk from Coburg Station", "Weekend availability"],
      coordinates: { lat: -37.7559, lng: 144.9647 },
      phone: "(03) 9041 5031",
      hours: {
        'Monday': '9:00 AM - 5:00 PM',
        'Tuesday': '9:00 AM - 5:00 PM',
        'Wednesday': '9:00 AM - 5:00 PM',
        'Thursday': '9:00 AM - 5:00 PM',
        'Friday': '9:00 AM - 5:00 PM',
        'Saturday': '9:00 AM - 1:00 PM'
      },
      parking: "Free on-site parking available",
      transport: ["Train to Coburg Station", "Bus 508"]
    },
    {
      id: 'coburg-solana',
      name: "Coburg - Solana Psychology",
      address: "FL 1, 420 Sydney Road, Coburg VIC 3058",
      description: "Convenient location",
      features: ["First floor with lift access", "Near Coburg Station", "Professional psychology centre"],
      coordinates: { lat: -37.7423, lng: 144.9631 },
      phone: "(03) 9041 5031",
      hours: {
        'Monday': '9:00 AM - 5:00 PM',
        'Tuesday': '9:00 AM - 5:00 PM',
        'Wednesday': '9:00 AM - 5:00 PM',
        'Thursday': '9:00 AM - 5:00 PM',
        'Friday': '9:00 AM - 5:00 PM'
      },
      parking: "Limited street parking available",
      transport: ["Train to Coburg Station", "Tram 19"]
    }
  ];

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

  // Factory.ai Enhanced Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Add Factory.ai enhancements when section comes into view
            const sectionElement = entry.target as HTMLElement;
            factoryAIEnhanced.enhanceLocationCard(sectionElement);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Factory.ai Enhanced Card Interactions
  useEffect(() => {
    Object.values(cardRefs.current).forEach(cardElement => {
      if (cardElement) {
        factoryAIEnhanced.enhanceLocationCard(cardElement);
      }
    });
  }, [activeTab]);

  const handleMapLoad = (locationId: string) => {
    setMapLoaded(prev => ({ ...prev, [locationId]: true }));
  };

  const handleDirectionsClick = useCallback((address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    
    // Factory.ai Enhanced Analytics
    console.log('Factory AI: User requested directions to:', address);
  }, []);

  const handleCallClick = useCallback((phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
      
      // Factory.ai Enhanced Analytics
      console.log('Factory AI: User initiated call to:', phone);
    }
  }, []);

  const handleTabChange = useCallback((locationId: string) => {
    setActiveTab(locationId);
    
    // Factory.ai Enhanced Tab Analytics and Smooth Transition
    console.log(`Factory AI: Location tab changed to ${locationId}`);
    
    // Add enhanced haptic feedback for mobile users
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const activeLocation = locations.find(loc => loc.id === activeTab) || locations[0];

  if (!apiKey) {
    return (
      <section className="bg-gradient-to-b from-white to-[#f0f7f7] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className={`bg-gradient-to-b from-white to-[#f0f7f7] py-12 sm:py-16 relative overflow-hidden transition-all duration-700 ${
        isInView ? 'animate-in' : 'opacity-0 translate-y-8'
      }`}
      data-preload="true"
    >
      {/* Factory.ai Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-trust/5 opacity-60"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary-trust/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-6xl mx-auto text-center mb-8 sm:mb-12 transition-all duration-700 delay-200 ${
          isInView ? 'animate-slide-in' : 'opacity-0 translate-x-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 backdrop-blur-sm border border-primary/20 shadow-lg">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <Sparkles className="mr-2 h-3 w-3 opacity-70" />
            Practice Locations
          </div>
          <h2 className="heading-fluid text-3xl md:text-4xl font-bold text-text-primary mb-6 text-balance">
            Three Convenient Locations
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg leading-relaxed text-balance">
            We offer in-person counselling sessions at three locations across Melbourne's north, 
            plus telehealth sessions for your convenience.
          </p>
        </div>
        
        {/* Location Tabs */}
        <div className={`max-w-4xl mx-auto mb-8 transition-all duration-700 delay-300 ${
          isInView ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
          <div className="flex flex-wrap justify-center gap-2 p-2 card-modern">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => handleTabChange(location.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 interactive-element relative overflow-hidden ${
                  activeTab === location.id
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg btn-primary-2025'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/70 backdrop-blur-sm'
                }`}
                style={{
                  animationDelay: `${400 + index * 100}ms`
                }}
              >
                <span className="relative z-10">
                  {location.name}
                  {location.id === 'brunswick' && (
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                      Primary
                    </span>
                  )}
                </span>
                {activeTab === location.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-healing to-primary-healing-light opacity-90 rounded-md"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Location Details */}
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-500 ${
          isInView ? 'animate-in' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            ref={(el) => cardRefs.current[activeLocation.id] = el}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Map Section - Isolated from backdrop effects */}
              <div className="relative h-80 lg:h-96 bg-gray-100">
                {!mapLoaded[activeLocation.id] && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <div className="animate-pulse flex flex-col items-center">
                      <svg className="h-10 w-10 text-primary/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-text-secondary/60">Loading map...</span>
                    </div>
                  </div>
                )}
                
                <iframe
                  key={activeLocation.id}
                  title={`Map for ${activeLocation.name}`}
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0,
                    display: 'block',
                    position: 'relative',
                    zIndex: 1
                  }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(activeLocation.address)}&output=embed&z=15`}
                  allowFullScreen
                  onLoad={() => handleMapLoad(activeLocation.id)}
                />
              </div>

              {/* Location Information */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">
                      {activeLocation.name}
                    </h3>
                    <address className="not-italic text-text-secondary mb-3">
                      {activeLocation.address}
                    </address>
                  </div>
                  {activeLocation.id === 'brunswick' && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Primary
                    </span>
                  )}
                </div>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {activeLocation.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => handleDirectionsClick(activeLocation.address)}
                    className="btn-primary-2025 inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium interactive-element"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    Get Directions
                  </button>
                  
                  <button
                    onClick={() => handleCallClick(activeLocation.phone)}
                    className="inline-flex items-center justify-center bg-white/70 backdrop-blur-sm border-2 border-primary/20 text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium interactive-element"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call Now
                  </button>
                </div>

                {/* Hours */}
                {activeLocation.hours && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <svg className="mr-2 h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Hours
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(activeLocation.hours).map(([day, time]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-text-secondary">{day}:</span>
                          <span className="text-text-primary font-medium">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {activeLocation.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t bg-gray-50 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Parking */}
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
                  <div>
                    <h5 className="font-medium text-text-primary mb-1">Parking</h5>
                    <p className="text-sm text-text-secondary">{activeLocation.parking}</p>
                  </div>
                </div>

                {/* Transport */}
                <div className="flex items-start">
                  <Train className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-text-primary mb-1">Transport</h5>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {activeLocation.transport?.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="flex items-start">
                  <Accessibility className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-text-primary mb-1">Accessibility</h5>
                    <p className="text-sm text-text-secondary">
                      {activeLocation.id === 'brunswick' && "Ground floor access, wheelchair accessible"}
                      {activeLocation.id === 'coburg-bell' && "Ground floor, wheelchair accessible"}
                      {activeLocation.id === 'coburg-solana' && "Lift access, wheelchair accessible"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}