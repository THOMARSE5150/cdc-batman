import { motion } from "framer-motion";
import { sessionFees, paymentMethods } from "@/lib/data";
import { CheckIcon } from "lucide-react";
import AASWBadge from "@/components/ui/AASWBadge";

export default function FeesSection() {
  return (
    <section className="py-16 bg-secondary-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-serif font-bold text-text-primary mb-4"
          >
            Fees & Medicare Information
          </motion.h2>
        </div>

        {/* First Row - Session Fees and Medicare */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-2xl font-medium text-text-primary mb-6">Session Fees</h3>
            
            <div className="space-y-6">
              {sessionFees.map((fee) => (
                <div key={fee.id} className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-lg text-text-primary">{fee.title}</h4>
                    <p className="text-text-light">{fee.duration}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-xl font-medium text-text-primary">${fee.price}</div>
                    <div className="text-sm text-text-light">${fee.withRebate} with rebate</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fees note section removed as requested */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h3 className="text-2xl font-medium text-text-primary mb-4">Medicare Rebates</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="w-[140px] sm:w-[140px] h-[180px] flex items-center justify-center">
                <AASWBadge />
              </div>
              <div>
                <p className="mb-2">As an <span className="font-medium">Accredited Mental Health Social Worker</span>, I can provide Medicare rebates of <span className="font-medium">$85.20 per session</span> with a valid Mental Health Care Plan from your GP.</p>
              </div>
            </div>
            
            <h4 className="font-medium text-lg text-text-primary mb-4">What does the Mental Health Care Plan provide?</h4>
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
            
            <div className="mt-6 p-4 bg-secondary-light rounded-md text-sm">
              <p><span className="font-medium">Note:</span> Payment is processed through the Halaxy platform. Medicare rebates can be processed directly through Halaxy when you provide your Medicare card details.</p>
            </div>
          </motion.div>
        </div>
        
        {/* Second Row - Payment Method */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-2xl font-medium text-text-primary mb-6">Payment Method</h3>
          
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
            <h4 className="font-medium text-text-primary mb-2">Cancellations & Non-Attendance</h4>
            <p>To avoid being charged a late notification or non-attendance cancellation fee for a scheduled appointment, a minimum of 48hrs notice must be provided to either reschedule or cancel.</p>
            <p className="mt-2 font-medium">When you provide 24hrs or less notice (including non-attendance) for a booked appointment, this will incur a Cancellation Fee of $110.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
