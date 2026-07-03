'use client';
import { useRef, useId } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSectionHeader from './AnimatedSectionHeader';
import { EXPERIENCES, type Experience as ExpType } from '../data/experience';

function TimelineItem({ exp, index }: { exp: ExpType; index: number }) {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start center', 'end center'],
  });

  const dotGlow = useTransform(
    scrollYProgress,
    [0, 0.15],
    ['0 0 0 0 rgba(59,130,246,0)', '0 0 20px 6px rgba(59,130,246,0.7)']
  );
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col lg:flex-row items-start lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
    >
      <motion.div
        style={{ boxShadow: dotGlow }}
        className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 mt-1.5 lg:mt-0 w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-500 z-10"
      />

      <div className={`pl-12 lg:pl-0 lg:ml-0 lg:w-1/2 ${isEven ? 'lg:pl-16 text-left' : 'lg:pr-16 lg:text-right text-left'}`}>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-6 rounded-2xl group hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden">

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
          />

          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none ${isEven ? 'right-3 lg:left-3' : 'right-3'}`}
            style={{
              fontSize: 'clamp(64px, 10vw, 96px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(130,130,130,0.12)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.04em',
              zIndex: 0,
            }}
          >
            {exp.year}
          </div>

          <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'items-start'} gap-3 relative z-10`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{exp.company}</h3>
            <h4 className="text-sm font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500">{exp.role}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2 max-w-sm">{exp.desc}</p>

            <div className={`flex flex-wrap gap-1.5 mt-2 ${isEven ? 'lg:justify-end' : 'justify-start'}`}>
              {exp.deepDive.skills.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold
                             border border-gray-200 dark:border-zinc-700
                             text-gray-500 dark:text-gray-500
                             bg-transparent"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const uid = useId();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="w-full flex flex-col items-center py-24 relative overflow-hidden">
      <div className="container text-center mb-20 z-10">
        <AnimatedSectionHeader title="EXPERIENCE" />
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="absolute left-[28px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-zinc-800">
          <motion.div
            key={uid}
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-blue-500/70 to-blue-700/60 rounded-full origin-top"
          />
        </div>

        <div className="relative flex flex-col gap-14 lg:gap-20">
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 z-10"
      >
        <a
          href="/experience"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                     border border-gray-300 dark:border-zinc-700
                     text-xs font-mono uppercase tracking-widest
                     text-gray-600 dark:text-gray-400
                     hover:border-blue-500 dark:hover:border-blue-500
                     hover:text-blue-500 dark:hover:text-blue-400
                     bg-transparent transition-all duration-200"
        >
          View All Engagements
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
