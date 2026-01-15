'use client';

import { useState } from 'react';
import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { AssetDetails } from '@/types/asset';

interface RentalAssetListProps {
  assets: AssetDetails[];
  onAssetClick?: (asset: AssetDetails) => void;
  investedAssets?: Set<string>;
}

export default function RentalAssetList({ assets, onAssetClick, investedAssets = new Set() }: RentalAssetListProps) {
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortedAssets = [...assets].sort((a, b) => {
    switch (sortBy) {
      case 'yield-high':
        return b.estimatedYield - a.estimatedYield;
      case 'yield-low':
        return a.estimatedYield - b.estimatedYield;
      case 'price-high':
        return b.monthlyRent - a.monthlyRent;
      case 'price-low':
        return a.monthlyRent - b.monthlyRent;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.deployedAt).getTime() - new Date(a.deployedAt).getTime();
    }
  });

  const handleAssetClick = (asset: AssetDetails) => {
    if (onAssetClick) {
      onAssetClick(asset);
    }
  };

  return (
    <div>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {assets.length} assets
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="yield-high">Yield (High to Low)</option>
            <option value="yield-low">Yield (Low to High)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="name">Name (A to Z)</option>
          </select>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Assets Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => handleAssetClick(asset)}
              className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative ${
                asset.isNew ? 'border-l-4 border-l-green-500' : 'border-gray-200'
              }`}
            >
              {/* New Asset Badge */}
              {asset.isNew && (
                <div className="absolute top-2 left-2 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded border border-green-200">
                  Newly Deployed
                </div>
              )}
              
              {/* Investment Confirmed Badge */}
              {investedAssets.has(asset.id) && (
                <div className="absolute top-2 left-2 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded border border-blue-200">
                  Investment Confirmed
                </div>
              )}
              {/* Asset Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={asset.imageUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
                {asset.verified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>
              
              {/* Asset Details */}
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
                      <BuildingOfficeIcon className="h-4 w-4 mr-1" />
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
                    <p className="text-sm text-gray-600">Risk</p>
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
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => handleAssetClick(asset)}
              className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow cursor-pointer relative ${
                asset.isNew ? 'border-l-4 border-l-green-500' : 'border-gray-200'
              }`}
            >
              {/* New Asset Badge */}
              {asset.isNew && (
                <div className="absolute top-2 left-2 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded border border-green-200">
                  Newly Deployed
                </div>
              )}
              
              {/* Investment Confirmed Badge */}
              {investedAssets.has(asset.id) && (
                <div className="absolute top-2 left-2 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded border border-blue-200">
                  Investment Confirmed
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Asset Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={asset.imageUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Asset Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{asset.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{asset.city}, {asset.state}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        ${asset.monthlyRent.toLocaleString()}/mo
                      </span>
                      <span className="text-sm text-gray-600">
                        {asset.propertyType}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {asset.estimatedYield}% APY
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div className="text-right">
                  {asset.verified && (
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium mb-2">
                      Verified
                    </div>
                  )}
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    asset.riskRating === 'Low' ? 'bg-green-100 text-green-700' :
                    asset.riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {asset.riskRating} Risk
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
