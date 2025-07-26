export default function FooterSimple() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Celia Dunsmore Counselling</h3>
            <p className="text-gray-300">
              Accredited Mental Health Social Worker providing professional counselling 
              services in Melbourne's inner north.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 space-y-2">
              <p>Phone: 0438 593 071</p>
              <p>Email: hello@celiadunsmorecounselling.com.au</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Locations</h3>
            <div className="text-gray-300 space-y-2">
              <p>Brunswick - 503 Sydney Road</p>
              <p>Coburg - 81B Bell Street</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Celia Dunsmore Counselling. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}