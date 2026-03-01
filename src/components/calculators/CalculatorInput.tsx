'use client';

import { InputHTMLAttributes } from 'react';

interface BaseInputProps {
  label: string;
  id: string;
  unit?: string;
  helpText?: string;
}

interface NumberInputProps extends BaseInputProps {
  type: 'number';
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number | string;
}

interface SelectInputProps extends BaseInputProps {
  type: 'select';
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type CalculatorInputProps = NumberInputProps | SelectInputProps;

export default function CalculatorInput(props: CalculatorInputProps) {
  const { label, id, unit, helpText } = props;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {unit && <span className="text-slate-500 font-normal"> ({unit})</span>}
      </label>

      {props.type === 'select' ? (
        <select
          id={id}
          value={props.value}
          onChange={props.onChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow"
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type="number"
            id={id}
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            step={props.step}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      )}

      {helpText && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
}
