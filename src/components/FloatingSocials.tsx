'use client';
import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const SOCIALS = [
  {
    name: 'GitHub',
    url: '#',
    icon: (
      <svg className="group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: (
      <svg className="group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0-5" /><path d="M16 16v-3a2 2 0 0 0-4 0" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: '#',
    icon: (
      <svg className="group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" /><path d="M16.5 7.5l0 .01" />
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919864874820',
    icon: (
      <svg className="group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    )
  }
];

const ICON_GAP = 44;          // px between icon centres in a row
const COL_GAP  = 52;          // px between icon centres in the vertical column

const T_H      = 320;         // scroll-px for G's full horizontal travel
const T_V      = 260;         // scroll-px for any icon to drop to stackY
const X_LEAD   = 0.62;        // X must be this fraction done before Y starts falling

const B_STG    = 20;          // scroll-px stagger for pre-drop and X-sweep
const B_V      = 140;         // scroll-px for shared Y-drop to footer level
const B_H      = 200;         // scroll-px for X to sweep left to footer position
const B_Y_LEAD = 0.7;         // fraction of Y done before X starts

export default function FloatingSocials() {
  const { scrollY } = useScroll();
  const [dims, setDims] = useState({
    anchorLeft: 0, anchorTop: 0,
    footerLeft: 0, footerTop: 0,   // footerTop = absolute DOCUMENT Y
    vw: 1440, vh: 800, maxScroll: 4000,
  });

  useEffect(() => {
    const update = () => {
      const sy = window.scrollY;
      const tR = document.getElementById('social-anchor-top')?.getBoundingClientRect();
      const bR = document.getElementById('social-anchor-bottom')?.getBoundingClientRect();
      setDims({
        anchorLeft: tR ? tR.left         : window.innerWidth - 200,
        anchorTop:  tR ? tR.top          : 20,
        footerLeft: bR ? bR.left         : window.innerWidth / 2 - 80,
        footerTop:  bR ? bR.top + sy     : document.body.scrollHeight - 100,
        vw:  window.innerWidth,
        vh:  window.innerHeight,
        maxScroll: Math.max(1, document.body.scrollHeight - window.innerHeight),
      });
    };
    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => { window.removeEventListener('resize', update); ro.disconnect(); };
  }, []);

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-[100] overflow-visible">
      {SOCIALS.map((s, i) => (
        <TrainIcon key={s.name} s={s} i={i} scrollY={scrollY} dims={dims} />
      ))}
    </div>
  );
}

function TrainIcon({ s, i, scrollY, dims }: any) {
  const rightX = dims.vw - 56;

  const trackLen = Math.max(ICON_GAP * 4 + 10, rightX - dims.anchorLeft);

  const oneGapTime = T_H * ICON_GAP / trackLen;

  const topDelay = (3 - i) * oneGapTime;

  const topDist = Math.max(2, trackLen - i * ICON_GAP);

  const topXDur = T_H * topDist / trackLen;

  const tXa = Math.max(0.5, topDelay);       // X starts (hold before this)
  const tXb = topDelay + topXDur;             // X reaches rightX
  const tYa = topDelay + topXDur * X_LEAD;   // Y starts falling (before X finishes = curve)
  const tYb = tXb + T_V;                      // Y reaches stackY

  const botStartW = dims.maxScroll - 3 * B_STG - B_V * B_Y_LEAD - B_H;

  const bYa = botStartW + (3 - i) * B_STG;
  const bYb = bYa + B_V;

  const bXa = bYa + B_V * B_Y_LEAD;
  const bXb = Math.min(dims.maxScroll, bXa + B_H);

  const startX  = dims.anchorLeft + i * ICON_GAP;
  const headerY = dims.anchorTop;

  const stackY  = dims.vh * 0.38 + i * COL_GAP;       // this icon's own column Y
  const stackW  = dims.vh * 0.38 + 3 * COL_GAP;       // W's Y = the bottom-right corner

  const footerX = dims.footerLeft + 19 + (3 - i) * ICON_GAP;

  const fVY_bYb = dims.footerTop - bYb;
  const fVY_max = dims.footerTop - dims.maxScroll;

  const rawX = useTransform(
    scrollY,
    mono([0, tXa, tXb, bXa, bXb, dims.maxScroll + 100]),
    [startX, startX, rightX, rightX, footerX, footerX]
  );

  const rawY = useTransform(
    scrollY,
    mono([0, tYa, tYb, botStartW, bYa, bYb, dims.maxScroll]),
    [headerY, headerY, stackY, stackY, stackW, fVY_bYb, fVY_max]
  );

  const bgOpacity = useTransform(
    scrollY,
    mono([tXa, tXb, dims.maxScroll + 100]),
    [0, 1, 1]
  );

  return (
    <motion.a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: rawX, y: rawY }}
      className="absolute top-0 left-0 w-10 h-10 flex items-center justify-center pointer-events-auto cursor-pointer group"
      aria-label={s.name}
    >
      <div className="relative z-10 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
        {s.icon}
      </div>
    </motion.a>
  );
}

/**
 * Ensures the keyframe INPUT array is strictly monotonically increasing.
 * Framer Motion requires this — equal or decreasing values cause crashes.
 */
function mono(arr: number[]): number[] {
  return arr.reduce<number[]>((acc, v, i) => {
    acc.push(i === 0 ? v : Math.max(acc[i - 1] + 0.5, v));
    return acc;
  }, []);
}
