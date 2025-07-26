const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
  </svg>
);

interface StepsProps {
  steps: string[];
  currentStep: number;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center mb-4 md:mb-0 md:flex-1">
          <div className="relative flex items-center justify-center">
            <div 
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ${
                index < currentStep 
                  ? "border-primary bg-primary text-white" 
                  : index === currentStep 
                    ? "border-primary text-primary" 
                    : "border-gray-300 text-gray-500"
              }`}
            >
              {index < currentStep ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
          </div>
          
          <div className="ml-3 flex-1">
            <p 
              className={`font-medium transition-colors ${
                index <= currentStep ? "text-text-primary" : "text-gray-600"
              }`}
            >
              {step}
            </p>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={`hidden md:block h-0.5 flex-1 mx-2 ${
                index < currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
