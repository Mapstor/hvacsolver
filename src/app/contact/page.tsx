import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
          Contact Us
        </h1>

        <p className="text-slate-600 mb-8">
          Have a question, found an error, or want to suggest an improvement?
          Email us directly — we read every message.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-slate-950 mb-2">Email</h2>
          <p className="text-slate-700 mb-3">
            <a
              href="mailto:info@hvacsolver.com"
              className="text-[#1e3a5f] underline hover:text-[#c2410c]"
            >
              info@hvacsolver.com
            </a>
          </p>
          <p className="text-slate-600 text-sm">
            We typically respond within a few business days. Please include any
            relevant details (equipment model, climate zone, calculation inputs)
            when reporting an error or asking about a specific calculator.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm">
            <strong>Please note:</strong> We read every message but cannot provide
            individual HVAC diagnoses or system recommendations. For specific
            problems with your equipment, please consult a local HVAC professional
            who can inspect your system in person.
          </p>
        </div>

        <p className="text-sm text-slate-600">
          Looking for something else?{' '}
          <Link href="/about" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
            About HVAC Solver
          </Link>
          {' · '}
          <Link href="/hvac-calculators" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
            HVAC Calculators
          </Link>
          {' · '}
          <Link href="/hvac-troubleshooting" className="text-[#1e3a5f] underline hover:text-[#c2410c]">
            Troubleshooting
          </Link>
        </p>
      </div>
    </div>
  );
}
