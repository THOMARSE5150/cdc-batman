import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Mail, Phone } from "lucide-react";
import { SEO } from "@/components/ui/SEO";

export default function PrivacyPolicy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <SEO
        title="Privacy Policy | Celia Dunsmore Counselling Melbourne"
        description="Privacy policy for Celia Dunsmore Counselling services. Information about confidentiality, data protection, and client privacy rights in Melbourne counselling practice."
        canonicalPath="/privacy-policy"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn} className="flex justify-center mb-6">
              <div className="p-4 bg-primary-healing/10 rounded-full">
                <Shield className="h-12 w-12 text-primary-healing" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Your privacy and the confidentiality of your personal information is fundamental to our counselling practice.
            </motion.p>
            
            <motion.p 
              variants={fadeIn}
              className="text-sm text-gray-500 mt-4"
            >
              Last updated: July 20, 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="prose prose-lg max-w-none"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            
            {/* Overview */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <UserCheck className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Celia Dunsmore Counselling is committed to protecting your privacy and maintaining the confidentiality of your personal information. As an Accredited Mental Health Social Worker, Celia adheres to the highest standards of professional confidentiality as outlined by the Australian Association of Social Workers (AASW) Code of Ethics and the Privacy Act 1988 (Cth).
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Information We Collect</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Personal Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Contact details (name, phone number, email address)</li>
                <li>• Demographic information (age, gender, address)</li>
                <li>• Medicare and health fund details for rebate processing</li>
                <li>• Emergency contact information</li>
                <li>• Referral source information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Health Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Mental health history and current concerns</li>
                <li>• Treatment goals and progress notes</li>
                <li>• Assessment outcomes and therapeutic interventions</li>
                <li>• Any relevant medical or psychological reports</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Website Usage Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Browser type and version</li>
                <li>• Pages visited and time spent on site</li>
                <li>• IP address and location data (city/state level only)</li>
                <li>• Device information for responsive design</li>
              </ul>
            </motion.div>

            {/* How We Use Information */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">How We Use Your Information</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Clinical Purposes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Providing professional counselling services</li>
                <li>• Treatment planning and progress monitoring</li>
                <li>• Clinical documentation and record keeping</li>
                <li>• Consultation with other healthcare professionals (with consent)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Administrative Purposes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Appointment scheduling and management</li>
                <li>• Medicare and insurance rebate processing</li>
                <li>• Professional communication and correspondence</li>
                <li>• Quality improvement and service evaluation</li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Information Sharing and Disclosure</h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 font-semibold">
                  Your information will never be shared without your explicit consent, except in the limited circumstances outlined below.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">With Your Consent</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Referrals to other healthcare professionals</li>
                <li>• Communication with your GP or psychiatrist</li>
                <li>• Medicare and insurance claims processing</li>
                <li>• Family therapy or couples counselling participants</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Legal Requirements</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Court orders or subpoenas</li>
                <li>• Mandatory reporting requirements (child protection)</li>
                <li>• Imminent risk of serious harm to self or others</li>
                <li>• Professional registration body investigations</li>
              </ul>
            </motion.div>

            {/* Data Security */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Security and Storage</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Physical Security</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Locked filing cabinets for paper records</li>
                <li>• Secure office premises with restricted access</li>
                <li>• Confidential document destruction when no longer required</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Digital Security</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Encrypted digital storage systems</li>
                <li>• Password-protected computers and devices</li>
                <li>• Secure email encryption for sensitive communications</li>
                <li>• Regular data backups with encryption</li>
                <li>• Australian-based secure cloud storage providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Record Retention</h3>
              <p className="text-gray-600">
                Client records are retained for a minimum of 7 years from the last contact, in accordance with AASW guidelines and legal requirements. Records for clients under 18 are retained until they reach 25 years of age.
              </p>
            </motion.div>

            {/* Your Rights */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Privacy Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Rights</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Request copies of your records</li>
                    <li>• Review information held about you</li>
                    <li>• Request corrections to inaccurate information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Control Rights</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Withdraw consent for information sharing</li>
                    <li>• Request deletion of records (subject to legal requirements)</li>
                    <li>• Lodge complaints about privacy breaches</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Website Privacy */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Website Privacy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Cookies and Analytics</h3>
              <p className="text-gray-600 mb-4">
                This website uses essential cookies for functionality and Google Analytics to understand how visitors use our site. We do not use tracking cookies for advertising purposes.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Contact Forms</h3>
              <p className="text-gray-600 mb-4">
                Information submitted through our contact forms is encrypted and sent securely. This information is used solely to respond to your inquiry and is not shared with third parties.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Third-Party Services</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Google Analytics (anonymized data collection)</li>
                <li>• Email service providers (encrypted communications)</li>
                <li>• Appointment booking systems (healthcare-compliant)</li>
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeIn} className="bg-primary-healing/5 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Concerns or Questions</h2>
              
              <p className="text-gray-600 mb-6">
                If you have any questions about this privacy policy, concerns about how your information is handled, or wish to make a complaint about a privacy breach, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary-healing mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">hello@celiadunsmorecounselling.com.au</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary-healing mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">0438 593 071</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>External Complaints:</strong> If you are not satisfied with our response to your privacy complaint, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" className="text-primary-healing hover:underline">www.oaic.gov.au</a> or call 1300 363 992.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
        </section>
      </div>
    </>
  );
}