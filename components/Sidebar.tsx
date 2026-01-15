'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Rental Assets', href: '/rental-assets', icon: BuildingOfficeIcon },
  { name: 'Builder Mode', href: '/builder', icon: WrenchScrewdriverIcon },
  { name: 'Yield Flow', href: '/yield-flow', icon: ChartBarIcon },
  { name: 'Yield Passport', href: '/yield-passport', icon: DocumentTextIcon },
  { name: 'Compliance Rules', href: '/compliance-rules', icon: ShieldCheckIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar Panel */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-20 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-64 h-full relative">
          {/* Header with controls */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bars3Icon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="p-6 pt-0">
            <h1 className="text-2xl font-bold text-blue-900 mb-8">Mantle Atlas</h1>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#E8F3FF' : 'transparent'
                    }}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto pt-8">
              <div className="text-xs text-gray-500 mb-2">Network Status</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Mantle Mainnet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button - Visible when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-4 z-30 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-100"
        >
          <Bars3Icon className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </>
  );
}