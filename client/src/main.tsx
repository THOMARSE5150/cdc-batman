import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeMobilePerformanceMonitor } from "./utils/performanceMonitor";

// Error boundary to catch frontend crashes
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "#c00" }}>
          <h1>Something went wrong.</h1>
          <p>{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Railway-optimized initialization
function initializeApp() {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  
  // Clear loading screen
  rootElement.innerHTML = '';
  
  try {
    console.log("🚀 Starting Celia Dunsmore Counselling...");
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    // Initialize mobile performance monitoring after React load
    setTimeout(() => {
      initializeMobilePerformanceMonitor();
    }, 100);
    
    console.log("✅ Application loaded successfully");
  } catch (error) {
    console.error("React initialization failed:", error);
    
    // Try to load minimal home page directly
    try {
      import("@/pages/Home.minimal").then((HomeModule) => {
        const Home = HomeModule.default;
        const root = createRoot(rootElement);
        root.render(<Home />);
        console.log("✅ Fallback to minimal home successful");
      }).catch((fallbackError) => {
        console.error("Minimal page also failed:", fallbackError);
        
        // Final static fallback
        rootElement.innerHTML = `
          <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; font-family: system-ui, sans-serif; background: linear-gradient(135deg, #f0f7f7 0%, #ffffff 100%);">
            <h1 style="color: #243740; font-size: 2rem; margin-bottom: 1rem; text-align: center;">Celia Dunsmore Counselling</h1>
            <p style="color: #4EB3A5; font-size: 1.1rem; margin-bottom: 2rem; text-align: center;">Creating positive change through compassionate counselling</p>
            <div style="max-width: 600px; text-align: center;">
              <p style="color: #666; margin-bottom: 1rem;">Professional mental health counselling in Brunswick and Coburg, Melbourne.</p>
              <p style="color: #666; margin-bottom: 1rem;">Individual therapy • Trauma recovery • Emotional wellbeing support</p>
              <p style="color: #4EB3A5; font-weight: 500;">📞 0438 593 071 | ✉️ hello@celiadunsmorecounselling.com.au</p>
            </div>
          </div>
        `;
      });
    } catch (importError) {
      console.error("Import failed:", importError);
    }
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}