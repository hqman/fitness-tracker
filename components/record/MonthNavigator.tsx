
import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Zap } from 'lucide-react';
import { ActivityRecord } from '../../types';

interface MonthNavigatorProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  monthlyActivities: ActivityRecord[];
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ currentDate, onPrevMonth, onNextMonth, monthlyActivities }) => {
  const formattedMonthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const workoutDays = new Set(monthlyActivities.map(act => act.date)).size;
  const totalCalories = monthlyActivities.reduce((sum, act) => sum + act.caloriesBurned, 0);

  return (
    <div className="bg-zinc-800/70 backdrop-blur-md p-4 shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center mb-3">
        <button onClick={onPrevMonth} className="p-2 rounded-full hover:bg-zinc-700 transition-colors" aria-label="Previous month">
          <ChevronLeft size={24} className="text-teal-400" />
        </button>
        <h2 className="text-xl font-semibold text-slate-100">{formattedMonthYear}</h2>
        <button onClick={onNextMonth} className="p-2 rounded-full hover:bg-zinc-700 transition-colors" aria-label="Next month">
          <ChevronRight size={24} className="text-teal-400" />
        </button>
      </div>
      <div className="flex justify-around text-sm text-slate-300">
        <div className="flex items-center space-x-1.5">
          <CalendarDays size={18} className="text-sky-400" />
          <span><span className="font-bold text-slate-100">{workoutDays}</span> days</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Zap size={18} className="text-yellow-400" />
          <span><span className="font-bold text-slate-100">{totalCalories.toLocaleString()}</span> kcal</span>
        </div>
      </div>
    </div>
  );
};

export default MonthNavigator;
