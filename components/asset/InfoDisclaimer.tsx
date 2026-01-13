'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function InfoDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-start">
        <div className="p-2 bg-white rounded-lg mr-3">
          <ShieldCheckIcon className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-amber-900 mb-2">
            Investment Disclaimer
          </h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            All investments carry risk, including the potential loss of principal. 
            Past performance is not indicative of future results. Please invest only what you can afford to lose 
            and consider your financial situation before investing.
          </p>
          <p className="text-xs text-amber-700 mt-2">
            This is not financial advice. Consult with a qualified financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
}