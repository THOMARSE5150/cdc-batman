import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import LocationMapsEnhanced from "@/components/sections/LocationMapsEnhanced";
import LocalBusinessSchema from "@/components/ui/LocalBusinessSchema";
import { SEO } from "@/components/ui/SEO";
import SimpleBreadcrumb from "@/components/ui/SimpleBreadcrumb";

export default function Locations() {
  const locations = [
    {
      name: "Brunswick Primary Location",
      address: "503 Sydney Road, Brunswick VIC 3056",
      phone: "0438 593 071",
      coordinates: { lat: -37.7749, lng: 144.9631 },
      hours: {
        'Monday': '9:00 AM - 5:00 PM',
        'Tuesday': '9:00 AM - 5:00 PM',
        'Wednesday': '9:00 AM - 5:00 PM',
        'Thursday': '9:00 AM - 5:00 PM',
        'Friday': '9:00 AM - 5:00 PM'
      }
    },
    {
      name: "Coburg Bell Street Location", 
      address: "81B Bell Street, Coburg VIC 3058",
      phone: "0438 593 071",
      coordinates: { lat: -37.7559, lng: 144.9647 },
      hours: {
        'Monday': '9:00 AM - 5:00 PM',
        'Tuesday': '9:00 AM - 5:00 PM',
        'Wednesday': '9:00 AM - 5:00 PM',
        'Thursday': '9:00 AM - 5:00 PM',
        'Friday': '9:00 AM - 5:00 PM'
      }
    }
  ];

  return (
    <>
      <SEO
        title="Practice Locations | Brunswick & Coburg Counselling | Celia Dunsmore"
        description="Visit Celia Dunsmore Counselling at convenient locations in Brunswick and Coburg, Melbourne's inner north. Professional mental health services with easy access via public transport."
        canonicalPath="/locations"
      />
      
      <LocalBusinessSchema locations={locations} />
      
      <PageHeader 
        title="Practice Locations" 
        description="Find the most convenient location for your counselling sessions"
      />
      
      <div className="container mx-auto px-4 py-8">
        <SimpleBreadcrumb />
      </div>
      
      <LocationMapsEnhanced />
      
      {/* Telehealth Option */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Telehealth is an available option
            </h3>
            <p className="text-text-secondary mb-4 max-w-2xl mx-auto">
              Contact Celia to book first session at location of choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Book Telehealth Session
              </a>
              <a 
                href="/booking-help"
                className="inline-flex items-center justify-center border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light hover:text-white transition-colors font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}