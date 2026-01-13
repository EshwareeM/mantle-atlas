'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/outline';
import { AssetDetails } from '@/types/asset';

interface RentalAssetCardProps {
  asset: AssetDetails;
}

export default function RentalAssetCard({ asset }: RentalAssetCardProps) {
  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48">
          <Image
            src={asset.imageUrl}
            alt={asset.name}
            fill
            className="object-cover"
          />
          {asset.verified && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{asset.name}</h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{asset.city}, {asset.state}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">Monthly Rent</span>
              </div>
              <p className="font-semibold text-gray-900">${asset.monthlyRent.toLocaleString()}</p>
            </div>
            
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <HomeIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">Type</span>
              </div>
              <p className="font-semibold text-gray-900">{asset.propertyType}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-600">Expected Yield</p>
              <p className="text-lg font-bold text-green-600">{asset.estimatedYield}%</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Risk Rating</p>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                asset.riskRating === 'Low' ? 'bg-green-100 text-green-700' :
                asset.riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {asset.riskRating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}