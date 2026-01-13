'use client';

import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string;
  onConfirm: () => void;
  showConfirmation: boolean;
}

export default function ComplianceModal({ 
  isOpen, 
  onClose, 
  assetName, 
  onConfirm, 
  showConfirmation 
}: ComplianceModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const verificationSteps = [
    { title: 'Identity Verification', description: 'Verifying your Mantle Yield Passport' },
    { title: 'Compliance Check', description: 'Checking regulatory compliance' },
    { title: 'Risk Assessment', description: 'Assessing investment risk profile' },
    { title: 'Final Approval', description: 'Finalizing investment approval' }
  ];

  const handleConfirmInvest = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      onConfirm();
    }, 2000);
  };

  const handleClose = () => {
    if (!isVerifying) {
      onClose();
      setCurrentStep(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {showConfirmation ? 'Investment Confirmed' : 'Investment Verification'}
          </h3>
          <button
            onClick={handleClose}
            disabled={isVerifying}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {!showConfirmation ? (
          <>
            {/* Verification Steps */}
            <div className="space-y-4 mb-6">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentStep && isVerifying
                      ? 'bg-blue-100 text-blue-600 animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircleIcon className="h-4 w-4" />
                    ) : (
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Asset Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Investment Details</h4>
              <div className="text-sm text-gray-600">
                <p>Asset: <span className="font-medium text-gray-900">{assetName}</span></p>
                <p>Amount: <span className="font-medium text-gray-900">$1,000</span></p>
                <p>Expected Yield: <span className="font-medium text-gray-900">8.5% APY</span></p>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Important Notice</h4>
                  <p className="text-sm text-yellow-800">
                    This investment involves risk including potential loss of principal. 
                    Please review the investment details carefully before proceeding.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isVerifying}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmInvest}
                disabled={isVerifying}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Confirm Investment'
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Investment Confirmed!
              </h4>
              <p className="text-gray-600">
                Your investment in {assetName} has been confirmed and processed.
              </p>
            </div>

            {/* Success Details */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Transaction Hash:</span>
                  <span className="font-mono text-green-900">0x1234...5678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Status:</span>
                  <span className="text-green-900 font-medium">Confirmed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Expected Payout:</span>
                  <span className="text-green-900">Feb 1, 2024</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Investment
            </button>
          </>
        )}
      </div>
    </div>
  );
}