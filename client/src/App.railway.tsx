// Railway-optimized minimal app - Direct content without complex routing
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Simple navigation
  const Header = () => (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Celia Dunsmore Counselling</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => setCurrentPage("home")} className="text-gray-600 hover:text-gray-900">Home</button>
            <button onClick={() => setCurrentPage("about")} className="text-gray-600 hover:text-gray-900">About</button>
            <button onClick={() => setCurrentPage("services")} className="text-gray-600 hover:text-gray-900">Services</button>
            <button onClick={() => setCurrentPage("contact")} className="text-gray-600 hover:text-gray-900">Contact</button>
          </nav>
        </div>
      </div>
    </header>
  );

  // Page content
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Celia Dunsmore Counselling
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Accredited Mental Health Social Worker providing professional, compassionate 
            counselling services in Brunswick and Coburg, Melbourne.
          </p>
          <button onClick={() => setCurrentPage("contact")} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors">
            Book Your Appointment
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Individual Counselling</h3>
            <p className="text-gray-600">
              One-on-one support for anxiety, depression, trauma, and life transitions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Medicare Rebates</h3>
            <p className="text-gray-600">
              Bulk billing available for eligible clients with Mental Health Treatment Plans.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Telehealth Available</h3>
            <p className="text-gray-600">
              Convenient online sessions for those who prefer remote counselling.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">About Celia</h2>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                As an Accredited Mental Health Social Worker (AMHSW), I provide professional 
                counselling services to individuals seeking support for various mental health concerns.
              </p>
              <p>
                I believe in creating a safe, non-judgmental space where you can explore your 
                thoughts and feelings while developing effective coping strategies and achieving 
                your personal goals.
              </p>
              <p>
                My practice is located in Melbourne inner north, serving the Brunswick, 
                Coburg, and surrounding communities with both in-person and telehealth options.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-teal-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8">
            Contact me today to discuss how I can support your mental health journey.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-lg">0438 593 071</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-lg">hello@celiadunsmorecounselling.com.au</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Counselling Services</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Individual Therapy</h3>
            <p className="text-gray-600 mb-4">
              Personalized one-on-one sessions focusing on your specific mental health needs and goals.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Anxiety and depression support</li>
              <li>Trauma recovery and processing</li>
              <li>Life transitions and adjustment</li>
              <li>Stress management techniques</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Telehealth Sessions</h3>
            <p className="text-gray-600 mb-4">
              Convenient online counselling sessions from the comfort and privacy of your own space.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Secure video conferencing</li>
              <li>Flexible scheduling options</li>
              <li>Same professional standards</li>
              <li>Privacy and confidentiality assured</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Medicare Rebates</h3>
            <p className="text-gray-600 mb-4">
              Eligible clients can receive Medicare rebates for counselling sessions with a Mental Health Treatment Plan.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Bulk billing available</li>
              <li>GP referral required</li>
              <li>Up to 20 sessions per year</li>
              <li>Significant cost savings</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Locations</h3>
            <p className="text-gray-600 mb-4">
              Convenient locations in Melbourne's inner north suburbs.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Brunswick practice</li>
              <li>Coburg locations</li>
              <li>Telehealth Australia-wide</li>
              <li>Easy public transport access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Me</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">0438 593 071</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">hello@celiadunsmorecounselling.com.au</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Locations</h4>
                  <p className="text-gray-600">Brunswick & Coburg, Melbourne</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">How to Book</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Call or email me directly to discuss your needs and schedule an appointment.
                </p>
                <p className="text-gray-600">
                  For Medicare rebates, please obtain a Mental Health Treatment Plan from your GP first.
                </p>
                <p className="text-gray-600">
                  I offer both in-person and telehealth sessions to suit your preferences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
            <p className="text-gray-600 mb-4">
              I offer flexible appointment times to accommodate your schedule, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Weekday appointments</li>
              <li>Some evening sessions available</li>
              <li>Saturday appointments by arrangement</li>
              <li>Telehealth sessions available outside standard hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage />;
      case "contact":
        return <ContactPage />;
      case "about":
        return <ContactPage />; // Reuse contact for simplicity
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {renderPage()}
    </div>
  );
}