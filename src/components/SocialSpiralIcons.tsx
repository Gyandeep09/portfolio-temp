'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    hoverColor: 'text-pink-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" /><path d="M16.5 7.5l0 .01" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    hoverColor: 'text-gray-900 dark:text-white',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 1.8 5.4 2.1 5.4 2.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 8.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    hoverColor: 'text-blue-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z"/>
        <path d="M8 11l0 5"/><path d="M8 8l0 .01"/>
        <path d="M12 16l0-5"/><path d="M16 16v-3a2 2 0 0 0-4 0"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919864874820',
    hoverColor: 'text-green-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9"/>
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
      </svg>
    ),
  },
];

const SPIRAL_PATH = "M12,12 C12,10 10,8 8,9 C6,10 6,13 8,14 C11,15 14,13 14,10 C14,6 10,4 7,5 C3,7 2,12 4,15 C6,19 12,20 16,18 C20,15 21,9 19,5";

function SpiralBurst({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
    >
      <motion.svg
        width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        className={color}
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <path d={SPIRAL_PATH} strokeDasharray="60" strokeDashoffset="60">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="0.4s" fill="freeze"/>
        </path>
      </motion.svg>
    </motion.div>
  );
}

export default function SocialSpiralIcons() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`relative flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors duration-200 ${hovered === s.label ? s.hoverColor : ''}`}
          onMouseEnter={() => setHovered(s.label)}
          onMouseLeave={() => setHovered(null)}
        >
          {s.icon}
          <AnimatePresence>
            {hovered === s.label && <SpiralBurst color={s.hoverColor} />}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}
