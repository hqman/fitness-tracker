
import React from 'react';
import { ExerciseActivity } from '../types';
import { Flame, Footprints, Bike, Dumbbell, type LucideIcon } from 'lucide-react';

interface ActivityItem {
  type: ExerciseActivity;
  iconName: 'Flame' | 'Footprints' | 'Bike' | 'Dumbbell';
}

interface ActivityQuickAccessProps {
  activities: ActivityItem[];
}

const iconMap: {
  Flame: LucideIcon;
  Footprints: LucideIcon;
  Bike: LucideIcon;
  Dumbbell: LucideIcon;
} = {
  Flame,
  Footprints,
  Bike,
  Dumbbell,
};

const ActivityQuickAccess: React.FC<ActivityQuickAccessProps> = ({ activities }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Quick Start</h3>
      <div className="grid grid-cols-4 gap-3">
        {activities.map((activity) => {
          const IconComponent = iconMap[activity.iconName];
          return (
            <button
              key={activity.type}
              className="flex flex-col items-center justify-center p-3 bg-zinc-800 rounded-lg shadow hover:bg-zinc-700 transition-colors aspect-square"
              aria-label={`Start ${activity.type} activity`}
            >
              <IconComponent size={28} className="mb-1.5 text-teal-400" />
              <span className="text-xs text-slate-300">{activity.type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityQuickAccess;
