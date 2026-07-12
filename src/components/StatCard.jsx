import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  change, 
  chart, 
  footerText, 
  footerIcon, 
  glowColor 
}) {
  
  // Decide the box-shadow glow based on the props
  const getGlowClass = () => {
    switch (glowColor) {
      case 'red':
        return 'card-glow-red border-red-500/10 hover:border-red-500/25';
      case 'green':
        return 'card-glow-green border-green-500/10 hover:border-green-500/25';
      case 'blue':
        return 'card-glow-blue border-blue-500/10 hover:border-blue-500/25';
      default:
        return 'hover:border-white/10';
    }
  };

  return (
    <div className={`glass-card rounded-2xl flex flex-col ${getGlowClass()}`}>
      {/* Content Area */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        
        {/* Card Header Info */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase block mb-1">
              {title}
            </span>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              {value}
            </h3>
            {subtitle && (
              <span className="text-white/60 text-xs mt-1 block">
                {subtitle}
              </span>
            )}
          </div>
          
          {icon && (
            <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 shadow-inner">
              {icon}
            </div>
          )}
        </div>

        {/* Embedded Sparkline Chart or Spark Stat */}
        {chart ? (
          <div className="mt-4 w-full min-h-[70px] flex items-end">
            {chart}
          </div>
        ) : (
          change && (
            <div className="mt-4 flex items-center space-x-2 text-xs">
              <span className={`font-semibold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {change}
              </span>
              <span className="text-white/40">vs last month</span>
            </div>
          )
        )}
      </div>

      {/* Footer Area */}
      {footerText && (
        <div className="px-6 py-3 bg-[#17182b]/35 border-t border-white/5 flex items-center space-x-2 text-[10px] text-white/50 tracking-wider">
          {footerIcon || <FaSyncAlt className="w-3 h-3 text-white/30" />}
          <span>{footerText}</span>
        </div>
      )}
    </div>
  );
}
