'use client';

import Image from 'next/image';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { AssetDetails } from '@/types/asset';

interface AssetHeroProps {
  asset: AssetDetails;
}

export default function AssetHero({ asset }: AssetHeroProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="lg:col-span-2">
        <div className="relative rounded-2xl overflow-hidden" style={{ borderRadius: '16px' }}>
          <Image
            src={asset.imageUrl}
            alt={asset.name}
            width={800}
            height={400}
            className="w-full h-96 object-cover"
            priority
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {asset.name}
        </h1>
        
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span className="text-lg">
            {asset.city}, {asset.state} — Waterfront District
          </span>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Investment Highlights</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• {asset.estimatedYield}% expected annual yield</li>
            <li>• ${asset.monthlyRent.toLocaleString()} monthly rental income</li>
            <li>• {asset.riskRating} risk profile</li>
            <li>• {asset.propertyType} property type</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Property Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Token Supply:</dt>
              <dd className="font-medium text-gray-900">{asset.tokenSupply.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Risk Rating:</dt>
              <dd className="font-medium text-gray-900">{asset.riskRating}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Property Type:</dt>
              <dd className="font-medium text-gray-900">{asset.propertyType}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Deployed:</dt>
              <dd className="font-medium text-gray-900">{new Date(asset.deployedAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}