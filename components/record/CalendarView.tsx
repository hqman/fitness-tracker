
import React, { useMemo } from 'react';
import { ActivityRecord } from '../../types';

interface CalendarViewProps {
  currentDateDisplay: Date; // The month/year to display
  activities: ActivityRecord[]; // All activities to find check-ins
  selectedDate: string | null; // YYYY-MM-DD
  onDateSelect: (date: string | null) => void;
  currentMonthActivities: ActivityRecord[]; // Activities filtered for the current month view
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDateDisplay, activities, selectedDate, onDateSelect, currentMonthActivities }) => {
  const year = currentDateDisplay.getFullYear();
  const month = currentDateDisplay.getMonth(); // 0-indexed

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)

  const checkedInDatesForMonth = useMemo(() => {
    const dates = new Set<string>();
    currentMonthActivities.forEach(activity => {
        dates.add(activity.date); // activity.date is YYYY-MM-DD
    });
    return dates;
  }, [currentMonthActivities]);


  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarCells = [];

  // Add day labels
  dayLabels.forEach(label => {
    calendarCells.push(
      <div key={`label-${label}`} className="text-center text-xs text-slate-400 font-medium">
        {label}
      </div>
    );
  });

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-prev-${i}`} className="border border-transparent rounded-lg"></div>);
  }

  // Add day cells for the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isCheckedIn = checkedInDatesForMonth.has(dateStr);
    const isSelected = selectedDate === dateStr;

    calendarCells.push(
      <button
        key={dateStr}
        onClick={() => onDateSelect(isSelected ? null : dateStr)}
        className={`
          p-2 text-center rounded-lg transition-all duration-150 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
          ${isSelected ? 'bg-teal-500 text-white font-bold ring-2 ring-teal-300' : 'hover:bg-zinc-700'}
          ${!isSelected && isCheckedIn ? 'bg-teal-600/30 text-teal-300 font-medium' : ''}
          ${!isSelected && !isCheckedIn ? 'text-slate-300 bg-zinc-800 hover:bg-zinc-700' : ''}
          aspect-square flex items-center justify-center
        `}
        aria-pressed={isSelected}
        aria-label={`Date ${day}, ${isCheckedIn ? 'activity recorded' : 'no activity'}`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow">
      <div className="grid grid-cols-7 gap-1.5">
        {calendarCells}
      </div>
    </div>
  );
};

export default CalendarView;
