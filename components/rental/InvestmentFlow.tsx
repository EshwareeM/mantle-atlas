'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { AssetDetails } from '@/types/asset';

interface InvestmentFlowProps {
  asset: AssetDetails | null;
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

type InvestmentStep = 'authorizing' | 'review' | 'confirmed';

export default function InvestmentFlow({ 
  asset, 
  isOpen, 
  onClose, 
  amount 
}: InvestmentFlowProps) {
  const [currentStep, setCurrentStep] = useState<InvestmentStep>('authorizing');

  // Auto-progress from authorizing to review after 2 seconds
  useEffect(() => {
    if (currentStep === 'authorizing' && isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep('review');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isOpen]);

  if (!isOpen || !asset) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && currentStep === 'confirmed') {
      onClose();
    }
  };

  const handleConfirmInvestment = () => {
    setCurrentStep('confirmed');
  };

  const getFirstPayoutDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Global Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentStep === 'authorizing' && 'Authorizing Payment'}
              {currentStep === 'review' && 'Confirm Investment'}
              {currentStep === 'confirmed' && 'Investment Confirmed'}
            </h2>
            {currentStep === 'confirmed' && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStep === 'authorizing' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                </div>
                <p className="text-gray-600 mb-2">Authorizing Payment...</p>
                <p className="text-sm text-gray-500">Securing your investment on Mantle Network</p>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                {/* Asset Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Investment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Asset</span>
                      <span className="font-medium text-gray-900">{asset.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Amount</span>
                      <span className="font-medium text-gray-900">${amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Source</span>
                      <span className="font-medium text-gray-900">Connected Wallet Balance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network</span>
                      <span className="font-medium text-gray-900">Mantle Network</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compliance Status</span>
                      <span className="font-medium text-green-600">✅ Verified</span>
                    </div>
                  </div>
                </div>

                {/* Helper Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Funds will be allocated to a yield-backed rental asset. No custody transfer occurs.
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleConfirmInvestment}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Investment
                </button>
              </div>
            )}

            {currentStep === 'confirmed' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                  <CheckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Investment Confirmed</h3>
                <p className="text-gray-600 mb-6">Your funds are now earning yield.</p>
                
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">First payout scheduled for</span>
                    <span className="font-medium text-gray-900">{getFirstPayoutDate()}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
