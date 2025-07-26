import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, lazy, Suspense, useState } from "react";
import HeaderBeastMode from "@/components/layout/HeaderBeastMode";
import Footer from "@/components/layout/Footer";
import FooterSimple from "@/components/layout/FooterSimple";
import Logo from "@/components/ui/Logo";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { CounsellingPlatformErrorBoundary, useGlobalErrorHandler } from "@/components/ErrorBoundaries";
import { ErrorBoundary } from "./utils/errorBoundary";
import MobileOptimization from "@/components/MobileOptimization";
import SmartMobileOptimizer from "@/components/ui/SmartMobileOptimizer";
import DesktopPerformanceGuard from "@/components/ui/DesktopPerformanceGuard";
import OptimizedCSS from "@/components/performance/OptimizedCSS";
import AIChatWidget from "@/components/ui/ai-chat-widget";


// Use the proper Home page with full design
import Home from "@/pages/Home";
const NotFound = lazy(() => import("@/pages/not-found"));
const MeetCelia = lazy(() => import("@/pages/MeetCelia"));
const Services = lazy(() => import("@/pages/Services"));
const ClientDiversity = lazy(() => import("@/pages/ClientDiversity"));
const Fees = lazy(() => import("@/pages/Fees"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const BookingHelp = lazy(() => import("@/pages/BookingHelp"));
const Locations = lazy(() => import("@/pages/Locations"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));

// Blog pages (currently hidden)
// const Blog = lazy(() => import("@/pages/Blog"));
// const AnxietyManagementMelbourne = lazy(() => import("@/pages/blog/AnxietyManagementMelbourne"));

// Admin pages
const AdminCalendar = lazy(() => import("@/pages/admin/Calendar"));
const AdminContacts = lazy(() => import("@/pages/AdminContacts"));
const WebhookTest = lazy(() => import("@/pages/WebhookTest"));
const ErrorBoundaryDemo = lazy(() => import("@/pages/ErrorBoundaryDemo"));

// Simplified layout for fast loading
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBeastMode />
      <main id="main-content" className="flex-grow pt-16">{children}</main>
      <Footer />
      <AIChatWidget />
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
    <FooterSimple />
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
        
        <Route path="/locations">
          <MainLayout>
            <Locations />
          </MainLayout>
        </Route>
        
        <Route path="/booking-help">
          <MainLayout>
            <BookingHelp />
          </MainLayout>
        </Route>
        
        {/* Blog routes (currently hidden) */}
        {/*
        <Route path="/blog">
          <MainLayout>
            <Blog />
          </MainLayout>
        </Route>
        
        <Route path="/blog/anxiety-management-melbourne">
          <MainLayout>
            <AnxietyManagementMelbourne />
          </MainLayout>
        </Route>
        */}
        
        <Route path="/sitemap">
          <Sitemap />
        </Route>
        
        <Route path="/privacy-policy">
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        </Route>
        
        <Route path="/terms-of-service">
          <MainLayout>
            <TermsOfService />
          </MainLayout>
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin/webhook-test">
          <AdminLayout>
            <WebhookTest />
          </AdminLayout>
        </Route>
        
        {/* Development/Demo routes */}
        <Route path="/error-boundary-demo">
          <MainLayout>
            <ErrorBoundaryDemo />
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
  // Initialize global error handling
  useGlobalErrorHandler();

  return (
    <ErrorBoundary>
      <CounsellingPlatformErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <OptimizedCSS />
            <DesktopPerformanceGuard />
            <SmartMobileOptimizer />
            <MobileOptimization />
            <Router />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </CounsellingPlatformErrorBoundary>
    </ErrorBoundary>
  );
}

export default App;
