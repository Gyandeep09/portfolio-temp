'use client';
import { motion, type Variants } from 'framer-motion';

import AnimatedSectionHeader from './AnimatedSectionHeader';

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

const container: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export default function Biography() {
  return (
    <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 pb-24 lg:pb-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-12"
      >
        <div className="container text-center mb-4 z-10">
          <AnimatedSectionHeader title="ABOUT ME" />
        </div>

        <motion.div
          variants={item}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
            <p>
              I am{' '}
              <strong className="text-gray-900 dark:text-gray-100 font-semibold">Portfolio Owner</strong>,
              a Full-Stack Developer based in{' '}
              <strong className="text-gray-900 dark:text-gray-100 font-medium">Assam, India</strong>,
              with a recently completed Bachelor of Computer Applications (BCA) and an eye toward upcoming
              postgraduate studies (MCA).
            </p>
            <p>
              My approach to engineering is driven by{' '}
              <strong className="text-gray-900 dark:text-gray-100 font-medium">empirical observation</strong>.
              I focus on identifying systemic inefficiencies in legacy workflows — processes that drain human
              effort and resource capital — and translating them into optimized, digital-first products.
              I don't just build for functionality; I engineer with{' '}
              <strong className="text-gray-900 dark:text-gray-100 font-medium">technical empathy</strong>.
            </p>
            <p>
              Because accessibility dictates a product's success, my development pipeline enforces a strict{' '}
              <strong className="text-gray-900 dark:text-gray-100 font-medium">mobile-first priority</strong>.
              I believe a user navigating on a baseline smartphone over a constrained network should experience
              the exact same fluid latency and premium interface parity as a desktop powerhouse.
            </p>

            <a
              href="https://docs.google.com/presentation/d/1VUxaD_p42ecp2moNCXPA0gktCcFW6AhwbbjxX3vrQJ0/edit?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         border border-gray-300 dark:border-slate-700
                         text-sm font-medium text-gray-700 dark:text-gray-300
                         hover:bg-gray-50 dark:hover:bg-slate-800 transition-all
                         hover:border-gray-500 dark:hover:border-slate-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-[300px] sm:max-w-none mx-auto">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Tech Stack
            </p>
            
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
