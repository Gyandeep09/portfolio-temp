'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOCIALS = [
  {
    name: 'GitHub',
    url: '#',
    color: '#e2e8f0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: '#',
    color: '#60a5fa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z"/><path d="M8 11l0 5"/><path d="M8 8l0 .01"/><path d="M12 16l0-5"/><path d="M16 16v-3a2 2 0 0 0-4 0"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: '#',
    color: '#f472b6',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M16.5 7.5l0 .01"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919864874820',
    color: '#4ade80',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
      </svg>
    ),
  },
];

export default function MobileSocialFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-[9997] md:hidden flex flex-col items-center gap-3">
      <AnimatePresence>
        {open && SOCIALS.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            initial={{ opacity: 0, y: 16, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.6 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 28,
              delay: open ? (SOCIALS.length - 1 - i) * 0.04 : i * 0.04,
            }}
            whileTap={{ scale: 0.88 }}
            className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg"
            style={{
              background: 'rgba(13,17,23,0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${s.color}33`,
              color: s.color,
              boxShadow: `0 4px 20px ${s.color}22`,
            }}
          >
            {s.icon}
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
        style={{
          background: open ? 'rgba(59,130,246,0.2)' : 'rgba(13,17,23,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: open ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.1)',
          color: open ? '#60a5fa' : 'rgba(156,163,175,0.8)',
          boxShadow: open ? '0 0 20px rgba(59,130,246,0.25)' : '0 8px 32px rgba(0,0,0,0.4)',
        }}
        aria-label={open ? 'Close social links' : 'Open social links'}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
