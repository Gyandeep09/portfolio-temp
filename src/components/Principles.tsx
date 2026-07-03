'use client';
import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import lottie from 'lottie-web';
import AnimatedSectionHeader from './AnimatedSectionHeader';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function MobileIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <path d="M12 18h.01"/>
    </motion.svg>
  );
}

function BoltIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      animate={{ scale: [1, 1.15, 0.95, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </motion.svg>
  );
}

function ShieldIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </motion.svg>
  );
}

function ClockIcon() {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/clock.json'
    });
    return () => anim.destroy();
  }, []);

  return (
    <div 
      ref={container} 
      className="w-10 h-10 [&_path[stroke]]:!stroke-blue-500 [&_path[fill]:not([fill='none'])]:!fill-blue-500" 
    />
  );
}

function StarIcon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.12, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </motion.svg>
  );
}

const PRINCIPLES = [
  {
    Icon: MobileIcon,
    title: 'Mobile-First Viewport Inclusivity',
    desc: 'The mobile screen is an engineering priority, not an afterthought. I design every interface so that a user on a baseline device over a constrained rural network experiences the same fluid latency and premium UX as someone on a high-end desktop.',
    span: 'md:col-span-2',
    dark: false,
    accent: 'text-blue-500',
  },
  {
    Icon: BoltIcon,
    title: 'Purposeful Motion & Engaging UX',
    desc: 'Websites should feel alive, never stagnant. I combine GSAP timelines and Framer Motion to build interactive micro-moments that capture attention without performance debt.',
    span: 'md:col-span-1',
    dark: true,
    accent: 'text-blue-400',
  },
  {
    Icon: ShieldIcon,
    title: 'Defensive Architecture & Security',
    desc: 'Backed by APAC Cybersecurity Fund training (Google.org), I enforce strict rate-limiting, secure session handling, sandboxed databases, and defensive API sanitization by default — not as an afterthought.',
    span: 'md:col-span-1',
    dark: false,
    accent: 'text-blue-500',
  },
  {
    Icon: ClockIcon,
    title: 'Empirical & Real-World Problem Solving',
    desc: 'I study legacy, paper-heavy workflows that drain human effort and capital — then translate them into automated, digital-first products that save real time and money for real communities.',
    span: 'md:col-span-2',
    dark: false,
    accent: 'text-blue-500',
  },
  {
    Icon: StarIcon,
    title: 'Inspired Innovation & Unique Refinement',
    desc: 'Instead of cookie-cutter templates, I study existing architectures globally, extract structural inspiration, and aggressively optimize — adding missing capabilities like integrated tracking, receipt generation, and embedded dynamic tools.',
    span: 'md:col-span-3',
    dark: true,
    accent: 'text-blue-400',
  },
];

export default function Principles() {
  return (
    <section id="principles" className="w-full flex flex-col items-center relative py-20 pb-28 lg:pb-20">
      <div className="container text-center mb-14 z-10">
        <AnimatedSectionHeader title="PRINCIPLES" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-5xl mx-auto px-6 z-10"
      >
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={i}
            variants={cardVariant}
            className={`${p.span} rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
              p.dark
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50'
                : 'bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800'
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
            />

            <span className={`${p.accent} block relative z-10`}><p.Icon /></span>

            <div className="relative z-10">
              <h3 className={`text-base font-bold mb-2 tracking-tight ${p.dark ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {p.title}
              </h3>
              <p className={`text-xs leading-relaxed ${p.dark ? 'text-zinc-400' : 'text-gray-500 dark:text-gray-500'}`}>
                {p.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
