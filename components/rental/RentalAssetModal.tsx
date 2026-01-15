'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import RentalAssetDetails from './RentalAssetDetails';
import { AssetDetails } from '@/types/asset';

interface RentalAssetModalProps {
  asset: AssetDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onInvest?: (asset: AssetDetails, amount: number) => void;
}

export default function RentalAssetModal({ 
  asset, 
  isOpen, 
  onClose,
  onInvest 
}: RentalAssetModalProps) {
  if (!isOpen || !asset) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Asset Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <RentalAssetDetails
            asset={asset}
            onInvest={onInvest}
          />
        </div>

              </div>
    </div>
  );
}
