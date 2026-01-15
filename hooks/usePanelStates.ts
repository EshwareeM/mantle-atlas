'use client';

import { useState, useEffect } from 'react';

interface PanelState {
  leftSidebarOpen: boolean;
  rightPanelOpen: boolean;
}

const STORAGE_KEY = 'mantle-panel-states';

export function usePanelStates() {
  const [panelStates, setPanelStates] = useState<PanelState>({
    leftSidebarOpen: true,
    rightPanelOpen: true
  });

  // Load states from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPanelStates(parsed);
        } catch (error) {
          console.error('Failed to parse panel states:', error);
        }
      }
    }
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(panelStates));
    }
  }, [panelStates]);

  const toggleLeftSidebar = () => {
    setPanelStates(prev => ({
      ...prev,
      leftSidebarOpen: !prev.leftSidebarOpen
    }));
  };

  const toggleRightPanel = () => {
    setPanelStates(prev => ({
      ...prev,
      rightPanelOpen: !prev.rightPanelOpen
    }));
  };

  return {
    panelStates,
    toggleLeftSidebar,
    toggleRightPanel
  };
}
