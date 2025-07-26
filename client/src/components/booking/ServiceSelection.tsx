import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v22m5-6c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3zm0-8c0 1.66-4 3-9 3s-9-1.34-9-3 4-3 9-3 9 1.34 9 3z"/>
  </svg>
);

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  withRebate: number | null;
}

interface ServiceSelectionProps {
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
  onNext: () => void;
}

export default function ServiceSelection({ selectedService, onSelectService, onNext }: ServiceSelectionProps) {
  const services = [
    {
      id: 'initial',
      name: 'Initial Consultation',
      description: 'A 60-minute session to discuss your needs and determine the best approach for your therapy.',
      duration: 60,
      price: 200,
      withRebate: 114.80
    },
    {
      id: 'individual',
      name: 'Individual Therapy Session',
      description: 'A 50-minute one-on-one counselling session tailored to your specific needs.',
      duration: 50,
      price: 180,
      withRebate: 94.80
    },
    {
      id: 'couples',
      name: 'Couples Therapy',
      description: 'A 60-minute session focused on relationship issues and communication strategies.',
      duration: 60,
      price: 220,
      withRebate: null
    },
    {
      id: 'extended',
      name: 'Extended Session',
      description: 'A 120-minute in-depth session for complex issues requiring more time.',
      duration: 120,
      price: 280,
      withRebate: null
    }
  ];

  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const handleSelectService = (service: Service) => {
    onSelectService(service);
    // Automatically move to next step when a service is selected
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-2xl font-semibold text-text-primary mb-3">Select a Service</h2>
        <p className="text-text-secondary max-w-xl">
          Choose the type of session that best fits your needs. If you're unsure, you can start with an initial consultation.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        {services.map((service) => (
          <motion.div 
            key={service.id}
            onClick={() => handleSelectService(service)}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
            className={`border rounded-xl p-6 cursor-pointer transition-all hover:shadow-md relative overflow-hidden ${
              selectedService?.id === service.id 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'border-gray-200 hover:border-primary'
            }`}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Selected overlay - only shown when this service is selected */}
            {selectedService?.id === service.id && (
              <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}
            
            {/* Background highlight effect */}
            {selectedService?.id === service.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            )}
            
            <div className="flex flex-col relative z-1">
              <h3 className="text-xl font-medium text-text-primary mb-2">{service.name}</h3>
              <p className="text-text-secondary mb-4">{service.description}</p>
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-gray-700">{service.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-700">
                    ${service.price.toFixed(2)}
                    {service.withRebate ? ` ($${service.withRebate.toFixed(2)} with rebate)` : ''}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto">
                {!selectedService || selectedService.id !== service.id ? (
                  <Button 
                    className="bg-primary hover:bg-primary-dark text-white w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectService(service);
                    }}
                  >
                    Select This Service
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Button>
                ) : (
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext();
                    }}
                  >
                    Continue with This Service
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>* Medicare rebates may apply with a valid Mental Health Care Plan</p>
        </div>
        
        <Button
          onClick={onNext}
          disabled={!selectedService}
          className={`flex items-center ${
            selectedService
              ? 'bg-primary hover:bg-primary-dark text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRightIcon className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
