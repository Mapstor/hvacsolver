'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import DewPointSVG from './DewPointSVG';

// Comfort zone definitions
// Source: ASHRAE 55, EPA indoor air quality guidelines
interface ComfortZone {
  id: string;
  name: string;
  minDewPoint: number; // °F
  maxDewPoint: number; // °F
  description: string;
  color: string;
}

const comfortZones: ComfortZone[] = [
  {
    id: 'dry',
    name: 'Dry/Uncomfortable',
    minDewPoint: -100,
    maxDewPoint: 35,
    description: 'Very dry air, may cause dry skin, static electricity, respiratory irritation',
    color: 'text-amber-700 bg-amber-50',
  },
  {
    id: 'comfortable_dry',
    name: 'Comfortable (Dry Side)',
    minDewPoint: 35,
    maxDewPoint: 50,
    description: 'Pleasant, most people comfortable',
    color: 'text-green-700 bg-green-50',
  },
  {
    id: 'comfortable',
    name: 'Comfortable (Ideal)',
    minDewPoint: 50,
    maxDewPoint: 60,
    description: 'Optimal comfort range for most people',
    color: 'text-green-700 bg-green-100',
  },
  {
    id: 'sticky',
    name: 'Slightly Humid/Sticky',
    minDewPoint: 60,
    maxDewPoint: 65,
    description: 'Noticeable humidity, some discomfort',
    color: 'text-amber-700 bg-amber-50',
  },
  {
    id: 'uncomfortable',
    name: 'Uncomfortable',
    minDewPoint: 65,
    maxDewPoint: 70,
    description: 'Oppressive humidity, difficult to cool down',
    color: 'text-orange-700 bg-orange-50',
  },
  {
    id: 'dangerous',
    name: 'Dangerous/Tropical',
    minDewPoint: 70,
    maxDewPoint: 200,
    description: 'Severely uncomfortable, heat exhaustion risk',
    color: 'text-red-700 bg-red-50',
  },
];

type CalculationMode = 'dew_point' | 'rh_from_dew_point' | 'wet_bulb';

interface CalculationResult {
  mode: CalculationMode;
  temperatureF: number;
  temperatureC: number;
  relativeHumidity: number;
  dewPointF: number;
  dewPointC: number;
  wetBulbF: number;
  wetBulbC: number;
  absoluteHumidity: number; // grains per pound
  vaporPressure: number; // inches Hg
  specificHumidity: number; // lb water / lb dry air
  comfortZone: ComfortZone;
  condensationRisk: string;
  moldRisk: string;
}

function fahrenheitToCelsius(f: number): number {
  return (f - 32) * (5 / 9);
}

function celsiusToFahrenheit(c: number): number {
  return c * (9 / 5) + 32;
}

