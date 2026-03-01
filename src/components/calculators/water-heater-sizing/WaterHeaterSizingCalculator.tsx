'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import WaterHeaterSizingSVG from './WaterHeaterSizingSVG';

// Hot water usage per activity (gallons)
// Source: DOE Energy Saver, ASHRAE, Energy Star guidelines
const ACTIVITIES = [
  { id: 'shower', name: 'Shower (10 min)', gallons: 20, category: 'Bathroom' },
  { id: 'bath', name: 'Bath', gallons: 20, category: 'Bathroom' },
  { id: 'shaving', name: 'Shaving', gallons: 2, category: 'Bathroom' },
  { id: 'hands_face', name: 'Hands/Face Washing', gallons: 2, category: 'Bathroom' },
  { id: 'hair_shampoo', name: 'Hair Shampoo', gallons: 4, category: 'Bathroom' },
  { id: 'hand_dishwashing', name: 'Hand Dishwashing', gallons: 6, category: 'Kitchen' },
  { id: 'dishwasher', name: 'Dishwasher Load', gallons: 6, category: 'Kitchen' },
  { id: 'food_prep', name: 'Food Preparation', gallons: 4, category: 'Kitchen' },
  { id: 'clothes_washer', name: 'Clothes Washer Load', gallons: 25, category: 'Laundry' },
];

// Standard tank sizes and their FHR (First Hour Rating) ranges
// Source: AHRI, DOE EnergyGuide labels
const TANK_SIZES = [
  { gallons: 30, gasMinFHR: 35, gasMaxFHR: 45, electricMinFHR: 30, electricMaxFHR: 40 },
  { gallons: 40, gasMinFHR: 50, gasMaxFHR: 65, electricMinFHR: 45, electricMaxFHR: 55 },
  { gallons: 50, gasMinFHR: 65, gasMaxFHR: 85, electricMinFHR: 55, electricMaxFHR: 70 },
  { gallons: 65, gasMinFHR: 80, gasMaxFHR: 100, electricMinFHR: 70, electricMaxFHR: 85 },
  { gallons: 75, gasMinFHR: 90, gasMaxFHR: 110, electricMinFHR: 80, electricMaxFHR: 95 },
  { gallons: 80, gasMinFHR: 95, gasMaxFHR: 120, electricMinFHR: 85, electricMaxFHR: 100 },
];

interface ActivityCount {
  [key: string]: number;
}

interface WaterHeaterResults {
  peakHourDemand: number;
  recommendedFHR: number;
  activityBreakdown: Array<{ name: string; count: number; gallons: number; total: number }>;
  gasRecommendation: { size: number; fhrRange: string };
  electricRecommendation: { size: number; fhrRange: string };
  dailyUsageEstimate: number;
  sizing: string;
  efficiency: string;
}

// Calculate water heater size using First Hour Rating method
// Source: DOE Energy Saver, AHRI Standard 118
function calculateWaterHeaterSize(
  activities: ActivityCount,
  householdSize: number,
  fuelType: string
): WaterHeaterResults {
  // Calculate peak hour demand from selected activities
  let peakHourDemand = 0;
  const activityBreakdown: Array<{
    name: string;
    count: number;
    gallons: number;
    total: number;
  }> = [];

  ACTIVITIES.forEach((activity) => {
    const count = activities[activity.id] || 0;
    if (count > 0) {
      const total = count * activity.gallons;
      peakHourDemand += total;
      activityBreakdown.push({
        name: activity.name,
        count,
        gallons: activity.gallons,
        total,
      });
    }
  });

  // Add 10% buffer for realistic operation
  const recommendedFHR = Math.ceil(peakHourDemand * 1.1);

  // Find appropriate tank sizes
  const gasRecommendation = findTankSize(recommendedFHR, 'gas');
  const electricRecommendation = findTankSize(recommendedFHR, 'electric');

  // Estimate daily usage (peak hour × typical multiplier based on household size)
  // Average household uses hot water in 2-3 "peak" periods daily
  const dailyMultiplier = Math.min(3, 1.5 + householdSize * 0.3);
  const dailyUsageEstimate = Math.round(peakHourDemand * dailyMultiplier);

  // Generate sizing recommendation
  const sizing = generateSizingRecommendation(recommendedFHR, householdSize, fuelType);
  const efficiency = generateEfficiencyTips(fuelType, gasRecommendation.size);

  return {
    peakHourDemand,
    recommendedFHR,
    activityBreakdown,
    gasRecommendation,
    electricRecommendation,
    dailyUsageEstimate,
    sizing,
    efficiency,
  };
}

