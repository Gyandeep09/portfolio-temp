'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Lottie from 'lottie-react';

const DEHINGIA_LANGS = [
  'DEHINGIA',      // English (original spelling)
  'দিহিঙ্গীয়া',    // Assamese (kept as is)
  'दिहिंगिया',     // Hindi (Dihingia)
  'ディヒンギア',  // Japanese (Dihingia)
  'Дихингиа',      // Russian (Dihingia)
  '디힌기아',      // Korean (Dihingia)
  '迪欣吉亚',      // Chinese (Dihingia)
  'ดิฮิงเกีย',     // Thai (Dihingia)
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function KineticHero() {
  const [langIndex, setLangIndex] = useState(0);
  const [waveLottie, setWaveLottie] = useState<any>(null);

  useEffect(() => {
    fetch('https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b_1f3fc/lottie.json')
      .then(res => res.json())
      .then(setWaveLottie)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const id = setInterval(() =>
      setLangIndex(prev => (prev + 1) % DEHINGIA_LANGS.length), 2500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="w-full flex items-center justify-center max-w-7xl mx-auto px-6 md:px-12 xl:px-8 min-h-[88vh] md:min-h-[82vh] relative mt-16 md:mt-10 pb-28 md:pb-0"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 xl:gap-20">

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="show"
          className="w-full md:w-5/12 lg:w-4/12 flex justify-center order-2 md:order-1"
        >
          <div className="group relative transition-all ease-in-out duration-300 block w-full max-w-[280px] sm:max-w-xs md:max-w-[320px] lg:max-w-sm aspect-square cursor-pointer">
            <div className="relative w-full h-full">
              <div className="w-full h-full bg-white dark:bg-zinc-900 ring-1 ring-black/10 dark:ring-white/20 relative top-0 left-0 group-hover:-top-3 group-hover:-left-3 transition-all ease-in-out duration-300 z-10 rounded-3xl p-3 shadow-sm">
                <img
                  src="/me.png"
                  alt="Portfolio Owner"
                  className="w-full h-full object-cover rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                />
              </div>
              <div className="absolute h-full w-full left-0 top-0 bg-white dark:bg-zinc-800 ring-1 ring-black/10 dark:ring-white/20 -z-10 rounded-3xl transition-all ease-in-out duration-300 group-hover:bg-[#3b82f6] dark:group-hover:bg-[#3b82f6]" />
              <div className="absolute h-full w-full left-2 top-2 group-hover:left-4 group-hover:top-4 bg-zinc-400 dark:bg-zinc-700 ring-1 ring-zinc-400 dark:ring-zinc-600 group-hover:ring-black dark:group-hover:ring-white/50 -z-20 rounded-3xl transition-all ease-in-out duration-300 group-hover:bg-[#1d4ed8] dark:group-hover:bg-[#1e40af] shadow-md group-hover:shadow-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:w-7/12 lg:w-8/12 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-500 dark:text-gray-400 font-medium">
              Hi! I am
            </p>
            {waveLottie && (
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 -mt-2">
                <Lottie animationData={waveLottie} loop={true} />
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap items-center md:items-start gap-x-4 gap-y-2 text-[11vw] sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-black dark:text-white uppercase leading-none mb-2"
          >
            <span>OWNER</span>
            <div className="text-[10vw] sm:text-5xl lg:text-6xl xl:text-7xl text-gray-400 dark:text-[#42b983] flex items-center justify-center md:justify-start min-w-0 w-full sm:min-w-[320px] lg:min-w-[400px] max-w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={langIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {DEHINGIA_LANGS[langIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-2xl md:text-3xl text-gray-400 dark:text-gray-500 mb-4 font-mono tracking-widest"
          >
            𓆝 𓆟 𓆞 𓆟 𓆝
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-5">
            {['Full-Stack Developer', 'UI-UX Engineer'].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                           border border-gray-200 dark:border-slate-700
                           text-gray-500 dark:text-gray-400
                           bg-gray-50 dark:bg-white/5"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
          >
            I build{' '}
            <span className="font-semibold text-black dark:text-white">
              high-performance, architecture-first
            </span>{' '}
            web systems that bridge complex backend logic with immersive, kinetic UIs.
            Specializing in{' '}
            <span className="font-semibold text-black dark:text-white">
              mobile-first engineering
            </span>{' '}
            and custom motion graphics.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             border border-green-200 dark:border-green-800/60
                             bg-green-50 dark:bg-green-900/20
                             text-xs font-semibold text-green-700 dark:text-green-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for Select Projects & Collaborations
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
