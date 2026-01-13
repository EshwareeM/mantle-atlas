import { AssetDetails } from '@/types/asset';

export const assetDetails: AssetDetails[] = [
  {
    id: '1',
    name: 'Downtown Manhattan Apartment',
    city: 'New York',
    state: 'NY',
    monthlyRent: 3500,
    estimatedYield: 8.5,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1522702554027-31b452d5f560?w=800&h=600&fit=crop',
    propertyType: 'Apartment',
    tokenSupply: 10000,
    riskRating: 'Low',
    description: 'Luxury 2-bedroom apartment in the heart of Manhattan with stunning city views and premium amenities. This property features high-end finishes, modern appliances, and excellent connectivity to financial districts.',
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
    imageUrl: 'https://images.unsplash.com/photo-1512917760779-a1c90e4a864e?w=800&h=600&fit=crop',
    propertyType: 'Condo',
    tokenSupply: 8000,
    riskRating: 'Medium',
    description: 'Modern beachfront condominium with ocean views and resort-style amenities. Perfect for those seeking a luxury coastal lifestyle with access to pristine beaches.',
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
    imageUrl: 'https://images.unsplash.com/photo-1570129477490-45c699e864bd?w=800&h=600&fit=crop',
    propertyType: 'Townhouse',
    tokenSupply: 12000,
    riskRating: 'Low',
    description: 'Spacious 3-story townhouse in quiet Seattle neighborhood with modern renovations. Features include updated kitchen, hardwood floors, and private garden area.',
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
    imageUrl: 'https://images.unsplash.com/photo-1560448214-9d98a5da17f4?w=800&h=600&fit=crop',
    propertyType: 'Loft',
    tokenSupply: 6000,
    riskRating: 'Medium',
    description: 'Industrial-chic loft in downtown Austin with exposed brick and high ceilings. Open floor plan with modern kitchen and large windows providing ample natural light.',
    contractAddress: '0x4567890123def014567890123def014567890',
    deployedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '5',
    name: 'Chicago Office Space',
    city: 'Chicago',
    state: 'IL',
    monthlyRent: 4000,
    estimatedYield: 7.5,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-3bcf7045e3a9?w=800&h=600&fit=crop',
    propertyType: 'Office',
    tokenSupply: 15000,
    riskRating: 'Low',
    description: 'Premium office space in Chicago financial district with modern infrastructure. State-of-the-art conference rooms, high-speed internet, and secure access.',
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
    imageUrl: 'https://images.unsplash.com/photo-1570129477490-45c699e864bd?w=800&h=600&fit=crop',
    propertyType: 'House',
    tokenSupply: 9000,
    riskRating: 'Low',
    description: 'Beautiful suburban family home with mountain views and large backyard. Recently renovated with energy-efficient systems and modern finishes throughout.',
    contractAddress: '0x6789012345f0123456789012345f0123456789012',
    deployedAt: '2024-02-20T00:00:00Z'
  }
];

export function getAssetDetailsById(id: string): AssetDetails | undefined {
  return assetDetails.find(asset => asset.id === id);
}

export function getAssetDetailsByCity(city: string): AssetDetails[] {
  return assetDetails.filter(asset => asset.city.toLowerCase() === city.toLowerCase());
}

export function getAssetDetailsByType(type: string): AssetDetails[] {
  return assetDetails.filter(asset => asset.propertyType.toLowerCase() === type.toLowerCase());
}