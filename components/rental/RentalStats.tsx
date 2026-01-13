'use client';

import { useState } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface RentalStatsProps {
  totalAssets: number;
  averageYield: number;
  totalInvested: number;
  monthlyDistribution: number;
}

export default function RentalStats({ 
  totalAssets, 
  averageYield, 
  totalInvested, 
  monthlyDistribution 
}: RentalStatsProps) {
  const [timeframe, setTimeframe] = useState('30d');

  const stats = [
    {
      label: 'Total Assets',
      value: totalAssets.toString(),
      change: '+2',
      trend: 'up' as const,
      color: 'text-blue-600'
    },
    {
      label: 'Average Yield',
      value: `${averageYield}%`,
      change: '+0.5%',
      trend: 'up' as const,
      color: 'text-green-600'
    },
    {
      label: 'Total Invested',
      value: `$${totalInvested.toLocaleString()}`,
      change: '+$1,200',
      trend: 'up' as const,
      color: 'text-purple-600'
    },
    {
      label: 'Monthly Distribution',
      value: `$${monthlyDistribution.toLocaleString()}`,
      change: '-$150',
      trend: 'down' as const,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
            <div className={`flex items-center ${stat.color}`}>
              {stat.trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{stat.change}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          
          {/* Timeframe selector */}
          {index === 0 && (
            <div className="mt-4">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="text-xs text-gray-600 bg-transparent border-0 focus:ring-0"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
