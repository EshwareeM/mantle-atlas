'use client';

import { useState } from 'react';
import { CurrencyDollarIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';

interface AssetData {
  monthlyRent: string;
  apy: string;
  payoutFrequency: string;
  tokenSupply: string;
}

interface YieldConfigurationProps {
  onNext: () => void;
  onPrevious: () => void;
  data: AssetData;
  onChange: (newData: AssetData) => void;
}

export default function YieldConfiguration({ 
  onNext, 
  onPrevious, 
  data, 
  onChange 
}: YieldConfigurationProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'monthlyRent':
        if (!value || parseFloat(value) <= 0) {
          newErrors[field] = 'Monthly rent must be greater than 0';
        } else {
          delete newErrors[field];
        }
        break;
      case 'apy':
        if (!value || parseFloat(value) <= 0 || parseFloat(value) > 100) {
          newErrors[field] = 'APY must be between 0 and 100';
        } else {
          delete newErrors[field];
        }
        break;
      case 'tokenSupply':
        if (!value || parseInt(value) <= 0) {
          newErrors[field] = 'Token supply must be greater than 0';
        } else {
          delete newErrors[field];
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: keyof AssetData, value: string) => {
    onChange({ ...data, [field]: value });
    validateField(field, value);
  };

  const handleNext = () => {
    // Validate all fields
    const fields: (keyof AssetData)[] = ['monthlyRent', 'apy', 'tokenSupply'];
    let hasErrors = false;
    
    fields.forEach(field => {
      if (!data[field] || parseFloat(data[field]) <= 0) {
        validateField(field, data[field]);
        hasErrors = true;
      }
    });
    
    if (!hasErrors) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Yield Configuration
        </h2>
        <p className="text-gray-600">
          Define parameters of rental income stream.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Monthly Rent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Monthly Rent (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={data.monthlyRent}
              onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.monthlyRent ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="2500"
            />
          </div>
          {errors.monthlyRent && (
            <p className="mt-1 text-sm text-red-600">{errors.monthlyRent}</p>
          )}
        </div>

        {/* Expected APY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected APY %
          </label>
          <input
            type="number"
            value={data.apy}
            onChange={(e) => handleInputChange('apy', e.target.value)}
            className={`block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.apy ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="8.5"
            step="0.1"
          />
          {errors.apy && (
            <p className="mt-1 text-sm text-red-600">{errors.apy}</p>
          )}
        </div>

        {/* Payout Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payout Frequency
          </label>
          <select
            value={data.payoutFrequency}
            onChange={(e) => handleInputChange('payoutFrequency', e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Default: Monthly distribution to token holders
          </p>
        </div>

        {/* Initial Token Supply */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Token Supply
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UsersIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={data.tokenSupply}
              onChange={(e) => handleInputChange('tokenSupply', e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.tokenSupply ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="10000"
            />
          </div>
          {errors.tokenSupply && (
            <p className="mt-1 text-sm text-red-600">{errors.tokenSupply}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Projected Returns</h3>
        <div className="space-y-1 text-sm text-blue-800">
          <p>• Monthly Distribution: ${data.monthlyRent || '0'}</p>
          <p>• Annual Yield: {data.apy || '0'}%</p>
          <p>• Token Price: ${data.monthlyRent && data.tokenSupply ? 
            (parseFloat(data.monthlyRent) * 12 / parseFloat(data.tokenSupply)).toFixed(2) : '0.00'}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}