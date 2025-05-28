
import React, { useState, useMemo } from 'react';
import { ActivityRecord, ExerciseActivity } from '../types';
import TimePeriodSwitcher from '../components/stats/TimePeriodSwitcher';
import KeyMetricsDisplay from '../components/stats/KeyMetricsDisplay';
import ExerciseTypePieChart from '../components/stats/ExerciseTypePieChart';
import TrendLineChart from '../components/stats/TrendLineChart';

interface StatsPageProps {
  allActivities: ActivityRecord[];
}

type Period = 'week' | 'month' | 'year';

// Utility to get the start of the week (Sunday)
const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust if Sunday is 0, make Monday start
  // For this app, let's use Sunday as start of week, for simpler last 7 days logic, use date directly
  // For a calendar week (Sun-Sat or Mon-Sun), more complex logic for start/end is needed.
  // Simplified: "week" = last 7 days.
  const pastDate = new Date(d);
  pastDate.setDate(d.getDate() - 6); // 6 days before today + today = 7 days
  return new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate(), 0, 0, 0, 0);
};

const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
};

const getStartOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
};

const StatsPage: React.FC<StatsPageProps> = ({ allActivities }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const today = useMemo(() => new Date(), []); // Reference date for filtering

  const filteredActivities = useMemo(() => {
    let startDate: Date;
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999); // end of today

    switch (selectedPeriod) {
      case 'week':
        startDate = getStartOfWeek(today);
        break;
      case 'month':
        startDate = getStartOfMonth(today);
        break;
      case 'year':
        startDate = getStartOfYear(today);
        break;
      default:
        startDate = getStartOfMonth(today);
    }
    
    return allActivities.filter(activity => {
      const activityDate = new Date(activity.date + "T00:00:00"); // Ensure date is parsed correctly
      return activityDate >= startDate && activityDate <= endDate;
    });
  }, [allActivities, selectedPeriod, today]);

  const keyMetrics = useMemo(() => {
    const totalDuration = filteredActivities.reduce((sum, act) => sum + act.durationMinutes, 0);
    const totalCalories = filteredActivities.reduce((sum, act) => sum + act.caloriesBurned, 0);
    
    const activitiesWithHeartRate = filteredActivities.filter(act => typeof act.averageHeartRate === 'number');
    const sumHeartRate = activitiesWithHeartRate.reduce((sum, act) => sum + (act.averageHeartRate || 0), 0);
    const avgHeartRate = activitiesWithHeartRate.length > 0 ? Math.round(sumHeartRate / activitiesWithHeartRate.length) : 0;

    return { totalDuration, totalCalories, avgHeartRate };
  }, [filteredActivities]);

  const exerciseTypeDistribution = useMemo(() => {
    const distribution: { [key in ExerciseActivity]?: number } = {};
    filteredActivities.forEach(activity => {
      distribution[activity.type] = (distribution[activity.type] || 0) + 1; // Count of activities
      // Or use duration: distribution[activity.type] = (distribution[activity.type] || 0) + activity.durationMinutes;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name: name as ExerciseActivity, value }));
  }, [filteredActivities]);

  const trendData = useMemo(() => {
    // Example: Calories burned per day for the last 7 days if 'week' is selected.
    // More complex grouping for month/year.
    if (selectedPeriod === 'week') {
        const dataByDate: { [date: string]: number } = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }); // YYYY-MM-DD for consistency
            dataByDate[dateStr] = 0;
        }

        filteredActivities.forEach(activity => {
            const activityDateOnly = new Date(activity.date + "T00:00:00").toLocaleDateString('en-CA');
            if (dataByDate.hasOwnProperty(activityDateOnly)) {
                 dataByDate[activityDateOnly] += activity.caloriesBurned;
            }
        });
        return Object.entries(dataByDate)
            .map(([date, value]) => ({ date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value }))
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ensure correct order for chart
    }
    // Simplified: For month/year, show total per activity type, or aggregate weekly.
    // This example will be basic for month/year, showing aggregated values.
    // A true trend would require daily/weekly aggregation over the period.
    // For this prototype, we'll focus on weekly trend and total for month/year in pie/key metrics.
    if (selectedPeriod === 'month' || selectedPeriod === 'year') {
        // Aggregate by type for month/year trend example or just show overall.
        // This is a placeholder for more detailed trend data for month/year.
        // We'll show total calories per type as a simple "trend" for these periods.
        const monthlyTrend: { [key: string]: number } = {};
        filteredActivities.forEach(act => {
            monthlyTrend[act.type] = (monthlyTrend[act.type] || 0) + act.caloriesBurned;
        });
        return Object.entries(monthlyTrend).map(([date, value]) => ({date, value}));
    }
    return [];
  }, [filteredActivities, selectedPeriod, today]);


  return (
    <div className="flex flex-col h-full bg-zinc-900 text-slate-100">
      <div className="p-4 sticky top-0 bg-zinc-900 z-10">
        <h1 className="text-2xl font-bold text-center mb-4 text-teal-400">Activity Stats</h1>
        <TimePeriodSwitcher selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-6 pb-20">
        <KeyMetricsDisplay
          totalDuration={keyMetrics.totalDuration}
          totalCalories={keyMetrics.totalCalories}
          avgHeartRate={keyMetrics.avgHeartRate}
        />
        <ExerciseTypePieChart data={exerciseTypeDistribution} />
        <TrendLineChart 
            data={trendData} 
            dataKey="value" 
            xAxisKey="date"
            period={selectedPeriod}
        />
      </div>
    </div>
  );
};

export default StatsPage;
