'use client';

import { ArrowTrendingUpIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Distribution {
  id: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  asset: string;
  transactionHash: string;
  yieldRate: number;
}

export default function DistributionHistory() {
  const distributions: Distribution[] = [
    {
      id: '1',
      date: '2024-01-15',
      amount: '$2,450',
      status: 'Completed',
      asset: 'Downtown Manhattan Apartment',
      transactionHash: '0x1234...5678',
      yieldRate: 8.5
    },
    {
      id: '2',
      date: '2024-01-15',
      amount: '$1,960',
      status: 'Completed',
      asset: 'Miami Beach Condo',
      transactionHash: '0x5678...9abc',
      yieldRate: 9.2
    },
    {
      id: '3',
      date: '2024-01-15',
      amount: '$3,150',
      status: 'Completed',
      asset: 'Chicago Office Space',
      transactionHash: '0xdef0...1234',
      yieldRate: 7.8
    },
    {
      id: '4',
      date: '2024-01-15',
      amount: '$1,540',
      status: 'Pending',
      asset: 'Seattle Townhouse',
      transactionHash: '0x9abc...def0',
      yieldRate: 8.1
    },
    {
      id: '5',
      date: '2024-01-15',
      amount: '$2,548',
      status: 'Completed',
      asset: 'Austin Loft Apartment',
      transactionHash: '0x1234...efgh',
      yieldRate: 9.8
    }
  ];

  const getStatusColor = (status: Distribution['status']) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Distribution['status']) => {
    switch (status) {
      case 'Completed':
        return <ArrowTrendingUpIcon className="h-4 w-4" />;
      case 'Pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'Failed':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Distribution History</h3>
        <p className="text-sm text-gray-600 mt-1">
          Track all yield distributions across your portfolio
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {distributions.map((distribution) => (
          <div key={distribution.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(distribution.status)}`}>
                  {getStatusIcon(distribution.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{distribution.asset}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-500">{distribution.date}</p>
                    <p className="text-sm text-gray-500">{distribution.yieldRate}% APY</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">{distribution.amount}</p>
                <div className="flex items-center justify-end mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(distribution.status)}`}>
                    {getStatusIcon(distribution.status)}
                    <span className="ml-1">{distribution.status}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Transaction Hash</span>
                <span className="font-mono text-gray-900">{distribution.transactionHash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Distributed This Period</span>
          <span className="text-lg font-semibold text-gray-900">$11,648</span>
        </div>
      </div>
    </div>
  );
}