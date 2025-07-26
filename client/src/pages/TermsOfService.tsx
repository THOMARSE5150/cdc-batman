import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Users, Clock, Mail, Phone } from "lucide-react";
import { SEO } from "@/components/ui/SEO";

export default function TermsOfService() {
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
        title="Terms of Service | Celia Dunsmore Counselling Melbourne"
        description="Professional counselling terms of service by Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne. Client agreements and practice policies."
        canonicalPath="/terms-of-service"
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
                <FileText className="h-12 w-12 text-primary-healing" />
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Terms of Service
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Professional counselling services terms and conditions for clients of Celia Dunsmore Counselling.
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
            
            {/* Professional Service Agreement */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <Scale className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Professional Service Agreement</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                These terms of service constitute a professional agreement between you (the client) and Celia Dunsmore, Accredited Mental Health Social Worker (AMHSW), for the provision of counselling services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By booking an appointment or engaging in counselling services, you acknowledge that you have read, understood, and agree to these terms and conditions.
              </p>
            </motion.div>

            {/* Professional Qualifications */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Professional Qualifications & Standards</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Credentials</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Accredited Mental Health Social Worker (AMHSW)</li>
                    <li>• Member of Australian Association of Social Workers (AASW)</li>
                    <li>• Masters of Social Work qualification</li>
                    <li>• Current professional registration and insurance</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Professional Standards</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• AASW Code of Ethics compliance</li>
                    <li>• Continuing professional development</li>
                    <li>• Regular clinical supervision</li>
                    <li>• Professional indemnity insurance</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Service Description */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Counselling Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Services Provided</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Individual counselling for adults</li>
                <li>• Mental health assessment and treatment planning</li>
                <li>• Therapeutic interventions for anxiety, depression, and trauma</li>
                <li>• Brief solution-focused therapy</li>
                <li>• Cognitive behavioural therapy (CBT) approaches</li>
                <li>• Crisis intervention and safety planning</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Service Limitations</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 mb-2">
                  <strong>Important:</strong> Counselling services are not a substitute for emergency medical care or psychiatric intervention.
                </p>
                <ul className="text-amber-800 space-y-1">
                  <li>• Not suitable for severe psychiatric emergencies</li>
                  <li>• Does not include medication management</li>
                  <li>• Not a replacement for medical treatment</li>
                  <li>• May require GP or psychiatrist collaboration</li>
                </ul>
              </div>
            </motion.div>

            {/* Appointment Policies */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Appointment Policies</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Booking and Confirmation</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Appointments must be booked in advance</li>
                <li>• Confirmation required within 24 hours of booking</li>
                <li>• Initial appointments are typically 60 minutes</li>
                <li>• Follow-up sessions are usually 50 minutes</li>
                <li>• Telehealth appointments available by arrangement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Cancellation Policy</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 font-semibold mb-2">
                  Minimum 24 hours notice required for cancellations
                </p>
                <ul className="text-blue-800 space-y-1">
                  <li>• Full fee applies for less than 24 hours notice</li>
                  <li>• Emergency situations will be considered individually</li>
                  <li>• Multiple late cancellations may result in service termination</li>
                  <li>• Prepaid sessions are non-refundable unless exceptional circumstances</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Late Arrivals and No-Shows</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Sessions will end at the scheduled time regardless of late arrival</li>
                <li>• No-shows will be charged the full session fee</li>
                <li>• Repeated no-shows may result in termination of services</li>
                <li>• Please contact us immediately if running late</li>
              </ul>
            </motion.div>

            {/* Fees and Payment */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Fees and Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Session Fees</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Session (50 mins)</h4>
                  <p className="text-2xl font-bold text-primary-healing">$225.57</p>
                  <p className="text-sm text-gray-600">Medicare rebate: $131.65</p>
                  <p className="text-sm font-semibold text-gray-700">Your cost: $90.92</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Initial Assessment (60 mins)</h4>
                  <p className="text-2xl font-bold text-primary-healing">$225.57</p>
                  <p className="text-sm text-gray-600">Medicare rebate: $131.65</p>
                  <p className="text-sm font-semibold text-gray-700">Your cost: $90.92</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Payment Terms</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Payment due at time of service</li>
                <li>• Accepted methods: Cash, EFTPOS, bank transfer</li>
                <li>• Medicare claiming available (requires GP Mental Health Plan)</li>
                <li>• Private health insurance rebates may apply</li>
                <li>• Payment plans available by arrangement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Medicare Requirements</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-2">
                  <strong>For Medicare rebates, you must have:</strong>
                </p>
                <ul className="text-green-800 space-y-1">
                  <li>• Valid GP Mental Health Plan referral</li>
                  <li>• Medicare card and identification</li>
                  <li>• Completed intake forms prior to first session</li>
                  <li>• Understanding that Medicare allows up to 10 sessions per calendar year</li>
                </ul>
              </div>
            </motion.div>

            {/* Confidentiality and Privacy */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Confidentiality and Privacy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Confidentiality Commitment</h3>
              <p className="text-gray-600 mb-4">
                All information shared in counselling sessions is strictly confidential and protected under professional codes of ethics and Australian privacy legislation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Exceptions to Confidentiality</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold mb-2">
                  Confidentiality may be broken only in the following circumstances:
                </p>
                <ul className="text-red-800 space-y-1">
                  <li>• Imminent risk of serious harm to yourself or others</li>
                  <li>• Suspected child abuse or neglect (mandatory reporting)</li>
                  <li>• Court-ordered disclosure</li>
                  <li>• With your written consent for consultation or referral</li>
                </ul>
              </div>

              <p className="text-gray-600 mt-4">
                For complete privacy information, please refer to our detailed <a href="/privacy-policy" className="text-primary-healing hover:underline">Privacy Policy</a>.
              </p>
            </motion.div>

            {/* Professional Boundaries */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-primary-healing mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 m-0">Professional Boundaries</h2>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Therapeutic Relationship</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• The therapeutic relationship is professional and time-limited</li>
                <li>• Social or personal relationships outside of therapy are not appropriate</li>
                <li>• Gift-giving is discouraged to maintain professional boundaries</li>
                <li>• Contact outside of scheduled sessions should be limited to appointment scheduling</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Communication Guidelines</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Email and text messages should be used for scheduling only</li>
                <li>• Therapeutic conversations should not occur via email or text</li>
                <li>• Emergency support is not provided outside business hours</li>
                <li>• Crisis situations require immediate professional help (000, lifeline, emergency services)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Dual Relationships</h3>
              <p className="text-gray-600">
                To maintain professional integrity, counselling services cannot be provided to individuals with whom there is a pre-existing personal, business, or professional relationship.
              </p>
            </motion.div>

            {/* Rights and Responsibilities */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rights and Responsibilities</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Respectful and non-discriminatory treatment</li>
                    <li>• Confidential and professional service</li>
                    <li>• Clear information about treatment approaches</li>
                    <li>• Right to discontinue services at any time</li>
                    <li>• Access to your clinical records</li>
                    <li>• Right to make complaints about services</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Responsibilities</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Attend appointments punctually</li>
                    <li>• Provide accurate information about your health</li>
                    <li>• Engage actively in the therapeutic process</li>
                    <li>• Respect professional boundaries</li>
                    <li>• Pay fees according to agreed terms</li>
                    <li>• Notify of any changes to contact details</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Complaints and Concerns */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complaints and Concerns</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Internal Resolution</h3>
              <p className="text-gray-600 mb-4">
                If you have concerns about the service provided, please discuss these directly with Celia Dunsmore during your session or contact the practice to arrange a discussion.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">External Complaints</h3>
              <p className="text-gray-600 mb-4">
                If you are not satisfied with the internal resolution, you may lodge a complaint with:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Australian Association of Social Workers (AASW): <a href="https://www.aasw.asn.au" className="text-primary-healing hover:underline">www.aasw.asn.au</a></li>
                <li>• Health Complaints Commissioner (Victoria): <a href="https://hcc.vic.gov.au" className="text-primary-healing hover:underline">hcc.vic.gov.au</a></li>
                <li>• Australian Health Practitioner Regulation Agency (AHPRA) if applicable</li>
              </ul>
            </motion.div>

            {/* Termination of Services */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Termination of Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Client-Initiated Termination</h3>
              <p className="text-gray-600 mb-4">
                You may discontinue counselling services at any time. We encourage discussion about ending therapy to ensure proper closure and referral if needed.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Therapist-Initiated Termination</h3>
              <p className="text-gray-600 mb-4">
                Services may be terminated by the therapist in the following circumstances:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Non-payment of fees after reasonable attempts to resolve</li>
                <li>• Repeated failure to attend scheduled appointments</li>
                <li>• Threatening or inappropriate behavior toward staff</li>
                <li>• When continuing therapy is not in your best interest</li>
                <li>• Dual relationship conflicts that cannot be resolved</li>
              </ul>
              
              <p className="text-gray-600 mt-4">
                In such cases, appropriate referrals will be provided where possible.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeIn} className="bg-primary-healing/5 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Questions About These Terms</h2>
              
              <p className="text-gray-600 mb-6">
                If you have any questions about these terms of service or need clarification about any policies, please contact us:
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
                  <strong>By engaging our services, you acknowledge that you have read, understood, and agree to these terms and conditions.</strong> These terms may be updated periodically, and clients will be notified of any significant changes.
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