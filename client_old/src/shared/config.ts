/**
 * Central configuration file for the application
 * Contains URLs and other configuration that might need to be updated
 */

export const config = {
  // External service URLs
  urls: {
    // The URL to Halaxy booking system - update this when you get the correct URL from Halaxy
    halaxyBooking: "https://www.halaxy.com", // Replace with Celia's actual Halaxy booking URL
    
    // Your personal Halaxy profile page - update this when you get the correct URL from Halaxy
    halaxyProfile: "https://www.halaxy.com",
    
    // Email for booking requests (used when direct booking isn't available)
    bookingEmail: "hello@celiadunsmorecounselling.com.au",
  },
  
  // Halaxy integration status
  halaxy: {
    // Set to true once Halaxy online booking is verified and available
    directBookingAvailable: false, // Keep as false until verification fully completes
    
    // Message to display when direct booking isn't available yet
    pendingMessage: "Online booking is currently being set up. Please contact me directly to schedule an appointment.",
  },
  
  // Contact information
  contact: {
    email: "hello@celiadunsmorecounselling.com.au",
    phone: "(03) 9123 4567", // Update with your actual phone number
    address: {
      line1: "Melbourne Integrated Therapies",
      line2: "503 Sydney Road",
      city: "Brunswick",
      state: "VIC",
      country: "Australia"
    }
  }
};