'use client';

import { AssetDetails } from '@/types/asset';

interface AssetHeaderProps {
  asset: AssetDetails;
}

export default function AssetHeader({ asset }: AssetHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-lg">
            {asset.name.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
          <p className="text-gray-600">{asset.city}, {asset.state}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {asset.verified && (
          <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>
        )}
        
        <div className="text-right">
          <p className="text-sm text-gray-500">Contract Address</p>
          <p className="text-sm font-mono text-gray-900">{asset.contractAddress}</p>
        </div>
      </div>
    </div>
  );
}