'use client';

import { useState, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';

// Refrigerant PT data
// Sources: Arkema Forane PT Charts (NIST REFPROP), Honeywell, Goodman/Daikin, Hudson Technologies
// All pressures in psig

interface RefrigerantData {
  name: string;
  fullName: string;
  type: 'single' | 'near-azeotrope' | 'zeotrope';
  safetyClass: string;
  gwp: number;
  glide: string;
  // PT data: temperature (°F) -> pressure (psig)
  // For zeotropes: [bubble, dew], for others: single value
  data: Record<number, number | [number, number]>;
}

const refrigerants: Record<string, RefrigerantData> = {
  'R-134a': {
    name: 'R-134a',
    fullName: '1,1,1,2-Tetrafluoroethane',
    type: 'single',
    safetyClass: 'A1',
    gwp: 1430,
    glide: '0°F',
    data: {
      [-40]: -14.8, [-35]: -12.5, [-30]: -9.8, [-25]: -6.9, [-20]: -3.7,
      [-15]: 0.1, [-10]: 1.9, [-5]: 4.1, [0]: 6.5, [5]: 9.1,
      [10]: 11.9, [15]: 15.0, [20]: 18.4, [25]: 22.1, [30]: 26.1,
      [35]: 30.4, [40]: 35.0, [45]: 40.1, [50]: 45.4, [55]: 51.2,
      [60]: 57.4, [65]: 64.0, [70]: 71.1, [75]: 78.7, [80]: 86.7,
      [85]: 95.2, [90]: 104.3, [95]: 114.0, [100]: 124.2, [105]: 135.0,
      [110]: 146.4, [115]: 158.4, [120]: 171.2, [130]: 198.7, [140]: 229.2,
      [150]: 262.9
    }
  },
  'R-410A': {
    name: 'R-410A',
    fullName: 'R-32/R-125 (50/50)',
    type: 'near-azeotrope',
    safetyClass: 'A1',
    gwp: 2088,
    glide: '<0.5°F',
    data: {
      [-40]: 10.8, [-35]: 14.1, [-30]: 17.8, [-25]: 21.9, [-20]: 26.3,
      [-15]: 31.2, [-10]: 36.5, [-5]: 42.2, [0]: 48.4, [5]: 55.2,
      [10]: 62.4, [15]: 70.3, [20]: 78.7, [25]: 87.7, [30]: 97.4,
      [32]: 101.4, [35]: 107.7, [40]: 118.8, [45]: 130.6, [50]: 143.2,
      [55]: 156.5, [60]: 170.7, [65]: 185.8, [70]: 201.8, [72]: 208.4,
      [75]: 218.7, [78]: 229.3, [80]: 236.5, [85]: 255.4, [90]: 275.4,
      [95]: 296.4, [100]: 318.6, [105]: 341.9, [110]: 366.4, [115]: 392.3,
      [120]: 419.4, [125]: 447.9, [130]: 477.9, [135]: 509.4, [140]: 542.5,
      [145]: 577.3, [150]: 613.9
    }
  },
  'R-404A': {
    name: 'R-404A',
    fullName: 'R-125/R-143a/R-134a (44/52/4)',
    type: 'near-azeotrope',
    safetyClass: 'A1',
    gwp: 3922,
    glide: '<1.1°F',
    data: {
      [-40]: [4.9, 4.3], [-30]: [10.3, 9.6], [-20]: [16.8, 16.0], [-10]: [24.6, 23.6],
      [0]: [33.7, 32.6], [10]: [44.3, 43.1], [20]: [56.6, 55.3], [30]: [70.7, 69.3],
      [40]: [86.9, 85.4], [50]: [105.3, 103.6], [60]: [126.0, 124.2], [70]: [149.3, 147.4],
      [75]: [162.0, 160.1], [80]: [175.4, 173.4], [85]: [189.5, 187.5], [90]: [204.5, 202.4],
      [95]: [220.2, 218.1], [100]: [236.8, 234.6], [110]: [272.5, 270.4], [120]: [312.1, 309.9],
      [130]: [355.7, 353.5], [140]: [403.7, 401.7], [150]: [456.8, 455.1]
    }
  },
  'R-22': {
    name: 'R-22',
    fullName: 'Chlorodifluoromethane (Freon)',
    type: 'single',
    safetyClass: 'A1',
    gwp: 1810,
    glide: '0°F',
    data: {
      [-40]: 0.6, [-35]: 2.6, [-30]: 4.9, [-25]: 7.4, [-20]: 10.2,
      [-15]: 13.2, [-10]: 16.5, [-5]: 20.1, [0]: 24.0, [10]: 32.8,
      [20]: 43.1, [25]: 48.8, [30]: 55.0, [32]: 57.5, [35]: 61.5,
      [40]: 68.6, [45]: 76.1, [50]: 84.1, [55]: 92.6, [60]: 101.6,
      [65]: 111.3, [70]: 121.4, [75]: 132.2, [80]: 143.6, [85]: 155.7,
      [90]: 168.4, [95]: 181.8, [100]: 195.9, [105]: 210.8, [110]: 226.4,
      [115]: 242.8, [120]: 260.0, [130]: 296.9, [140]: 337.4, [150]: 381.7
    }
  },
  'R-454B': {
    name: 'R-454B',
    fullName: 'R-32/R-1234yf (68.9/31.1)',
    type: 'zeotrope',
    safetyClass: 'A2L',
    gwp: 466,
    glide: '~1.5°F',
    data: {
      [-40]: [9.5, 8.4], [-30]: [16.7, 15.3], [-20]: [24.9, 23.0], [-10]: [34.6, 32.3],
      [0]: [46.1, 43.3], [10]: [59.5, 56.1], [20]: [75.0, 70.9], [30]: [92.9, 88.1],
      [40]: [113.3, 107.7], [50]: [136.6, 130.1], [60]: [162.9, 155.4], [65]: [177.3, 169.3],
      [70]: [192.5, 184.0], [75]: [208.6, 199.6], [80]: [225.6, 216.1], [85]: [243.6, 233.5],
      [90]: [262.5, 251.9], [95]: [282.5, 271.4], [100]: [303.6, 291.6], [110]: [348.9, 336.4],
      [120]: [399.1, 385.8], [130]: [454.2, 440.5], [140]: [514.9, 501.0], [150]: [581.4, 568.2]
    }
  },
  'R-407C': {
    name: 'R-407C',
    fullName: 'R-32/R-125/R-134a (23/25/52)',
    type: 'zeotrope',
    safetyClass: 'A1',
    gwp: 1774,
    glide: '~9-11°F',
    data: {
      [-20]: [14.7, 7.2], [-10]: [20.4, 12.5], [0]: [28.1, 19.6], [10]: [35.6, 25.8],
      [20]: [44.9, 35.0], [30]: [55.3, 44.0], [40]: [65.7, 54.5], [50]: [78.5, 66.3],
      [60]: [92.7, 79.6], [70]: [108.6, 94.6], [75]: [118.0, 103.0], [80]: [126.2, 111.2],
      [85]: [136.0, 120.0], [90]: [145.7, 129.6], [95]: [156.5, 139.6], [100]: [167.2, 150.0],
      [110]: [190.8, 172.3], [120]: [216.7, 196.9]
    }
  },
  'R-32': {
    name: 'R-32',
    fullName: 'Difluoromethane',
    type: 'single',
    safetyClass: 'A2L',
    gwp: 675,
    glide: '0°F',
    data: {
      [-38]: 12.4, [-30]: 18.2, [-20]: 26.8, [-10]: 37.1, [0]: 49.2,
      [10]: 63.5, [20]: 80.0, [30]: 99.1, [40]: 121.0, [50]: 145.8,
      [60]: 174.0, [70]: 205.8, [75]: 219.6, [80]: 241.5, [85]: 256.9,
      [90]: 281.3, [100]: 325.7, [110]: 374.9, [120]: 429.3, [130]: 489.5,
      [140]: 555.8, [150]: 628.8
    }
  },
  'R-290': {
    name: 'R-290',
    fullName: 'Propane',
    type: 'single',
    safetyClass: 'A3',
    gwp: 3,
    glide: '0°F',
    data: {
      [-40]: 1.4, [-30]: 5.7, [-20]: 10.7, [-10]: 16.7, [0]: 23.7,
      [10]: 31.8, [20]: 41.1, [30]: 51.8, [40]: 64.0, [50]: 77.7,
      [60]: 93.0, [70]: 110.2, [80]: 129.4, [85]: 139.8, [90]: 150.5,
      [95]: 161.9, [100]: 174.3, [110]: 199.6, [120]: 227.8, [130]: 258.7,
      [140]: 292.3, [150]: 329.0, [160]: 368.8
    }
  }
};

function formatPressure(pressure: number): string {
  if (pressure < 0) {
    return `${Math.abs(pressure).toFixed(1)} (vacuum)`;
  }
  return `${pressure.toFixed(1)} psig`;
}

function getSafetyClassColor(safetyClass: string): string {
  switch (safetyClass) {
    case 'A1': return 'bg-green-100 text-green-800';
    case 'A2L': return 'bg-amber-100 text-amber-800';
    case 'A3': return 'bg-red-100 text-red-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

function interpolatePressure(
  data: Record<number, number | [number, number]>,
  targetTemp: number,
  isZeotrope: boolean,
  pointType: 'bubble' | 'dew' | 'single'
): number | null {
  const temps = Object.keys(data).map(Number).sort((a, b) => a - b);

  if (targetTemp < temps[0] || targetTemp > temps[temps.length - 1]) {
    return null;
  }

  // Find exact match
  if (data[targetTemp] !== undefined) {
    const val = data[targetTemp];
    if (Array.isArray(val)) {
      return pointType === 'bubble' ? val[0] : val[1];
    }
    return val as number;
  }

  // Find surrounding points for interpolation
  let lowerTemp = temps[0];
  let upperTemp = temps[temps.length - 1];

  for (let i = 0; i < temps.length - 1; i++) {
    if (temps[i] <= targetTemp && temps[i + 1] >= targetTemp) {
      lowerTemp = temps[i];
      upperTemp = temps[i + 1];
      break;
    }
  }

  const lowerVal = data[lowerTemp];
  const upperVal = data[upperTemp];

  let lowerPressure: number;
  let upperPressure: number;

  if (Array.isArray(lowerVal)) {
    lowerPressure = pointType === 'bubble' ? lowerVal[0] : lowerVal[1];
  } else {
    lowerPressure = lowerVal as number;
  }

  if (Array.isArray(upperVal)) {
    upperPressure = pointType === 'bubble' ? upperVal[0] : upperVal[1];
  } else {
    upperPressure = upperVal as number;
  }

  // Linear interpolation
  const ratio = (targetTemp - lowerTemp) / (upperTemp - lowerTemp);
  return lowerPressure + (upperPressure - lowerPressure) * ratio;
}

export default function RefrigerantPTChart() {
  const [selectedRefrigerant, setSelectedRefrigerant] = useState<string>('R-410A');
  const [lookupTemp, setLookupTemp] = useState<string>('');

  const refrigerant = refrigerants[selectedRefrigerant];
  const isZeotrope = refrigerant.type === 'zeotrope' || refrigerant.type === 'near-azeotrope';
  const hasSignificantGlide = refrigerant.type === 'zeotrope' ||
    (refrigerant.type === 'near-azeotrope' && selectedRefrigerant === 'R-404A');

  // Get sorted temperatures for table
  const sortedTemps = useMemo(() => {
    return Object.keys(refrigerant.data).map(Number).sort((a, b) => a - b);
  }, [refrigerant]);

  // Calculate lookup result
  const lookupResult = useMemo((): { temp: number; pressure: number | null } | { temp: number; bubble: number | null; dew: number | null } | null => {
    const temp = parseFloat(lookupTemp);
    if (isNaN(temp)) return null;

    if (hasSignificantGlide) {
      const bubble = interpolatePressure(refrigerant.data, temp, true, 'bubble');
      const dew = interpolatePressure(refrigerant.data, temp, true, 'dew');
      return { temp, bubble, dew };
    } else {
      const pressure = interpolatePressure(refrigerant.data, temp, false, 'single');
      return { temp, pressure };
    }
  }, [lookupTemp, refrigerant, hasSignificantGlide]);

  return (
    <CalculatorWrapper
      title="Refrigerant Pressure-Temperature Chart"
      description="Interactive PT chart for all 8 common refrigerants. Select a refrigerant and look up saturation pressure at any temperature."
    >
      <div className="space-y-6">
        {/* Refrigerant Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Select Refrigerant
            </label>
            <select
              value={selectedRefrigerant}
              onChange={(e) => setSelectedRefrigerant(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.keys(refrigerants).map((name) => (
                <option key={name} value={name}>
                  {name} - {refrigerants[name].fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quick Lookup (Temperature °F)
            </label>
            <input
              type="number"
              value={lookupTemp}
              onChange={(e) => setLookupTemp(e.target.value)}
              placeholder="Enter temperature"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Refrigerant Info */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-lg font-bold text-slate-900">{refrigerant.name}</span>
            <span className={`px-2 py-0.5 rounded text-sm font-medium ${getSafetyClassColor(refrigerant.safetyClass)}`}>
              {refrigerant.safetyClass}
            </span>
            <span className="text-sm text-slate-600">GWP: {refrigerant.gwp.toLocaleString()}</span>
            <span className="text-sm text-slate-600">Glide: {refrigerant.glide}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{refrigerant.fullName}</p>

          {refrigerant.safetyClass === 'A2L' && (
            <div className="mt-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded">
              A2L: Mildly flammable. Requires A2L-rated equipment and tools.
            </div>
          )}
          {refrigerant.safetyClass === 'A3' && (
            <div className="mt-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded">
              A3: Highly flammable (propane). Strict charge limits apply. Use spark-free tools.
            </div>
          )}
        </div>

        {/* Lookup Result */}
        {lookupResult && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">
              {refrigerant.name} at {lookupResult.temp}°F
            </h4>
            {!hasSignificantGlide && 'pressure' in lookupResult && (lookupResult as { pressure: number | null }).pressure !== null && (
              <p className="text-2xl font-bold text-orange-600">
                {formatPressure((lookupResult as { pressure: number }).pressure)}
              </p>
            )}
            {hasSignificantGlide && 'bubble' in lookupResult && (lookupResult as { bubble: number | null; dew: number | null }).bubble !== null && (lookupResult as { bubble: number | null; dew: number | null }).dew !== null && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Bubble Point (Liquid)</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatPressure((lookupResult as { bubble: number }).bubble)}
                  </p>
                  <p className="text-xs text-slate-500">Use for subcooling</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Dew Point (Vapor)</p>
                  <p className="text-xl font-bold text-orange-600">
                    {formatPressure((lookupResult as { dew: number }).dew)}
                  </p>
                  <p className="text-xs text-slate-500">Use for superheat</p>
                </div>
              </div>
            )}
            {((!hasSignificantGlide && 'pressure' in lookupResult && (lookupResult as { pressure: number | null }).pressure === null) ||
              (hasSignificantGlide && 'bubble' in lookupResult && ((lookupResult as { bubble: number | null }).bubble === null || (lookupResult as { dew: number | null }).dew === null))) && (
              <p className="text-amber-700">
                Temperature out of range. Available range: {sortedTemps[0]}°F to {sortedTemps[sortedTemps.length - 1]}°F
              </p>
            )}
          </div>
        )}

        {/* PT Data Table */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">
            {refrigerant.name} PT Chart Data
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-3 py-2 text-left font-semibold">Temp (°F)</th>
                  {hasSignificantGlide ? (
                    <>
                      <th className="px-3 py-2 text-right font-semibold">Bubble (psig)</th>
                      <th className="px-3 py-2 text-right font-semibold">Dew (psig)</th>
                    </>
                  ) : (
                    <th className="px-3 py-2 text-right font-semibold">Pressure (psig)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedTemps.map((temp, index) => {
                  const value = refrigerant.data[temp];
                  const isArray = Array.isArray(value);

                  return (
                    <tr
                      key={temp}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className="px-3 py-2 font-medium text-slate-900">{temp}°F</td>
                      {hasSignificantGlide && isArray ? (
                        <>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatPressure((value as [number, number])[0])}
                          </td>
                          <td className="px-3 py-2 text-right font-mono">
                            {formatPressure((value as [number, number])[1])}
                          </td>
                        </>
                      ) : (
                        <td className="px-3 py-2 text-right font-mono">
                          {formatPressure(isArray ? (value as [number, number])[0] : (value as number))}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Notes */}
        <div className="bg-slate-100 rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-slate-900 mb-2">How to Use PT Charts</h4>
          <ul className="space-y-1 text-slate-700">
            <li><strong>Superheat:</strong> Use suction pressure to find saturation temp. Subtract from actual suction line temp.</li>
            <li><strong>Subcooling:</strong> Use liquid line pressure to find saturation temp. Subtract actual liquid line temp from it.</li>
            {hasSignificantGlide && (
              <li className="text-amber-700">
                <strong>Important:</strong> For {refrigerant.name}, use <em>Dew Point</em> for superheat and <em>Bubble Point</em> for subcooling.
              </li>
            )}
          </ul>
        </div>

        <p className="text-xs text-slate-500">
          Source: Arkema Forane PT Charts (NIST REFPROP), Honeywell, Goodman/Daikin, Hudson Technologies
        </p>
      </div>
    </CalculatorWrapper>
  );
}
