'use client';

import { useState, useEffect } from 'react';
import { AssetDetails } from '@/types/asset';
import { getAllAssets } from '@/data/rentalAssets';

export function useRealTimeAssets() {
  const [assets, setAssets] = useState<AssetDetails[]>(getAllAssets());

  // Listen for storage changes (cross-tab communication)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'newlyDeployedAssets') {
        setAssets(getAllAssets());
      }
    };

    // Listen for custom events (same-tab communication)
    const handleAssetUpdate = () => {
      setAssets(getAllAssets());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assetUpdated', handleAssetUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assetUpdated', handleAssetUpdate);
    };
  }, []);

  const refreshAssets = () => {
    setAssets(getAllAssets());
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('assetUpdated'));
  };

  return { assets, refreshAssets };
}
