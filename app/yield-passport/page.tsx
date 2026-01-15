'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import StatusPanel from '../../components/StatusPanel';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon, ChartBarIcon, BuildingOfficeIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { usePanelStates } from '@/hooks/usePanelStates';

export default function YieldPassportPage() {
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
              Mantle Yield Passport
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Your portable investor reputation and trust profile. Verified compliance and earning history across the Mantle ecosystem.
            </p>
          </div>

          {/* Primary Passport Card (Hero Element) */}
          <div className="bg-white rounded-xl p-6 mb-8" style={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            borderRadius: '12px'
          }}>
            <div className="flex items-center justify-between">
              {/* Left side - Blue Passport Card */}
              <div className="flex-1">
                <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-xl p-6 text-white" style={{
                  background: 'linear-gradient(to right, #1E3A8A, #2563EB)',
                  borderRadius: '14px'
                }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Verified Holder
                    </span>
                    <ShieldCheckIcon className="h-6 w-6 text-white/80" />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-white/70 mb-1">PASSPORT HOLDER</p>
                    <p className="font-mono text-sm">0x7a4f...3b9c</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div>
                      <p className="text-xs text-white/70 mb-1">Trust Score</p>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">98 / 100</span>
                        <ShieldCheckIcon className="h-6 w-6 ml-2 text-green-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Key Status Fields */}
              <div className="flex-1 ml-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Risk Exposure</span>
                    <span className="text-sm font-medium text-gray-900">Low – Moderate</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Verification Date</span>
                    <span className="text-sm font-medium text-gray-900">Jan 12, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row (3 Stat Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6" style={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              borderRadius: '12px'
            }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Lifetime Yield</span>
                <ChartBarIcon className="h-4 w-4" style={{ color: '#16A34A' }} />
              </div>
              <p className="text-2xl font-bold text-gray-900">$12,492.80</p>
              <p className="text-xs text-green-600 mt-1">+12.3% this month</p>
            </div>
            
            <div className="bg-white rounded-xl p-6" style={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              borderRadius: '12px'
            }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Assets</span>
                <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8 Positions</p>
              <p className="text-xs text-gray-500 mt-1">Across 5 properties</p>
            </div>
            
            <div className="bg-white rounded-xl p-6" style={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              borderRadius: '12px'
            }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Consecutive Payouts</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-green-600 mt-1">Months streak</p>
            </div>
          </div>

          {/* Participation History */}
          <div className="bg-white rounded-xl p-6 mb-8" style={{ 
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            borderRadius: '12px'
          }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Participation History</h2>
            
            <div className="space-y-4">
              {/* History Row 1 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <ChartBarIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Luxury Villa</p>
                    <p className="text-sm text-gray-600">Yield received · Apr 01, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+$124.50</p>
                </div>
              </div>

              {/* History Row 2 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">KYC Verification</p>
                    <p className="text-sm text-gray-600">Status updated · Mar 15, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                </div>
              </div>

              {/* History Row 3 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Modern Loft</p>
                    <p className="text-sm text-gray-600">New investment · Dec 05, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">100 ATLAS</p>
                </div>
              </div>

              {/* History Row 4 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <UserCircleIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Passport Issuance</p>
                    <p className="text-sm text-gray-600">Registration · Oct 20, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Initial
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="bg-orange-50 rounded-xl p-6 border-l-4" style={{ 
            borderLeftColor: '#F59E0B',
            borderRadius: '12px'
          }}>
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">Compliance Renewal</h3>
                <p className="text-sm text-orange-800">
                  Your KYC verification expires in 45 days. Review early to avoid yield interruptions.
                </p>
              </div>
            </div>
          </div>
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