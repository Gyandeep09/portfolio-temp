'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import lottie from 'lottie-web';

export const LightsaberIcon = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to('.ls-blue', { rotate: 25, transformOrigin: 'bottom left', duration: 0.6, ease: 'power2.inOut' }, 0)
        .to('.ls-red', { rotate: -25, transformOrigin: 'bottom right', duration: 0.6, ease: 'power2.inOut' }, 0)
        .to('.clash-spark', { scale: 1.5, opacity: 1, duration: 0.1, yoyo: true, repeat: 1 }, 0.5);
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="w-8 h-8 relative flex items-center justify-center">
      <div className="absolute w-full h-full">
        <div className="ls-blue absolute bottom-1 left-2 w-1 h-6 bg-blue-400 rounded-full shadow-[0_0_8px_2px_rgba(96,165,250,0.8)] origin-bottom-left rotate-12" />
        <div className="ls-red absolute bottom-1 right-2 w-1 h-6 bg-red-400 rounded-full shadow-[0_0_8px_2px_rgba(248,113,113,0.8)] origin-bottom-right -rotate-12" />
        <div className="clash-spark absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full blur-[2px] opacity-0" />
      </div>
    </div>
  );
};

export const PortalIcon = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/school.json'
    });
    return () => anim.destroy();
  }, []);

  return <div ref={container} className="w-10 h-10 flex items-center justify-center" />;
};

export const StorefrontIcon = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/trolley.json'
    });
    return () => anim.destroy();
  }, []);

  return <div ref={container} className="w-10 h-10 flex items-center justify-center" />;
};

export const DocumentIcon = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/pencil.json'
    });
    return () => anim.destroy();
  }, []);

  return <div ref={container} className="w-10 h-10 flex items-center justify-center" />;
};
