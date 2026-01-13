export interface AssetDetails {
  id: string;
  name: string;
  city: string;
  state: string;
  monthlyRent: number;
  estimatedYield: number;
  verified: boolean;
  imageUrl: string;
  propertyType: string;
  tokenSupply: number;
  riskRating: string;
  description: string;
  contractAddress: string;
  deployedAt: string;
  isNew?: boolean; // Optional flag for newly deployed assets
}