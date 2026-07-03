import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveDashboard() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: true, timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-full flex items-center gap-6 text-sm font-medium z-50 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Available for work
      </div>
      <div className="w-px h-4 bg-gray-300"></div>
      <div className="text-gray-600">📍 Guwahati, Assam</div>
      <div className="w-px h-4 bg-gray-300"></div>
      <div className="w-[85px] text-gray-600 tabular-nums">{time}</div>
    </motion.div>
  );
}