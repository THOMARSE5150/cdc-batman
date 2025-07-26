import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ChevronRightIcon } from "lucide-react";

export default function BookingPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-medium text-text-primary mb-6">Contact Me for an Appointment</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-lg font-medium text-text-primary mb-4">Select a Service</h3>
                
                <div className="space-y-4">
                  <div className="border border-primary bg-primary bg-opacity-5 rounded-lg p-4 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-text-primary">Initial Consultation</h4>
                        <p className="text-sm text-text-secondary mt-1">60 minutes - $200</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                        <CheckCircleIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-text-primary">Individual Therapy Session</h4>
                        <p className="text-sm text-text-secondary mt-1">50 minutes - $180</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                        {/* Empty circle */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:border-l md:pl-8">
                <h3 className="text-lg font-medium text-text-primary mb-4">Choose Date</h3>
                
                <div className="calendar-container mb-4">
                  {/* Calendar mockup */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <button className="text-text-secondary">
                        <ChevronRightIcon className="h-5 w-5 rotate-180" />
                      </button>
                      <div className="font-medium">May 2023</div>
                      <button className="text-text-secondary">
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      <div>S</div>
                      <div>M</div>
                      <div>T</div>
                      <div>W</div>
                      <div>T</div>
                      <div>F</div>
                      <div>S</div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center">
                      <div className="text-gray-400 p-2">28</div>
                      <div className="text-gray-400 p-2">29</div>
                      <div className="text-gray-400 p-2">30</div>
                      <div className="p-2">1</div>
                      <div className="p-2">2</div>
                      <div className="p-2">3</div>
                      <div className="p-2">4</div>
                      <div className="text-gray-400 p-2">5</div>
                      <div className="p-2 bg-primary text-white rounded-full">6</div>
                      <div className="p-2">7</div>
                      <div className="p-2">8</div>
                      <div className="p-2">9</div>
                      <div className="p-2">10</div>
                      <div className="p-2">11</div>
                      {/* More days would follow */}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-text-primary mb-4">Available Times</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-secondary-light p-2 rounded text-center text-sm cursor-pointer hover:bg-primary hover:text-white">9:00 AM</div>
                  <div className="bg-secondary-light p-2 rounded text-center text-sm cursor-pointer hover:bg-primary hover:text-white">10:00 AM</div>
                  <div className="bg-primary text-white p-2 rounded text-center text-sm cursor-pointer">11:00 AM</div>
                  <div className="bg-secondary-light p-2 rounded text-center text-sm cursor-pointer hover:bg-primary hover:text-white">1:00 PM</div>
                  <div className="bg-secondary-light p-2 rounded text-center text-sm cursor-pointer hover:bg-primary hover:text-white">2:00 PM</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  Contact Me to Book
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
