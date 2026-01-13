'use client';

import { ArrowTrendingUpIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function YieldFlow() {
  const distributions = [
    {
      id: '1',
      date: '2024-01-15',
      amount: '$2,450',
      status: 'Completed',
      asset: 'Downtown Manhattan Apartment',
      transactionHash: '0x1234...5678'
    },
    {
      id: '2',
      date: '2024-01-15',
      amount: '$1,960',
      status: 'Completed',
      asset: 'Miami Beach Condo',
      transactionHash: '0x5678...9abc'
    },
    {
      id: '3',
      date: '2024-01-15',
      amount: '$3,150',
      status: 'Completed',
      asset: 'Chicago Office Space',
      transactionHash: '0xdef0...1234'
    },
    {
      id: '4',
      date: '2024-01-15',
      amount: '$1,540',
      status: 'Pending',
      asset: 'Seattle Townhouse',
      transactionHash: '0x9abc...def0'
    },
    {
      id: '5',
      date: '2024-01-15',
      amount: '$2,548',
      status: 'Completed',
      asset: 'Austin Loft Apartment',
      transactionHash: '0x1234...efgh'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Yield Distribution Flow</h3>
      
      <div className="space-y-4">
        {distributions.map((distribution) => (
          <div key={distribution.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                distribution.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {distribution.status === 'Completed' ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <CalendarIcon className="h-5 w-5 text-yellow-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{distribution.asset}</p>
                <p className="text-sm text-gray-500">{distribution.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">{distribution.amount}</p>
              <p className={`text-sm ${
                distribution.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {distribution.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Distributed This Period</span>
          <span className="font-semibold text-gray-900">$11,648</span>
        </div>
      </div>
    </div>
  );
}