'use client';

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down';
  trendText?: string;
  trendColor?: string;
}

export default function MetricCard({ label, value, subtext, trend, trendText, trendColor }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 relative">
      <div className="absolute top-4 right-4">
        <InformationCircleIcon className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="mb-2">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
      </div>
      
      <div className="text-2xl font-bold text-gray-900 mb-2">
        {value}
      </div>
      
      {subtext && (
        <div className="flex items-center space-x-2">
          {trend && (
            <div className="flex items-center">
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="w-4 h-4" style={{ color: trendColor }} />
              ) : (
                <ArrowTrendingUpIcon className="w-4 h-4 rotate-180" style={{ color: trendColor }} />
              )}
            </div>
          )}
          <span className="text-sm text-gray-600">{subtext}</span>
        </div>
      )}
    </div>
  );
}