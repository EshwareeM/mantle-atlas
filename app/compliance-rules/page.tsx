'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import IntroCard from '../../components/compliance/IntroCard';
import ComplianceRulesList from '../../components/compliance/ComplianceRulesList';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { usePanelStates } from '@/hooks/usePanelStates';

export default function ComplianceRulesPage() {
  const { panelStates, toggleLeftSidebar, toggleRightPanel } = usePanelStates();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Left Sidebar - Fixed */}
      <Sidebar
        isOpen={panelStates.leftSidebarOpen}
        onToggle={toggleLeftSidebar}
        onClose={() => toggleLeftSidebar()}
      />
      
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out ${
        panelStates.leftSidebarOpen ? 'ml-64' : 'ml-0'
      } ${panelStates.rightPanelOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontSize: '28px' }}>
              Compliance Rules
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Review and manage your compliance requirements for Mantle Atlas participation
            </p>
          </div>

          <IntroCard />
          <ComplianceRulesList />
        </div>
      </div>

      {/* Right Status Panel */}
      <StatusPanel
        isOpen={panelStates.rightPanelOpen}
        onToggle={toggleRightPanel}
        onClose={() => toggleRightPanel()}
      />
    </div>
  );
}