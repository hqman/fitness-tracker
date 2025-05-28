
import React from 'react';
import { TrendingUp, Zap, Heart } from 'lucide-react'; // Icons for metrics

interface KeyMetricsDisplayProps {
  totalDuration: number; // in minutes
  totalCalories: number;
  avgHeartRate: number; // bpm
}

const KeyMetricsDisplay: React.FC<KeyMetricsDisplayProps> = ({ totalDuration, totalCalories, avgHeartRate }) => {
  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-100">
      <div className="bg-zinc-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <div className="p-2 bg-teal-500/20 rounded-full mb-2">
            <TrendingUp size={28} className="text-teal-400" />
        </div>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
          {formatDuration(totalDuration)}
        </span>
        <span className="text-sm text-slate-400 mt-1">Total Duration</span>
      </div>
      <div className="bg-zinc-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <div className="p-2 bg-orange-500/20 rounded-full mb-2">
            <Zap size={28} className="text-orange-400" />
        </div>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          {totalCalories.toLocaleString()}
        </span>
        <span className="text-sm text-slate-400 mt-1">Total Calories</span>
      </div>
      <div className="bg-zinc-800 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
         <div className="p-2 bg-pink-500/20 rounded-full mb-2">
            <Heart size={28} className="text-pink-400" />
        </div>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
          {avgHeartRate > 0 ? avgHeartRate : 'N/A'}
        </span>
        <span className="text-sm text-slate-400 mt-1">Avg. Heart Rate</span>
      </div>
    </div>
  );
};

export default KeyMetricsDisplay;
