'use client';

import { useState } from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { AssetDetails } from '@/types/asset';

interface RentalAssetDetailsProps {
  asset: AssetDetails;
  onInvest?: (asset: AssetDetails) => void;
  onFavorite?: (assetId: string) => void;
  isFavorited?: boolean;
}

export default function RentalAssetDetails({ 
  asset, 
  onInvest, 
  onFavorite, 
  isFavorited = false 
}: RentalAssetDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);

  const handleInvestClick = () => {
    if (onInvest) {
      onInvest(asset);
    }
  };

  const handleFavoriteClick = () => {
    if (onFavorite) {
      onFavorite(asset.id);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header with Image */}
      <div className="relative">
        <div className="h-64 bg-gray-200">
          <img
            src={asset.imageUrl}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            {isFavorited ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
        </div>

        {/* Verification Badge */}
        {asset.verified && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ✓ Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{asset.name}</h2>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{asset.city}, {asset.state}</span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">${asset.monthlyRent.toLocaleString()}</div>
            <div className="text-sm text-blue-700">Monthly Rent</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{asset.estimatedYield}%</div>
            <div className="text-sm text-green-700">Expected Yield</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{asset.tokenSupply.toLocaleString()}</div>
            <div className="text-sm text-purple-700">Token Supply</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p className={`text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {asset.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {/* Property Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Property Type</span>
              <span className="font-medium text-gray-900">{asset.propertyType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Risk Rating</span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                asset.riskRating === 'Low' ? 'bg-green-100 text-green-700' :
                asset.riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {asset.riskRating}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Contract Address</span>
              <span className="font-mono text-sm text-gray-900">
                {asset.contractAddress.slice(0, 6)}...{asset.contractAddress.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Deployed</span>
              <span className="font-medium text-gray-900">
                {new Date(asset.deployedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Investor Rating</h3>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  {star <= rating ? (
                    <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon className="h-5 w-5 text-gray-300 hover:text-yellow-400" />
                  )}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating > 0 ? `${rating}.0 out of 5` : 'Click to rate'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleInvestClick}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Invest Now
          </button>
          <button
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
