'use client';

import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DistributionRowProps {
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  transactionHash?: string;
  assetName: string;
}

export default function DistributionRow({ 
  date, 
  amount, 
  status, 
  transactionHash, 
  assetName 
}: DistributionRowProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'failed':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatTransactionHash = (hash: string) => {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        <div>
          <div className="font-medium text-gray-900">{assetName}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="font-semibold text-gray-900">{amount}</div>
          {transactionHash && (
            <div className="text-xs text-gray-500">
              {formatTransactionHash(transactionHash)}
            </div>
          )}
        </div>
        
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="ml-1 capitalize">{status}</span>
        </div>
      </div>
    </div>
  );
}