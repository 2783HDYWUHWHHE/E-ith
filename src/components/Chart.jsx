import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Custom Tooltip component for a premium glass style
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1e30]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-xl text-xs">
        <p className="text-white/40 mb-1 tracking-wider uppercase font-semibold">{label}</p>
        <p className="text-white font-bold text-sm">
          Value: <span className="text-cyan-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// 1. Big Dashboard Line Chart
export function BigLineChart({ data }) {
  const defaultData = data || [
    { name: 'JAN', value: 50 },
    { name: 'FEB', value: 150 },
    { name: 'MAR', value: 100 },
    { name: 'APR', value: 190 },
    { name: 'MAY', value: 130 },
    { name: 'JUN', value: 90 },
    { name: 'JUL', value: 150 },
    { name: 'AUG', value: 160 },
    { name: 'SEP', value: 120 },
    { name: 'OCT', value: 140 },
    { name: 'NOV', value: 190 },
    { name: 'DEC', value: 95 }
  ];

  return (
    <div className="w-full h-80 bg-[#16162a] border border-white/5 rounded-2xl p-6 shadow-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={defaultData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            domain={[0, 200]}
            axisLine={false} 
            tickLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontWeight: 500 }}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, stroke: '#ffffff', fill: '#16162a' }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#00c6ff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. SparkLine Area Chart for Stat Cards (Green/Red Gradients)
export function SparkLineChart({ data, strokeColor = '#22c55e', gradientId = 'greenGlow' }) {
  const defaultData = data || [
    { value: 400 },
    { value: 800 },
    { value: 600 },
    { value: 1000 },
    { value: 700 },
    { value: 1200 },
    { value: 1500 },
    { value: 1300 },
    { value: 1900 }
  ];

  return (
    <div className="w-full h-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={defaultData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <Tooltip 
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#1e1e30] border border-white/10 px-2 py-1 rounded shadow text-[10px] text-white font-bold">
                    {payload[0].value}
                  </div>
                );
              }
              return null;
            }} 
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. Email Statistics Bar Chart (Blue Gradient)
export function EmailBarChart({ data }) {
  const defaultData = data || [
    { name: 'M', value: 50 },
    { name: 'T', value: 80 },
    { name: 'W', value: 65 },
    { name: 'T', value: 120 },
    { name: 'F', value: 90 },
    { name: 'S', value: 55 },
    { name: 'S', value: 110 }
  ];

  return (
    <div className="w-full h-20">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={defaultData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#1e1e30] border border-white/10 px-2 py-1 rounded shadow text-[10px] text-white font-bold">
                    {payload[0].value}
                  </div>
                );
              }
              return null;
            }} 
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {defaultData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#blueBarGradient)`} 
              />
            ))}
          </Bar>
          <defs>
            <linearGradient id="blueBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00c6ff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0072ff" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
