'use client';

import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface ComplianceRuleProps {
  title: string;
  status: 'compliant' | 'warning' | 'info';
  description: string;
  lastVerified?: string;
  requiredAction?: string;
}

export default function ComplianceRule({ 
  title, 
  status, 
  description, 
  lastVerified, 
  requiredAction 
}: ComplianceRuleProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'compliant':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'compliant':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'compliant':
        return 'text-green-900';
      case 'warning':
        return 'text-yellow-900';
      case 'info':
        return 'text-blue-900';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getStatusIcon()}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${getStatusTextColor()} mb-1`}>
            {title}
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            {description}
          </p>
          
          {lastVerified && (
            <p className="text-xs text-gray-500 mb-1">
              Last verified: {lastVerified}
            </p>
          )}
          
          {requiredAction && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-600 mb-1">
                Required Action:
              </p>
              <p className="text-xs text-gray-700">
                {requiredAction}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}