'use client';

import ComplianceRule from './ComplianceRule';

export default function ComplianceRulesList() {
  const complianceRules = [
    {
      title: 'Identity Verification',
      status: 'compliant' as const,
      description: 'KYC/AML verification completed and approved',
      lastVerified: '2024-01-15'
    },
    {
      title: 'Investment Limits',
      status: 'compliant' as const,
      description: 'Within regulatory investment limits for accredited investors',
      lastVerified: '2024-01-10'
    },
    {
      title: 'Risk Assessment',
      status: 'warning' as const,
      description: 'Risk profile assessment requires annual update',
      lastVerified: '2023-12-01',
      requiredAction: 'Complete risk assessment questionnaire by Feb 1, 2024'
    },
    {
      title: 'Tax Documentation',
      status: 'compliant' as const,
      description: 'W-9 form on file and tax information verified',
      lastVerified: '2024-01-05'
    },
    {
      title: 'Suitability Analysis',
      status: 'info' as const,
      description: 'Investment suitability confirmed based on profile',
      lastVerified: '2024-01-12'
    },
    {
      title: 'Geographic Compliance',
      status: 'compliant' as const,
      description: 'Residence in approved jurisdiction for participation',
      lastVerified: '2024-01-15'
    },
    {
      title: 'Source of Funds',
      status: 'warning' as const,
      description: 'Source of funds documentation requires verification',
      lastVerified: '2023-11-20',
      requiredAction: 'Submit updated source of funds documentation'
    },
    {
      title: 'Anti-Money Laundering',
      status: 'compliant' as const,
      description: 'AML screening passed with no alerts',
      lastVerified: '2024-01-15'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Compliance Requirements
      </h3>
      
      <div className="grid gap-4">
        {complianceRules.map((rule, index) => (
          <ComplianceRule
            key={index}
            title={rule.title}
            status={rule.status}
            description={rule.description}
            lastVerified={rule.lastVerified}
            requiredAction={rule.requiredAction}
          />
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">
          Compliance Status Summary
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">6</div>
            <div className="text-xs text-green-700">Compliant</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-xs text-yellow-700">Action Required</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">75%</div>
            <div className="text-xs text-blue-700">Overall Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}