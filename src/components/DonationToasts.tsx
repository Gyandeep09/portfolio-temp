'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const donations = [
  { name: 'Arjun M.', amount: '₹150', time: '2 min ago', avatar: '☕' },
  { name: 'Priya S.', amount: '₹300', time: '8 min ago', avatar: '🌟' },
  { name: 'Rahul K.', amount: '$5', time: '15 min ago', avatar: '🚀' },
  { name: 'Anonymous', amount: '₹50', time: '22 min ago', avatar: '💙' },
  { name: 'Neha T.', amount: '$10', time: '1 hr ago', avatar: '✨' },
];

export default function DonationToasts() {
  const [queue, setQueue] = useState<typeof donations>([]);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= donations.length) return;
    const delay = shown === 0 ? 3000 : 6000;
    const id = setTimeout(() => {
      setQueue(q => [...q, donations[shown]]);
      setShown(n => n + 1);
    }, delay);
    return () => clearTimeout(id);
  }, [shown]);

  useEffect(() => {
    if (queue.length === 0) return;
    const id = setTimeout(() => {
      setQueue(q => q.slice(1));
    }, 4000);
    return () => clearTimeout(id);
  }, [queue]);

  return (
    <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-2 pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {queue.slice(-2).map((d, i) => (
          <motion.div
            key={`${d.name}-${i}`}
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-lg shadow-black/10 w-64 pointer-events-auto"
          >
            <span className="text-2xl shrink-0">{d.avatar}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                {d.name} bought a coffee!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{d.amount} · {d.time}</p>
            </div>
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="BMC"
              className="w-5 h-5 shrink-0 opacity-60"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
