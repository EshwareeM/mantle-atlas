import { AssetDetails } from '@/types/asset';

export const rentalAssets: AssetDetails[] = [
  {
    id: '1',
    name: 'Downtown Manhattan Apartment',
    city: 'New York',
    state: 'NY',
    monthlyRent: 3500,
    estimatedYield: 8.5,
    verified: true,
    imageUrl: '/properties/manhattan-apartment.png',
    propertyType: 'Apartment',
    tokenSupply: 10000,
    riskRating: 'Low',
    description: 'Luxury 2-bedroom apartment in heart of Manhattan with stunning city views and premium amenities.',
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    deployedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Miami Beach Condo',
    city: 'Miami',
    state: 'FL',
    monthlyRent: 2800,
    estimatedYield: 9.2,
    verified: true,
    imageUrl: '/properties/miami-beach-condo.png',
    propertyType: 'Condo',
    tokenSupply: 8000,
    riskRating: 'Medium',
    description: 'Modern beachfront condominium with ocean views and resort-style amenities.',
    contractAddress: '0x2345678901bcdef2345678901bcdef23456789',
    deployedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Seattle Townhouse',
    city: 'Seattle',
    state: 'WA',
    monthlyRent: 3200,
    estimatedYield: 7.8,
    verified: true,
    imageUrl: '/properties/seattle-townhouse.png',
    propertyType: 'Townhouse',
    tokenSupply: 12000,
    riskRating: 'Low',
    description: 'Spacious 3-story townhouse in quiet Seattle neighborhood with modern renovations.',
    contractAddress: '0x3456789012cdef03456789012cdef034567890',
    deployedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Austin Loft',
    city: 'Austin',
    state: 'TX',
    monthlyRent: 2500,
    estimatedYield: 10.5,
    verified: true,
    imageUrl: '/properties/austin-loft.png',
    propertyType: 'Loft',
    tokenSupply: 6000,
    riskRating: 'Medium',
    description: 'Industrial-chic loft in downtown Austin with exposed brick and high ceilings.',
    contractAddress: '0x4567890123def014567890123def014567890',
    deployedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '5',
    name: 'Chicago Office Space',
    city: 'Chicago',
    state: 'IL',
    monthlyRent: 4000,
    estimatedYield: 6.5,
    verified: true,
    imageUrl: '/properties/chicago-office.png',
    propertyType: 'Office',
    tokenSupply: 15000,
    riskRating: 'Low',
    description: 'Premium office space in Chicago financial district with modern infrastructure.',
    contractAddress: '0x5678901234ef01245678901234ef01245678901',
    deployedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '6',
    name: 'Denver Suburban House',
    city: 'Denver',
    state: 'CO',
    monthlyRent: 2200,
    estimatedYield: 8.0,
    verified: true,
    imageUrl: '/properties/denver-house.png',
    propertyType: 'House',
    tokenSupply: 9000,
    riskRating: 'Low',
    description: 'Beautiful suburban family home with mountain views and large backyard.',
    contractAddress: '0x6789012345f0123456789012345f0123456789012',
    deployedAt: '2024-02-20T00:00:00Z'
  }
];

// Store newly deployed assets in localStorage for persistence
let newAssets: AssetDetails[] = [];

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('newlyDeployedAssets');
  if (stored) {
    newAssets = JSON.parse(stored);
  }
}

export function getAssetById(id: string): AssetDetails | undefined {
  return [...rentalAssets, ...newAssets].find(asset => asset.id === id);
}

export function getAssetsByCity(city: string): AssetDetails[] {
  return [...rentalAssets, ...newAssets].filter(asset => asset.city.toLowerCase() === city.toLowerCase());
}

export function getAllAssets(): AssetDetails[] {
  return [...newAssets, ...rentalAssets];
}

export function addNewAsset(asset: Omit<AssetDetails, 'id' | 'contractAddress' | 'deployedAt'>): AssetDetails {
  const newAsset: AssetDetails = {
    ...asset,
    id: Date.now().toString(), // Use timestamp as ID
    contractAddress: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
    deployedAt: new Date().toISOString(),
    isNew: true // Flag for new assets
  };
  
  newAssets.unshift(newAsset); // Add to beginning of array
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('newlyDeployedAssets', JSON.stringify(newAssets));
  }
  
  return newAsset;
}

export function getAssetsByType(type: string): AssetDetails[] {
  return rentalAssets.filter(asset => asset.propertyType.toLowerCase() === type.toLowerCase());
}