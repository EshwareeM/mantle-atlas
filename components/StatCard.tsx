'use client';

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string;
  footer: {
    text: string;
    positive: boolean;
  };
}

export default function StatCard({ title, value, footer }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-1 rounded-full ${
          footer.positive ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {footer.positive ? (
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
          )}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      
      <div className={`flex items-center text-sm ${
        footer.positive ? 'text-green-600' : 'text-red-600'
      }`}>
        <span className="font-medium">{footer.text}</span>
      </div>
    </div>
  );
}