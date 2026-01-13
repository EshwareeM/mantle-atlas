'use client';

import { 
  ServerIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function SystemStatusPanel() {
  const systemStatus = [
    {
      name: 'Mantle Mainnet',
      status: 'operational',
      icon: <ServerIcon className="h-5 w-5" />,
      lastCheck: '2 min ago'
    },
    {
      name: 'Smart Contracts',
      status: 'operational',
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      lastCheck: '5 min ago'
    },
    {
      name: 'Yield Distribution',
      status: 'operational',
      icon: <ClockIcon className="h-5 w-5" />,
      lastCheck: '1 min ago'
    },
    {
      name: 'Identity Verification',
      status: 'degraded',
      icon: <ExclamationTriangleIcon className="h-5 w-5" />,
      lastCheck: '10 min ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'degraded':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'down':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
      
      <div className="space-y-4">
        {systemStatus.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                {service.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-500">Last check: {service.lastCheck}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                {getStatusIcon(service.status)}
                <span className="ml-1 capitalize">{service.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">System Health</h4>
            <p className="text-sm text-blue-800">
              3 of 4 systems operational. Identity verification experiencing minor delays. 
              All investments and distributions are processing normally.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">99.8%</div>
          <div className="text-xs text-green-700">Uptime (30 days)</div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">2.3s</div>
          <div className="text-xs text-blue-700">Avg Response Time</div>
        </div>
      </div>
    </div>
  );
}