'use client';

import { AssetDetails } from '@/types/asset';

interface AssetOverviewProps {
  asset: AssetDetails;
}

export default function AssetOverview({ asset }: AssetOverviewProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Asset Overview</h3>
      
      <p className="text-gray-700 leading-relaxed mb-6">
        {asset.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Investment Type</h4>
          <p className="text-gray-600">{asset.propertyType} Rental Income</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Ownership Structure</h4>
          <p className="text-gray-600">No physical ownership</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Payment Schedule</h4>
          <p className="text-gray-600">Monthly rent collection</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Settlement Method</h4>
          <p className="text-gray-600">Automatic settlement via Mantle Atlas Core</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Key Benefits</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Passive rental income without property management</li>
          <li>• Blockchain-secured ownership and payments</li>
          <li>• Fractional investment with low minimums</li>
          <li>• Compliant and transparent yield distribution</li>
        </ul>
      </div>
    </div>
  );
}