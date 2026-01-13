'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import IntroCard from '../../components/compliance/IntroCard';
import ComplianceRulesList from '../../components/compliance/ComplianceRulesList';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ComplianceRulesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Left Sidebar - Fixed */}
      <div className="fixed left-0 top-0 w-64 h-full z-20">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="ml-64 mr-80">
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
      <div className="fixed right-0 top-0 w-80 h-full bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Network</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mantle Network</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Block Height</span>
                  <span className="text-sm font-mono">18,457,293</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Compliance</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Audit</span>
                  <span className="text-sm">Mar 15, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risk Level</span>
                  <span className="text-sm font-medium">Low</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Account</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification</span>
                  <span className="text-sm text-green-600">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <span className="text-sm font-medium">Gold</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm">Oct 20, 2024</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Security</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">2FA</span>
                  <span className="text-sm text-green-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm">2 hours ago</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border-l-4" style={{ 
              borderLeftColor: '#2563EB',
              borderRadius: '12px'
            }}>
              <div className="flex items-start">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Compliance Active</h4>
                  <p className="text-sm text-blue-800">
                    All compliance requirements are currently met. Your account is in good standing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}