'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import StatusPanel from '@/components/StatusPanel';
import AssetHeader from '@/components/asset/AssetHeader';
import AssetHero from '@/components/asset/AssetHero';
import AssetOverview from '@/components/asset/AssetOverview';
import InvestmentPanel from '@/components/asset/InvestmentPanel';
import ComplianceModal from '@/components/asset/ComplianceModal';
import InfoDisclaimer from '@/components/asset/InfoDisclaimer';
import { getAssetById } from '@/data/rentalAssets';
import { usePanelStates } from '@/hooks/usePanelStates';

interface AssetPageProps {
  params: {
    assetId: string;
  };
}

export default function AssetPage({ params }: AssetPageProps) {
  const asset = getAssetById(params.assetId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Panel states
  const { panelStates, toggleLeftSidebar, toggleRightPanel } = usePanelStates();

  if (!asset) {
    notFound();
  }

  const handleInvestClick = () => {
    setIsModalOpen(true);
    setShowConfirmation(false);
  };

  const handleConfirmInvest = () => {
    setShowConfirmation(true);
  };

  const handleInvested = () => {
    setShowConfirmation(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar - Fixed */}
      <Sidebar
        isOpen={panelStates.leftSidebarOpen}
        onToggle={toggleLeftSidebar}
        onClose={() => toggleLeftSidebar()}
      />
      
      {/* Main Content - Dynamic Width */}
      <main className={`overflow-y-auto transition-all duration-300 ease-in-out ${
        panelStates.leftSidebarOpen ? 'ml-64' : 'ml-0'
      } ${panelStates.rightPanelOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <AssetHeader asset={asset} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <AssetHero asset={asset} />
              <AssetOverview asset={asset} />
              <InfoDisclaimer />
            </div>
            
            <div className="space-y-8">
              <InvestmentPanel
                asset={asset}
                onInvestClick={handleInvestClick}
                isInvested={showConfirmation}
                onInvested={handleInvested}
              />
            </div>
          </div>
        </div>
      </main>

      <ComplianceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        assetName={asset.name}
        onConfirm={handleConfirmInvest}
        showConfirmation={showConfirmation}
      />

      {/* Right Status Panel - Fixed */}
      <StatusPanel
        isOpen={panelStates.rightPanelOpen}
        onToggle={toggleRightPanel}
        onClose={() => toggleRightPanel()}
      />
    </div>
  );
}