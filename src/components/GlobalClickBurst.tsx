'use client';
import { useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  length: number;
  angle: number;
}

export default function GlobalClickBurst() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    let particles: Particle[] = [];
    let animId: number;
    let isDark = document.documentElement.classList.contains('dark');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnBurst = (x: number, y: number) => {
      const count = 8; // Number of lines in the burst
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.1); 
        const speed = 3 + Math.random() * 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          size: 2.5, // Line thickness
          length: 12 + Math.random() * 8, // Line length
          angle
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isDark = document.documentElement.classList.contains('dark');

      particles = particles.filter(p => p.life > 0);
      
      ctx.lineCap = 'round'; // Makes the lines rounded at the ends

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.life -= 0.035;

        const alpha = Math.max(0, p.life / p.maxLife);
        const currentLength = p.length * alpha; // Shrink as it fades
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(p.angle) * currentLength, p.y - Math.sin(p.angle) * currentLength);
        
        ctx.lineWidth = p.size;
        ctx.strokeStyle = isDark 
          ? `rgba(220, 220, 220, ${alpha})` 
          : `rgba(80, 80, 80, ${alpha})`;
        
        ctx.stroke();
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('click', (e) => spawnBurst(e.clientX, e.clientY));

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
