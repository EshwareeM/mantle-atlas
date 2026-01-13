'use client';

import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface DeploymentSuccessProps {
  assetName: string;
  onReset: () => void;
  assetData: any;
}

export default function DeploymentSuccess({ assetName, onReset, assetData }: DeploymentSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Centered Confirmation Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        {/* Green Check Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="h-10 w-10 text-green-600" />
        </div>
        
        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Asset Deployed Successfully
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Your rental asset is now live on Mantle Atlas. Investors can start participating immediately.
        </p>

        {/* Deployment Summary Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Asset Type</p>
              <p className="font-medium text-gray-900">Rental Property</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Yield</p>
              <p className="font-medium text-gray-900">{assetData.apy}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payout Frequency</p>
              <p className="font-medium text-gray-900 capitalize">{assetData.payoutFrequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contract Address</p>
              <p className="font-medium text-gray-900 font-mono text-sm">0x1234...5678</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rental-assets"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
          >
            View in Rental Assets
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Link>
          
          <button
            onClick={onReset}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Create Another Asset
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Your asset has been automatically added to the Rental Assets marketplace and is now available for investor participation.
        </p>
      </div>
    </div>
  );
}