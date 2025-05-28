
export enum ExerciseActivity {
  Running = 'Running',
  Walking = 'Walking',
  Cycling = 'Cycling',
  StrengthTraining = 'Strength Training',
  Yoga = 'Yoga',
  HIIT = 'HIIT',
  Swimming = 'Swimming',
  Others = 'Others',
}

export interface Course {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  imageUrl: string;
}

export interface UserData {
  name: string;
  avatarUrl?: string; // Added avatarUrl
  consecutiveCheckInDays: number;
  dailyGoalCalories: number;
  currentCaloriesBurned: number;
}

export interface TodaysWorkout {
  name:string;
  caloriesBurned: number;
  durationMinutes: number;
  imageUrl: string;
}

export interface ActivityRecord {
  id: string;
  date: string; // YYYY-MM-DD format
  type: ExerciseActivity;
  name: string; // e.g., "Morning Run", "Evening Walk"
  durationMinutes: number;
  caloriesBurned: number;
  averageHeartRate?: number; // Optional: Average heart rate for the activity
  notes?: string; // Optional field for extra details
}