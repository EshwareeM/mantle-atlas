'use client';

import { ShieldCheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function IntroCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <div className="flex items-start">
        <div className="p-2 bg-white rounded-lg mr-4">
          <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">
            Mantle Atlas Compliance Framework
          </h3>
          
          <p className="text-blue-800 mb-4 leading-relaxed">
            Our compliance framework ensures all investments meet regulatory requirements while maintaining 
            the highest standards of security and transparency. Every participant undergoes thorough verification 
            to protect both investors and the ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-70 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-1">Identity Verification</h4>
              <p className="text-sm text-blue-700">
                KYC/AML checks with government-issued ID verification
              </p>
            </div>
            
            <div className="bg-white bg-opacity-70 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-1">Risk Assessment</h4>
              <p className="text-sm text-blue-700">
                Personalized risk profiling and suitability analysis
              </p>
            </div>
            
            <div className="bg-white bg-opacity-70 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-1">Ongoing Monitoring</h4>
              <p className="text-sm text-blue-700">
                Continuous compliance monitoring and regular updates
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 bg-opacity-50 rounded-lg flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> Compliance requirements vary by jurisdiction. 
              Please ensure you meet all applicable regulations in your region before participating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}