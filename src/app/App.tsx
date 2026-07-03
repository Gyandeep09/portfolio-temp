import { useState, useEffect } from "react";
import { motion } from "motion/react";

const NAME = "Your Name";
const ROLES = ["Creative Developer", "UI Designer", "Digital Craftsman"];

export default function App() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "reveal" | "enter" | "exit" | "done">("counting");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const duration = 2400;
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
        setTimeout(() => setPhase("reveal"), 400);
        setTimeout(() => setPhase("enter"), 2000);
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
    setTimeout(() => setPhase("done"), 1000);
  };

  const letters = NAME.split("");

  return (
    <div className="size-full relative overflow-hidden" style={{ background: "#080808" }}>
      <div className="size-full flex flex-col items-center justify-center gap-4">
        <p
          className="font-mono text-xs tracking-[0.5em] uppercase"
          style={{ color: "rgba(240,237,232,0.2)", fontFamily: "'DM Mono', monospace" }}
        >
          Welcome to my portfolio
        </p>
        <h1
          className="font-bold text-4xl"
          style={{ color: "#f0ede8", fontFamily: "'Fraunces', serif" }}
        >
          {NAME}
        </h1>
      </div>

      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        style={{ background: "#080808" }}
        animate={phase === "exit" || phase === "done" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (phase === "exit") setPhase("done");
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {(["top-6 left-6 border-l border-t", "top-6 right-6 border-r border-t",
           "bottom-6 left-6 border-l border-b", "bottom-6 right-6 border-r border-b"] as const
        ).map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-9 h-9 ${cls}`}
            style={{ borderColor: "rgba(232,255,0,0.2)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
          />
        ))}

        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(240,237,232,0.2)", fontFamily: "'DM Mono', monospace" }}>
            Portfolio
          </span>
          <span style={{ color: "rgba(232,255,0,0.35)", fontSize: 9 }}>◆</span>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(240,237,232,0.2)", fontFamily: "'DM Mono', monospace" }}>
            2025
          </span>
        </motion.div>

        <motion.div
          className="font-mono text-sm tracking-[0.5em] tabular-nums mb-8"
          style={{ color: "#e8ff00", fontFamily: "'DM Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {String(progress).padStart(3, "0")}
        </motion.div>

        <motion.div
          className="relative mb-14 overflow-hidden rounded-full"
          style={{ width: 180, height: 1, background: "rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="absolute left-0 top-0 h-full transition-all duration-75"
            style={{ width: `${progress}%`, background: "#e8ff00" }}
          />
        </motion.div>

        <div className="overflow-hidden mb-3">
          <div className="flex flex-wrap justify-center" style={{ gap: "0.02em" }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(3rem, 9vw, 6.5rem)",
                  fontWeight: 800,
                  color: "#f0ede8",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  display: "inline-block",
                  width: letter === " " ? "0.27em" : undefined,
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  phase === "counting"
                    ? { y: "110%", opacity: 0 }
                    : { y: 0, opacity: 1 }
                }
                transition={{
                  duration: 0.72,
                  delay: phase === "counting" ? 0 : i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          className="h-5 overflow-hidden mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "reveal" || phase === "enter" ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p
            key={roleIndex}
            className="font-mono text-[10px] tracking-[0.55em] uppercase text-center"
            style={{ color: "rgba(240,237,232,0.35)", fontFamily: "'DM Mono', monospace" }}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            {ROLES[roleIndex]}
          </motion.p>
        </motion.div>

        <motion.button
          onClick={handleEnter}
          className="group font-mono text-[10px] tracking-[0.45em] uppercase relative"
          style={{ fontFamily: "'DM Mono', monospace" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === "enter" ? 1 : 0, y: phase === "enter" ? 0 : 10 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: "#e8ff00" }}
            animate={{ opacity: [0.06, 0.15, 0.06], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="relative px-8 py-3 border rounded-full inline-flex items-center gap-2 transition-all duration-300 group-hover:border-[#e8ff00]/60"
            style={{ color: "#e8ff00", borderColor: "rgba(232,255,0,0.25)" }}
          >
            Enter Portfolio
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </motion.button>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {["Design", "Code", "Motion"].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.45em] uppercase"
              style={{ color: "rgba(240,237,232,0.15)", fontFamily: "'DM Mono', monospace" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-x-0 pointer-events-none"
          style={{ height: 1, background: "rgba(232,255,0,0.05)" }}
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
