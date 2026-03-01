'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import { ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import GeneratorSizingSVG from './GeneratorSizingSVG';

// Appliance wattage data
// Source: DOE, EPA Energy Star, manufacturer specifications, NEC guidelines
interface Appliance {
  id: string;
  name: string;
  category: string;
  runningWatts: number;
  startingWatts: number;
  description: string;
}

const appliances: Appliance[] = [
  // HVAC
  {
    id: 'central_ac_3ton',
    name: 'Central AC (3 ton)',
    category: 'HVAC',
    runningWatts: 3500,
    startingWatts: 7000,
    description: '24,000-36,000 BTU, 240V',
  },
  {
    id: 'central_ac_2ton',
    name: 'Central AC (2 ton)',
    category: 'HVAC',
    runningWatts: 2500,
    startingWatts: 5000,
    description: '18,000-24,000 BTU, 240V',
  },
  {
    id: 'window_ac_large',
    name: 'Window AC (12,000 BTU)',
    category: 'HVAC',
    runningWatts: 1400,
    startingWatts: 2800,
    description: 'Large room window unit',
  },
  {
    id: 'window_ac_small',
    name: 'Window AC (6,000 BTU)',
    category: 'HVAC',
    runningWatts: 700,
    startingWatts: 1400,
    description: 'Small room window unit',
  },
  {
    id: 'furnace_fan',
    name: 'Furnace Fan/Blower',
    category: 'HVAC',
    runningWatts: 800,
    startingWatts: 1600,
    description: 'Gas or oil furnace blower motor',
  },
  {
    id: 'heat_pump',
    name: 'Heat Pump (3 ton)',
    category: 'HVAC',
    runningWatts: 4500,
    startingWatts: 9000,
    description: 'Heating/cooling heat pump',
  },
  {
    id: 'space_heater',
    name: 'Space Heater (Electric)',
    category: 'HVAC',
    runningWatts: 1500,
    startingWatts: 1500,
    description: '1500W portable heater',
  },
  // Kitchen
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    category: 'Kitchen',
    runningWatts: 200,
    startingWatts: 1200,
    description: 'Standard refrigerator/freezer',
  },
  {
    id: 'freezer',
    name: 'Chest/Upright Freezer',
    category: 'Kitchen',
    runningWatts: 100,
    startingWatts: 600,
    description: 'Standalone freezer',
  },
  {
    id: 'microwave',
    name: 'Microwave',
    category: 'Kitchen',
    runningWatts: 1200,
    startingWatts: 1200,
    description: '1000-1200W microwave',
  },
  {
    id: 'electric_range',
    name: 'Electric Range/Oven',
    category: 'Kitchen',
    runningWatts: 3000,
    startingWatts: 3000,
    description: 'Electric stove, 240V',
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    category: 'Kitchen',
    runningWatts: 1800,
    startingWatts: 1800,
    description: 'With heated dry',
  },
  {
    id: 'coffee_maker',
    name: 'Coffee Maker',
    category: 'Kitchen',
    runningWatts: 1000,
    startingWatts: 1000,
    description: 'Drip coffee maker',
  },
  {
    id: 'toaster',
    name: 'Toaster/Toaster Oven',
    category: 'Kitchen',
    runningWatts: 1200,
    startingWatts: 1200,
    description: '2-4 slice toaster',
  },
  // Water
  {
    id: 'well_pump_half',
    name: 'Well Pump (1/2 HP)',
    category: 'Water',
    runningWatts: 1000,
    startingWatts: 2000,
    description: 'Submersible or jet pump',
  },
  {
    id: 'well_pump_1',
    name: 'Well Pump (1 HP)',
    category: 'Water',
    runningWatts: 2000,
    startingWatts: 4000,
    description: 'Deep well pump',
  },
  {
    id: 'sump_pump',
    name: 'Sump Pump',
    category: 'Water',
    runningWatts: 800,
    startingWatts: 2000,
    description: '1/3 to 1/2 HP sump pump',
  },
  {
    id: 'water_heater_electric',
    name: 'Water Heater (Electric)',
    category: 'Water',
    runningWatts: 4500,
    startingWatts: 4500,
    description: '40-50 gallon tank',
  },
  {
    id: 'tankless_water_heater',
    name: 'Tankless Water Heater',
    category: 'Water',
    runningWatts: 18000,
    startingWatts: 18000,
    description: 'Whole-house electric tankless',
  },
  // Laundry
  {
    id: 'washer',
    name: 'Washing Machine',
    category: 'Laundry',
    runningWatts: 500,
    startingWatts: 1200,
    description: 'Standard top/front loader',
  },
  {
    id: 'dryer_electric',
    name: 'Electric Dryer',
    category: 'Laundry',
    runningWatts: 5000,
    startingWatts: 6000,
    description: '240V electric dryer',
  },
  {
    id: 'dryer_gas',
    name: 'Gas Dryer (Motor)',
    category: 'Laundry',
    runningWatts: 300,
    startingWatts: 600,
    description: 'Gas dryer motor and controls',
  },
  // Lighting & Electronics
  {
    id: 'lights_led',
    name: 'LED Lighting (10 bulbs)',
    category: 'Lighting',
    runningWatts: 100,
    startingWatts: 100,
    description: '10W LED equivalent',
  },
  {
    id: 'lights_incandescent',
    name: 'Incandescent (10 bulbs)',
    category: 'Lighting',
    runningWatts: 600,
    startingWatts: 600,
    description: '60W bulbs',
  },
  {
    id: 'tv',
    name: 'Television',
    category: 'Electronics',
    runningWatts: 200,
    startingWatts: 200,
    description: '50-65" LED/LCD TV',
  },
  {
    id: 'computer',
    name: 'Desktop Computer',
    category: 'Electronics',
    runningWatts: 300,
    startingWatts: 300,
    description: 'Desktop PC with monitor',
  },
  {
    id: 'laptop',
    name: 'Laptop/Charger',
    category: 'Electronics',
    runningWatts: 60,
    startingWatts: 60,
    description: 'Laptop charging',
  },
  {
    id: 'wifi_router',
    name: 'WiFi Router/Modem',
    category: 'Electronics',
    runningWatts: 20,
    startingWatts: 20,
    description: 'Internet equipment',
  },
  // Tools & Equipment
  {
    id: 'garage_door',
    name: 'Garage Door Opener',
    category: 'Tools',
    runningWatts: 700,
    startingWatts: 1400,
    description: '1/2 HP motor',
  },
  {
    id: 'air_compressor',
    name: 'Air Compressor (1 HP)',
    category: 'Tools',
    runningWatts: 1500,
    startingWatts: 4500,
    description: 'Small shop compressor',
  },
  {
    id: 'circular_saw',
    name: 'Circular Saw',
    category: 'Tools',
    runningWatts: 1400,
    startingWatts: 2400,
    description: '7-1/4" corded saw',
  },
  {
    id: 'electric_vehicle',
    name: 'EV Charger (Level 2)',
    category: 'Automotive',
    runningWatts: 7200,
    startingWatts: 7200,
    description: '30A/240V charger',
  },
  {
    id: 'battery_charger',
    name: 'Battery Charger (Car)',
    category: 'Automotive',
    runningWatts: 200,
    startingWatts: 200,
    description: 'Standard car battery charger',
  },
  // Medical
  {
    id: 'cpap',
    name: 'CPAP Machine',
    category: 'Medical',
    runningWatts: 60,
    startingWatts: 60,
    description: 'Sleep apnea machine',
  },
  {
    id: 'oxygen_concentrator',
    name: 'Oxygen Concentrator',
    category: 'Medical',
    runningWatts: 400,
    startingWatts: 400,
    description: 'Home oxygen machine',
  },
];

