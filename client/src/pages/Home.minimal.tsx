import HeaderSimple from "../components/layout/HeaderSimple";
import FooterSimple from "../components/layout/FooterSimple";

export default function Home() {
  return (
    <>
      <HeaderSimple />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 pt-16">
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
            <div className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors">
              Book Your Appointment
            </div>
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
      <FooterSimple />
    </>
  );
}