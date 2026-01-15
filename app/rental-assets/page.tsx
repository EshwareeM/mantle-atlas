'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import RentalAssetList from '@/components/rental/RentalAssetList';
import RentalAssetModal from '@/components/rental/RentalAssetModal';
import InvestmentFlow from '@/components/rental/InvestmentFlow';
import RentalStats from '@/components/rental/RentalStats';
import { rentalAssets, getAllAssets, addNewAsset } from '../../data/rentalAssets';
import { AssetDetails } from '@/types/asset';
import { useRealTimeAssets } from '@/hooks/useRealTimeAssets';
import { usePanelStates } from '@/hooks/usePanelStates';

export default function RentalAssetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<AssetDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [investmentAsset, setInvestmentAsset] = useState<AssetDetails | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState(100);
  const [isInvestmentFlowOpen, setIsInvestmentFlowOpen] = useState(false);
  const [investedAssets, setInvestedAssets] = useState<Set<string>>(new Set());
  
  // Panel states
  const { panelStates, toggleLeftSidebar, toggleRightPanel } = usePanelStates();
  
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

  const handleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleInvest = (asset: AssetDetails, amount: number) => {
    setInvestmentAsset(asset);
    setInvestmentAmount(amount);
    setIsInvestmentFlowOpen(true);
    setIsModalOpen(false); // Close the asset details modal
  };

  const handleInvestmentComplete = () => {
    if (investmentAsset) {
      setInvestedAssets(prev => new Set(Array.from(prev).concat(investmentAsset.id)));
    }
    setIsInvestmentFlowOpen(false);
    setInvestmentAsset(null);
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
      <Sidebar
        isOpen={panelStates.leftSidebarOpen}
        onToggle={toggleLeftSidebar}
        onClose={() => toggleLeftSidebar()}
      />
      
      {/* Main Content - Dynamic Width */}
      <div className={`h-full overflow-y-auto transition-all duration-300 ease-in-out ${
        panelStates.leftSidebarOpen ? 'ml-64' : 'ml-0'
      } ${panelStates.rightPanelOpen ? 'mr-80' : 'mr-0'}`}>
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
            investedAssets={investedAssets}
          />

          {/* Asset Details Modal */}
          <RentalAssetModal
            asset={selectedAsset}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onInvest={handleInvest}
          />

          {/* Investment Flow Modal */}
          <InvestmentFlow
            asset={investmentAsset}
            isOpen={isInvestmentFlowOpen}
            onClose={handleInvestmentComplete}
            amount={investmentAmount}
          />
        </div>
      </div>

      {/* Right Status Panel - Fixed */}
      <StatusPanel
        isOpen={panelStates.rightPanelOpen}
        onToggle={toggleRightPanel}
        onClose={() => toggleRightPanel()}
      />
    </div>
  );
}