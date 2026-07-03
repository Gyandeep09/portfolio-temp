'use client';
import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="hidden md:flex w-32 h-8" />;

  const hours = time.getHours() % 12 || 12;
  const mins = time.getMinutes();
  const secs = time.getSeconds();
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours}:${mins.toString().padStart(2, '0')}`;
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const hourAngle = (hours % 12) * 30 + mins * 0.5;
  const minAngle = mins * 6;
  const secAngle = secs * 6;

  return (
    <div className="hidden md:flex justify-center items-center gap-2 cursor-default select-none">
      <svg width="28" height="28" viewBox="0 0 28 28" className="text-[var(--color-text-34)] dark:text-gray-200">
        <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <line
          x1="14" y1="14"
          x2={14 + 5 * Math.sin((hourAngle * Math.PI) / 180)}
          y2={14 - 5 * Math.cos((hourAngle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        />
        <line
          x1="14" y1="14"
          x2={14 + 7 * Math.sin((minAngle * Math.PI) / 180)}
          y2={14 - 7 * Math.cos((minAngle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
        />
        <line
          x1="14" y1="14"
          x2={14 + 8 * Math.sin((secAngle * Math.PI) / 180)}
          y2={14 - 8 * Math.cos((secAngle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.5"
        />
        <circle cx="14" cy="14" r="1.2" fill="currentColor" />
      </svg>
      <div className="flex flex-col text-[var(--color-text-34)] dark:text-gray-200">
        <div className="flex items-baseline gap-1">
          <p className="text-lg font-medium tracking-tight tabular-nums leading-none">{formattedTime}</p>
          <p className="text-[10px] font-bold leading-none">{ampm}</p>
        </div>
        <p className="text-[10px] font-medium leading-none opacity-60 mt-0.5">{formattedDate}</p>
      </div>
    </div>
  );
}
