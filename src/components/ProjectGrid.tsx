'use client';
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import AnimatedSectionHeader from './AnimatedSectionHeader';

const allProjects = [
  {
    title: 'Real-World Portal',
    url: '#',
    domain: 'github.com',
    icon: '🌐',
    color: '#10b981',
  },
  {
    title: 'Kinetic Portfolio',
    url: '#',
    domain: 'example.com',
    icon: '⚡',
    color: '#6366f1',
  },
  {
    title: 'Vite Dashboard',
    url: '#',
    domain: 'dashboard.example.com',
    icon: '📊',
    color: '#f59e0b',
  },
  {
    title: 'CLI Tool',
    url: '#',
    domain: 'npm.js',
    icon: '🖥️',
    color: '#ef4444',
  },
  {
    title: 'Chat App',
    url: '#',
    domain: 'chat.example.com',
    icon: '💬',
    color: '#3b82f6',
  },
  {
    title: 'E-Commerce Store',
    url: '#',
    domain: 'shop.example.com',
    icon: '🛒',
    color: '#8b5cf6',
  },
  {
    title: 'Blog Platform',
    url: '#',
    domain: 'blog.example.com',
    icon: '✍️',
    color: '#ec4899',
  },
  {
    title: 'API Toolkit',
    url: '#',
    domain: 'api.example.com',
    icon: '🔧',
    color: '#14b8a6',
  },
  {
    title: 'Auth Service',
    url: '#',
    domain: 'auth.example.com',
    icon: '🔐',
    color: '#f97316',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const card: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
};

function ProjectCard({ project }: { project: typeof allProjects[0] }) {
  return (
    <motion.button
      variants={card}
      type="button"
      className="group relative transition-all ease-in-out cursor-pointer text-left"
    >
      <div className="flex gap-4 py-5 px-6 rounded-3xl h-28 items-center bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-600 relative top-0 left-0 group-hover:-top-2 group-hover:-left-2 transition-all ease-in-out duration-200">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: project.color + '22' }}
        >
          {project.icon}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">{project.title}</p>
          <p className="text-xs text-blue-500 truncate">{project.domain}</p>
        </div>
      </div>

      <div className="absolute h-full w-full left-0 top-0 bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-600 -z-10 rounded-3xl transition-all ease-in-out group-hover:bg-[#ffd074]" />
      <div className="absolute h-full w-full left-1.5 top-1.5 group-hover:left-2 group-hover:top-2 bg-zinc-300 dark:bg-slate-700 ring-1 ring-zinc-400 dark:ring-slate-600 group-hover:ring-black dark:group-hover:ring-slate-400 -z-20 rounded-3xl transition-all ease-in-out group-hover:bg-[#b087ff] shadow-md group-hover:shadow-lg" />
    </motion.button>
  );
}

export default function ProjectGrid() {
  const [visible, setVisible] = useState(6);

  return (
    <section className="w-full flex flex-col items-center py-10">
      <AnimatedSectionHeader title="Projects" id="projects" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 w-full max-w-6xl px-4"
      >
        {allProjects.slice(0, visible).map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </motion.div>

      {visible < allProjects.length && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVisible(v => Math.min(v + 3, allProjects.length))}
          className="mt-14 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md hover:shadow-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>
          </svg>
          Load More
        </motion.button>
      )}
    </section>
  );
}
