'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import MetricCard from '../../components/yield/MetricCard';
import DistributionHistory from '../../components/yield/DistributionHistory';
import { usePanelStates } from '@/hooks/usePanelStates';

export default function YieldFlowPage() {
  const { panelStates, toggleLeftSidebar, toggleRightPanel } = usePanelStates();

  return (
    <div className="h-screen bg-white">
      {/* Left Sidebar - Fixed */}
      <Sidebar
        isOpen={panelStates.leftSidebarOpen}
        onToggle={toggleLeftSidebar}
        onClose={() => toggleLeftSidebar()}
      />
      
      {/* Main Content - Dynamic Width */}
      <div className={`h-full overflow-y-auto transition-all duration-300 ease-in-out ${
        panelStates.leftSidebarOpen ? 'ml-64' : 'ml-0'
      } ${panelStates.rightPanelOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Yield Flow
            </h1>
            <p className="text-body text-text-secondary">
              Track your yield distributions and investment performance
            </p>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              label="Total Distributed"
              value="$2.84M"
              subtext="This month"
              trend="up"
              trendText="+12.5%"
              trendColor="#10b981"
            />
            <MetricCard
              label="Distributions"
              value="11/12"
              subtext="Completed this month"
              trend="up"
              trendText="+2 vs last month"
              trendColor="#10b981"
            />
            <MetricCard
              label="Average Yield"
              value="$12,847"
              subtext="Per distribution"
              trend="down"
              trendText="-0.8%"
              trendColor="#ef4444"
            />
            <MetricCard
              label="Active Assets"
              value="6"
              subtext="Generating yield"
              trend="up"
              trendText="+1 this month"
              trendColor="#10b981"
            />
          </div>

          {/* Distribution History */}
          <DistributionHistory />
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