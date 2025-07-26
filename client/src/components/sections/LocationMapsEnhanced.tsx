import React, { useState, useEffect, useRef, useCallback } from 'react';


// Extend Window interface for Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
    initGoogleMaps: () => void;
  }
}

interface LocationData {
  id: string;
  name: string;
  address: string;
  description: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  parking: string;
  accessibility: string;
  sessionType?: string;
  note?: string;
}

export default function LocationMapsEnhanced() {
  const [activeTab, setActiveTab] = useState<string>('brunswick');
  const [mapLoaded, setMapLoaded] = useState<{ [key: string]: boolean }>({});
  const [mapError, setMapError] = useState<{ [key: string]: boolean }>({});
  const [apiKey, setApiKey] = useState<string>('');
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState<boolean>(false);
  const mapRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mapInstances = useRef<{ [key: string]: any }>({});
  const loadTimeout = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const initialized = useRef<{ [key: string]: boolean }>({});

  // Location data - hours will be displayed from Google Business listings
  const locations: LocationData[] = [
    {
      id: 'brunswick',
      name: "Brunswick",
      address: "503 Sydney Road, Brunswick VIC 3056",
      description: "Primary location with excellent public transport access",
      coordinates: { lat: -37.7749, lng: 144.9631 },
      phone: "0438 593 071",
      parking: "Ample parking close by, 19 Sydney road tram nearby",
      accessibility: "Ground floor access"
    },
    {
      id: 'coburg-bell',
      name: "Coburg - Bell Street",
      address: "81B Bell Street, Coburg VIC 3058",
      description: "Convenient location",
      coordinates: { lat: -37.7559, lng: 144.9647 },
      phone: "0438 593 071",
      parking: "Ample parking close by, 19 Sydney road tram nearby",
      accessibility: "Ground floor access"
    },
    {
      id: 'coburg-solana',
      name: "Coburg - Solana Psychology",
      address: "Solana Psychology, FL 1, 420 Sydney Road, Coburg VIC 3058",
      description: "Convenient location",
      coordinates: { lat: -37.7401, lng: 144.9631 },
      phone: "0438 593 071",
      parking: "Ample parking close by, 19 Sydney road tram nearby",
      accessibility: "Ground floor access"
    }
  ];

  // Load Google Maps Script
  const loadGoogleMapsScript = useCallback((apiKey: string) => {
    return new Promise<void>((resolve, reject) => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for existing script to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle);
            resolve();
          }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkGoogle);
          reject(new Error('Google Maps script loading timeout'));
        }, 10000);
        return;
      }

      // Create and load the script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      // Set up global callback
      (window as any).initGoogleMaps = () => {
        window.dispatchEvent(new CustomEvent('google-maps-loaded'));
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps script'));
      };
      
      document.head.appendChild(script);
    });
  }, []);

  // Fetch Google Maps API key and load script
  useEffect(() => {
    const fetchApiKeyAndLoadScript = async () => {
      try {
        const response = await fetch('/api/config/maps');
        const config = await response.json();
        
        if (response.ok && config.apiKey) {
          setApiKey(config.apiKey);
          
          // Load Google Maps script
          try {
            await loadGoogleMapsScript(config.apiKey);
            console.log('Google Maps API loaded successfully');
            setGoogleMapsLoaded(true);
          } catch (scriptError) {
            console.error('Failed to load Google Maps script:', scriptError);
            // Set error state for all locations
            const errorState: { [key: string]: boolean } = {};
            locations.forEach(loc => {
              errorState[loc.id] = true;
            });
            setMapError(errorState);
          }
        } else {
          console.error('Failed to fetch Google Maps API key:', config.error);
          // Set error state for all locations
          const errorState: { [key: string]: boolean } = {};
          locations.forEach(loc => {
            errorState[loc.id] = true;
          });
          setMapError(errorState);
        }
      } catch (error) {
        console.error('Error fetching API configuration:', error);
        // Set error state for all locations
        const errorState: { [key: string]: boolean } = {};
        locations.forEach(loc => {
          errorState[loc.id] = true;
        });
        setMapError(errorState);
      }
    };

    fetchApiKeyAndLoadScript();
  }, [loadGoogleMapsScript]);

  // Initialize individual map with progressive loading and fallback
  const initializeMap = useCallback((location: LocationData) => {
    const mapElement = mapRefs.current[location.id];
    
    if (!mapElement || !apiKey || !googleMapsLoaded) return;
    
    // Prevent re-initialization if map is already initialized
    if (initialized.current[location.id] || mapInstances.current[location.id]) {
      return;
    }

    // Mark as initializing
    initialized.current[location.id] = true;

    // Set loading timeout (3-5 seconds as specified)
    loadTimeout.current[location.id] = setTimeout(() => {
      if (!mapLoaded[location.id]) {
        console.log(`Map loading timeout for ${location.name}, showing fallback`);
        setMapError(prev => ({ ...prev, [location.id]: true }));
      }
    }, 4000);

    try {
      // Try to initialize Google Maps
      if (window.google && window.google.maps) {
        const mapOptions = {
          center: location.coordinates,
          zoom: 15,
          gestureHandling: 'cooperative',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          disableDefaultUI: false,
          backgroundColor: '#f0f7f7',
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text",
              stylers: [{ visibility: "off" }]
            }
          ]
        };

        const map = new window.google.maps.Map(mapElement, mapOptions);
        mapInstances.current[location.id] = map;

        // Create custom marker
        const marker = new window.google.maps.Marker({
          position: location.coordinates,
          map: map,
          title: location.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#00d4aa" stroke="white" stroke-width="4"/>
                <path d="M20 10c-5.5 0-10 4.5-10 10 0 7.5 10 15 10 15s10-7.5 10-15c0-5.5-4.5-10-10-10z" fill="white"/>
                <circle cx="20" cy="20" r="4" fill="#00d4aa"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }
        });

        // Success callback - only trigger once
        const tilesLoadedHandler = () => {
          if (loadTimeout.current[location.id]) {
            clearTimeout(loadTimeout.current[location.id]);
          }
          if (!mapLoaded[location.id]) {
            setMapLoaded(prev => ({ ...prev, [location.id]: true }));
            console.log(`Map loaded successfully for ${location.name}`);
          }
        };
        
        map.addListener('tilesloaded', tilesLoadedHandler);

      } else {
        // Google Maps not available, show fallback
        setMapError(prev => ({ ...prev, [location.id]: true }));
      }
    } catch (error) {
      console.error(`Error initializing map for ${location.name}:`, error);
      setMapError(prev => ({ ...prev, [location.id]: true }));
    }
  }, [apiKey, googleMapsLoaded]);

  // Initialize maps when Google Maps API is loaded and DOM is ready
  useEffect(() => {
    if (apiKey && googleMapsLoaded && window.google && window.google.maps) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        locations.forEach(location => {
          initializeMap(location);
        });
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [apiKey, googleMapsLoaded, initializeMap]);

  // Handle tab changes
  const handleTabChange = (locationId: string) => {
    setActiveTab(locationId);
    
    // Only initialize map if it hasn't been initialized yet
    const location = locations.find(loc => loc.id === locationId);
    if (location && !initialized.current[locationId] && !mapInstances.current[locationId] && googleMapsLoaded) {
      setTimeout(() => {
        initializeMap(location);
      }, 100);
    }
  };

  // Utility functions
  const handleDirectionsClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleInteractiveMapClick = (location: LocationData) => {
    // Open Google Maps search for the business name and location
    const searchQuery = encodeURIComponent(`Celia Dunsmore Counselling ${location.address}`);
    window.open(`https://maps.google.com/maps/search/${searchQuery}`, '_blank');
  };

  // Hours information is available on Google Business listings

  const activeLocation = locations.find(loc => loc.id === activeTab) || locations[0];

  return (
    <section className="bg-gradient-to-b from-white to-background py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Practice Locations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            You can choose from three convenient locations in Coburg or Brunswick or via Telehealth
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Contact Celia to book first session at location of choice.
          </p>
        </div>

        {/* Location Tabs */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-lg">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleTabChange(location.id)}
                className={`px-4 sm:px-6 py-3 rounded-md font-medium transition-all duration-200 min-h-[44px] ${
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

        {/* Active Location Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Map Section */}
              <div className="relative h-64 sm:h-80 lg:h-96">
                {/* Map Container */}
                <div
                  ref={(el) => {
                    if (el) mapRefs.current[activeLocation.id] = el;
                  }}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    mapLoaded[activeLocation.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Loading State */}
                {!mapLoaded[activeLocation.id] && !mapError[activeLocation.id] && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                      <svg className="h-10 w-10 text-primary/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="text-text-secondary/60">Loading map...</span>
                    </div>
                  </div>
                )}

                {/* Professional Fallback */}
                {mapError[activeLocation.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {activeLocation.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4">
                        {activeLocation.address}
                      </p>
                      <button
                        onClick={() => handleInteractiveMapClick(activeLocation)}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors min-h-[44px]"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                        View Interactive Map
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Information Section */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {activeLocation.name}
                  </h3>
                  <p className="text-text-secondary mb-1">{activeLocation.address}</p>
                  <p className="text-text-light text-sm">{activeLocation.description}</p>
                  {activeLocation.note && (
                    <p className="text-primary text-sm font-medium mt-2">{activeLocation.note}</p>
                  )}
                </div>

                {/* Hours available on Google Business */}
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Opening Hours
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Visit our Google Business listing for current opening hours and availability.
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <svg className="h-4 w-4 mr-2 mt-0.5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6h3l2 3v8a2 2 0 01-2 2h-1"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17H6a2 2 0 01-2-2V9a2 2 0 012-2h3"/>
                    </svg>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Parking: </span>
                      <span className="text-sm text-text-secondary">{activeLocation.parking}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-4 w-4 mr-2 mt-0.5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <span className="text-sm font-medium text-text-primary">Accessibility: </span>
                      <span className="text-sm text-text-secondary">{activeLocation.accessibility}</span>
                    </div>
                  </div>
                  {activeLocation.sessionType && (
                    <div className="flex items-start">
                      <svg className="h-4 w-4 mr-2 mt-0.5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <div>
                        <span className="text-sm font-medium text-text-primary">Sessions: </span>
                        <span className="text-sm text-text-secondary">{activeLocation.sessionType}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleCallClick(activeLocation.phone)}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium min-h-[44px]"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Call {activeLocation.phone}
                  </button>
                  <button
                    onClick={() => handleDirectionsClick(activeLocation.address)}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 text-text-primary rounded-lg hover:bg-gray-200 transition-colors font-medium min-h-[44px]"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}