
import React, { useState, useMemo } from 'react';
import { ActivityRecord } from '../types';
import MonthNavigator from '../components/record/MonthNavigator';
import CalendarView from '../components/record/CalendarView';
import ActivityList from '../components/record/ActivityList';

interface RecordPageProps {
  allActivities: ActivityRecord[];
}

const RecordPage: React.FC<RecordPageProps> = ({ allActivities }) => {
  const [currentDateDisplay, setCurrentDateDisplay] = useState(new Date()); // For month/year navigation
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // YYYY-MM-DD

  const handlePrevMonth = () => {
    setCurrentDateDisplay(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const handleNextMonth = () => {
    setCurrentDateDisplay(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null); // Reset selected date when month changes
  };

  const handleDateSelect = (date: string | null) => { // date is YYYY-MM-DD or null
    setSelectedDate(date);
  };

  const activitiesForCurrentMonth = useMemo(() => {
    const year = currentDateDisplay.getFullYear();
    const month = currentDateDisplay.getMonth(); // 0-indexed
    return allActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.getFullYear() === year && activityDate.getMonth() === month;
    });
  }, [allActivities, currentDateDisplay]);
  
  const activitiesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return allActivities.filter(activity => activity.date === selectedDate);
  }, [allActivities, selectedDate]);

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-slate-100">
      <MonthNavigator
        currentDate={currentDateDisplay}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        monthlyActivities={activitiesForCurrentMonth}
      />
      <div className="flex-grow overflow-y-auto p-4 space-y-4 pb-20"> {/* Padding for bottom nav */}
        <CalendarView
          currentDateDisplay={currentDateDisplay}
          activities={allActivities} // Pass all activities for marking dates across months if needed
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          currentMonthActivities={activitiesForCurrentMonth} // For highlighting days in current month view
        />
        <ActivityList
          activities={activitiesForSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};

export default RecordPage;
