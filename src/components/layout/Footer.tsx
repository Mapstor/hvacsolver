import Link from 'next/link';

const calculatorLinks = [
  { name: 'AC Tonnage Calculator', href: '/ac-tonnage-calculator' },
  { name: 'Heating BTU Calculator', href: '/heating-btu-calculator' },
  { name: 'CFM Calculator', href: '/cfm-calculator' },
  { name: 'Generator Sizing', href: '/generator-sizing' },
  { name: 'Water Heater Sizing', href: '/water-heater-sizing' },
];

const guideLinks = [
  { name: 'SEER Rating Guide', href: '/seer-rating' },
  { name: 'Thermostat Wiring', href: '/thermostat-wiring' },
  { name: 'Refrigerant PT Charts', href: '/refrigerant-pt-charts' },
  { name: 'R-Value Chart', href: '/insulation-r-value-chart' },
  { name: 'MERV Rating Chart', href: '/merv-rating-chart' },
];

const topicLinks = [
  { name: 'All Calculators', href: '/hvac-calculators' },
  { name: 'Troubleshooting', href: '/hvac-troubleshooting' },
  { name: 'Efficiency Guides', href: '/hvac-efficiency' },
  { name: 'Installation Guides', href: '/hvac-installation' },
  { name: 'Energy Costs', href: '/energy-costs' },
  { name: 'Refrigerants', href: '/refrigerants' },
  { name: 'Indoor Climate', href: '/indoor-climate' },
  { name: 'Water Heaters', href: '/water-heaters' },
];

const legalLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Use', href: '/terms-of-use' },
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
      <circle cx="16" cy="16" r="15" fill="#334155" />
      <rect x="13" y="6" width="6" height="16" rx="3" fill="#94a3b8" />
      <circle cx="16" cy="23" r="5" fill="#94a3b8" />
      <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill="#64748b" />
      <circle cx="16" cy="23" r="3" fill="#64748b" />
      <rect x="20" y="8" width="3" height="1" fill="#94a3b8" opacity="0.7" />
      <rect x="20" y="11" width="2" height="1" fill="#94a3b8" opacity="0.5" />
      <rect x="20" y="14" width="3" height="1" fill="#94a3b8" opacity="0.7" />
      <rect x="20" y="17" width="2" height="1" fill="#94a3b8" opacity="0.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t-4 border-[#1e3a5f]">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section with logo and mission */}
        <div className="pb-8 mb-8 border-b border-slate-700">
          <div className="flex items-start space-x-4">
            <LogoIcon className="h-12 w-12 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                HVAC Solver
              </h2>
              <p className="mt-1 text-sm text-slate-400 max-w-xl leading-relaxed">
                Free technical resources for HVAC system sizing, efficiency analysis,
                and troubleshooting. All calculators and reference data are based on
                ASHRAE standards, DOE methodology, and EPA guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Calculators */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference Guides */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-4">
              Reference Guides
            </h3>
            <ul className="space-y-2.5">
              {guideLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-4">
              Topics
            </h3>
            <ul className="space-y-2.5">
              {topicLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-4">
              Information
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 mb-1">General Inquiries</p>
              <a
                href="mailto:info@hvacsolver.com"
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                info@hvacsolver.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} HVAC Solver. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 mt-2 sm:mt-0">
              Calculator results are estimates for educational purposes.
              Consult a licensed HVAC professional for system sizing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
