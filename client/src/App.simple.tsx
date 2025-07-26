import HeaderSimple from "@/components/layout/HeaderSimple";
import FooterSimple from "@/components/layout/FooterSimple";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <HeaderSimple />
      
      <main className="pt-16">
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
            <a 
              href="tel:0438593071"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              Call Now: 0438 593 071
            </a>
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

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Get Started Today</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Phone:</strong> 0438 593 071</p>
                  <p><strong>Email:</strong> hello@celiadunsmorecounselling.com.au</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Locations</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Brunswick - 503 Sydney Road</p>
                  <p>Coburg - 81B Bell Street</p>
                  <p>Telehealth sessions available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FooterSimple />
    </div>
  );
}

export default App;