import { motion } from "framer-motion";
import PageTitle from "@/components/ui/PageTitle";
import { fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
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
        
        <PageTitle title="Privacy Policy" />
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
            At Celia Dunsmore Counselling, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. The Data We Collect</h2>
          <p>
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address, telephone numbers, and physical address.</li>
            <li><strong>Health Data</strong> includes information about your mental health status and history that you choose to share with us during the counselling process.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>3. How We Collect Your Data</h2>
          <p>
            We use different methods to collect data from and about you including through:
          </p>
          <ul>
            <li><strong>Direct interactions:</strong> You may give us your Identity, Contact, and Health Data by filling in forms on our website, by corresponding with us by post, phone, email, or otherwise.</li>
            <li><strong>Automated technologies:</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>4. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>To provide you with counselling services.</li>
            <li>To manage our relationship with you.</li>
            <li>To process and deliver your booking requests.</li>
            <li>To respond to your inquiries.</li>
            <li>To improve our website, products/services, marketing, or customer relationships.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>5. Disclosure of Your Data</h2>
          <p>
            We may share your personal data with the following third parties:
          </p>
          <ul>
            <li>Service providers who provide IT and system administration services.</li>
            <li>Professional advisers including lawyers, bankers, auditors, and insurers.</li>
            <li>Government bodies that require us to report processing activities.</li>
          </ul>
          <p>
            We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>7. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
          <p>
            For counselling records, we retain client information for a minimum of 7 years after the last contact, in accordance with Australian health record retention guidelines.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>8. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          <p>
            You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive, or excessive.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>9. Cookies</h2>
          <p>
            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
  );
}