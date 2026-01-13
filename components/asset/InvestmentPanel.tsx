'use client';

import { useState, useEffect } from 'react';
import { AssetDetails } from '@/types/asset';
import ComplianceModal from './ComplianceModal';

interface InvestmentPanelProps {
  asset: AssetDetails;
  onInvestClick?: () => void;
  isInvested?: boolean;
  onInvested?: () => void;
}

export default function InvestmentPanel({ 
  asset, 
  onInvestClick,
  isInvested: externalIsInvested,
  onInvested 
}: InvestmentPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Use external state if provided, otherwise use internal state
  const currentIsInvested = externalIsInvested || showConfirmation;

  const handleInvestClick = () => {
    if (onInvestClick) {
      onInvestClick();
    } else {
      setIsModalOpen(true);
      setShowConfirmation(false);
    }
  };

  const handleConfirmInvest = () => {
    setShowConfirmation(true);
    if (onInvested) {
      onInvested();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="w-full max-w-sm">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
          <h3 className="text-lg font-semibold mb-2">Expected Monthly Yield</h3>
          <div className="text-4xl font-bold mb-1">{asset.estimatedYield}%</div>
          <div className="text-blue-100">APY</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Rent Distribution:</span>
              <span className="font-semibold text-gray-900">${(asset.monthlyRent * 0.7).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tokens Available:</span>
              <span className="font-semibold text-gray-900">{asset.tokenSupply.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Token Symbol:</span>
              <span className="font-semibold text-gray-900">ATLAS-V1</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Settlement Period:</span>
              <span className="font-semibold text-gray-900">Monthly (1st)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Risk Rating:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                {asset.riskRating}
              </span>
            </div>
          </div>
        </div>

        {!currentIsInvested ? (
          <>
            <button 
              onClick={handleInvestClick}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Verify & Invest
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Requires Mantle Yield Passport for participation.
            </p>
          </>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
            <p className="font-semibold mb-1 text-green-800">Investment Confirmed</p>
            <p className="text-sm text-green-800">You will receive your first payout on Jan 15, 2026</p>
          </div>
        )}
      </div>

      {/* Only show modal if not controlled externally */}
      {!onInvestClick && (
        <ComplianceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          assetName={asset.name}
          onConfirm={handleConfirmInvest}
          showConfirmation={showConfirmation}
        />
      )}
    </>
  );
}