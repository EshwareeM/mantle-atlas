'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { name: 'Asset Identification', number: 1 },
    { name: 'Yield Configuration', number: 2 },
    { name: 'Compliance & Deployment', number: 3 }
  ];

  return (
    <div className="flex items-center justify-center space-x-4 md:space-x-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex items-center">
            {step.number < currentStep ? (
              // Completed step
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
            ) : step.number === currentStep ? (
              // Active step
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{step.number}</span>
              </div>
            ) : (
              // Inactive step
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">{step.number}</span>
              </div>
            )}
          </div>
          
          {/* Step Name */}
          <div className="ml-3">
            <p className={`text-sm font-medium ${
              step.number === currentStep 
                ? 'text-blue-600' 
                : step.number < currentStep 
                ? 'text-green-600' 
                : 'text-gray-500'
            }`}>
              {step.name}
            </p>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="ml-6 mr-6">
              <div className={`w-16 h-0.5 ${
                step.number < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}