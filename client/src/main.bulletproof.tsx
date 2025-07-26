
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Bulletproof app component
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">Celia Dunsmore Counselling</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Celia Dunsmore Counselling</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Accredited Mental Health Social Worker providing professional, compassionate 
            counselling services in Brunswick and Coburg, Melbourne.
          </p>
          <a href="mailto:hello@celiadunsmorecounselling.com.au" 
             className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors">
            Contact Me Today
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Individual Counselling</h3>
            <p className="text-gray-600">One-on-one support for anxiety, depression, trauma, and life transitions.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Medicare Rebates</h3>
            <p className="text-gray-600">Bulk billing available for eligible clients with Mental Health Treatment Plans.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Telehealth Available</h3>
            <p className="text-gray-600">Convenient online sessions for those who prefer remote counselling.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">About Celia</h2>
          <div className="text-lg text-gray-700 space-y-4 max-w-4xl mx-auto">
            <p>As an Accredited Mental Health Social Worker (AMHSW), I provide professional counselling services to individuals seeking support for various mental health concerns.</p>
            <p>I believe in creating a safe, non-judgmental space where you can explore your thoughts and feelings while developing effective coping strategies.</p>
            <p>My practice serves the Brunswick, Coburg, and surrounding Melbourne communities with both in-person and telehealth options.</p>
          </div>
        </div>

        <div className="bg-teal-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8">Contact me today to discuss how I can support your mental health journey.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="mailto:hello@celiadunsmorecounselling.com.au" 
               className="bg-white text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Email Me
            </a>
            <a href="tel:+61234567890" 
               className="border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bulletproof initialization
try {
  const root = document.getElementById("root");
  if (root) {
    const reactRoot = createRoot(root);
    reactRoot.render(<App />);
    console.log("✅ Celia Dunsmore Counselling site loaded successfully");
  }
} catch (error) {
  console.error("Failed to load:", error);
  // Fallback to direct HTML
  document.getElementById("root").innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
      <h1 style="color: #00d4aa; margin-bottom: 1rem;">Celia Dunsmore Counselling</h1>
      <p style="color: #666;">Please refresh the page or contact us directly at hello@celiadunsmorecounselling.com.au</p>
    </div>
  `;
}