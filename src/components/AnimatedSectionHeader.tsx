'use client';
import { useState, useRef } from 'react';

interface Props {
  title: string;
  id?: string;
}

export default function AnimatedSectionHeader({ title, id }: Props) {
  const letters = title.split('');
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    timerRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 1200); // Guarantees the animation plays out fully then resets
  };

  return (
    <div id={id} className="container text-center text-5xl sm:text-7xl xl:text-8xl">
      <ul className="nav-ul">
        <li className="nav-li" onMouseEnter={handleMouseEnter}>
          <span className={`nav-a ${isPlaying ? 'is-playing' : ''}`}>
            <span className="nav-a-letters">
              {letters.map((ch, i) => (
                <span key={i} className="nav-a-letter">
                  {ch === ' ' ? '\u00a0' : ch}
                </span>
              ))}
            </span>
            <span className="nav-a-stripes-wrapper">
              <span className="nav-a-stripe nav-a-stripe--yellow"> </span>
              <span className="nav-a-stripe nav-a-stripe--turquoise"> </span>
              <span className="nav-a-stripe nav-a-stripe--purple"> </span>
            </span>
            <span className="nav-a-letters-top">
              {letters.map((ch, i) => (
                <span key={`top-${i}`} className="nav-a-letter">
                  {ch === ' ' ? '\u00a0' : ch}
                </span>
              ))}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}
