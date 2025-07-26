import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { sessionFees, paymentMethods } from "@/lib/data";
import { SEO } from "@/components/ui/SEO";
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
  </svg>
);
import AASWBadge from "@/components/ui/AASWBadge";

export default function Fees() {
  return (
    <>
      <SEO
        title="Counselling Fees & Medicare Information | Celia Dunsmore Melbourne"
        description="Transparent pricing for counselling services with Celia Dunsmore, Accredited Mental Health Social Worker. Medicare rebates available for eligible clients in Melbourne."
        canonicalPath="/fees"
      />
      <PageHeader 
        title="Fees & Medicare Information" 
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-2xl font-medium text-text-primary mb-6">Session Fees</h2>
            
            <div className="space-y-6">
              {sessionFees.map((fee) => (
                <div key={fee.id} className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-lg text-text-primary">{fee.title}</h3>
                    <p className="text-text-light">{fee.duration}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-xl font-medium text-text-primary">${fee.price}</div>
                    <div className="text-sm text-text-light">${fee.withRebate} with rebate</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md text-sm">
              <p className="text-text-primary">
                <span className="font-medium">Admin fee:</span> $5.57 per session included in the above price
              </p>
            </div>
            
            {/* Payment & Session Information */}
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-lg text-text-primary">Payment & Session Information</h3>
              <div className="space-y-3 text-sm text-text-primary">
                <div className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Payment is required at the end of each session</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Medicare rebates processed directly with your Medicare card</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Sessions are 50 minutes in a confidential, safe environment</span>
                </div>
                <div className="flex items-start">
                  <CheckIcon className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Initial consultation includes assessment and treatment planning</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6 h-full"
            >
              <h2 className="text-2xl font-medium text-text-primary mb-4">Medicare Rebates</h2>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="w-[140px] sm:w-[140px] h-[180px] flex items-center justify-center">
                  <AASWBadge />
                </div>
                <div>
                  <p className="mb-2">As an <span className="font-medium">Accredited Mental Health Social Worker</span>, I can provide Medicare rebates of <span className="font-medium">$85.20 per session</span> with a valid Mental Health Care Plan from your GP.</p>
                </div>
              </div>
              
              <h3 className="font-medium text-lg text-text-primary mb-4">What does the Mental Health Care Plan provide?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Initial 6 sessions of counselling with a mental health clinician</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>A further 4 sessions with GP review</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Total of 10 sessions per calendar year</span>
                </li>
              </ul>
              
              <h3 className="font-medium text-lg text-text-primary mt-6 mb-4">Additional Payment Options</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>I can see people who are NDIS self funded or plan managed</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>I can see people who have private health insurance that covers for private practice</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-secondary-light rounded-md text-sm">
                <p><span className="font-medium">Note:</span> Payment is processed through the Halaxy platform. Medicare rebates can be processed directly through Halaxy when you provide your Medicare card details.</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-medium text-text-primary mb-6">Payment Method</h2>
          
          <div className="bg-secondary-light rounded-lg p-5 mb-4">
            <div className="font-medium text-text-primary text-lg text-center mb-3">Halaxy Payment System</div>
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center bg-white py-2 px-4 rounded-md shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span className="font-medium text-blue-600">Halaxy</span>
              </div>
            </div>
            <p className="text-text-secondary text-center">All bookings and payments are managed through the Halaxy platform</p>
          </div>
          
          <div className="mt-8 p-4 bg-secondary-light rounded-md">
            <h3 className="font-medium text-text-primary mb-2">Cancellations & Non-Attendance</h3>
            <p>To avoid being charged a late notification or non-attendance cancellation fee for a scheduled appointment, a minimum of 48hrs notice must be provided to either reschedule or cancel.</p>
            <p className="mt-2 font-medium">When you provide 24hrs or less notice (including non-attendance) for a booked appointment, this will incur a Cancellation Fee of $110.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
