import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Logo from "@/components/ui/Logo";
import { getPerformanceSettings } from "./lib/performance";
import LocationSection from "@/components/sections/LocationSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { StaticModeBanner } from "@/components/ui/StaticModeBanner";

// Eagerly load the Home page for best initial load experience
import Home from "@/pages/Home";

// Lazy load all other pages to reduce initial bundle size
const NotFound = lazy(() => import("@/pages/not-found"));
const MeetCelia = lazy(() => import("@/pages/MeetCelia"));
const Services = lazy(() => import("@/pages/Services"));
const ClientDiversity = lazy(() => import("@/pages/ClientDiversity"));
const Fees = lazy(() => import("@/pages/Fees"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const BookingHelp = lazy(() => import("@/pages/BookingHelp"));

// Admin pages
const AdminCalendar = lazy(() => import("@/pages/admin/Calendar"));
const AdminContacts = lazy(() => import("@/pages/AdminContacts"));

// Regular layout with header for client-facing pages
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <StaticModeBanner />
      <Header />
      <main className="flex-grow">{children}</main>
      <LocationSection />
      <Footer />
    </div>
  );
};

// Admin layout with simplified header for admin pages
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <div className="bg-white border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Logo className="transform scale-90" />
        </Link>
      </div>
      <Link href="/" className="text-sm text-gray-600 hover:text-primary">← Back to Website</Link>
    </div>
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Admin routes */}
        <Route path="/admin/calendar">
          <AdminLayout>
            <AdminCalendar />
          </AdminLayout>
        </Route>
        
        <Route path="/admin/contacts">
          <AdminLayout>
            <AdminContacts />
          </AdminLayout>
        </Route>
        
        {/* Client-facing routes */}
        <Route path="/">
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path="/meet-celia">
          <MainLayout>
            <MeetCelia />
          </MainLayout>
        </Route>
        <Route path="/services">
          <MainLayout>
            <Services />
          </MainLayout>
        </Route>
        <Route path="/client-diversity">
          <MainLayout>
            <ClientDiversity />
          </MainLayout>
        </Route>
        <Route path="/fees">
          <MainLayout>
            <Fees />
          </MainLayout>
        </Route>
        <Route path="/faq">
          <MainLayout>
            <FAQ />
          </MainLayout>
        </Route>
        <Route path="/contact">
          <MainLayout>
            <Contact />
          </MainLayout>
        </Route>
        
        <Route path="/booking-help">
          <MainLayout>
            <BookingHelp />
          </MainLayout>
        </Route>
        
        {/* 404 route */}
        <Route>
          <MainLayout>
            <NotFound />
          </MainLayout>
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  // Get performance settings to optimize animations
  const performanceSettings = getPerformanceSettings();
  
  useEffect(() => {
    // Set true viewport height for iOS devices
    const setViewportHeight = () => {
      // First, get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Set the height initially
    setViewportHeight();
    
    // Update height on window resize or orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
