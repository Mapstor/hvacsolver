import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <p className="text-6xl font-bold text-slate-300 mb-4">404</p>
        <h1 className="text-3xl font-bold text-slate-950 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="space-y-4">
          <p className="text-slate-600">
            Try one of these instead:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#0f2440] transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/hvac-calculators"
              className="inline-block px-6 py-3 border border-[#1e3a5f] text-[#1e3a5f] font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              HVAC Calculators
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-slate-600 mb-4">Popular resources:</p>
            <ul className="space-y-2">
              <li>
                <Link href="/ac-tonnage-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
                  AC Tonnage Calculator
                </Link>
              </li>
              <li>
                <Link href="/hvac-troubleshooting" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
                  HVAC Troubleshooting Guides
                </Link>
              </li>
              <li>
                <Link href="/refrigerant-pt-charts" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
                  Refrigerant PT Charts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
