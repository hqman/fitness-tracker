
import React from 'react';
import { Course } from '../types';
import { PlayCircle, Tag, Clock } from 'lucide-react';

interface CourseRecommendationsProps {
  courses: Course[];
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({ courses }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Recommended Courses</h3>
      <div className="space-y-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-zinc-800 rounded-lg shadow p-3 flex items-center space-x-3 hover:bg-zinc-700/70 transition-colors">
            <img src={course.imageUrl} alt={course.title} className="w-20 h-20 rounded-md object-cover" />
            <div className="flex-1">
              <h4 className="font-semibold text-slate-100 text-sm mb-0.5">{course.title}</h4>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                <div className="flex items-center">
                  <Tag size={12} className="mr-1" /> 
                  <span>{course.category}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>{course.durationMinutes} min</span>
                </div>
              </div>
               <button className="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center">
                 <PlayCircle size={14} className="mr-1"/>
                 Start Course
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
