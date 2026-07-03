'use client';
import { useEffect, useState } from 'react';

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const s = time.getSeconds();
  const m = time.getMinutes();
  const raw = time.getHours();
  const h12 = raw % 12 || 12;
  const ampm = raw < 12 ? 'am' : 'pm';
  const hrDeg  = h12 * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;

  const timeStr = `${pad(h12)}:${pad(m)}`;
  const dateStr = time.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

  return (
    <div className="hidden sm:flex items-center gap-2.5 select-none" aria-label="Current time">
      <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0 text-gray-500 dark:text-gray-400">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5"/>
        <line
          x1="12" y1="12"
          x2={12 + 5 * Math.sin((hrDeg  * Math.PI) / 180)}
          y2={12 - 5 * Math.cos((hrDeg  * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
        />
        <line
          x1="12" y1="12"
          x2={12 + 7.5 * Math.sin((minDeg * Math.PI) / 180)}
          y2={12 - 7.5 * Math.cos((minDeg * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        />
        <line
          x1="12" y1="12"
          x2={12 + 8.5 * Math.sin((secDeg * Math.PI) / 180)}
          y2={12 - 8.5 * Math.cos((secDeg * Math.PI) / 180)}
          stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
      </svg>

      <div className="flex items-end gap-0.5 leading-none">
        <span className="font-mono font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
          {timeStr}
        </span>
        <span className="font-mono text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 pb-0.5">
          {ampm}
        </span>
        <span className="font-mono text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 pb-0.5 ml-1">
          {dateStr}
        </span>
      </div>
    </div>
  );
}
