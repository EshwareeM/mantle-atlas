'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Asset {
  id: string;
  name: string;
  city: string;
  state: string;
  monthlyRent: number;
  expectedYield: number;
  verified: boolean;
  imageUrl: string;
  propertyType: string;
  tokenSupply: number;
  riskRating: string;
  isNewlyDeployed?: boolean;
  isDeployed?: boolean;
  deployedAt?: string;
  contractAddress?: string;
  description?: string;
  image?: string;
  apy?: number;
}

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'isDeployed' | 'deployedAt' | 'contractAddress' | 'isNewlyDeployed'>) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  getAssetById: (id: string) => Asset | undefined;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Downtown Manhattan Apartment',
    city: 'New York',
    state: 'NY',
    monthlyRent: 3500,
    expectedYield: 8.5,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Apartment',
    tokenSupply: 10000,
    riskRating: 'Conservative',
    description: 'Luxury apartment in the heart of Manhattan with premium amenities.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-01-15',
    contractAddress: '0x1234...5678'
  },
  {
    id: '2',
    name: 'Miami Beach Condo',
    city: 'Miami',
    state: 'FL',
    monthlyRent: 2800,
    expectedYield: 9.2,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Condo',
    tokenSupply: 8000,
    riskRating: 'Moderate',
    description: 'Beachfront condominium with ocean views and resort-style amenities.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-02-20',
    contractAddress: '0x5678...9abc'
  },
  {
    id: '3',
    name: 'Chicago Office Space',
    city: 'Chicago',
    state: 'IL',
    monthlyRent: 4500,
    expectedYield: 7.8,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Office',
    tokenSupply: 12000,
    riskRating: 'Conservative',
    description: 'Professional office space in Chicago\'s business district.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-03-10',
    contractAddress: '0xdef0...1234'
  },
  {
    id: '4',
    name: 'Industrial Warehouse Unit',
    city: 'Los Angeles',
    state: 'CA',
    monthlyRent: 2200,
    expectedYield: 10.5,
    verified: false,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Industrial',
    tokenSupply: 5000,
    riskRating: 'Aggressive',
    description: 'Large warehouse unit suitable for logistics and storage.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-04-05',
    contractAddress: '0x5678...abcd'
  },
  {
    id: '5',
    name: 'Seattle Townhouse',
    city: 'Seattle',
    state: 'WA',
    monthlyRent: 3200,
    expectedYield: 8.1,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Townhouse',
    tokenSupply: 6000,
    riskRating: 'Moderate',
    description: 'Modern townhouse in a quiet Seattle neighborhood.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-05-12',
    contractAddress: '0x9abc...def0'
  },
  {
    id: '6',
    name: 'Austin Loft Apartment',
    city: 'Austin',
    state: 'TX',
    monthlyRent: 2600,
    expectedYield: 9.8,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    propertyType: 'Apartment',
    tokenSupply: 7500,
    riskRating: 'Moderate',
    description: 'Trendy loft apartment in Austin\'s tech district.',
    isNewlyDeployed: false,
    isDeployed: true,
    deployedAt: '2024-06-18',
    contractAddress: '0x1234...efgh'
  }
];

export function AssetProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const addAsset = (newAsset: Omit<Asset, 'id' | 'isDeployed' | 'deployedAt' | 'contractAddress' | 'isNewlyDeployed'>) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
      isDeployed: true,
      deployedAt: new Date().toISOString(),
      contractAddress: `0x${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 15)}`,
      isNewlyDeployed: true,
      expectedYield: newAsset.apy || 0
    };
    
    setAssets(prev => [asset, ...prev]);
    
    // Remove newly deployed flag after 5 minutes
    setTimeout(() => {
      setAssets(prev => prev.map(a => 
        a.id === asset.id ? { ...a, isNewlyDeployed: false } : a
      ));
    }, 5 * 60 * 1000);
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    ));
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const getAssetById = (id: string) => {
    return assets.find(asset => asset.id === id);
  };

  return (
    <AssetContext.Provider value={{
      assets,
      addAsset,
      updateAsset,
      deleteAsset,
      getAssetById
    }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
}