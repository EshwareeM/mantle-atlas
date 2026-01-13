'use client';

import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function RentalFilterBar() {
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [riskLevels, setRiskLevels] = useState<string[]>([]);

  const filterGroups: FilterGroup[] = [
    {
      title: 'Price Range',
      options: [
        { value: '0-2000', label: '$0 - $2,000' },
        { value: '2000-3000', label: '$2,000 - $3,000' },
        { value: '3000-4000', label: '$3,000 - $4,000' },
        { value: '4000+', label: '$4,000+' }
      ],
      selected: priceRange,
      onChange: setPriceRange
    },
    {
      title: 'Property Type',
      options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
        { value: 'house', label: 'House' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'office', label: 'Office' },
        { value: 'loft', label: 'Loft' }
      ],
      selected: propertyTypes,
      onChange: setPropertyTypes
    },
    {
      title: 'Risk Level',
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      selected: riskLevels,
      onChange: setRiskLevels
    }
  ];

  const handleCheckboxChange = (group: FilterGroup, value: string) => {
    const newValues = group.selected.includes(value)
      ? group.selected.filter(v => v !== value)
      : [...group.selected, value];
    group.onChange(newValues);
  };

  const clearAllFilters = () => {
    setPriceRange([]);
    setPropertyTypes([]);
    setRiskLevels([]);
  };

  const hasActiveFilters = priceRange.length > 0 || propertyTypes.length > 0 || riskLevels.length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <h4 className="font-medium text-gray-900 mb-3">{group.title}</h4>
            <div className="space-y-2">
              {group.options.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={group.selected.includes(option.value)}
                    onChange={() => handleCheckboxChange(group, option.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{priceRange.length + propertyTypes.length + riskLevels.length}</span> filters applied
          </div>
        </div>
      )}
    </div>
  );
}