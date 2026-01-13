'use client';

import { useState } from 'react';
import { PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface AssetData {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface AssetIdentificationProps {
  onNext: () => void;
  data: AssetData;
  onChange: (newData: AssetData) => void;
}

export default function AssetIdentification({ onNext, data, onChange }: AssetIdentificationProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePlaceholder = () => {
    const placeholderUrl = 'https://images.unsplash.com/photo-1560448214-9d98a5da17f4?w=800&h=600&fit=crop';
    onChange({ ...data, imageUrl: placeholderUrl });
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (!value || value.trim() === '') {
      newErrors[field] = 'This field is required';
    } else {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field: keyof AssetData, value: string) => {
    onChange({ ...data, [field]: value });
    validateField(field, value);
  };

  const handleNext = () => {
    const fields: (keyof AssetData)[] = ['name', 'location', 'description'];
    let hasErrors = false;
    
    fields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
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
          Asset Identification
        </h2>
        <p className="text-gray-600">
          Provide basic information about your rental property
        </p>
      </div>

      <div className="space-y-6">
        {/* Asset Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asset Image
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-gray-400 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
                id="asset-image-upload"
              />
              <label
                htmlFor="asset-image-upload"
                className="flex flex-col items-center justify-center cursor-pointer p-6"
              >
                <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload photo</span>
                <span className="text-xs text-gray-500 mt-1">JPG, PNG</span>
              </label>
            </div>
            
            <div 
              onClick={generatePlaceholder}
              className="border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-6">
                <SparklesIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Auto-generate placeholder</span>
                <span className="text-xs text-gray-500 mt-1">Use representative image</span>
              </div>
            </div>
          </div>
          
          {/* Image Preview */}
          {data.imageUrl && (
            <div className="mt-4 relative">
              <img
                src={data.imageUrl}
                alt="Asset preview"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {data.imageUrl.includes('unsplash') ? 'Representative Image – Pending Verification' : 'Uploaded Image'}
              </div>
            </div>
          )}
        </div>

        {/* Rental Asset Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rental Asset Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Downtown Manhattan Apartment"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Physical Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Physical Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., New York, NY"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`block w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the property, its features, location benefits, and investment highlights."
          />
          <p className="mt-1 text-xs text-gray-500">
            Include details about amenities, neighborhood, and rental income potential
          </p>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-8">
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