function findTankSize(
  requiredFHR: number,
  fuelType: 'gas' | 'electric'
): { size: number; fhrRange: string } {
  const minKey = fuelType === 'gas' ? 'gasMinFHR' : 'electricMinFHR';
  const maxKey = fuelType === 'gas' ? 'gasMaxFHR' : 'electricMaxFHR';

  for (const tank of TANK_SIZES) {
    if (tank[maxKey] >= requiredFHR) {
      return {
        size: tank.gallons,
        fhrRange: `${tank[minKey]}-${tank[maxKey]} gallons/hr`,
      };
    }
  }

  // If demand exceeds largest tank, recommend the largest with a note
  const largest = TANK_SIZES[TANK_SIZES.length - 1];
  return {
    size: largest.gallons,
    fhrRange: `${largest[minKey]}-${largest[maxKey]} gallons/hr (may need multiple units)`,
  };
}

function generateSizingRecommendation(fhr: number, householdSize: number, fuelType: string): string {
  const recommendations: string[] = [];

  if (fhr < 40) {
    recommendations.push('Your hot water demand is relatively low.');
    recommendations.push('A 30-40 gallon tank should be sufficient.');
  } else if (fhr < 65) {
    recommendations.push('Moderate hot water demand typical for 2-3 person households.');
    recommendations.push('A 40-50 gallon tank is recommended.');
  } else if (fhr < 85) {
    recommendations.push('Higher hot water demand typical for families.');
    recommendations.push('A 50-65 gallon tank is recommended.');
  } else {
    recommendations.push('High hot water demand.');
    recommendations.push('Consider a 75-80 gallon tank or explore tankless options.');
  }

  if (fuelType === 'gas') {
    recommendations.push(
      'Gas water heaters have faster recovery rates, allowing for smaller tank sizes.'
    );
  } else {
    recommendations.push(
      'Electric water heaters have slower recovery. Consider sizing up if peak demand is critical.'
    );
  }

  return recommendations.join(' ');
}

function generateEfficiencyTips(fuelType: string, tankSize: number): string {
  const tips: string[] = [];

  tips.push('Look for Energy Star certified models for best efficiency.');

  if (fuelType === 'gas') {
    tips.push('Gas condensing water heaters can achieve 90%+ efficiency but cost more upfront.');
    if (tankSize >= 55) {
      tips.push(
        'For this size, a heat pump water heater may offer significant energy savings.'
      );
    }
  } else {
    if (tankSize >= 50) {
      tips.push('Heat pump water heaters use 2-3x less energy than standard electric.');
    }
  }

  tips.push(
    'Match the First Hour Rating on the EnergyGuide label to your calculated peak demand.'
  );

  return tips.join(' ');
}

