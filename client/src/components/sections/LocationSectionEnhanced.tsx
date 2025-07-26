import React, { useState, useEffect, useRef, useCallback } from 'react';


// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
    initMaps: () => void;
  }
}

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

export default function LocationSectionEnhanced() {
  const [activeTab, setActiveTab] = useState<string>('brunswick');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [isInView, setIsInView] = useState<boolean>(false);
  const mapRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const mapsInitialized = useRef<boolean>(false);

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
          setMapLoaded(true);
        } else {
          console.error('Failed to fetch Google Maps API key:', config.error);
        }
      } catch (error) {
        console.error('Error fetching API configuration:', error);
      }
    };

    fetchApiKey();
  }, []);

  const initializeMaps = useCallback(() => {
    console.log('Initializing maps for', locations.length, 'locations');
    
    locations.forEach((location) => {
      const mapElement = mapRefs.current[location.id];
      console.log(`Processing ${location.name}, element:`, mapElement, 'Google available:', !!window.google);
      
      if (mapElement && window.google && window.google.maps) {
        try {
          console.log(`Creating map for ${location.name}`);
          
          // AI-Enhanced map configuration with better error handling
          const mapOptions = {
            center: location.coordinates,
            zoom: 15,
            gestureHandling: 'cooperative',
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            disableDefaultUI: false,
            backgroundColor: '#f0f7f7'
          };

          const map = new window.google.maps.Map(mapElement, mapOptions);
          
          // Enhanced marker with AI optimization
          let marker;
          if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
            console.log(`Factory AI: Using Advanced Marker for ${location.name}`);
            
            // Create enhanced marker element
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
              <div style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #00d4aa, #33e0bb);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 16px rgba(0, 212, 170, 0.4);
                border: 3px solid white;
                cursor: pointer;
              ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            `;

            marker = new window.google.maps.marker.AdvancedMarkerElement({
              map: map,
              position: location.coordinates,
              content: markerElement,
              title: location.name
            });
          } else {
            console.log(`Factory AI: Using Standard Marker for ${location.name}`);
            marker = new window.google.maps.Marker({
              position: location.coordinates,
              map: map,
              title: location.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="#00d4aa" stroke="white" stroke-width="4"/>
                    <path d="M16 8c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill="white"/>
                    <circle cx="16" cy="16" r="3" fill="#00d4aa"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 32)
              }
            });
          }

          // Enhanced info window with AI styling
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 280px; padding: 4px;">
                <div style="background: linear-gradient(135deg, #00d4aa, #33e0bb); color: white; padding: 16px; border-radius: 12px 12px 0 0; margin: -4px -4px 12px -4px;">
                  <h3 style="margin: 0; font-size: 18px; font-weight: 600;">${location.name}</h3>
                </div>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${location.address}</p>
                <p style="margin: 0 0 16px 0; color: #374151; font-size: 14px; line-height: 1.4;">${location.description}</p>
                <div style="display: flex; gap: 8px;">
                  <a href="https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}" 
                     target="_blank" 
                     style="display: inline-flex; align-items: center; background: #00d4aa; color: white; padding: 10px 16px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; flex: 1; justify-content: center;">
                    🧭 Directions
                  </a>
                  ${location.phone ? `
                    <a href="tel:${location.phone}" 
                       style="display: inline-flex; align-items: center; background: #f3f4f6; color: #374151; padding: 10px 12px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
                      📞 Call
                    </a>
                  ` : ''}
                </div>
              </div>
            `
          });

          // Enhanced marker interaction with AI tracking
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
            console.log(`Factory AI: Info window opened for ${location.name}`);
          });

          console.log(`Factory AI: Successfully created map for ${location.name}`);
        } catch (error) {
          console.error(`Factory AI: Error initializing map for ${location.name}:`, error);
        }
      } else {
        console.warn(`Factory AI: Cannot initialize map for ${location.name} - missing requirements:`, {
          hasElement: !!mapElement,
          hasGoogle: !!window.google,
          hasMaps: !!(window.google && window.google.maps)
        });
      }
    });
  }, []);

  const handleDirectionsClick = useCallback((address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps/search/${encodedAddress}`, '_blank');
  }, []);

  const handleCallClick = useCallback((phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }, []);

  const handleTabChange = useCallback((locationId: string) => {
    setActiveTab(locationId);
    console.log(`Factory AI: Tab changed to ${locationId}`);
    
    // Re-initialize map for the new active location after a short delay
    setTimeout(() => {
      const newLocation = locations.find(loc => loc.id === locationId);
      if (newLocation && window.google && window.google.maps) {
        const mapElement = mapRefs.current[locationId];
        if (mapElement) {
          console.log(`Initializing map for newly active location: ${newLocation.name}`);
          
          try {
            const mapOptions = {
              center: newLocation.coordinates,
              zoom: 15,
              gestureHandling: 'cooperative',
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              zoomControl: true,
              disableDefaultUI: false,
              backgroundColor: '#f0f7f7'
            };

            const map = new window.google.maps.Map(mapElement, mapOptions);
            
            const marker = new window.google.maps.Marker({
              position: newLocation.coordinates,
              map: map,
              title: newLocation.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="#00d4aa" stroke="white" stroke-width="4"/>
                    <path d="M16 8c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill="white"/>
                    <circle cx="16" cy="16" r="3" fill="#00d4aa"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 32)
              }
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 280px; padding: 4px;">
                  <div style="background: linear-gradient(135deg, #00d4aa, #33e0bb); color: white; padding: 16px; border-radius: 12px 12px 0 0; margin: -4px -4px 12px -4px;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 600;">${newLocation.name}</h3>
                  </div>
                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${newLocation.address}</p>
                  <p style="margin: 0 0 16px 0; color: #374151; font-size: 14px; line-height: 1.4;">${newLocation.description}</p>
                  <div style="display: flex; gap: 8px;">
                    <a href="https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent(newLocation.address)}" 
                       target="_blank" 
                       style="display: inline-flex; align-items: center; background: #00d4aa; color: white; padding: 10px 16px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; flex: 1; justify-content: center;">
                      🧭 Directions
                    </a>
                    ${newLocation.phone ? `
                      <a href="tel:${newLocation.phone}" 
                         style="display: inline-flex; align-items: center; background: #f3f4f6; color: #374151; padding: 10px 12px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
                        📞 Call
                      </a>
                    ` : ''}
                  </div>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
              console.log(`Factory AI: Info window opened for ${newLocation.name}`);
            });

            console.log(`Factory AI: Successfully initialized map for ${newLocation.name}`);
          } catch (error) {
            console.error(`Factory AI: Error initializing map for ${newLocation.name}:`, error);
          }
        }
      }
    }, 100);
  }, []);
  
  const activeLocation = locations.find(loc => loc.id === activeTab) || locations[0];

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#f0f7f7] py-12 sm:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Practice Locations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Three Convenient Locations
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            We now offer in-person counselling sessions at three locations across Melbourne's north, 
            plus telehealth sessions for your convenience.
          </p>
        </div>
        
        {/* Location Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-lg">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleTabChange(location.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === location.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white'
                }`}
              >
                {location.name}
                {location.id === 'brunswick' && (
                  <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded">Primary</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Location Details */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Map Section */}
              <div className="relative h-80 lg:h-96">
                <div
                  ref={(el) => {
                    if (el) {
                      mapRefs.current[activeLocation.id] = el;
                      console.log(`Factory AI: Map container set for ${activeLocation.id}:`, el);
                      
                      // Initialize map immediately if Google is available
                      if (window.google && window.google.maps && mapLoaded) {
                        setTimeout(() => {
                          console.log(`Factory AI: Attempting immediate map initialization for ${activeLocation.name}`);
                          try {
                            const mapOptions = {
                              center: activeLocation.coordinates,
                              zoom: 15,
                              gestureHandling: 'cooperative',
                              mapTypeControl: false,
                              streetViewControl: false,
                              fullscreenControl: true,
                              zoomControl: true,
                              disableDefaultUI: false,
                              backgroundColor: '#f0f7f7'
                            };

                            const map = new window.google.maps.Map(el, mapOptions);
                            
                            const marker = new window.google.maps.Marker({
                              position: activeLocation.coordinates,
                              map: map,
                              title: activeLocation.name,
                              icon: {
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="18" fill="#00d4aa" stroke="white" stroke-width="4"/>
                                    <path d="M20 10c-5.5 0-10 4.5-10 10 0 7.5 10 15 10 15s10-7.5 10-15c0-5.5-4.5-10-10-10z" fill="white"/>
                                    <circle cx="20" cy="20" r="4" fill="#00d4aa"/>
                                  </svg>
                                `),
                                scaledSize: new window.google.maps.Size(40, 40)
                              }
                            });

                            const infoWindow = new window.google.maps.InfoWindow({
                              content: `
                                <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 280px; padding: 4px;">
                                  <div style="background: linear-gradient(135deg, #00d4aa, #33e0bb); color: white; padding: 16px; border-radius: 12px 12px 0 0; margin: -4px -4px 12px -4px;">
                                    <h3 style="margin: 0; font-size: 18px; font-weight: 600;">${activeLocation.name}</h3>
                                  </div>
                                  <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${activeLocation.address}</p>
                                  <p style="margin: 0 0 16px 0; color: #374151; font-size: 14px; line-height: 1.4;">${activeLocation.description}</p>
                                  <div style="display: flex; gap: 8px;">
                                    <a href="https://maps.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeLocation.address)}" 
                                       target="_blank" 
                                       style="display: inline-flex; align-items: center; background: #00d4aa; color: white; padding: 10px 16px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500; flex: 1; justify-content: center;">
                                      🧭 Get Directions
                                    </a>
                                    ${activeLocation.phone ? `
                                      <a href="tel:${activeLocation.phone}" 
                                         style="display: inline-flex; align-items: center; background: #f3f4f6; color: #374151; padding: 10px 12px; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
                                        📞 Call
                                      </a>
                                    ` : ''}
                                  </div>
                                </div>
                              `
                            });

                            marker.addListener('click', () => {
                              infoWindow.open(map, marker);
                              console.log(`Factory AI: Info window opened for ${activeLocation.name}`);
                            });

                            console.log(`Factory AI: Map successfully created for ${activeLocation.name}`);
                          } catch (error) {
                            console.error(`Factory AI: Failed to create map for ${activeLocation.name}:`, error);
                          }
                        }, 200);
                      }
                    }
                  }}
                  className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg"
                  style={{ minHeight: '320px' }}
                >
                  {!mapLoaded && (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-primary/30 rounded-lg">
                      <div className="text-center p-6">
                        <svg className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {activeLocation.name}
                        </h3>
                        <p className="text-text-secondary mb-4">
                          {activeLocation.address}
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleDirectionsClick(activeLocation.address)}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full justify-center"
                          >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                            Get Directions
                          </button>
                          <p className="text-xs text-text-secondary">
                            Loading interactive map...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                      Primary Location
                    </span>
                  )}
                </div>

                <p className="text-text-secondary mb-6">
                  {activeLocation.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {activeLocation.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hours */}
                {activeLocation.hours && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Opening Hours
                    </h4>
                    <div className="space-y-1">
                      {Object.entries(activeLocation.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-text-secondary">{day}:</span>
                          <span className="text-text-primary font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parking & Transport */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {activeLocation.parking && (
                    <div>
                      <h5 className="font-medium text-text-primary mb-2 flex items-center">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Parking
                      </h5>
                      <p className="text-sm text-text-secondary">{activeLocation.parking}</p>
                    </div>
                  )}
                  
                  {activeLocation.transport && (
                    <div>
                      <h5 className="font-medium text-text-primary mb-2">Public Transport</h5>
                      <div className="space-y-1">
                        {activeLocation.transport.map((option, index) => (
                          <p key={index} className="text-sm text-text-secondary">{option}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleDirectionsClick(activeLocation.address)}
                    className="flex-1 inline-flex items-center justify-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    Get Directions
                  </button>
                  
                  {activeLocation.phone && (
                    <button
                      onClick={() => handleCallClick(activeLocation.phone)}
                      className="flex-1 inline-flex items-center justify-center bg-gray-100 text-text-primary px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Call Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}