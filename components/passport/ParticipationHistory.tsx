'use client';

import { ArrowTrendingUpIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface Participation {
  id: string;
  date: string;
  asset: string;
  amount: string;
  status: 'Active' | 'Completed' | 'Pending';
  yield: string;
  type: string;
}

export default function ParticipationHistory() {
  const participations: Participation[] = [
    {
      id: '1',
      date: '2024-01-15',
      asset: 'Downtown Manhattan Apartment',
      amount: '$1,000',
      status: 'Active',
      yield: '8.5%',
      type: 'Apartment'
    },
    {
      id: '2',
      date: '2024-01-10',
      asset: 'Miami Beach Condo',
      amount: '$2,500',
      status: 'Active',
      yield: '9.2%',
      type: 'Condo'
    },
    {
      id: '3',
      date: '2023-12-20',
      asset: 'Chicago Office Space',
      amount: '$1,500',
      status: 'Completed',
      yield: '7.8%',
      type: 'Office'
    },
    {
      id: '4',
      date: '2023-12-05',
      asset: 'Seattle Townhouse',
      amount: '$800',
      status: 'Active',
      yield: '8.1%',
      type: 'Townhouse'
    },
    {
      id: '5',
      date: '2023-11-15',
      asset: 'Austin Loft Apartment',
      amount: '$1,200',
      status: 'Pending',
      yield: '9.8%',
      type: 'Loft'
    }
  ];

  const getStatusColor = (status: Participation['status']) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Completed':
        return 'text-blue-600 bg-blue-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Participation['status']) => {
    switch (status) {
      case 'Active':
        return <ArrowTrendingUpIcon className="h-4 w-4" />;
      case 'Completed':
        return <CalendarIcon className="h-4 w-4" />;
      case 'Pending':
        return <BuildingOfficeIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Participation History</h3>
        <p className="text-sm text-gray-600 mt-1">
          Track your investment participation across all assets
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {participations.map((participation) => (
          <div key={participation.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(participation.status)}`}>
                  {getStatusIcon(participation.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{participation.asset}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-500">{participation.date}</p>
                    <p className="text-sm text-gray-500">{participation.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">{participation.amount}</p>
                <div className="flex items-center justify-end mt-1 space-x-2">
                  <span className="text-sm text-gray-600">{participation.yield} APY</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participation.status)}`}>
                    {getStatusIcon(participation.status)}
                    <span className="ml-1">{participation.status}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">$7,000</p>
            <p className="text-sm text-gray-600">Total Invested</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">3</p>
            <p className="text-sm text-gray-600">Active Investments</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">8.7%</p>
            <p className="text-sm text-gray-600">Average Yield</p>
          </div>
        </div>
      </div>
    </div>
  );
}