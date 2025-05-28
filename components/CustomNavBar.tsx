
import React from 'react';
import { CalendarDays, Flame } from 'lucide-react';

interface CustomNavBarProps {
  currentDate: Date;
  consecutiveDays: number;
}

const CustomNavBar: React.FC<CustomNavBarProps> = ({ currentDate, consecutiveDays }) => {
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="bg-zinc-800/50 backdrop-blur-md p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <div className="flex items-center space-x-2 text-slate-200">
        <CalendarDays size={20} className="text-teal-400" />
        <span className="font-medium">{formattedDate}</span>
      </div>
      <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow">
        <Flame size={18} />
        <span className="text-sm font-semibold">{consecutiveDays} Days</span>
      </div>
    </nav>
  );
};

export default CustomNavBar;
