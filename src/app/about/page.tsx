import { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema, generateOrganizationSchema, schemaToJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About HVACSolver — Free HVAC Calculators & Engineering Guides',
  description: 'HVACSolver provides 25+ free HVAC calculators, troubleshooting guides, efficiency ratings explained, and reference data based on ASHRAE standards and real engineering methodology.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About HVACSolver — Free HVAC Calculators & Engineering Guides',
    description: 'HVACSolver provides 25+ free HVAC calculators, troubleshooting guides, efficiency ratings explained, and reference data based on ASHRAE standards and real engineering methodology.',
    url: '/about',
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HVACSolver',
    description: 'Free HVAC calculators and guides backed by ASHRAE standards and real engineering methodology.',
  },
};

export default function AboutPage() {
  const aboutSchema = generateWebPageSchema(
    'About HVACSolver',
    'HVACSolver provides free HVAC calculators, troubleshooting guides, and reference data based on ASHRAE standards and real engineering methodology.',
    'about',
    'AboutPage'
  );
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(organizationSchema) }}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-8">
            About HVAC Solver
          </h1>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            {/* Mission Statement */}
            <section>
              <p className="text-lg leading-relaxed">
                HVAC Solver is a comprehensive free resource for homeowners and HVAC professionals.
                We provide engineering-grade calculators, troubleshooting guides, efficiency ratings
                explained, and reference data—all based on real engineering standards from ASHRAE,
                ACCA, DOE, and EPA, not marketing copy or opinions.
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950 mt-10 mb-6">What HVAC Solver Offers</h2>
              <p>
                Our website covers every aspect of residential HVAC systems, organized into comprehensive
                resource hubs. Whether you&apos;re sizing a new system, troubleshooting a problem, understanding
                efficiency ratings, or comparing energy costs, we have the tools and guides you need.
              </p>
            </section>

            {/* HVAC Calculators Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/hvac-calculators" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  HVAC Calculators Hub
                </Link>
              </h3>
              <p className="mb-4">
                Our calculator collection includes over 25 interactive tools for sizing, cost estimation,
                and system design. Every calculator uses methodology from ASHRAE handbooks, ACCA Manual J
                and Manual D, DOE test procedures, and industry-standard formulas.
              </p>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">System Sizing Calculators:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/ac-tonnage-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Tonnage Calculator</Link> — Size your central air conditioner using Manual J methodology</li>
                <li><Link href="/heating-btu-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heating BTU Calculator</Link> — Calculate furnace or boiler sizing based on climate zone and home envelope</li>
                <li><Link href="/heat-pump-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heat Pump Sizing Calculator</Link> — Determine heat pump capacity with balance point calculations</li>
                <li><Link href="/mini-split-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Mini Split Sizing Calculator</Link> — Size ductless mini-split systems for single or multi-zone applications</li>
                <li><Link href="/how-many-btu-ac" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Room AC BTU Calculator</Link> — Size window or portable air conditioners for any room</li>
                <li><Link href="/furnace-sizing-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Furnace Sizing Calculator</Link> — Calculate furnace output requirements for your home</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Water Heater Sizing:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/water-heater-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Water Heater Sizing Calculator</Link> — Size tank water heaters using First Hour Rating method</li>
                <li><Link href="/tankless-water-heater-size" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Tankless Water Heater Size Calculator</Link> — Determine GPM and BTU requirements for on-demand water heating</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Airflow &amp; Ventilation Calculators:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/cfm-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">CFM Calculator</Link> — Calculate cubic feet per minute airflow for any application</li>
                <li><Link href="/cfm-duct-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Duct Sizing Calculator</Link> — Size HVAC ducts using ACCA Manual D methodology</li>
                <li><Link href="/bathroom-fan-cfm" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Bathroom Fan CFM Calculator</Link> — Calculate exhaust fan sizing for bathrooms</li>
                <li><Link href="/air-changes-per-hour" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Air Changes Per Hour Calculator</Link> — Determine ventilation rates for any room</li>
                <li><Link href="/air-purifier-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Air Purifier Sizing Calculator</Link> — Size air purifiers using AHAM guidelines</li>
                <li><Link href="/ceiling-fan-size" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Ceiling Fan Size Calculator</Link> — Choose the right ceiling fan diameter for your room</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Energy Cost Calculators:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/cost-to-run-air-conditioner" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Running Cost Calculator</Link> — Estimate monthly air conditioning electricity costs</li>
                <li><Link href="/cost-to-run-electric-heater" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Electric Heater Running Cost</Link> — Calculate space heater operating costs</li>
                <li><Link href="/heat-pump-running-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heat Pump Running Cost Calculator</Link> — Estimate heat pump operating costs by COP</li>
                <li><Link href="/heating-cost-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heating Cost Calculator</Link> — Compare heating costs across fuel types</li>
                <li><Link href="/dehumidifier-running-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Dehumidifier Running Cost</Link> — Calculate dehumidifier electricity usage</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Conversion &amp; Reference Calculators:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/btu-conversion-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">BTU Conversion Calculator</Link> — Convert between BTU, watts, kW, and tons</li>
                <li><Link href="/cop-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">COP Calculator</Link> — Calculate Coefficient of Performance for heat pumps</li>
                <li><Link href="/sones-to-decibels" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Sones to Decibels Converter</Link> — Convert between sones and decibels for fan noise</li>
                <li><Link href="/dew-point-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Dew Point Calculator</Link> — Calculate dew point from temperature and humidity</li>
                <li><Link href="/generator-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Generator Sizing Calculator</Link> — Size backup generators for your home</li>
              </ul>
            </section>

            {/* Troubleshooting Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/hvac-troubleshooting" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  HVAC Troubleshooting Guides
                </Link>
              </h3>
              <p className="mb-4">
                Diagnostic guides that help you identify HVAC problems before calling a technician.
                Each guide covers symptoms, causes, DIY fixes, and when to call a professional.
              </p>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Air Conditioning Problems:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/ac-not-blowing-cold" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Not Blowing Cold Air</Link> — Diagnose why your AC isn&apos;t cooling</li>
                <li><Link href="/ac-short-cycling" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Short Cycling</Link> — Why your AC turns on and off frequently</li>
                <li><Link href="/ac-breaker-keeps-tripping" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Breaker Keeps Tripping</Link> — Electrical troubleshooting for air conditioners</li>
                <li><Link href="/ac-making-noise" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Making Noise</Link> — Identify sounds and their causes</li>
                <li><Link href="/outside-ac-not-running" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Outside AC Unit Not Running</Link> — Condenser unit troubleshooting</li>
                <li><Link href="/ac-not-removing-humidity" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Not Removing Humidity</Link> — Dehumidification problems</li>
                <li><Link href="/condensation-on-ac-vents" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Condensation on AC Vents</Link> — Sweating vent troubleshooting</li>
                <li><Link href="/ac-drip-pan-overflowing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Drip Pan Overflowing</Link> — Drain line and condensate issues</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Window &amp; Portable AC Issues:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/window-ac-freezing-up" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Window AC Freezing Up</Link> — Ice on evaporator coil causes</li>
                <li><Link href="/window-ac-leaking-water" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Window AC Leaking Water</Link> — Water leak troubleshooting</li>
                <li><Link href="/drain-portable-ac" className="text-[#1e3a5f] underline hover:text-[#c2410c]">How to Drain a Portable AC</Link> — Portable AC maintenance</li>
                <li><Link href="/recharge-window-ac" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Recharging Window AC</Link> — Refrigerant considerations</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Furnace &amp; Heating Problems:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><Link href="/furnace-blowing-cold-air" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Furnace Blowing Cold Air</Link> — Why your furnace isn&apos;t heating</li>
                <li><Link href="/cracked-heat-exchanger" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Cracked Heat Exchanger</Link> — Signs, dangers, and what to do</li>
                <li><Link href="/thermostat-not-reaching-temperature" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Thermostat Not Reaching Set Temperature</Link> — System capacity issues</li>
              </ul>

              <h4 className="font-bold text-slate-800 mt-4 mb-2">Other Equipment:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/dehumidifier-freezing-up" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Dehumidifier Freezing Up</Link> — Ice buildup causes and fixes</li>
              </ul>
            </section>

            {/* Efficiency Ratings Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/hvac-efficiency" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  HVAC Efficiency Ratings Explained
                </Link>
              </h3>
              <p className="mb-4">
                Understanding efficiency ratings helps you compare equipment and estimate operating costs.
                We explain what each rating measures, minimum standards, and what numbers to look for.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/seer-rating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">SEER Rating Guide</Link> — Seasonal Energy Efficiency Ratio for air conditioners</li>
                <li><Link href="/eer-rating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">EER Rating Explained</Link> — Energy Efficiency Ratio and when it matters</li>
                <li><Link href="/afue-rating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AFUE Rating Guide</Link> — Annual Fuel Utilization Efficiency for furnaces</li>
                <li><Link href="/hspf-rating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">HSPF Rating Explained</Link> — Heating Seasonal Performance Factor for heat pumps</li>
                <li><Link href="/cop-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">COP (Coefficient of Performance)</Link> — Heat pump efficiency at specific conditions</li>
                <li><Link href="/cadr-rating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">CADR Rating Guide</Link> — Clean Air Delivery Rate for air purifiers</li>
                <li><Link href="/btu-sacc-vs-ashrae" className="text-[#1e3a5f] underline hover:text-[#c2410c]">BTU vs SACC vs ASHRAE</Link> — Portable AC rating standards explained</li>
              </ul>
            </section>

            {/* Installation Guides */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/hvac-installation" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  HVAC Installation Guides
                </Link>
              </h3>
              <p className="mb-4">
                Guides covering proper installation practices, placement considerations, and setup requirements.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/window-ac-installation" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Window AC Installation Guide</Link> — Step-by-step installation instructions</li>
                <li><Link href="/vent-portable-ac-without-window" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Venting Portable AC Without Window</Link> — Alternative venting options</li>
                <li><Link href="/bathroom-fan-venting" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Bathroom Fan Venting Guide</Link> — Proper exhaust fan venting methods</li>
                <li><Link href="/thermostat-wiring" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Thermostat Wiring Guide</Link> — Understanding thermostat wire colors</li>
                <li><Link href="/cold-air-return-vents" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Cold Air Return Vents</Link> — Return air vent placement and sizing</li>
                <li><Link href="/ceiling-fan-direction" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Ceiling Fan Direction</Link> — Summer vs winter rotation settings</li>
                <li><Link href="/ceiling-fan-downrod-length" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Ceiling Fan Downrod Length</Link> — Choosing the right downrod</li>
                <li><Link href="/where-to-place-air-purifier" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Where to Place Air Purifier</Link> — Optimal air purifier positioning</li>
                <li><Link href="/where-to-put-humidifier" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Where to Put a Humidifier</Link> — Best humidifier placement</li>
              </ul>
            </section>

            {/* Energy Costs Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/energy-costs" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  Energy Costs &amp; Comparisons
                </Link>
              </h3>
              <p className="mb-4">
                Tools and guides for understanding, comparing, and reducing HVAC energy costs.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/gas-vs-electric-heating" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Gas vs Electric Heating</Link> — Cost and efficiency comparison</li>
                <li><Link href="/average-electricity-usage" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Average Electricity Usage</Link> — Typical home energy consumption data</li>
                <li><Link href="/heating-cost-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heating Cost Calculator</Link> — Compare costs across heating fuels</li>
                <li><Link href="/heat-pump-efficiency-temperature" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heat Pump Efficiency vs Temperature</Link> — How outdoor temperature affects COP</li>
              </ul>
            </section>

            {/* Indoor Climate Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/indoor-climate" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  Indoor Climate &amp; Air Quality
                </Link>
              </h3>
              <p className="mb-4">
                Guides on temperature, humidity, and air quality management for healthy indoor environments.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/ideal-ac-temperature" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Ideal AC Temperature Settings</Link> — Recommended thermostat settings</li>
                <li><Link href="/indoor-humidity-guide" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Indoor Humidity Guide</Link> — Optimal humidity levels by season</li>
                <li><Link href="/basement-dehumidifier-settings" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Basement Dehumidifier Settings</Link> — Humidity control for basements</li>
                <li><Link href="/does-ac-remove-humidity" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Does AC Remove Humidity?</Link> — How air conditioners dehumidify</li>
                <li><Link href="/dew-point-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Dew Point Calculator</Link> — Calculate condensation risk</li>
                <li><Link href="/ac-vent-temperature" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Vent Temperature</Link> — Normal supply air temperatures</li>
                <li><Link href="/how-long-to-cool-house" className="text-[#1e3a5f] underline hover:text-[#c2410c]">How Long to Cool a House</Link> — Expected cooling times</li>
                <li><Link href="/merv-rating-chart" className="text-[#1e3a5f] underline hover:text-[#c2410c]">MERV Rating Chart</Link> — Air filter efficiency ratings</li>
                <li><Link href="/furnace-filter-guide" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Furnace Filter Guide</Link> — Choosing the right filter</li>
                <li><Link href="/hepa-filter-guide" className="text-[#1e3a5f] underline hover:text-[#c2410c]">HEPA Filter Guide</Link> — Understanding HEPA filtration</li>
              </ul>
            </section>

            {/* Insulation Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/insulation" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  Insulation &amp; R-Value Guides
                </Link>
              </h3>
              <p className="mb-4">
                Understanding insulation is critical for HVAC efficiency. These guides cover R-values,
                insulation types, and recommendations by climate zone.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/what-is-r-value" className="text-[#1e3a5f] underline hover:text-[#c2410c]">What is R-Value?</Link> — Understanding thermal resistance</li>
                <li><Link href="/insulation-r-value-chart" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Insulation R-Value Chart</Link> — R-values by insulation type</li>
              </ul>
            </section>

            {/* Refrigerants Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/refrigerants" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  Refrigerant Data &amp; Charts
                </Link>
              </h3>
              <p className="mb-4">
                Technical reference data for HVAC technicians and anyone wanting to understand
                how refrigerant systems work.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/refrigerant-pt-charts" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Refrigerant PT Charts</Link> — Pressure-temperature charts for common refrigerants</li>
                <li><Link href="/refrigerant-types" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Refrigerant Types</Link> — R-22, R-410A, R-32, R-454B compared</li>
                <li><Link href="/superheat-and-subcooling" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Superheat and Subcooling</Link> — Measuring and adjusting refrigerant charge</li>
                <li><Link href="/ac-refrigerant-charge" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Refrigerant Charge</Link> — Signs of low or high charge</li>
              </ul>
            </section>

            {/* Water Heaters Hub */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                <Link href="/water-heaters" className="text-[#1e3a5f] hover:text-[#c2410c]">
                  Water Heater Guides
                </Link>
              </h3>
              <p className="mb-4">
                Sizing guides and comparisons for tank and tankless water heaters.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/water-heater-sizing" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Water Heater Sizing Calculator</Link> — Size by First Hour Rating</li>
                <li><Link href="/tankless-water-heater-size" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Tankless Water Heater Sizing</Link> — GPM and BTU requirements</li>
                <li><Link href="/tankless-vs-tank" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Tankless vs Tank Water Heaters</Link> — Comparison guide</li>
                <li><Link href="/recirculation-pump" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Hot Water Recirculation Pumps</Link> — Types and installation</li>
              </ul>
            </section>

            {/* Equipment Lifespan & Costs */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-950 mb-4">
                Equipment Lifespan &amp; Maintenance
              </h3>
              <p className="mb-4">
                Information about HVAC equipment longevity, replacement costs, and maintenance.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><Link href="/how-long-do-ac-units-last" className="text-[#1e3a5f] underline hover:text-[#c2410c]">How Long Do AC Units Last?</Link> — Expected lifespan by equipment type</li>
                <li><Link href="/ac-compressor-replacement-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC Compressor Replacement Cost</Link> — Repair vs replace analysis</li>
                <li><Link href="/heat-pump-temperature-range" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Heat Pump Temperature Range</Link> — Operating limits for heat pumps</li>
              </ul>
            </section>

            {/* Why We Built This */}
            <section className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-950 mb-6">Why We Built HVAC Solver</h2>
              <p>
                We built HVAC Solver because we believe you shouldn&apos;t need to hire an engineer to
                understand your HVAC system.
              </p>
              <p>
                Too many HVAC websites are thinly disguised product review sites or contractor
                lead-generation tools. They give you vague advice designed to make you call
                someone—not to actually help you understand your system.
              </p>
              <p>
                We take a different approach. We publish the same engineering data that HVAC
                professionals use: load calculations, efficiency ratings, refrigerant charts,
                diagnostic procedures. If a contractor can look it up, so can you.
              </p>
            </section>

            {/* What Makes Us Different */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950 mt-10 mb-6">What Makes HVAC Solver Different</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-800 mb-2">Engineering Standards</h3>
                  <p className="text-sm">
                    Our calculators use ASHRAE Manual J methodology, ACCA Manual D for duct sizing,
                    and DOE test procedures for efficiency ratings. Not rules of thumb or contractor guesses.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-800 mb-2">Sourced Data</h3>
                  <p className="text-sm">
                    Every reference table, every formula, every efficiency rating links back to its source.
                    You can verify anything we publish.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-800 mb-2">No Product Recommendations</h3>
                  <p className="text-sm">
                    We don&apos;t review products, rank brands, or tell you which AC to buy. We give you the
                    tools to evaluate options yourself.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-800 mb-2">Free to Use</h3>
                  <p className="text-sm">
                    All calculators and reference data are completely free. Our only income is display
                    advertising, which doesn&apos;t influence our content.
                  </p>
                </div>
              </div>
            </section>

            {/* Who This Is For */}
            <section>
              <h2 className="text-2xl font-bold text-slate-950 mt-10 mb-6">Who HVAC Solver Is For</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-800">Homeowners</h3>
                  <p>
                    Sizing a new HVAC system, troubleshooting a problem, or trying to understand energy bills.
                    Our calculators help you have informed conversations with contractors instead of just
                    trusting their recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">HVAC Technicians</h3>
                  <p>
                    Quick reference data in the field. <Link href="/refrigerant-pt-charts" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Refrigerant PT charts</Link>,{' '}
                    <Link href="/superheat-and-subcooling" className="text-[#1e3a5f] underline hover:text-[#c2410c]">superheat and subcooling targets</Link>,{' '}
                    wire sizing tables—the technical data you need without digging through manuals.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Anyone Curious</h3>
                  <p>
                    If you want to understand how heating and cooling systems actually work, based on physics
                    and engineering rather than marketing, this site is for you.
                  </p>
                </div>
              </div>
            </section>

            {/* Accuracy Note */}
            <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-slate-950 mb-4">A Note on Accuracy</h2>
              <p className="mb-3">
                Our calculators provide estimates based on industry-standard methodology. They&apos;re
                useful for planning, comparison, and understanding—but they&apos;re not a substitute for
                a professional load calculation performed by a licensed HVAC contractor who can
                inspect your specific home.
              </p>
              <p>
                For system sizing and installation, always consult a qualified professional. Our
                tools help you understand what they&apos;re recommending and why.
              </p>
            </section>

            {/* Contact Section */}
            <section className="pt-8 border-t border-slate-200 mt-8">
              <h2 className="text-xl font-bold text-slate-950 mb-4">Get in Touch</h2>
              <p className="mb-4">
                Have questions, feedback, or found an error in our data? We&apos;d love to hear from you.
              </p>
              <p>
                <Link href="/contact" className="text-[#1e3a5f] underline hover:text-[#c2410c] font-medium">Contact us</Link>
                {' '}or email us directly at{' '}
                <a href="mailto:info@hvacsolver.com" className="text-[#1e3a5f] underline hover:text-[#c2410c]">info@hvacsolver.com</a>
              </p>
            </section>

            {/* Additional Links */}
            <section className="pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-950 mb-4">Site Information</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Privacy Policy</Link>
                  {' '}— How we handle your data
                </li>
                <li>
                  <Link href="/terms-of-use" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Terms of Use</Link>
                  {' '}— Guidelines for using our calculators and content
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
