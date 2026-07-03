'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSectionHeader from './AnimatedSectionHeader';
import { PROJECTS } from '../data/projects';
import { TECH_ICON_MAP } from './TechStackIcons';
import StackPill from './StackPill';

const CORE_PROJECTS = PROJECTS.filter(p => p.category === 'core');


export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="w-full flex flex-col items-center relative py-20 pb-28 lg:pb-20">
      <div className="container text-center mb-4 z-10">
        <AnimatedSectionHeader title="PROJECTS" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl px-6 py-10 z-10 w-full">
        {CORE_PROJECTS.map((proj, idx) => {
          const Icon = proj.iconComponent;
          const isHov = hoveredIndex === idx;
          return (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {isHov && (
                  <motion.span
                    className="absolute -inset-3 rounded-[1.75rem] bg-blue-50 dark:bg-blue-900/20 -z-10"
                    layoutId="projectHoverBg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  />
                )}
              </AnimatePresence>

              <div
                className={`relative z-10 p-5 rounded-2xl flex flex-col gap-4 shadow-sm transition-all duration-250
                  bg-white dark:bg-zinc-900
                  ${isHov
                    ? 'border border-blue-400/40 dark:border-blue-500/40'
                    : 'border border-gray-100 dark:border-zinc-800'
                  }`}
              >

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Icon />
                    <div>
                      <h4 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5 font-mono uppercase tracking-wider">{proj.type}</p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider border bg-transparent"
                    style={{
                      borderColor: isHov ? 'rgba(59,130,246,0.4)' : '#e5e7eb',
                      color: isHov ? '#3b82f6' : '#9ca3af',
                    }}
                  >
                    {proj.tag}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {proj.desc}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-zinc-800/60">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.slice(0, 3).map(s => (
                      <StackPill key={s} tech={s} />
                    ))}
                    {proj.stack.length > 3 && (
                      <span className="text-[10px] font-mono text-gray-400 self-center">+{proj.stack.length - 3}</span>
                    )}
                  </div>

                  <a
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider transition-colors group/btn"
                    style={{ color: isHov ? '#3b82f6' : '#9ca3af' }}
                  >
                    Deep Dive
                    <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-2 z-10"
      >
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                     border border-gray-300 dark:border-zinc-700
                     text-xs font-mono uppercase tracking-widest
                     text-gray-700 dark:text-gray-300
                     hover:border-blue-500 dark:hover:border-blue-500
                     hover:text-blue-500 dark:hover:text-blue-400
                     bg-transparent transition-all duration-200"
        >
          View All Projects
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
