'use client';

import dynamic from 'next/dynamic';

function IllustrationSkeleton() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[16/9] flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

// Map article slugs to their illustration components
const illustrations: Record<string, React.ComponentType> = {
  // AC Troubleshooting
  'ac-breaker-keeps-tripping': dynamic(
    () => import('./ac-breaker-keeps-tripping/ACBreakerKeepsTrippingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-compressor-replacement-cost': dynamic(
    () => import('./ac-compressor-replacement-cost/ACCompressorReplacementCostSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-drip-pan-overflowing': dynamic(
    () => import('./ac-drip-pan-overflowing/ACDripPanOverflowingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-making-noise': dynamic(
    () => import('./ac-making-noise/ACMakingNoiseSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-not-blowing-cold': dynamic(
    () => import('./ac-not-blowing-cold/ACNotBlowingColdSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-not-removing-humidity': dynamic(
    () => import('./ac-not-removing-humidity/ACNotRemovingHumiditySVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-refrigerant-charge': dynamic(
    () => import('./ac-refrigerant-charge/ACRefrigerantChargeSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-short-cycling': dynamic(
    () => import('./ac-short-cycling/ACShortCyclingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ac-vent-temperature': dynamic(
    () => import('./ac-vent-temperature/ACVentTemperatureSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Efficiency Ratings
  'afue-rating': dynamic(
    () => import('./afue-rating/AFUERatingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'eer-rating': dynamic(
    () => import('./eer-rating/EERRatingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'hspf-rating': dynamic(
    () => import('./hspf-rating/HSPFRatingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Energy & Electricity
  'average-electricity-usage': dynamic(
    () => import('./average-electricity-usage/AverageElectricityUsageSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'gas-vs-electric-heating': dynamic(
    () => import('./gas-vs-electric-heating/GasVsElectricHeatingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // HVAC Systems
  'bathroom-fan-venting': dynamic(
    () => import('./bathroom-fan-venting/BathroomFanVentingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'btu-sacc-vs-ashrae': dynamic(
    () => import('./btu-sacc-vs-ashrae/BTUSaccVsAshraeSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ceiling-fan-direction': dynamic(
    () => import('./ceiling-fan-direction/CeilingFanDirectionSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ceiling-fan-downrod-length': dynamic(
    () => import('./ceiling-fan-downrod-length/CeilingFanDownrodLengthSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'cold-air-return-vents': dynamic(
    () => import('./cold-air-return-vents/ColdAirReturnVentsSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'condensation-on-ac-vents': dynamic(
    () => import('./condensation-on-ac-vents/CondensationOnACVentsSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'cracked-heat-exchanger': dynamic(
    () => import('./cracked-heat-exchanger/CrackedHeatExchangerSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Dehumidifiers & Humidity
  'basement-dehumidifier-settings': dynamic(
    () => import('./basement-dehumidifier-settings/BasementDehumidifierSettingsSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'dehumidifier-freezing-up': dynamic(
    () => import('./dehumidifier-freezing-up/DehumidifierFreezingUpSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'does-ac-remove-humidity': dynamic(
    () => import('./does-ac-remove-humidity/DoesACRemoveHumiditySVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'indoor-humidity-guide': dynamic(
    () => import('./indoor-humidity-guide/IndoorHumidityGuideSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Portable AC
  'drain-portable-ac': dynamic(
    () => import('./drain-portable-ac/DrainPortableACSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'vent-portable-ac-without-window': dynamic(
    () => import('./vent-portable-ac-without-window/VentPortableACWithoutWindowSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Furnace
  'furnace-blowing-cold-air': dynamic(
    () => import('./furnace-blowing-cold-air/FurnaceBlowingColdAirSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'furnace-filter-guide': dynamic(
    () => import('./furnace-filter-guide/FurnaceFilterGuideSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Heat Pump
  'heat-pump-efficiency-temperature': dynamic(
    () => import('./heat-pump-efficiency-temperature/HeatPumpEfficiencyTemperatureSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'heat-pump-temperature-range': dynamic(
    () => import('./heat-pump-temperature-range/HeatPumpTemperatureRangeSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Filters & Air Quality
  'cadr-rating': dynamic(
    () => import('./cadr-rating/CADRRatingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'hepa-filter-guide': dynamic(
    () => import('./hepa-filter-guide/HEPAFilterGuideSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'merv-rating-chart': dynamic(
    () => import('./merv-rating-chart/MERVRatingChartSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'where-to-place-air-purifier': dynamic(
    () => import('./where-to-place-air-purifier/WhereToPlaceAirPurifierSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Humidifier
  'where-to-put-humidifier': dynamic(
    () => import('./where-to-put-humidifier/WhereToPutHumidifierSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // AC General
  'how-long-do-ac-units-last': dynamic(
    () => import('./how-long-do-ac-units-last/HowLongDoACUnitsLastSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'how-long-to-cool-house': dynamic(
    () => import('./how-long-to-cool-house/HowLongToCoolHouseSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'ideal-ac-temperature': dynamic(
    () => import('./ideal-ac-temperature/IdealACTemperatureSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'outside-ac-not-running': dynamic(
    () => import('./outside-ac-not-running/OutsideACNotRunningSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Insulation
  'insulation-r-value-chart': dynamic(
    () => import('./insulation-r-value-chart/InsulationRValueChartSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'what-is-r-value': dynamic(
    () => import('./what-is-r-value/WhatIsRValueSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Refrigerants
  'refrigerant-types': dynamic(
    () => import('./refrigerant-types/RefrigerantTypesSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'superheat-and-subcooling': dynamic(
    () => import('./superheat-subcooling/SuperheatSubcoolingSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'recharge-window-ac': dynamic(
    () => import('./recharge-window-ac/RechargeWindowACSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Thermostat
  'thermostat-not-reaching-temperature': dynamic(
    () => import('./thermostat-not-reaching-temperature/ThermostatNotReachingTemperatureSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'thermostat-wiring': dynamic(
    () => import('./thermostat-wiring/ThermostatWiringSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Water Heaters
  'recirculation-pump': dynamic(
    () => import('./recirculation-pump/RecirculationPumpSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'tankless-vs-tank': dynamic(
    () => import('./tankless-vs-tank/TanklessVsTankSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),

  // Window AC
  'window-ac-freezing-up': dynamic(
    () => import('./window-ac-freezing-up/WindowACFreezingUpSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'window-ac-installation': dynamic(
    () => import('./window-ac-installation/WindowACInstallationSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
  'window-ac-leaking-water': dynamic(
    () => import('./window-ac-leaking-water/WindowACLeakingWaterSVG'),
    { loading: () => <IllustrationSkeleton /> }
  ),
};

interface IllustrationRendererProps {
  slug: string;
}

/**
 * Renders article-specific illustrations for informational articles (non-calculator)
 * Returns null if no illustration exists for the given slug
 */
export default function IllustrationRenderer({ slug }: IllustrationRendererProps) {
  const Illustration = illustrations[slug];

  if (!Illustration) {
    return null;
  }

  return (
    <div className="my-6">
      <Illustration />
    </div>
  );
}

/**
 * Check if an illustration exists for a given slug
 */
export function hasIllustration(slug: string): boolean {
  return slug in illustrations;
}