// Generator size recommendations
interface GeneratorSize {
  minWatts: number;
  maxWatts: number;
  type: string;
  description: string;
}

const generatorSizes: GeneratorSize[] = [
  {
    minWatts: 0,
    maxWatts: 2000,
    type: 'Portable Inverter',
    description: '2000W inverter generator, quiet, good for camping/sensitive electronics',
  },
  {
    minWatts: 2001,
    maxWatts: 4000,
    type: 'Portable (Small)',
    description: '3500-4000W portable, powers essentials during outages',
  },
  {
    minWatts: 4001,
    maxWatts: 7500,
    type: 'Portable (Large)',
    description: '6500-7500W portable, powers most home essentials',
  },
  {
    minWatts: 7501,
    maxWatts: 12000,
    type: 'Portable/Small Standby',
    description: '10,000-12,000W, can power multiple large appliances',
  },
  {
    minWatts: 12001,
    maxWatts: 18000,
    type: 'Standby Generator',
    description: '14-18kW whole house standby generator',
  },
  {
    minWatts: 18001,
    maxWatts: 25000,
    type: 'Large Standby',
    description: '20-24kW standby, can power AC and most loads',
  },
  {
    minWatts: 25001,
    maxWatts: 100000,
    type: 'Whole House Standby',
    description: '30kW+ commercial-grade standby generator',
  },
];

interface SelectedAppliance {
  appliance: Appliance;
  quantity: number;
}

interface CalculationResult {
  selectedItems: SelectedAppliance[];
  totalRunningWatts: number;
  largestStartingWatts: number;
  totalStartingWatts: number;
  recommendedWatts: number;
  recommendedKw: number;
  generatorSize: GeneratorSize;
  safetyMargin: number;
}

