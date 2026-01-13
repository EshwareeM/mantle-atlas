'use client';

import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ComplianceNotice() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
      <div className="flex items-start">
        <div className="p-2 bg-amber-100 rounded-lg mr-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            Compliance Requirements
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Identity Verification</p>
                <p className="text-sm text-amber-800">
                  Your identity has been verified and approved
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Risk Assessment</p>
                <p className="text-sm text-amber-800">
                  Risk profile completed and investment suitability confirmed
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Annual Review Required</p>
                <p className="text-sm text-amber-800">
                  Your compliance review is due on March 15, 2024
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-amber-100 rounded-lg">
            <p className="text-sm text-amber-900 font-medium">
              Action Required: Complete annual compliance review before deadline to maintain investment access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}