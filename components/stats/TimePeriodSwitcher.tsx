
import React from 'react';

type Period = 'week' | 'month' | 'year';

interface TimePeriodSwitcherProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const periods: { id: Period; label: string }[] = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

const TimePeriodSwitcher: React.FC<TimePeriodSwitcherProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-center bg-zinc-800 p-1 rounded-lg shadow">
      {periods.map(period => (
        <button
          key={period.id}
          onClick={() => onPeriodChange(period.id)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out
            flex-1
            ${selectedPeriod === period.id 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md' 
              : 'text-slate-300 hover:bg-zinc-700'
            }
          `}
          aria-pressed={selectedPeriod === period.id}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodSwitcher;
