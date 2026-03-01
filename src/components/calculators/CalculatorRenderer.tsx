'use client';

import dynamic from 'next/dynamic';

// Dynamically import all calculator components
const calculators: Record<string, React.ComponentType> = {
  BTUConversionCalculator: dynamic(
    () => import('./btu-conversion/BTUConversionCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  COPCalculator: dynamic(() => import('./cop/COPCalculator'), {
    loading: () => <CalculatorSkeleton />,
  }),
  SonesToDecibelsCalculator: dynamic(
    () => import('./sones-to-decibels/SonesToDecibelsCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  ElectricHeaterCostCalculator: dynamic(
    () => import('./electric-heater-cost/ElectricHeaterCostCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  ACRunningCostCalculator: dynamic(
    () => import('./ac-running-cost/ACRunningCostCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  HeatPumpCostCalculator: dynamic(
    () => import('./heat-pump-cost/HeatPumpCostCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  HeatingCostCalculator: dynamic(
    () => import('./heating-cost/HeatingCostCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  DehumidifierCostCalculator: dynamic(
    () => import('./dehumidifier-cost/DehumidifierCostCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  BathroomFanCFMCalculator: dynamic(
    () => import('./bathroom-fan-cfm/BathroomFanCFMCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  CFMCalculator: dynamic(
    () => import('./cfm-calculator/CFMCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  DuctSizingCalculator: dynamic(
    () => import('./duct-sizing/DuctSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  AirChangesPerHourCalculator: dynamic(
    () => import('./air-changes-per-hour/AirChangesPerHourCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  CeilingFanSizeCalculator: dynamic(
    () => import('./ceiling-fan-size/CeilingFanSizeCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  GeneratorSizingCalculator: dynamic(
    () => import('./generator-sizing/GeneratorSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  DewPointCalculator: dynamic(
    () => import('./dew-point/DewPointCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  BTUACSizingCalculator: dynamic(
    () => import('./btu-ac-sizing/BTUACSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  TanklessWaterHeaterCalculator: dynamic(
    () => import('./tankless-water-heater/TanklessWaterHeaterCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  WaterHeaterSizingCalculator: dynamic(
    () => import('./water-heater-sizing/WaterHeaterSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  MiniSplitSizingCalculator: dynamic(
    () => import('./mini-split-sizing/MiniSplitSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  FurnaceSizingCalculator: dynamic(
    () => import('./furnace-sizing/FurnaceSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  HeatingBTUCalculator: dynamic(
    () => import('./heating-btu/HeatingBTUCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  ACTonnageCalculator: dynamic(
    () => import('./ac-tonnage/ACTonnageCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  HeatPumpSizingCalculator: dynamic(
    () => import('./heat-pump-sizing/HeatPumpSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  AirPurifierSizingCalculator: dynamic(
    () => import('./air-purifier-sizing/AirPurifierSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  SEERRatingCalculator: dynamic(
    () => import('./seer-rating/SEERRatingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  // Aliases for MDX component name mismatches
  ACHCalculator: dynamic(
    () => import('./air-changes-per-hour/AirChangesPerHourCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  RoomACCalculator: dynamic(
    () => import('./btu-ac-sizing/BTUACSizingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  SEERCalculator: dynamic(
    () => import('./seer-rating/SEERRatingCalculator'),
    { loading: () => <CalculatorSkeleton /> }
  ),
  RefrigerantPTChart: dynamic(
    () => import('./refrigerant-pt-chart/RefrigerantPTChart'),
    { loading: () => <CalculatorSkeleton /> }
  ),
};

function CalculatorSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 sm:px-6">
        <div className="h-6 bg-slate-200 rounded w-48"></div>
        <div className="h-4 bg-slate-200 rounded w-72 mt-2"></div>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
          </div>
        </div>
        <div className="h-12 bg-slate-200 rounded w-40"></div>
      </div>
    </div>
  );
}

interface CalculatorRendererProps {
  calculatorComponent: string;
}

export default function CalculatorRenderer({
  calculatorComponent,
}: CalculatorRendererProps) {
  const Calculator = calculators[calculatorComponent];

  if (!Calculator) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
        Calculator &quot;{calculatorComponent}&quot; is not yet available.
      </div>
    );
  }

  return <Calculator />;
}
