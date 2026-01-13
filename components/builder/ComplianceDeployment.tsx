'use client';

import { useState } from 'react';
import { CheckCircleIcon, ShieldCheckIcon, DocumentTextIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface AssetData {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  monthlyRent: string;
  apy: string;
  payoutFrequency: string;
  tokenSupply: string;
}

interface ComplianceDeploymentProps {
  onPrevious: () => void;
  onDeploy: () => void;
  assetData: AssetData;
  isDeploying: boolean;
}

export default function ComplianceDeployment({ onPrevious, onDeploy, assetData, isDeploying }: ComplianceDeploymentProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleDeploy = async () => {
    if (!agreedToTerms) {
      alert('Please agree to compliance terms before deploying.');
      return;
    }

    onDeploy();
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Compliance & Deployment
        </h2>
        <p className="text-gray-600">
          Finalize rules and deploy via Mantle Atlas Core.
        </p>
      </div>

      {/* Standard RealFi Rules Applied */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-900">Standard RealFi Rules Applied</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-green-900">Verified Investors Only (via Yield Passport)</span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-green-900">Automated Rent Distribution Engine</span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
            <span className="text-green-900">Asset Governance Enabled</span>
          </div>
        </div>
      </div>

      {/* Asset Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Summary</h3>
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

      {/* Authorization Warning */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Authorization Notice</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              By clicking &quot;Deploy via Mantle Atlas&quot;, you authorize the deployment of this rental asset 
              on the Mantle blockchain. This action will create a smart contract and make the asset 
              available for investor participation through the Mantle Atlas Core infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            I agree to the deployment terms and authorize the smart contract creation
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isDeploying}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← Previous
        </button>
        <button
          onClick={handleDeploy}
          disabled={!agreedToTerms || isDeploying}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center"
        >
          {isDeploying ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Deploying...
            </>
          ) : (
            'Deploy via Mantle Atlas'
          )}
        </button>
      </div>
    </div>
  );
}