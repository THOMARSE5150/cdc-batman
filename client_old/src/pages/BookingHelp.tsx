import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/shared/config";

export default function BookingHelp() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <h1>Setting Up Your Halaxy Booking Integration</h1>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <h2 className="text-amber-800 mt-0 mb-2">Current Status</h2>
          <p className="text-amber-700 mb-0">
            You've successfully connected Google Calendar with Halaxy using the Two-Way Calendar Sync feature (25 credits per month).
            The next step is to complete profile verification to unlock online booking functionality.
          </p>
        </div>
        
        <h2>Step 1: Complete Profile Verification</h2>
        <p>
          Based on the Halaxy dashboard, you need to complete your profile to unlock online booking:
        </p>
        <ol>
          <li>Log in to your Halaxy dashboard</li>
          <li>Click the "ADD YOUR PROFESSIONAL DETAILS" button at the top of the screen</li>
          <li>Fill out all required fields</li>
          <li>Then click the "ADD YOUR PRACTICE DETAILS" button</li>
          <li>Complete all required practice information</li>
        </ol>
        
        <div className="bg-primary/10 p-6 rounded-lg mb-8">
          <h3 className="text-primary mt-0 mb-2 font-semibold">Verification Process</h3>
          <p className="mb-2">
            According to Halaxy, verification is necessary to ensure that only legitimate healthcare providers can use the platform.
            The verification process typically involves:
          </p>
          <ol className="mb-0">
            <li>Identity verification (professional credentials)</li>
            <li>Practice verification (business details)</li>
            <li>Review by Halaxy's team</li>
          </ol>
          <p className="mt-4 mb-0">
            For more information, see: <a href="https://support.halaxy.com/hc/en-au/articles/6469777428367-Getting-verified" target="_blank" rel="noreferrer">
              Halaxy's Verification Guide
            </a>
          </p>
        </div>
        
        <h2>Step 2: Enable Online Booking</h2>
        <p>
          After your profile is verified, you'll need to enable online booking:
        </p>
        <ol>
          <li>Go to "Settings" in the left sidebar</li>
          <li>Look for "Add-ons" or "Online Booking"</li>
          <li>Enable the online booking feature (may require additional credits)</li>
          <li>Configure your availability and appointment types</li>
        </ol>
        
        <h2>Step 3: Find Your Public Booking Link</h2>
        <p>
          Once online booking is enabled and configured:
        </p>
        <ol>
          <li>Look for "Public Profile" or "Booking Page" in your settings</li>
          <li>Find the section called "Public Booking Link" or "Patient Booking URL"</li>
          <li>Copy the provided URL - this is what you'll use in your website</li>
        </ol>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <p className="font-mono text-sm break-all">
            Your booking URL might look something like:
            <br />
            <code>https://www.halaxy.com/profile/practitioner/[YOUR-ID]/book</code>
            <br />
            or<br />
            <code>https://booking.halaxy.com/practitioner/[YOUR-ID]</code>
          </p>
        </div>
        
        <h2>Step 4: Update Your Website Configuration</h2>
        <p>
          Once you have your Halaxy booking URL, update the website configuration:
        </p>
        <ol>
          <li>Open the file: <code>client/src/shared/config.ts</code></li>
          <li>Update the <code>halaxyBooking</code> URL with your specific booking URL</li>
          <li>Set <code>directBookingAvailable</code> to <code>true</code></li>
          <li>Save the file and restart your application</li>
        </ol>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <p className="font-mono text-sm mb-0">
            // Example update to config.ts<br />
            export const config = &#123;<br />
            &nbsp;&nbsp;urls: &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;halaxyBooking: "https://your-specific-halaxy-booking-url.com",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// ...<br />
            &nbsp;&nbsp;&#125;,<br />
            &nbsp;&nbsp;halaxy: &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;directBookingAvailable: true,  // Change this to true<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// ...<br />
            &nbsp;&nbsp;&#125;,<br />
            &nbsp;&nbsp;// ...<br />
            &#125;;
          </p>
        </div>
        
        <h2>Interim Solution</h2>
        <p>
          While waiting for verification, the website has been configured with an interim solution:
        </p>
        <ul>
          <li>The "Book a Session" button has been replaced with "Request Appointment"</li>
          <li>It opens a pre-filled email that allows clients to request appointments</li>
          <li>A notice informs visitors that online booking is being set up</li>
        </ul>
        <p>
          This ensures clients can still request appointments during the verification process.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-blue-800 mt-0 mb-2">Need Help?</h3>
          <p className="text-blue-700 mb-0">
            If you're having trouble with verification or finding your booking URL, contact Halaxy support at 
            <a href="https://www.halaxy.com/contact" className="ml-1 text-blue-700 font-semibold">
              https://www.halaxy.com/contact
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}