function calculateDewPoint(
  mode: CalculationMode,
  temperatureF: number,
  relativeHumidity: number,
  dewPointInputF: number
): CalculationResult {
  // Magnus-Tetens approximation for dew point calculation
  // Source: ASHRAE Handbook of Fundamentals, Chapter 1 - Psychrometrics
  // Formula: Td = (b × α) / (a - α)
  // where α = ln(RH/100) + (a × T) / (b + T)
  // Constants a = 17.27, b = 237.7°C (for temperatures -40 to 60°C)

  const a = 17.27;
  const b = 237.7; // °C

  const tempC = fahrenheitToCelsius(temperatureF);
  let rh = relativeHumidity;
  let dewPointC: number;
  let dewPointF: number;

  if (mode === 'dew_point' || mode === 'wet_bulb') {
    // Calculate dew point from temp and RH
    const alpha = Math.log(rh / 100) + (a * tempC) / (b + tempC);
    dewPointC = (b * alpha) / (a - alpha);
    dewPointF = celsiusToFahrenheit(dewPointC);
  } else {
    // Calculate RH from temp and dew point
    dewPointF = dewPointInputF;
    dewPointC = fahrenheitToCelsius(dewPointF);

    // Reverse calculation to find RH
    // α = (a × Td) / (b + Td)
    // RH = 100 × exp(α - (a × T) / (b + T))
    const alphaTd = (a * dewPointC) / (b + dewPointC);
    const alphaT = (a * tempC) / (b + tempC);
    rh = 100 * Math.exp(alphaTd - alphaT);
    rh = Math.max(0, Math.min(100, rh)); // Clamp to valid range
  }

  // Calculate wet bulb temperature (Stull approximation)
  // Source: Roland Stull, "Wet-Bulb Temperature from Relative Humidity and Air Temperature"
  // Journal of Applied Meteorology and Climatology, 2011
  // Valid for RH 5-99% and T -20 to 50°C
  const wetBulbC =
    tempC * Math.atan(0.151977 * Math.sqrt(rh + 8.313659)) +
    Math.atan(tempC + rh) -
    Math.atan(rh - 1.676331) +
    0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
    4.686035;
  const wetBulbF = celsiusToFahrenheit(wetBulbC);

  // Calculate saturation vapor pressure (Buck equation)
  // Source: Buck, A.L. (1981). Journal of Applied Meteorology
  const satVaporPressure = 6.1121 * Math.exp((18.678 - tempC / 234.5) * (tempC / (257.14 + tempC)));
  const actualVaporPressure = satVaporPressure * (rh / 100);
  const vaporPressureInHg = actualVaporPressure * 0.02953; // Convert mb to inHg

  // Calculate absolute humidity (grains per pound of dry air)
  // Formula: W = 4354 × Pv / (Pb - Pv)
  // where Pv is vapor pressure, Pb is barometric pressure
  const barometricPressure = 29.92; // Standard sea level in inHg
  const specificHumidity = (0.622 * actualVaporPressure) / (1013.25 - actualVaporPressure); // kg water / kg dry air
  const absoluteHumidity = specificHumidity * 7000; // Convert to grains per pound

  // Determine comfort zone
  let comfortZone = comfortZones.find(
    (zone) => dewPointF >= zone.minDewPoint && dewPointF < zone.maxDewPoint
  );
  if (!comfortZone) {
    comfortZone = dewPointF < 35 ? comfortZones[0] : comfortZones[comfortZones.length - 1];
  }

  // Condensation risk assessment
  // Condensation occurs when surface temperature ≤ dew point
  let condensationRisk: string;
  const tempDewDiff = temperatureF - dewPointF;
  if (tempDewDiff <= 3) {
    condensationRisk = 'High - Condensation likely on cool surfaces';
  } else if (tempDewDiff <= 10) {
    condensationRisk = 'Moderate - Watch for cold surfaces (windows, pipes)';
  } else {
    condensationRisk = 'Low - Condensation unlikely at current conditions';
  }

  // Mold risk assessment
  // Source: EPA mold guidelines - sustained RH above 60% promotes mold
  let moldRisk: string;
  if (rh >= 70) {
    moldRisk = 'High - Conditions favor mold growth';
  } else if (rh >= 60) {
    moldRisk = 'Moderate - Monitor for mold-prone areas';
  } else if (rh >= 50) {
    moldRisk = 'Low - Normal indoor conditions';
  } else {
    moldRisk = 'Very Low - Dry conditions inhibit mold';
  }

  return {
    mode,
    temperatureF,
    temperatureC: tempC,
    relativeHumidity: rh,
    dewPointF,
    dewPointC,
    wetBulbF,
    wetBulbC,
    absoluteHumidity,
    vaporPressure: vaporPressureInHg,
    specificHumidity,
    comfortZone,
    condensationRisk,
    moldRisk,
  };
}

