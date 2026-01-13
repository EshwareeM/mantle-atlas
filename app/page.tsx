'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import StatusPanel from '../components/StatusPanel';
import StatCard from '../components/StatCard';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAssets } from '../contexts/AssetContext';

const statsData = [
  {
    title: 'Total Yield Distributed',
    value: '$847,293',
    footer: {
      text: '+12.5% vs last month',
      positive: true
    }
  },
  {
    title: 'Active Rental Assets',
    value: '6',
    footer: {
      text: 'Across 3 markets',
      positive: true
    }
  },
  {
    title: 'Verified Participants',
    value: '1,247',
    footer: {
      text: '100% compliance rate',
      positive: true
    }
  }
];

export default function Home() {
  const { assets } = useAssets();

  return (
    <div className="h-screen bg-white">
      {/* Left Sidebar - Fixed */}
      <div className="fixed left-0 top-0 w-64 h-full z-20">
        <Sidebar />
      </div>
      
      {/* Main Content - Scrollable Only */}
      <div className="ml-64 mr-80 h-full overflow-y-auto">
        <div className="p-8">
          {/* Top Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-50 text-mantle-blue text-label font-medium rounded-full">
              Mantle Atlas Core
            </span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-hero font-bold text-text-primary mb-4 leading-tight">
              Real-World Rental Yield,<br />
              Powered by Mantle
            </h1>
            <p className="text-body text-text-secondary max-w-lg">
              Compliant real-world income, automated and settled on Mantle.
              Invest in rental cash flow, not property speculation.
            </p>
          </div>

          {/* Primary Buttons */}
          <div className="flex gap-4 mb-12">
            <Link href="/rental-assets" className="px-6 py-3 bg-mantle-blue text-white font-medium rounded-button hover:bg-blue-700 transition-colors inline-block">
              Explore Rental Assets →
            </Link>
            <Link href="/builder" className="px-6 py-3 bg-white text-text-primary font-medium rounded-button border border-border-default hover:bg-gray-50 transition-colors inline-block">
              Launch Rental Asset
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                footer={stat.footer}
              />
            ))}
          </div>

          {/* System Panels Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Asset Backing Status Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Asset Backing Status
              </h3>
              
              {/* Metrics Layout */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Left Column */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Coverage Ratio</p>
                  <p className="text-2xl font-bold text-gray-900">102.4%</p>
                </div>
                {/* Right Column */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Backing Source</p>
                  <p className="text-sm font-medium text-gray-900">Verified Rental Payments</p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-200 mb-4"></div>
              
              {/* Bottom Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Last Attestation</p>
                  <p className="text-sm text-gray-900">Jan 10, 2025</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-gray-600 mb-1 mr-2">Status</p>
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-600 mr-1" />
                    <p className="text-sm text-green-600 font-medium">Fully Collateralized</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Health Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">
                  Compliance Health
                </h3>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-600">98% Healthy</span>
                </div>
              </div>
              
              {/* Compliance Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-900">KYC Enforcement</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-900">Region Controls</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-900">Yield Rules</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Enforced</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckIcon className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-900">Custody Status</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Status Panel - Fixed */}
      <div className="fixed right-0 top-0 w-80 h-full z-20">
        <StatusPanel />
      </div>
    </div>
  );
}