'use client';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = ["Creative Developer", "Full-Stack Engineer", "Digital Craftsman"];

export default function FigmaLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "enter" | "exit" | "done">("counting");
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setVisible(false);
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const duration = 2600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      const p = Math.floor(eased * 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => setPhase("enter"), 600);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (phase !== "enter") return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, [phase]);

  const handleEnter = () => {
    setPhase("exit");
    sessionStorage.setItem('introPlayed', 'true');
    document.documentElement.removeAttribute('data-loading');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    setTimeout(() => setVisible(false), 900);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        data-loader="true"
        className="fixed inset-0"
        style={{ zIndex: 99999, background: "#0a0f1c" }}
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {["top-5 left-5 border-l border-t", "top-5 right-5 border-r border-t",
          "bottom-5 left-5 border-l border-b", "bottom-5 right-5 border-r border-b"
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 ${cls}`}
            style={{ borderColor: "rgba(59,130,246,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          />
        ))}

        <motion.div
          className="absolute inset-x-0 pointer-events-none"
          style={{ height: 1, background: "rgba(59,130,246,0.08)", top: 0 }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">

          <motion.span
            className="font-mono tabular-nums"
            style={{
              fontSize: "clamp(4rem, 12vw, 9rem)",
              fontWeight: 700,
              color: "#3b82f6",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontFamily: "'DM Mono', monospace",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {String(progress).padStart(3, "0")}
          </motion.span>

          <motion.div
            style={{ width: 200, height: 1, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#3b82f6",
                transition: "width 0.07s linear",
              }}
            />
          </motion.div>

          <motion.div
            className="h-5 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "enter" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              key={roleIndex}
              className="font-mono text-[10px] uppercase tracking-[0.55em] text-center"
              style={{ color: "rgba(240,237,232,0.3)", fontFamily: "'DM Mono', monospace" }}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {ROLES[roleIndex]}
            </motion.p>
          </motion.div>

          <motion.button
            onClick={handleEnter}
            className="relative group mt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "enter" ? 1 : 0, y: phase === "enter" ? 0 : 8 }}
            transition={{ duration: 0.6 }}
            style={{ cursor: "pointer" }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "#3b82f6", filter: "blur(18px)" }}
              animate={{ opacity: [0.08, 0.22, 0.08], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="relative font-mono text-[10px] uppercase tracking-[0.45em] px-9 py-3.5 rounded-full border inline-flex items-center gap-2 transition-all duration-300"
              style={{
                color: "#60a5fa",
                borderColor: "rgba(59,130,246,0.3)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Enter Portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {["Design", "Code", "Motion"].map(tag => (
            <span
              key={tag}
              className="font-mono text-[9px] uppercase tracking-[0.45em]"
              style={{ color: "rgba(240,237,232,0.12)", fontFamily: "'DM Mono', monospace" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
