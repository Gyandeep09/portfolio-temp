'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  {
    label: 'Home',
    section: 'home',
    href: '/#home',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'About',
    section: 'about',
    href: '/#about',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: 'Experience',
    section: 'experience',
    href: '/experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    label: 'Projects',
    section: 'projects',
    href: '/projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: 'Principles',
    section: 'principles',
    href: '/#principles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

export default function MobileNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/experience')) { setActive('experience'); return; }
    if (path.includes('/projects')) { setActive('projects'); return; }

    const sections = NAV_ITEMS.map(n => n.section);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.4 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9998] md:hidden"
      aria-label="Mobile navigation"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full shadow-2xl"
        style={{
          background: 'rgba(13,17,23,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.section;
          return (
            <motion.a
              key={item.section}
              href={item.href}
              onClick={(e) => {
                setActive(item.section);
                if (item.href.startsWith('/#') && window.location.pathname === '/') {
                  const targetId = item.href.split('#')[1];
                  const targetEl = document.getElementById(targetId);
                  if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', item.href);
                  }
                }
              }}
              whileTap={{ scale: 0.88 }}
              className="relative flex flex-col items-center justify-center rounded-full transition-all duration-300"
              style={{ width: 48, height: 48 }}
              aria-label={item.label}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="mobilNavActive"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.3)' }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <motion.span
                animate={{ color: isActive ? '#60a5fa' : 'rgba(156,163,175,0.7)', scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {item.icon}
              </motion.span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}