export default function WaterHeaterSizingCalculator() {
  const [activities, setActivities] = useState<ActivityCount>({
    shower: 2,
    hands_face: 2,
    hand_dishwashing: 1,
  });
  const [householdSize, setHouseholdSize] = useState(3);
  const [fuelType, setFuelType] = useState('gas');
  const [results, setResults] = useState<WaterHeaterResults | null>(null);

  const handleActivityChange = (activityId: string, count: number) => {
    setActivities((prev) => ({
      ...prev,
      [activityId]: Math.max(0, count),
    }));
  };

  const handleCalculate = () => {
    const result = calculateWaterHeaterSize(activities, householdSize, fuelType);
    setResults(result);
  };

  // Group activities by category
  const activitiesByCategory = ACTIVITIES.reduce((acc, activity) => {
    if (!acc[activity.category]) acc[activity.category] = [];
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, typeof ACTIVITIES>);

  return (
    <CalculatorWrapper
      title="Water Heater Sizing Calculator"
      description="Calculate the right tank water heater size using the First Hour Rating (FHR) method based on your peak hour hot water usage."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hour Activities */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Peak Hour Activities</h3>
          <p className="text-sm text-slate-600">
            Enter the number of times each activity happens during your busiest hot water hour
            (usually morning or evening).
          </p>

          {Object.entries(activitiesByCategory).map(([category, categoryActivities]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-slate-600">{category}</h4>
              <div className="space-y-2">
                {categoryActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={activities[activity.id] || 0}
                      onChange={(e) =>
                        handleActivityChange(activity.id, parseInt(e.target.value) || 0)
                      }
                      className="w-16 px-2 py-1 text-center border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-sm text-slate-700">
                      {activity.name} ({activity.gallons} gal)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Household Info</h3>

          <CalculatorInput
            id="householdSize"
            label="Number of People in Household"
            type="number"
            value={householdSize}
            onChange={(e) => setHouseholdSize(parseInt(e.target.value) || 1)}
            min={1}
            max={10}
            helpText="Used to estimate daily usage patterns"
          />

          <CalculatorInput
            id="fuelType"
            label="Preferred Fuel Type"
            type="select"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            options={[
              { value: 'gas', label: 'Natural Gas / Propane' },
              { value: 'electric', label: 'Electric' },
            ]}
          />

          <button
            onClick={handleCalculate}
            className="w-full mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Calculate Water Heater Size
          </button>
        </div>
      </div>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          {/* Water Heater Visualization */}
          <WaterHeaterSizingSVG
            tankSize={results.gasRecommendation.size}
            firstHourRating={results.recommendedFHR}
            peakDemand={results.peakHourDemand}
            heaterType="tank"
          />

          <ResultsGrid>
            <CalculatorResult
              label="Peak Hour Demand"
              value={`${results.peakHourDemand} gallons`}
              subtitle="Based on your selected activities"
            />
            <CalculatorResult
              label="Recommended FHR"
              value={`${results.recommendedFHR} gal/hr`}
              subtitle="First Hour Rating needed"
            />
            <CalculatorResult
              label={fuelType === 'gas' ? 'Gas Tank Size' : 'Electric Tank Size'}
              value={`${fuelType === 'gas' ? results.gasRecommendation.size : results.electricRecommendation.size} gallons`}
              subtitle={
                fuelType === 'gas'
                  ? results.gasRecommendation.fhrRange
                  : results.electricRecommendation.fhrRange
              }
            />
            <CalculatorResult
              label="Est. Daily Usage"
              value={`${results.dailyUsageEstimate} gallons`}
              subtitle={`For ${householdSize} person household`}
            />
          </ResultsGrid>

          {/* Activity Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Peak Hour Breakdown</h3>
            <ResultsTable
              headers={['Activity', 'Count', 'Gallons Each', 'Total Gallons']}
              rows={results.activityBreakdown.map((a) => [
                a.name,
                a.count.toString(),
                `${a.gallons} gal`,
                `${a.total} gal`,
              ])}
            />
          </div>

          {/* Tank Size Comparison */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Tank Size Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800">Gas Water Heater</h4>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {results.gasRecommendation.size} gallons
                </p>
                <p className="text-sm text-blue-700">FHR: {results.gasRecommendation.fhrRange}</p>
                <p className="text-xs text-blue-600 mt-2">
                  Gas units recover faster, allowing smaller tanks
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800">Electric Water Heater</h4>
                <p className="text-2xl font-bold text-amber-900 mt-1">
                  {results.electricRecommendation.size} gallons
                </p>
                <p className="text-sm text-amber-700">
                  FHR: {results.electricRecommendation.fhrRange}
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  Consider heat pump models for efficiency
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Sizing Recommendation</h3>
            <p className="text-sm text-orange-900">{results.sizing}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Efficiency Tips</h3>
            <p className="text-sm text-green-900">{results.efficiency}</p>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">About First Hour Rating (FHR)</h4>
            <p>
              The First Hour Rating measures how many gallons of hot water a heater can deliver in
              the first hour starting with a full tank. It&apos;s listed on the EnergyGuide label
              and is the best way to compare water heaters for your needs.
            </p>
            <p className="mt-2">
              <strong>Formula:</strong> FHR = Tank Capacity + Recovery Rate (gallons/hour)
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> DOE Energy Saver, AHRI Standard 118, Energy Star Water
              Heater Specifications
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
