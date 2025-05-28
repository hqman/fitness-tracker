
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendLineChartProps {
  data: { date: string; value: number; [key: string]: any }[]; // Allow extra keys for multiple lines if needed
  dataKey: string;
  xAxisKey: string;
  period: 'week' | 'month' | 'year';
}

const TrendLineChart: React.FC<TrendLineChartProps> = ({ data, dataKey, xAxisKey, period }) => {
  if (!data || data.length === 0) {
    return (
       <div className="bg-zinc-800 p-4 rounded-xl shadow text-center text-slate-400 h-64 flex items-center justify-center">
        <p>No trend data available.</p>
      </div>
    );
  }
  
  let yAxisLabel = "Value";
  if (dataKey === "value") yAxisLabel = "Calories Burned"; // Example specific label based on dataKey
  // Could also pass a specific label prop.

  let chartTitle = "Activity Trend";
  if (period === "week") chartTitle = "Weekly Trend (Calories)";
  else if (period === "month") chartTitle = "Monthly Activity Totals (Calories by Type)";
  else if (period === "year") chartTitle = "Yearly Activity Totals (Calories by Type)";


  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3 text-slate-200">{chartTitle}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5, right: 30, left: 0, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#4A5568" />
            <XAxis 
                dataKey={xAxisKey} 
                tick={{ fill: '#A0AEC0', fontSize: 12 }} 
                stroke="#4A5568"
            />
            <YAxis  
                tick={{ fill: '#A0AEC0', fontSize: 12 }} 
                stroke="#4A5568"
                label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#A0AEC0', fontSize: 12, dx: -5 }}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#cbd5e1' }}
                labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="url(#colorGradient)" // Apply gradient stroke
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2, fill: '#2DD4BF' }} 
                dot={{ stroke: '#2DD4BF', strokeWidth: 1, r:3, fill: '#2DD4BF' }}
            />
             <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.8}/> {/* Teal */}
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.8}/> {/* Sky Blue */}
                </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendLineChart;
