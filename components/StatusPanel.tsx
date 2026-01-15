'use client';

import { 
  ArrowRightIcon,
  ArrowUpCircleIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  LockClosedIcon,
  CheckCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const statusItems = [
  { 
    label: 'Network', 
    value: 'Mantle Mainnet',
    status: 'Operational'
  }
];

const activities = [
  { 
    icon: <ArrowUpCircleIcon className="h-5 w-5 text-blue-600" />,
    title: 'Yield Distributed',
    subtitle: 'MV-012 · 2m ago'
  },
  { 
    icon: <ShieldCheckIcon className="h-5 w-5 text-blue-600" />,
    title: 'Identity Verified',
    subtitle: 'Investor #482 · 15m ago'
  },
  { 
    icon: <GlobeAltIcon className="h-5 w-5 text-blue-600" />,
    title: 'New Asset Listed',
    subtitle: 'AL-902 · 1h ago'
  }
];

interface StatusPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function StatusPanel({ isOpen, onToggle, onClose }: StatusPanelProps) {
  return (
    <>
      {/* Status Panel */}
      <div className={`fixed right-0 top-0 h-full bg-[#FAFAFA] border-l border-[#E5E7EB] z-20 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="w-[340px] h-full relative">
          {/* Header with controls */}
          <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB] bg-white">
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bars3Icon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="p-6 pt-0 overflow-y-auto h-full">
            {/* System Status Section */}
            <div className="mb-6 mt-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                System Status
              </h3>
              
              {/* Network Status */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-900">Mantle Mainnet</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                  Operational
                </span>
              </div>

              {/* Sync Progress */}
              <div className="bg-[#F8F9FB] rounded-xl p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">Syncing Blocks</span>
                  <span className="text-gray-500">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-[#2563EB] h-1.5 rounded-full" 
                    style={{ width: '99.9%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="group flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-lg bg-blue-50 mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-[#ECFDF5] rounded-2xl p-5">
              <div className="flex items-start">
                <div className="p-2 bg-white rounded-lg mr-3">
                  <LockClosedIcon className="h-5 w-5 text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#2563EB] mb-1">
                    Secure Settlement
                  </h4>
                  <p className="text-sm text-gray-600">
                    Atlas Core handles all rental distributions via immutable smart contracts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Visible when panel is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed right-4 top-4 z-30 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-100"
        >
          <Bars3Icon className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </>
  );
}