'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window { onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void; }
}
interface SpotifyIFrameAPI {
  createController(el: HTMLElement, opts: Record<string, unknown>, cb: (c: SpotifyCtrl) => void): void;
}
interface SpotifyCtrl {
  play(): void; pause(): void; togglePlay(): void;
  loadUri(uri: string): void; destroy?(): void;
  addListener(event: string, cb: (e: { data: { isPaused: boolean } }) => void): void;
}

const PLAYLISTS = [
  {
    id: '37i9dQZF1DXcBWIGoYBM5M',   // Today's Top Hits  (official Spotify)
    type: 'playlist' as const,
    label: 'Trending',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-4-2-6-2-10"/>
        <path d="M12 2c0 4 2 6 2 10a4 4 0 0 1-8 0c0-4 2-6 2-10"/>
      </svg>
    ),
  },
  {
    id: '37i9dQZF1DXdPec7aLTmlC',   // Viral 50 – Global (Spotify Charts)
    type: 'playlist' as const,
    label: 'Viral',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    id: '37i9dQZF1DX0XUfTFmNBRM',   // Hot Hits Hindi (Spotify India)
    type: 'playlist' as const,
    label: 'India',
    icon: <span className="text-[10px] font-black tracking-tighter leading-none">IN</span>,
  },
  {
    id: '1SuHLN0SnuIZhOHnibF3fy',   // User's custom Zubeen Garg master playlist
    type: 'playlist' as const,
    label: 'ZG',
    icon: <span className="text-[9px] font-black tracking-tighter leading-none">ZG</span>,
  },
] as const;

export default function MusicPlayer() {
  const [open,      setOpen]      = useState(false);   // popup visible?
  const [isPlaying, setIsPlaying] = useState(false);   // is Spotify actually playing?
  const [active,    setActive]    = useState(0);       // active playlist index

  const embedRef   = useRef<HTMLDivElement>(null);     // div the iFrame API renders into
  const ctrlRef    = useRef<SpotifyCtrl | null>(null); // Spotify controller
  const apiRef     = useRef<SpotifyIFrameAPI | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Boot the Spotify iFrame API once ───────────────────────────────────── */
  useEffect(() => {
    const boot = (IFrameAPI: SpotifyIFrameAPI) => {
      apiRef.current = IFrameAPI;
      if (!embedRef.current) return;
      const { id, type } = PLAYLISTS[0];
      IFrameAPI.createController(
        embedRef.current,
        { uri: `spotify:${type}:${id}` },
        (ctrl) => {
          ctrlRef.current = ctrl;
          ctrl.addListener('playback_update', (e) => setIsPlaying(!e.data.isPaused));
        }
      );
    };

    window.onSpotifyIframeApiReady = boot;

    if (!document.getElementById('spotify-iframe-api')) {
      const s = document.createElement('script');
      s.id  = 'spotify-iframe-api';
      s.src = 'https://open.spotify.com/embed/iframe-api/v1';
      s.async = true;
      document.head.appendChild(s);
    }

    return () => { ctrlRef.current?.destroy?.(); };
  }, []);

  /* ── Hover: show / hide popup (CSS only — iframe NEVER unmounts) ─────────── */
  const onEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 250);
  };

  /* ── Icon click: play / pause the Spotify embed ─────────────────────────── */
  const handleIconClick = () => {
    ctrlRef.current?.togglePlay();
  };

  /* ── Playlist pill click: load a different playlist without reloading ─────  */
  const switchPlaylist = (idx: number) => {
    setActive(idx);
    const { id, type } = PLAYLISTS[idx];
    ctrlRef.current?.loadUri(`spotify:${type}:${id}`);
  };

  const { id, type } = PLAYLISTS[active];

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>

      <button
        id="music-player-btn"
        onClick={handleIconClick}
        className="play-button w-6 h-6 outline-hidden flex items-center justify-center
                   text-[var(--color-text-34)] dark:text-white cursor-pointer"
        aria-label={isPlaying ? 'Pause Spotify' : 'Play Spotify (hover for playlist)'}
      >
        {isPlaying ? (
          /* Equalizer — animates while something is ACTUALLY playing */
          <span className="flex gap-[2px] items-end h-[18px]" aria-label="Playing">
            {[1,2,3,4].map(i => (
              <motion.span key={i} className="w-[2px] rounded-full bg-current"
                animate={{ height: ['25%','100%','45%','75%','25%'] }}
                transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              />
            ))}
          </span>
        ) : (
          /* Music note */
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-6 h-6 stroke-1">
            <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M9 17v-13h10v9" /><path d="M9 8h10" />
            <path d="M17 17v5" /><path d="M21 17v5" />
          </svg>
        )}
      </button>

      {/* ── Popup ─────────────────────────────────────────────────────────────
          CSS show/hide only. The div inside (embedRef) is NEVER removed from
          the DOM, so the Spotify iframe keeps playing when the popup is hidden.
          ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-full mt-3 left-0 z-[200] w-[300px]"
        style={{
          opacity:       open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform:     `translateY(${open ? 0 : -8}px) scale(${open ? 1 : 0.96})`,
          transition:    'opacity 0.18s cubic-bezier(0.4,0,0.2,1), transform 0.18s cubic-bezier(0.4,0,0.2,1)',
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="rounded-2xl overflow-hidden
                        bg-white dark:bg-[#111]
                        border border-gray-200/80 dark:border-white/10
                        shadow-2xl shadow-black/10 dark:shadow-black/40">

          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="5" width="22" height="14" rx="2"/>
                <circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/>
                <path d="M10 12h4"/><path d="M5 19v2M19 19v2"/>
              </svg>
              <span className="text-sm font-semibold">Change Track</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" aria-label="Spotify">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>

          <div className="flex items-center gap-2 px-4 pb-3">
            {PLAYLISTS.map((p, idx) => (
              <motion.button
                key={idx}
                onClick={() => switchPlaylist(idx)}
                whileTap={{ scale: 0.90 }}
                aria-label={`Switch to ${p.label}`}
                className={[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'border transition-all duration-200 text-sm',
                  active === idx
                    ? 'bg-[#222] border-[#444] text-white shadow-lg shadow-black/30'
                    : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-white/30 hover:text-white',
                ].join(' ')}
              >
                {p.icon}
              </motion.button>
            ))}
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {PLAYLISTS[active].label}
            </span>
          </div>

          <div className="h-px bg-gray-100 dark:bg-white/[0.06] mx-3" />

          <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#6b7280">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Top on Spotify
            </span>
          </div>

          {/* ── Spotify embed target ──────────────────────────────────────────
              The Spotify iFrame API injects an <iframe> into this div.
              This div is ALWAYS in the DOM — we never unmount it.
              ─────────────────────────────────────────────────────────────── */}
          <div className="px-3 pb-3">
            <div ref={embedRef} className="rounded-xl overflow-hidden" />
          </div>

          <div className="px-4 pb-4">
            <a
              href={`https://open.spotify.com/${type}/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                         bg-[#1a1a1a] hover:bg-[#333] active:scale-[0.98] border border-white/10
                         transition-all duration-150 text-white text-sm font-bold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Listen on Spotify ↗
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
