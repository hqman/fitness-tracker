
import React, { useState } from 'react';
import { UserData, TodaysWorkout, Course, ExerciseActivity, ActivityRecord } from './types';
import CustomNavBar from './components/CustomNavBar';
import TodaysWorkoutCard from './components/TodaysWorkoutCard';
import ActivityQuickAccess from './components/ActivityQuickAccess';
import GoalProgressRing from './components/GoalProgressRing';
import CourseRecommendations from './components/CourseRecommendations';
import MainBottomNav from './components/MainBottomNav';
import RecordPage from './pages/RecordPage';
import StatsPage from './pages/StatsPage';
import MyPage from './pages/MyPage'; // New import for My Page

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Record' | 'Stats' | 'My'>('Home');
  const currentDate = new Date(); // Used for NavBar and can be a reference for "today"

  const userData: UserData = {
    name: 'Kai', 
    avatarUrl: 'https://picsum.photos/seed/profilepersonkai/200/200', // << NEW AVATAR
    consecutiveCheckInDays: 21,
    dailyGoalCalories: 600,
    currentCaloriesBurned: 450,
  };

  const todaysWorkout: TodaysWorkout = {
    name: 'Shadow Boxer HIIT',
    caloriesBurned: 320,
    durationMinutes: 30,
    imageUrl: 'https://picsum.photos/seed/fitnessaction/600/400', // << UPDATED HOME IMAGE
  };

  const quickActivities = [
    { type: ExerciseActivity.Running, iconName: 'Flame' as const },
    { type: ExerciseActivity.Walking, iconName: 'Footprints' as const },
    { type: ExerciseActivity.Cycling, iconName: 'Bike' as const },
    { type: ExerciseActivity.Others, iconName: 'Dumbbell' as const },
  ];

  const recommendedCourses: Course[] = [
    { id: '1', title: 'Core Strength Builder', category: 'Strength', durationMinutes: 25, imageUrl: 'https://picsum.photos/seed/strengthtraininggear/300/200' }, // << UPDATED HOME IMAGE
    { id: '2', title: 'Twilight Yoga Flow', category: 'Flexibility', durationMinutes: 45, imageUrl: 'https://picsum.photos/seed/yogapractice/300/200' }, // << UPDATED HOME IMAGE
    { id: '3', title: 'Night Runner Cardio', category: 'Cardio', durationMinutes: 30, imageUrl: 'https://picsum.photos/seed/cardioworkout/300/200' }, // << UPDATED HOME IMAGE
  ];

  // Get current year, month (0-indexed), and day for dynamic data generation
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-indexed for YYYY-MM-DD
  const currentDay = today.getDate();

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const sampleActivityRecords: ActivityRecord[] = [
    // Current month activities
    { id: 'rec1', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 2)), type: ExerciseActivity.Running, name: 'Morning Run', durationMinutes: 30, caloriesBurned: 300, averageHeartRate: 150 },
    { id: 'rec2', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 2)), type: ExerciseActivity.StrengthTraining, name: 'Full Body Workout', durationMinutes: 45, caloriesBurned: 250, averageHeartRate: 120 },
    { id: 'rec3', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 1)), type: ExerciseActivity.Cycling, name: 'Evening Cycle', durationMinutes: 60, caloriesBurned: 500, averageHeartRate: 140 },
    { id: 'rec4', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 5)), type: ExerciseActivity.Yoga, name: 'Sunrise Yoga', durationMinutes: 40, caloriesBurned: 150, averageHeartRate: 100 },
    { id: 'rec5', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 3)), type: ExerciseActivity.Running, name: 'Trail Run', durationMinutes: 50, caloriesBurned: 450, averageHeartRate: 155 },
    { id: 'rec6', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 3)), type: ExerciseActivity.HIIT, name: 'Quick HIIT', durationMinutes: 20, caloriesBurned: 220, averageHeartRate: 160 },
    { id: 'rec17', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 4)), type: ExerciseActivity.Swimming, name: 'Mid-week Swim', durationMinutes: 40, caloriesBurned: 350, averageHeartRate: 135 },
    { id: 'rec18', date: formatDate(currentYear, currentMonth, Math.max(1, currentDay - 6)), type: ExerciseActivity.Walking, name: 'Park Stroll', durationMinutes: 60, caloriesBurned: 200, averageHeartRate: 105 },
    
    // Previous month activities
    { id: 'rec7', date: formatDate(currentYear, currentMonth - 1, 28), type: ExerciseActivity.Walking, name: 'Brisk Walk', durationMinutes: 45, caloriesBurned: 180, averageHeartRate: 110 },
    { id: 'rec8', date: formatDate(currentYear, currentMonth - 1, 25), type: ExerciseActivity.Swimming, name: 'Pool Session', durationMinutes: 50, caloriesBurned: 400, averageHeartRate: 130 },
    { id: 'rec19', date: formatDate(currentYear, currentMonth - 1, 15), type: ExerciseActivity.StrengthTraining, name: 'Upper Body', durationMinutes: 50, caloriesBurned: 280, averageHeartRate: 125 },
    { id: 'rec20', date: formatDate(currentYear, currentMonth - 1, 10), type: ExerciseActivity.Yoga, name: 'Restorative Yoga', durationMinutes: 60, caloriesBurned: 120, averageHeartRate: 90 },
    { id: 'rec21', date: formatDate(currentYear, currentMonth - 1, 5), type: ExerciseActivity.Running, name: 'Long Run Prep', durationMinutes: 75, caloriesBurned: 600, averageHeartRate: 148 },

    // Activities from two months ago
    { id: 'rec9', date: formatDate(currentYear, currentMonth - 2, 15), type: ExerciseActivity.Running, name: 'May Jog (example)', durationMinutes: 35, caloriesBurned: 320, averageHeartRate: 145 },
    { id: 'rec10', date: formatDate(currentYear, currentMonth - 2, 20), type: ExerciseActivity.Cycling, name: 'May Cycle (example)', durationMinutes: 55, caloriesBurned: 480, averageHeartRate: 135 },
    { id: 'rec22', date: formatDate(currentYear, currentMonth - 2, 5), type: ExerciseActivity.HIIT, name: 'Intense HIIT', durationMinutes: 25, caloriesBurned: 280, averageHeartRate: 165 },
    { id: 'rec23', date: formatDate(currentYear, currentMonth - 2, 25), type: ExerciseActivity.Walking, name: 'Power Walk', durationMinutes: 50, caloriesBurned: 210, averageHeartRate: 115 },

    // Activities from earlier in the year / last year for year view
    { id: 'rec11', date: formatDate(currentYear -1, 12, 10), type: ExerciseActivity.StrengthTraining, name: 'Winter Workout', durationMinutes: 60, caloriesBurned: 300, averageHeartRate: 125 },
    { id: 'rec12', date: formatDate(currentYear, 1, 15), type: ExerciseActivity.Running, name: 'New Year Run', durationMinutes: 40, caloriesBurned: 350, averageHeartRate: 150 },
    { id: 'rec13', date: formatDate(currentYear, 2, 10), type: ExerciseActivity.Cycling, name: 'February Ride', durationMinutes: 60, caloriesBurned: 520, averageHeartRate: 142 },
    { id: 'rec14', date: formatDate(currentYear, 3, 5), type: ExerciseActivity.Yoga, name: 'Spring Yoga', durationMinutes: 50, caloriesBurned: 180, averageHeartRate: 100 },
    { id: 'rec15', date: formatDate(currentYear, 1, 20), type: ExerciseActivity.Swimming, name: 'Indoor Swim', durationMinutes: 45, caloriesBurned: 380, averageHeartRate: 130 },
    { id: 'rec16', date: formatDate(currentYear -1, 11, 5), type: ExerciseActivity.HIIT, name: 'Autumn HIIT Blast', durationMinutes: 22, caloriesBurned: 250, averageHeartRate: 162 },
  ].filter(record => { // Ensure no invalid dates (e.g., month 0 or negative)
    const [year, month, day] = record.date.split('-').map(Number);
    return month > 0 && month <= 12 && day > 0 && day <= 31; // Basic validation
  });


  const HomePageContent: React.FC = () => (
    <>
      <CustomNavBar currentDate={currentDate} consecutiveDays={userData.consecutiveCheckInDays} />
      <div className="flex-grow overflow-y-auto p-4 space-y-6 pb-20"> {/* Adjusted padding for nav */}
        <TodaysWorkoutCard workout={todaysWorkout} />
        <ActivityQuickAccess activities={quickActivities} />
        <GoalProgressRing
          current={userData.currentCaloriesBurned}
          goal={userData.dailyGoalCalories}
          unit="kcal"
        />
        <CourseRecommendations courses={recommendedCourses} />
      </div>
    </>
  );

  return (
    <div className="w-[375px] h-[812px] bg-zinc-900 text-slate-100 mx-auto my-4 shadow-2xl rounded-lg overflow-hidden flex flex-col relative">
      {currentPage === 'Home' && <HomePageContent />}
      {currentPage === 'Record' && <RecordPage allActivities={sampleActivityRecords} />}
      {currentPage === 'Stats' && <StatsPage allActivities={sampleActivityRecords} />}
      {currentPage === 'My' && <MyPage user={userData} />}
      
      <MainBottomNav activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