function calculateGeneratorSize(
  selectedItems: SelectedAppliance[]
): CalculationResult {
  // Generator sizing methodology:
  // 1. Sum all running watts
  // 2. Add largest starting (surge) watts
  // 3. Apply 20% safety margin
  // Source: NEC, generator manufacturer guidelines, EGSA

  const totalRunningWatts = selectedItems.reduce(
    (sum, item) => sum + item.appliance.runningWatts * item.quantity,
    0
  );

  // Find the single largest starting watts (motors don't all start simultaneously)
  const largestStartingWatts = Math.max(
    ...selectedItems.map((item) => item.appliance.startingWatts),
    0
  );

  // Calculate starting watt difference (surge above running)
  const largestStartingDiff = Math.max(
    ...selectedItems.map(
      (item) => item.appliance.startingWatts - item.appliance.runningWatts
    ),
    0
  );

  // Total starting watts = running watts + largest surge difference
  const totalStartingWatts = totalRunningWatts + largestStartingDiff;

  // Add 20% safety margin for generator sizing
  const safetyMargin = 1.2;
  const recommendedWatts = Math.ceil(totalStartingWatts * safetyMargin);
  const recommendedKw = recommendedWatts / 1000;

  // Find appropriate generator size
  let generatorSize = generatorSizes.find(
    (size) =>
      recommendedWatts >= size.minWatts && recommendedWatts <= size.maxWatts
  );

  if (!generatorSize) {
    generatorSize = generatorSizes[generatorSizes.length - 1];
  }

  return {
    selectedItems,
    totalRunningWatts,
    largestStartingWatts,
    totalStartingWatts,
    recommendedWatts,
    recommendedKw,
    generatorSize,
    safetyMargin,
  };
}

