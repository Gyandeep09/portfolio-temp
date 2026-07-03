'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  opacity: number; targetOpacity: number;
  size: number; life: number; maxLife: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const MAX_PARTICLES = 35;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      opacity: 0,
      targetOpacity: 0.4 + Math.random() * 0.5,
      size: 1 + Math.random() * 1.5,
      life: 0,
      maxLife: 180 + Math.random() * 240,
    });

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger initial state
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = Math.min(p.opacity + 0.02, p.targetOpacity * (progress / 0.2));
        } else if (progress > 0.8) {
          p.opacity = Math.max(0, p.targetOpacity * ((1 - progress) / 0.2));
        } else {
          p.opacity = p.targetOpacity;
        }

        if (p.life >= p.maxLife) {
          Object.assign(p, spawn(), { life: 0 });
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${p.opacity})`   // slate-300 for dark
          : `rgba(100, 116, 139, ${p.opacity * 0.5})`; // slate-500 for light
        ctx.shadowBlur = 6;
        ctx.shadowColor = isDark
          ? `rgba(148, 163, 184, ${p.opacity * 0.8})`
          : `rgba(100, 116, 139, ${p.opacity * 0.3})`;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ opacity: 1 }}
      />
    </>
  );
}
