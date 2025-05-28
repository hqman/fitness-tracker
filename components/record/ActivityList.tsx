
import React from 'react';
import { ActivityRecord, ExerciseActivity } from '../../types';
import { Flame, Footprints, Bike, Dumbbell, Activity as GenericActivityIcon, PersonStanding, Fish } from 'lucide-react';

interface ActivityListProps {
  activities: ActivityRecord[];
  selectedDate: string | null;
}

const iconMap: Record<ExerciseActivity, React.ElementType> = {
  [ExerciseActivity.Running]: Flame,
  [ExerciseActivity.Walking]: Footprints,
  [ExerciseActivity.Cycling]: Bike,
  [ExerciseActivity.StrengthTraining]: Dumbbell,
  [ExerciseActivity.Yoga]: PersonStanding,
  [ExerciseActivity.HIIT]: Flame, 
  [ExerciseActivity.Swimming]: Fish,
  [ExerciseActivity.Others]: GenericActivityIcon,
};


const ActivityListItem: React.FC<{ activity: ActivityRecord }> = ({ activity }) => {
  const IconComponent = iconMap[activity.type] || GenericActivityIcon;
  
  return (
    <div className="flex items-start space-x-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700/70 transition-colors">
      <div className="mt-1 p-2 bg-teal-500/20 rounded-full">
        <IconComponent size={20} className="text-teal-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-100">{activity.name}</h4>
        <p className="text-xs text-slate-400">Type: {activity.type}</p>
        <div className="flex items-center space-x-3 text-xs text-slate-300 mt-1">
          <span>Duration: {activity.durationMinutes} min</span>
          <span>Calories: {activity.caloriesBurned} kcal</span>
        </div>
        {activity.notes && <p className="text-xs text-slate-400 mt-1 italic">Notes: {activity.notes}</p>}
      </div>
      {/* Optional: Timestamp or specific details */}
    </div>
  );
};


const ActivityList: React.FC<ActivityListProps> = ({ activities, selectedDate }) => {
  if (!selectedDate) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p>Select a date on the calendar to view activities.</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p>No activities recorded for this date.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-200">
        Activities for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
