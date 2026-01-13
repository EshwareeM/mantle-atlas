'use client';

import { useState } from 'react';
import { rentalAssets, getAllAssets, addNewAsset } from '../../data/rentalAssets';
import Sidebar from '../../components/Sidebar';
import StepIndicator from '../../components/builder/StepIndicator';
import AssetIdentification from '../../components/builder/AssetIdentification';
import YieldConfiguration from '../../components/builder/YieldConfiguration';
import ComplianceDeployment from '../../components/builder/ComplianceDeployment';
import DeploymentSuccess from '../../components/builder/DeploymentSuccess';

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
      <div className="fixed left-0 top-0 w-64 h-full z-20">
        <Sidebar />
      </div>
      
      {/* Main Content - Scrollable Only */}
      <div className="ml-64 mr-80 min-h-screen">
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
      <div className="fixed right-0 top-0 w-80 h-full z-20">
        <div className="h-full bg-white border-l border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Builder Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Step</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentStep === 1 && 'Asset Identification'}
                  {currentStep === 2 && 'Yield Configuration'}
                  {currentStep === 3 && 'Compliance & Deployment'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round((currentStep / 3) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}