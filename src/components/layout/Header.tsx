'use client';

import Link from 'next/link';
import { useState } from 'react';

const navigation = [
  { name: 'Calculators', href: '/hvac-calculators' },
  { name: 'Troubleshooting', href: '/hvac-troubleshooting' },
  { name: 'Efficiency', href: '/hvac-efficiency' },
  { name: 'Installation', href: '/hvac-installation' },
];

const moreNavigation = [
  { name: 'Insulation & Filters', href: '/insulation' },
  { name: 'Energy Costs', href: '/energy-costs' },
  { name: 'Refrigerants', href: '/refrigerants' },
  { name: 'Indoor Climate', href: '/indoor-climate' },
  { name: 'Water Heaters', href: '/water-heaters' },
];

// Inline logo SVG component
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill="#1e3a5f" />
      <rect x="13" y="6" width="6" height="16" rx="3" fill="#ffffff" />
      <circle cx="16" cy="23" r="5" fill="#ffffff" />
      <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill="#c2410c" />
      <circle cx="16" cy="23" r="3" fill="#c2410c" />
      <rect x="20" y="8" width="3" height="1" fill="#ffffff" opacity="0.7" />
      <rect x="20" y="11" width="2" height="1" fill="#ffffff" opacity="0.5" />
      <rect x="20" y="14" width="3" height="1" fill="#ffffff" opacity="0.7" />
      <rect x="20" y="17" width="2" height="1" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  return (
    <header className="border-b border-slate-200">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-300 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-8 items-center justify-between">
            <span className="hidden sm:block">
              Engineering data for HVAC sizing, efficiency & troubleshooting
            </span>
            <div className="flex items-center space-x-4 ml-auto">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <LogoIcon className="h-9 w-9" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                    HVAC Solver
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                    Technical Reference
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#1e3a5f] hover:bg-slate-50 rounded transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 150)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#1e3a5f] hover:bg-slate-50 rounded transition-colors"
                >
                  More Topics
                  <svg
                    className={`ml-1.5 h-4 w-4 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-1 w-52 rounded bg-white py-1 shadow-lg ring-1 ring-slate-200">
                    {moreNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#1e3a5f]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded p-2 text-slate-700 hover:bg-slate-100"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <div className="space-y-1">
                {[...navigation, ...moreNavigation].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1e3a5f] rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <Link
                  href="/about"
                  className="block px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
