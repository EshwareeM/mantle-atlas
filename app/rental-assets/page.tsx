'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import RentalAssetList from '@/components/rental/RentalAssetList';
import RentalAssetModal from '@/components/rental/RentalAssetModal';
import RentalStats from '@/components/rental/RentalStats';
import { rentalAssets, getAllAssets, addNewAsset } from '../../data/rentalAssets';
import { AssetDetails } from '@/types/asset';
import { useRealTimeAssets } from '@/hooks/useRealTimeAssets';

export default function RentalAssetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<AssetDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Use real-time assets hook
  const { assets: allAssets, refreshAssets } = useRealTimeAssets();
  const [filteredAssets, setFilteredAssets] = useState(allAssets);

  // Update filtered assets when all assets change
  useEffect(() => {
    const filtered = allAssets.filter(asset =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [allAssets, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allAssets.filter(asset =>
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.city.toLowerCase().includes(query.toLowerCase()) ||
      asset.propertyType.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAssets(filtered);
  };

  const handleAssetClick = (asset: AssetDetails) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleInvest = (asset: AssetDetails) => {
    console.log('Investing in:', asset.name);
    // Handle investment logic here
  };

  const handleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...rentalAssets];
    
    if (filters.priceRange) {
      // Apply price filter logic
      const [min, max] = filters.priceRange.split('-').map((p: string) => p === '+' ? Infinity : parseInt(p));
      filtered = filtered.filter(asset => {
        if (max === undefined) return asset.monthlyRent >= min;
        return asset.monthlyRent >= min && asset.monthlyRent <= max;
      });
    }
    
    if (filters.propertyType) {
      filtered = filtered.filter(asset => 
        asset.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }
    
    if (filters.riskLevel) {
      filtered = filtered.filter(asset => 
        asset.riskRating.toLowerCase() === filters.riskLevel.toLowerCase()
      );
    }
    
    setFilteredAssets(filtered);
  };

  return (
    <div className="h-screen bg-white">
      {/* Left Sidebar - Fixed */}
      <div className="fixed left-0 top-0 w-64 h-full z-20">
        <Sidebar />
      </div>
      
      {/* Main Content - Scrollable Only */}
      <div className="ml-64 mr-80 h-full overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Rental Assets
            </h1>
            <p className="text-body text-text-secondary">
              Browse and invest in verified rental properties across United States
            </p>
          </div>

          {/* Stats Overview */}
          <RentalStats
            totalAssets={filteredAssets.length}
            averageYield={8.7}
            totalInvested={7000}
            monthlyDistribution={2847}
          />

          {/* Asset List */}
          <RentalAssetList
            assets={filteredAssets}
            onAssetClick={handleAssetClick}
          />

          {/* Asset Details Modal */}
          <RentalAssetModal
            asset={selectedAsset}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onInvest={handleInvest}
          />
        </div>
      </div>

      {/* Right Status Panel - Fixed */}
      <div className="fixed right-0 top-0 w-80 h-full z-20">
        <StatusPanel />
      </div>
    </div>
  );
}