export default function DewPointCalculator() {
  const [mode, setMode] = useState<CalculationMode>('dew_point');
  const [temperatureF, setTemperatureF] = useState<number>(75);
  const [relativeHumidity, setRelativeHumidity] = useState<number>(50);
  const [dewPointInputF, setDewPointInputF] = useState<number>(55);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (temperatureF < -40 || temperatureF > 140) return;
    if (mode === 'dew_point' && (relativeHumidity < 1 || relativeHumidity > 100)) return;
    if (mode === 'rh_from_dew_point' && dewPointInputF > temperatureF) return;

    const calculated = calculateDewPoint(
      mode,
      temperatureF,
      relativeHumidity,
      dewPointInputF
    );
    setResult(calculated);
  };

  return (
    <CalculatorWrapper
      title="Dew Point Calculator"
      description="Calculate dew point, wet bulb temperature, and humidity metrics using psychrometric formulas. Based on ASHRAE Handbook of Fundamentals methodology."
    >
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Calculation Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('dew_point')}
              className={`px-4 py-3 text-left border rounded-lg transition-colors ${
                mode === 'dew_point'
                  ? 'border-[#c2410c] bg-orange-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">Temperature + RH → Dew Point</div>
              <div className="text-sm text-slate-500">
                Calculate dew point from temperature and relative humidity
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode('rh_from_dew_point')}
              className={`px-4 py-3 text-left border rounded-lg transition-colors ${
                mode === 'rh_from_dew_point'
                  ? 'border-[#c2410c] bg-orange-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">Temperature + Dew Point → RH</div>
              <div className="text-sm text-slate-500">
                Calculate relative humidity from temperature and dew point
              </div>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="number"
            id="temperatureF"
            label="Air Temperature"
            value={temperatureF}
            onChange={(e) => setTemperatureF(parseFloat(e.target.value) || 0)}
            unit="°F"
            min={-40}
            max={140}
            step={1}
          />

          {mode === 'dew_point' ? (
            <CalculatorInput
              type="number"
              id="relativeHumidity"
              label="Relative Humidity"
              value={relativeHumidity}
              onChange={(e) =>
                setRelativeHumidity(parseFloat(e.target.value) || 0)
              }
              unit="%"
              min={1}
              max={100}
              step={1}
            />
          ) : (
            <CalculatorInput
              type="number"
              id="dewPointInputF"
              label="Dew Point Temperature"
              value={dewPointInputF}
              onChange={(e) =>
                setDewPointInputF(parseFloat(e.target.value) || 0)
              }
              unit="°F"
              min={-40}
              max={temperatureF}
              step={1}
            />
          )}
        </div>

        {/* Validation warning */}
        {mode === 'rh_from_dew_point' && dewPointInputF > temperatureF && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            Dew point cannot be higher than air temperature
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            {/* Psychrometric Visualization */}
            <DewPointSVG
              temperature={result.temperatureF}
              relativeHumidity={result.relativeHumidity}
              dewPoint={result.dewPointF}
              wetBulb={result.wetBulbF}
              unit="F"
            />

            {/* Primary Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Dew Point</div>
                <div className="text-3xl font-bold text-[#c2410c]">
                  {result.dewPointF.toFixed(1)}°F
                </div>
                <div className="text-sm text-slate-600">
                  {result.dewPointC.toFixed(1)}°C
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">Wet Bulb</div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.wetBulbF.toFixed(1)}°F
                </div>
                <div className="text-sm text-slate-600">
                  {result.wetBulbC.toFixed(1)}°C
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">
                  Relative Humidity
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {result.relativeHumidity.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">RH</div>
              </div>
            </div>

            {/* Comfort Zone */}
            <div
              className={`border rounded-lg p-4 ${result.comfortZone.color}`}
            >
              <div className="font-semibold mb-1">
                Comfort Level: {result.comfortZone.name}
              </div>
              <div className="text-sm">{result.comfortZone.description}</div>
            </div>

            {/* Risk Assessment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Condensation Risk
                </div>
                <div className="text-sm text-slate-600">
                  {result.condensationRisk}
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Mold Risk
                </div>
                <div className="text-sm text-slate-600">{result.moldRisk}</div>
              </div>
            </div>

            {/* Detailed Psychrometric Data */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Psychrometric Data
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: 'Dry Bulb Temperature',
                    value: `${result.temperatureF.toFixed(1)}°F (${result.temperatureC.toFixed(1)}°C)`,
                    unit: '',
                  },
                  {
                    label: 'Dew Point Temperature',
                    value: `${result.dewPointF.toFixed(1)}°F (${result.dewPointC.toFixed(1)}°C)`,
                    unit: '',
                  },
                  {
                    label: 'Wet Bulb Temperature',
                    value: `${result.wetBulbF.toFixed(1)}°F (${result.wetBulbC.toFixed(1)}°C)`,
                    unit: '',
                  },
                  {
                    label: 'Relative Humidity',
                    value: result.relativeHumidity.toFixed(1),
                    unit: '%',
                  },
                  {
                    label: 'Vapor Pressure',
                    value: result.vaporPressure.toFixed(3),
                    unit: 'in Hg',
                  },
                  {
                    label: 'Absolute Humidity',
                    value: result.absoluteHumidity.toFixed(1),
                    unit: 'grains/lb',
                  },
                  {
                    label: 'Specific Humidity',
                    value: (result.specificHumidity * 1000).toFixed(2),
                    unit: 'g/kg',
                  },
                ]}
              />
            </div>

            {/* Comfort Zone Reference */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Dew Point Comfort Scale
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Dew Point Range
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Comfort Level
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comfortZones.map((zone, index) => (
                      <tr
                        key={zone.id}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        } ${
                          result.comfortZone.id === zone.id
                            ? 'ring-2 ring-[#c2410c] ring-inset'
                            : ''
                        }`}
                      >
                        <td className="px-3 py-2 text-slate-900">
                          {zone.minDewPoint > -100
                            ? `${zone.minDewPoint}°F`
                            : 'Below 35°F'}{' '}
                          -{' '}
                          {zone.maxDewPoint < 200
                            ? `${zone.maxDewPoint}°F`
                            : 'Above 70°F'}
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-900">
                          {zone.name}
                        </td>
                        <td className="px-3 py-2 text-slate-600 text-xs">
                          {zone.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HVAC Applications */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                HVAC Applications
              </h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>
                  <strong>Dehumidification:</strong> AC coil must be colder than
                  dew point ({result.dewPointF.toFixed(0)}°F) to remove moisture
                </li>
                <li>
                  <strong>Duct condensation:</strong> Insulate cold ducts if
                  surface temp may drop below {result.dewPointF.toFixed(0)}°F
                </li>
                <li>
                  <strong>Window condensation:</strong> Interior glass below{' '}
                  {result.dewPointF.toFixed(0)}°F will fog or frost
                </li>
                <li>
                  <strong>Cooling tower efficiency:</strong> Wet bulb (
                  {result.wetBulbF.toFixed(0)}°F) determines minimum water
                  temperature
                </li>
                <li>
                  <strong>Comfort control:</strong> Target indoor dew point of
                  50-60°F for optimal comfort
                </li>
              </ul>
            </div>

            {/* Formula Reference */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Methods:</p>
              <p>
                <strong>Dew Point:</strong> Magnus-Tetens approximation: Td = (b
                × α) / (a - α), where α = ln(RH/100) + (a × T) / (b + T), a =
                17.27, b = 237.7°C
              </p>
              <p className="mt-1">
                <strong>Wet Bulb:</strong> Stull (2011) approximation for RH
                5-99%, T from -20 to 50°C
              </p>
              <p className="mt-2">
                Source: ASHRAE Handbook of Fundamentals, Chapter 1
                (Psychrometrics); Buck (1981) saturation vapor pressure; Stull
                (2011) wet bulb approximation.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
