import { motion } from "framer-motion";
import PageTitle from "@/components/ui/PageTitle";
import { fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/ui/SEO";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service | Celia Dunsmore Counselling Melbourne"
        description="Terms of service for counselling sessions with Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne. Professional counselling terms and conditions."
        canonicalPath="/terms"
      />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-6"
        >
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6 text-text-secondary hover:text-primary"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
        
        <PageTitle title="Terms of Service" />
      </motion.div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="prose prose-sage max-w-none"
      >
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Celia Dunsmore Counselling. These Terms of Service govern your use of our website and services. By accessing or using our website or services, you agree to be bound by these terms.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. Services</h2>
          <p>
            Celia Dunsmore Counselling provides mental health counselling services. Our services include individual therapy sessions, both in-person and online, focused on addressing various mental health concerns.
          </p>
          <p>
            The information provided on this website is for general informational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>3. Appointments and Bookings</h2>
          <p>
            Booking an appointment through our website constitutes a request for services. All appointments are subject to availability and confirmation.
          </p>
          <p>
            If you need to cancel or reschedule an appointment, please provide at least 24 hours' notice. Late cancellations or missed appointments may be subject to a fee as outlined in our <Link href="/fees" className="text-primary hover:underline">Fees</Link> page.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>4. Client Confidentiality</h2>
          <p>
            Confidentiality is a fundamental aspect of our counselling services. Information shared during counselling sessions is kept confidential with certain legal and ethical exceptions, including:
          </p>
          <ul>
            <li>Risk of harm to self or others</li>
            <li>Abuse or neglect of children, elderly, or vulnerable individuals</li>
            <li>Court orders or subpoenas</li>
            <li>Insurance or billing requirements</li>
          </ul>
          <p>
            For more information on how we collect, use, and protect your personal information, please review our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>5. Payment Terms</h2>
          <p>
            Payment for services is due at the time of the session unless other arrangements have been made in advance. We accept various payment methods as outlined on our <Link href="/fees" className="text-primary hover:underline">Fees</Link> page.
          </p>
          <p>
            Medicare rebates and private health insurance claims are the responsibility of the client. We will provide necessary documentation to support your claims.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. User Conduct</h2>
          <p>
            When using our website, you agree not to:
          </p>
          <ul>
            <li>Use the website in any way that violates any applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Use the website to transmit any harmful software or material</li>
            <li>Impersonate or attempt to impersonate Celia Dunsmore or any other person affiliated with our practice</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>7. Limitation of Liability</h2>
          <p>
            Celia Dunsmore Counselling provides information and services on an "as is" basis. We make no warranties, expressed or implied, regarding the operation of the website or the information contained therein.
          </p>
          <p>
            We shall not be liable for any damages arising from your use of or inability to use our website or services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>8. Emergency Services</h2>
          <p>
            Our services are not intended for emergency situations. If you are experiencing a mental health emergency, please contact emergency services (000), Lifeline (13 11 14), or go to your nearest hospital emergency department.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on this website. Your continued use of the website after any changes indicates your acceptance of the modified terms.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>
            Celia Dunsmore Counselling<br />
            Email: info@celiadunsmorecouncelling.com.au<br />
            Phone: (02) 1234 5678
          </p>
        </section>
        
        <section>
          <p className="text-text-secondary italic">
            Last updated: May 2, 2025
          </p>
        </section>
      </motion.div>
      </div>
    </>
  );
}