
import React from 'react';
import { TodaysWorkout } from '../types';
import { Zap, Clock } from 'lucide-react';

interface TodaysWorkoutCardProps {
  workout: TodaysWorkout;
}

const TodaysWorkoutCard: React.FC<TodaysWorkoutCardProps> = ({ workout }) => {
  return (
    <div className="rounded-xl shadow-xl overflow-hidden relative bg-zinc-800">
      <img 
        src={workout.imageUrl} 
        alt={workout.name} 
        className="w-full h-48 object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="p-5 relative text-white">
        <h2 className="text-2xl font-bold mb-2">{workout.name}</h2>
        <div className="flex items-center space-x-4 text-sm mb-4 text-slate-300">
          <div className="flex items-center">
            <Zap size={16} className="mr-1 text-yellow-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-sky-400" />
            <span>{workout.durationMinutes} min</span>
          </div>
        </div>
        <button className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-150 ease-in-out active:scale-95">
          Start Workout
        </button>
      </div>
    </div>
  );
};

export default TodaysWorkoutCard;
