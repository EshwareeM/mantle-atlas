'use client';

import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function PassportCard() {
  const passportStatus = {
    verified: true,
    level: 'Gold',
    score: 850,
    lastUpdated: '2024-01-15',
    expiresOn: '2025-01-15'
  };

  const complianceItems = [
    {
      icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />,
      text: 'Identity Verified',
      status: 'complete'
    },
    {
      icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />,
      text: 'Risk Assessment',
      status: 'complete'
    },
    {
      icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />,
      text: 'KYC/AML Check',
      status: 'complete'
    },
    {
      icon: <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />,
      text: 'Annual Review',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg mr-4">
            <ShieldCheckIcon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Yield Passport</h3>
            <p className="text-blue-100">Investment Verification</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{passportStatus.level}</div>
          <div className="text-sm text-blue-100">Level</div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-100">Compliance Score</span>
          <span className="text-xl font-bold">{passportStatus.score}</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2" 
            style={{ width: '85%' }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {complianceItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-3">
              {item.icon}
            </div>
            <span className="text-sm text-blue-50">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-white border-opacity-20 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-blue-100">Updated</span>
          <span className="text-white">{passportStatus.lastUpdated}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-blue-100">Expires</span>
          <span className="text-white">{passportStatus.expiresOn}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
        <p className="text-xs text-blue-50">
          Your Yield Passport enables participation in verified investment opportunities across the Mantle Atlas ecosystem.
        </p>
      </div>
    </div>
  );
}