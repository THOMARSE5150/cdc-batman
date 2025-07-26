import { useState, memo } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ServiceSelection from "@/components/booking/ServiceSelection";
import DateTimePicker from "@/components/booking/DateTimePicker";
import PersonalDetails from "@/components/booking/PersonalDetails";
import Confirmation from "@/components/booking/Confirmation";
import { Steps } from "@/components/ui/steps";
import { SEO } from "@/components/ui/SEO";

// Define types for our booking data
interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  withRebate: number | null;
}

interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hasMedicare: boolean;
  medicareNumber?: string;
  notes?: string;
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsData | null>(null);
  
  const steps = [
    "Select Service",
    "Choose Date & Time",
    "Personal Details",
    "Confirmation"
  ];
  
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };
  
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleSelectTime = (time: string | null) => {
    setSelectedTime(time);
  };
  
  const handleUpdatePersonalDetails = (details: PersonalDetailsData) => {
    setPersonalDetails(details);
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceSelection 
            selectedService={selectedService} 
            onSelectService={handleSelectService}
            onNext={handleNextStep}
          />
        );
      case 1:
        return (
          <DateTimePicker 
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={handleSelectDate}
            onSelectTime={handleSelectTime}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 2:
        return (
          <PersonalDetails
            personalDetails={personalDetails}
            onUpdateDetails={handleUpdatePersonalDetails}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        // Only show confirmation when all data is available
        if (selectedService && selectedDate && selectedTime && personalDetails) {
          return (
            <Confirmation
              service={selectedService as Service}
              date={selectedDate as Date}
              time={selectedTime as string}
              personalDetails={{
                firstName: personalDetails.firstName,
                lastName: personalDetails.lastName,
                email: personalDetails.email,
                phone: personalDetails.phone,
                hasMedicare: personalDetails.hasMedicare,
                medicareNumber: personalDetails.medicareNumber,
                notes: personalDetails.notes
              }}
              onBack={handlePreviousStep}
            />
          );
        }
        // If data is missing, go back to the previous step
        handlePreviousStep();
        return null;
      default:
        return null;
    }
  };
  
  return (
    <>
      <SEO
        title="Book Counselling Session | Celia Dunsmore Counselling Melbourne"
        description="Book your counselling session with Celia Dunsmore, Accredited Mental Health Social Worker in Brunswick, Coburg, or via Telehealth. Easy online booking available."
        canonicalPath="/booking"
      />
      <PageHeader 
        title="Book an Appointment" 
        description="Schedule a session that works for your needs and availability"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <Steps currentStep={currentStep} steps={steps} />
            </div>
            
            <div
              key={currentStep}
              className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
            >
              {renderCurrentStep()}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3">Need Help?</h3>
                <p className="text-text-secondary mb-4">
                  If you have any questions or need assistance with booking, please contact us.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">0438 593 071</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">info@celiadunsmorecounselling.com.au</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-medium mb-2">Cancellation Policy</h4>
                <p className="text-sm text-gray-600 mb-4">
                  To avoid being charged a late notification or non-attendance cancellation fee for a scheduled appointment, a minimum of 48hrs notice must be provided to either reschedule or cancel.
                </p>
                <p className="text-xs text-gray-500">
                  When you provide 24hrs or less notice (including non-attendance) for a booked appointment, this will incur a Cancellation Fee of $110.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
