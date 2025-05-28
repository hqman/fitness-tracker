
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GoalProgressRingProps {
  current: number;
  goal: number;
  unit: string;
}

const GoalProgressRing: React.FC<GoalProgressRingProps> = ({ current, goal, unit }) => {
  const progress = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  const data = [
    { name: 'Achieved', value: progress, color: '#2DD4BF' }, // Tailwind teal-400
    { name: 'Remaining', value: 100 - progress, color: '#3F3F46' }, // Tailwind zinc-700
  ];

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Today's Goal</h3>
      <div className="relative w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-teal-400">{Math.round(progress)}%</span>
          <span className="text-sm text-slate-400">{current} / {goal} {unit}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressRing;