export default function GeneratorSizingCalculator() {
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(
    new Map()
  );
  const [result, setResult] = useState<CalculationResult | null>(null);

  const updateQuantity = (applianceId: string, quantity: number) => {
    const newSelected = new Map(selectedItems);
    if (quantity <= 0) {
      newSelected.delete(applianceId);
    } else {
      newSelected.set(applianceId, quantity);
    }
    setSelectedItems(newSelected);
  };

  const handleCalculate = () => {
    const items: SelectedAppliance[] = [];
    selectedItems.forEach((quantity, applianceId) => {
      const appliance = appliances.find((a) => a.id === applianceId);
      if (appliance && quantity > 0) {
        items.push({ appliance, quantity });
      }
    });

    if (items.length === 0) return;

    const calculated = calculateGeneratorSize(items);
    setResult(calculated);
  };

  // Group appliances by category
  const categories = [...new Set(appliances.map((a) => a.category))];

  // Calculate current totals for preview
  let previewRunning = 0;
  let previewStarting = 0;
  selectedItems.forEach((quantity, applianceId) => {
    const appliance = appliances.find((a) => a.id === applianceId);
    if (appliance) {
      previewRunning += appliance.runningWatts * quantity;
      previewStarting = Math.max(previewStarting, appliance.startingWatts);
    }
  });

  return (
    <CalculatorWrapper
      title="Generator Sizing Calculator"
      description="Calculate the generator size needed to power your essential appliances during an outage. Includes running and starting wattage calculations per NEC guidelines."
    >
      <div className="space-y-6">
        {/* Appliance Selection */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Select Appliances to Power
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Select all appliances you want to run simultaneously during a power
            outage. Adjust quantities as needed.
          </p>

          {categories.map((category) => (
            <div key={category} className="mb-6">
              <h4 className="font-medium text-slate-800 mb-3 border-b border-slate-200 pb-1">
                {category}
              </h4>
              <div className="space-y-2">
                {appliances
                  .filter((a) => a.category === category)
                  .map((appliance) => {
                    const quantity = selectedItems.get(appliance.id) || 0;
                    return (
                      <div
                        key={appliance.id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          quantity > 0
                            ? 'border-[#c2410c] bg-orange-50'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">
                            {appliance.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {appliance.description}
                          </div>
                          <div className="text-sm text-slate-600 mt-1">
                            Running: {appliance.runningWatts.toLocaleString()}W |
                            Starting: {appliance.startingWatts.toLocaleString()}W
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(appliance.id, quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(appliance.id, quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-lg hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Totals */}
        {selectedItems.size > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-sm text-slate-600">Current Selection:</div>
            <div className="text-lg font-semibold text-slate-900">
              {previewRunning.toLocaleString()} W running /{' '}
              {previewStarting.toLocaleString()} W peak starting
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={selectedItems.size === 0}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Calculate Generator Size
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            {/* Generator Visualization */}
            <GeneratorSizingSVG
              appliances={result.selectedItems.map(item => ({
                name: item.appliance.name,
                runningWatts: item.appliance.runningWatts * item.quantity,
                startingWatts: item.appliance.startingWatts * item.quantity,
              }))}
              totalRunningWatts={result.totalRunningWatts}
              totalStartingWatts={result.totalStartingWatts}
              recommendedSize={result.recommendedWatts}
            />

            {/* Primary Recommendation */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">
                Recommended Generator Size
              </div>
              <div className="text-4xl font-bold text-[#c2410c]">
                {result.recommendedKw.toFixed(1)} kW
              </div>
              <div className="text-lg text-slate-700 mt-1">
                ({result.recommendedWatts.toLocaleString()} watts)
              </div>
              <div className="text-sm text-slate-600 mt-2">
                {result.generatorSize.type}: {result.generatorSize.description}
              </div>
            </div>

            {/* Wattage Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">Running Watts</div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.totalRunningWatts.toLocaleString()} W
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Continuous power draw
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">Peak Starting</div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.totalStartingWatts.toLocaleString()} W
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Maximum surge demand
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">
                  With 20% Safety Margin
                </div>
                <div className="text-2xl font-bold text-[#c2410c]">
                  {result.recommendedWatts.toLocaleString()} W
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Recommended minimum
                </div>
              </div>
            </div>

            {/* Selected Appliances Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Selected Appliances
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Appliance
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        Qty
                      </th>
                      <th className="text-right px-3 py-2 font-medium text-slate-700">
                        Running (W)
                      </th>
                      <th className="text-right px-3 py-2 font-medium text-slate-700">
                        Starting (W)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.selectedItems.map((item, index) => (
                      <tr
                        key={item.appliance.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      >
                        <td className="px-3 py-2 text-slate-900">
                          {item.appliance.name}
                        </td>
                        <td className="text-center px-3 py-2 text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="text-right px-3 py-2 text-slate-600">
                          {(
                            item.appliance.runningWatts * item.quantity
                          ).toLocaleString()}
                        </td>
                        <td className="text-right px-3 py-2 text-slate-600">
                          {item.appliance.startingWatts.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-300 font-semibold bg-slate-100">
                      <td className="px-3 py-2 text-slate-900" colSpan={2}>
                        Total
                      </td>
                      <td className="text-right px-3 py-2 text-slate-900">
                        {result.totalRunningWatts.toLocaleString()}
                      </td>
                      <td className="text-right px-3 py-2 text-slate-900">
                        {result.largestStartingWatts.toLocaleString()} (largest)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Generator Type Guide */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Generator Type Guide
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Wattage Range
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Generator Type
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatorSizes.map((size, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        } ${
                          result.recommendedWatts >= size.minWatts &&
                          result.recommendedWatts <= size.maxWatts
                            ? 'ring-2 ring-[#c2410c] ring-inset'
                            : ''
                        }`}
                      >
                        <td className="px-3 py-2 text-slate-900">
                          {size.minWatts.toLocaleString()}-
                          {size.maxWatts.toLocaleString()}W
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-900">
                          {size.type}
                        </td>
                        <td className="px-3 py-2 text-slate-600 text-xs">
                          {size.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Generator Sizing Tips
              </h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>
                  Prioritize essential loads: refrigerator, well pump, furnace
                  fan, and medical equipment
                </li>
                <li>
                  Avoid running all motor-driven appliances at once to reduce
                  starting surge
                </li>
                <li>
                  Standby generators should be professionally installed with a
                  transfer switch
                </li>
                <li>
                  Portable generators must NEVER be run indoors or in enclosed
                  spaces
                </li>
                <li>
                  Consider fuel consumption: gas generators use 0.5-1 gallon per
                  hour at half load
                </li>
                <li>
                  For EV charging, use Level 1 (standard outlet) unless
                  generator is rated for Level 2
                </li>
              </ul>
            </div>

            {/* Safety Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">
                Critical Safety Requirements
              </h4>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>
                  NEVER connect a generator directly to house wiring without a
                  transfer switch
                </li>
                <li>
                  NEVER run generators indoors, in garages, or near open windows
                </li>
                <li>
                  Place generators at least 20 feet from the house with exhaust
                  pointing away
                </li>
                <li>Install a carbon monoxide detector inside the home</li>
                <li>
                  Have a licensed electrician install transfer switches and
                  standby generators
                </li>
              </ul>
            </div>

            {/* Methodology */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Sizing Methodology:</p>
              <p>
                Generator size = (Total running watts + Largest starting surge)
                × 1.20 safety margin. Starting watts are calculated using the
                largest single motor surge (motors don&apos;t all start
                simultaneously in practice).
              </p>
              <p className="mt-2">
                Source: NEC (National Electrical Code), EGSA (Electrical
                Generating Systems Association), manufacturer guidelines.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
