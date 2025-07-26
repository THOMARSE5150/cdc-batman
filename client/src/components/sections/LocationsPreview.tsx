import { motion } from "framer-motion";

import { Link } from "wouter";

const locations = [
  {
    id: 'brunswick',
    name: 'Brunswick',
    subtitle: 'Primary Location',
    address: '503 Sydney Road, Brunswick VIC 3056',
    parking: 'Ample parking close by, 19 Sydney road tram nearby',
    accessibility: 'Ground floor access',
    phone: '0438 593 071',
    isPrimary: true
  },
  {
    id: 'coburg-bell',
    name: 'Coburg - Bell Street',
    subtitle: 'Convenient Location',
    address: '81B Bell Street, Coburg VIC 3058',
    parking: 'Ample parking close by, 19 Sydney road tram nearby',
    accessibility: 'Ground floor access',
    phone: '0438 593 071',
    isPrimary: false
  },
  {
    id: 'coburg-solana',
    name: 'Coburg - Solana Psychology',
    subtitle: 'Professional Centre',
    address: 'FL 1, 420 Sydney Road, Coburg VIC 3058',
    parking: 'Ample parking close by, 19 Sydney road tram nearby',
    accessibility: 'Ground floor access',
    phone: '0438 593 071',
    isPrimary: false
  }
];

export default function LocationsPreview() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f0f7f7] py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Practice Locations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            You can choose from three convenient locations in Coburg or Brunswick or via Telehealth
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Contact Celia to book first session at location of choice.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                location.isPrimary ? 'ring-2 ring-primary/20 bg-gradient-to-br from-white to-primary/5' : ''
              }`}
            >
              {location.isPrimary && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-medium mb-4">
                  Primary Location
                </div>
              )}
              
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {location.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-4">
                {location.subtitle}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-sm text-text-secondary">{location.address}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h.01M12 16h.01M16 20v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h10zm2-10v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
                  </svg>
                  <span className="text-sm text-text-secondary">{location.parking}</span>
                </div>
                

              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${location.phone}`}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call
                </a>
                <Link
                  href="/locations"
                  className="flex items-center justify-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary-light hover:text-white transition-colors text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Telehealth Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 text-center"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Telehealth is an available option
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Contact Celia to book first session at location of choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Book Telehealth Session
            </Link>
            <Link 
              href="/locations"
              className="inline-flex items-center justify-center border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light hover:text-white transition-colors font-medium"
            >
              View All Locations
            </Link>
          </div>
        </motion.div>

        {/* Quick Access Footer */}
        <div className="text-center mt-8">
          <p className="text-text-secondary mb-4">
            Need directions or want to see detailed maps?
          </p>
          <Link
            href="/locations"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            View Interactive Maps & Directions
          </Link>
        </div>
      </div>
    </section>
  );
}