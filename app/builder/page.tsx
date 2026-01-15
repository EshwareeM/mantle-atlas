'use client';

import { useState } from 'react';
import { rentalAssets, getAllAssets, addNewAsset } from '../../data/rentalAssets';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import StepIndicator from '../../components/builder/StepIndicator';
import AssetIdentification from '../../components/builder/AssetIdentification';
import YieldConfiguration from '../../components/builder/YieldConfiguration';
import ComplianceDeployment from '../../components/builder/ComplianceDeployment';
import DeploymentSuccess from '../../components/builder/DeploymentSuccess';
import { usePanelStates } from '@/hooks/usePanelStates';

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [assetData, setAssetData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    monthlyRent: '',
    apy: '',
    payoutFrequency: 'monthly',
    tokenSupply: ''
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  
  // Panel states
  const { panelStates, toggleLeftSidebar, toggleRightPanel } = usePanelStates();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      // Add the new asset to the rental assets list
      const newAsset = addNewAsset({
        name: assetData.name,
        city: assetData.location.split(',')[0] || '',
        state: assetData.location.split(',')[1]?.trim() || '',
        monthlyRent: parseFloat(assetData.monthlyRent),
        estimatedYield: parseFloat(assetData.apy),
        verified: true,
        imageUrl: assetData.imageUrl,
        propertyType: 'Rental Property',
        tokenSupply: parseInt(assetData.tokenSupply),
        riskRating: 'Low',
        description: assetData.description
      });
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('assetUpdated'));
      
      setIsDeploying(false);
      setDeploymentComplete(true);
    }, 3000);
  };

  const handleAssetDataChange = (newData: any) => {
    setAssetData(newData);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAssetData({
      name: '',
      location: '',
      description: '',
      imageUrl: '',
      monthlyRent: '',
      apy: '',
      payoutFrequency: 'monthly',
      tokenSupply: ''
    });
    setDeploymentComplete(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA' }}>
      {/* Left Sidebar - Fixed */}
      <Sidebar
        isOpen={panelStates.leftSidebarOpen}
        onToggle={toggleLeftSidebar}
        onClose={() => toggleLeftSidebar()}
      />
      
      {/* Main Content - Dynamic Width */}
      <div className={`min-h-screen transition-all duration-300 ease-in-out ${
        panelStates.leftSidebarOpen ? 'ml-64' : 'ml-0'
      } ${panelStates.rightPanelOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Asset Builder Mode
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deploy institutional-grade RealFi assets via Mantle Atlas Core infrastructure.
            </p>
          </div>

          {/* Step Progress Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Step Content */}
          <div className="mt-12">
            {deploymentComplete ? (
              <DeploymentSuccess 
                assetName={assetData.name}
                onReset={handleReset}
                assetData={assetData}
              />
            ) : (
              <>
                {currentStep === 1 && (
                  <AssetIdentification
                    data={assetData}
                    onChange={handleAssetDataChange}
                    onNext={handleNext}
                  />
                )}
                
                {currentStep === 2 && (
                  <YieldConfiguration
                    data={assetData}
                    onChange={handleAssetDataChange}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                )}
                
                {currentStep === 3 && (
                  <ComplianceDeployment
                    assetData={assetData}
                    onPrevious={handlePrevious}
                    onDeploy={handleDeploy}
                    isDeploying={isDeploying}
                  />
                )}
              </>
            )}
          </div>
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