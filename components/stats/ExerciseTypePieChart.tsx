
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExerciseActivity } from '../../types';

interface ExerciseTypePieChartProps {
  data: { name: ExerciseActivity | string; value: number }[];
}

const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Green (Teal-ish)
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#AF19FF', // Purple
  '#FF19A3', // Pink
  '#19D4FF', // Light Blue
  '#B2FF19', // Lime Green
];


const ExerciseTypePieChart: React.FC<ExerciseTypePieChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-zinc-800 p-4 rounded-xl shadow text-center text-slate-400 h-64 flex items-center justify-center">
        <p>No activity data available for pie chart.</p>
      </div>
    );
  }
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent * 100 < 5) return null; // Don't render label for tiny slices

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };


  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Exercise Distribution</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#cbd5e1' }}
             />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExerciseTypePieChart;
