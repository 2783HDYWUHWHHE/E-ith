import React from 'react';
import StatCard from '../components/StatCard';
import { BigLineChart, SparkLineChart, EmailBarChart } from '../components/Chart';
import { 
  FaGlobe, 
  FaSyncAlt, 
  FaRegClock, 
  FaDollarSign, 
  FaBoxOpen, 
  FaUsers, 
  FaBullseye,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

export default function Dashboard() {
  // Mock data for the big line chart (JAN-DEC values)
  const bigChartData = [
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

  // Mock spark data
  const shippedProductsData = [
    { value: 60 }, { value: 80 }, { value: 75 }, { value: 70 }, { value: 85 }, { value: 90 }, { value: 110 }
  ];
  
  const allProductsData = [
    { value: 10 }, { value: 30 }, { value: 25 }, { value: 45 }, { value: 48 }, { value: 60 }, { value: 95 }
  ];

  const emailStatsData = [
    { name: 'M', value: 50 },
    { name: 'T', value: 80 },
    { name: 'W', value: 65 },
    { name: 'T', value: 120 },
    { name: 'F', value: 90 },
    { name: 'S', value: 55 },
    { name: 'S', value: 110 }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome / Summary Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h2>
          <p className="text-white/50 text-xs mt-1">Real-time indicators, sales tracking, and core business statistics.</p>
        </div>
        <div className="flex items-center space-x-2 text-[11px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/60">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          <span>System Live</span>
        </div>
      </div>

      {/* 1. Big Line Chart (JAN-DEC Overview) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/55">Annual Performance</h3>
          <span className="text-[10px] text-blue-400 font-semibold cursor-pointer hover:underline">View Full Report</span>
        </div>
        <BigLineChart data={bigChartData} />
      </div>

      {/* 2. Visual Sparkline Cards (Creative Tim style mockup row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Global Sales"
          value="Shipped Products"
          subtitle="Total output across all centers"
          icon={<FaGlobe className="w-4 h-4 text-red-400" />}
          glowColor="red"
          chart={<SparkLineChart data={shippedProductsData} strokeColor="#ef4444" gradientId="redGlow" />}
          footerText="Just Updated"
          footerIcon={<FaSyncAlt className="w-3 h-3 text-white/30 animate-spin-slow" />}
        />

        <StatCard
          title="2018 Sales"
          value="All products"
          subtitle="Cumulative growth in inventory"
          icon={<FaBullseye className="w-4 h-4 text-green-400" />}
          glowColor="green"
          chart={<SparkLineChart data={allProductsData} strokeColor="#22c55e" gradientId="greenGlow" />}
          footerText="Just Updated"
          footerIcon={<FaSyncAlt className="w-3 h-3 text-white/30 animate-spin-slow" />}
        />

        <StatCard
          title="Email Statistics"
          value="24 Hours Performance"
          subtitle="Campaign conversion & click rates"
          icon={<FaRegClock className="w-4 h-4 text-blue-400" />}
          glowColor="blue"
          chart={<EmailBarChart data={emailStatsData} />}
          footerText="Last 7 days"
          footerIcon={<FaRegClock className="w-3 h-3 text-white/30" />}
        />
      </div>

      {/* 3. Cards Section: [Sales][Products][HR] (as requested in text layout) */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/55">Core Business Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Sales Card */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase block mb-1">Sales Pillar</span>
                <h4 className="text-3xl font-extrabold text-white tracking-wide">$54,230</h4>
                <div className="flex items-center space-x-1 mt-2 text-xs text-green-400 font-semibold">
                  <FaArrowUp className="w-2.5 h-2.5" />
                  <span>+12.4%</span>
                  <span className="text-white/40 font-normal">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shadow-md">
                <FaDollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/50">
              <span>Target Achieved: 94.2%</span>
              <span>180 Transactions</span>
            </div>
          </div>

          {/* Products Card */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase block mb-1">Products Pillar</span>
                <h4 className="text-3xl font-extrabold text-white tracking-wide">1,842</h4>
                <div className="flex items-center space-x-1 mt-2 text-xs text-green-400 font-semibold">
                  <FaArrowUp className="w-2.5 h-2.5" />
                  <span>+3.2%</span>
                  <span className="text-white/40 font-normal">new entries</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400 shadow-md">
                <FaBoxOpen className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/50">
              <span>Low Stock Alerts: 3 items</span>
              <span>8 Categories</span>
            </div>
          </div>

          {/* HR Card */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-red-500 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase block mb-1">HR & Operations</span>
                <h4 className="text-3xl font-extrabold text-white tracking-wide">45 Staff</h4>
                <div className="flex items-center space-x-1 mt-2 text-xs text-red-400 font-semibold">
                  <FaArrowDown className="w-2.5 h-2.5" />
                  <span>-1.1%</span>
                  <span className="text-white/40 font-normal">turnover rate</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-400 shadow-md">
                <FaUsers className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/50">
              <span>Hiring Pipeline: 4 active</span>
              <span>Avg Tenancy: 2.4 yr</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
