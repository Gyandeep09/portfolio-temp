'use client';
import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export default function DraggableTerminal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="intro" className="p-2 relative w-full flex min-h-96 justify-center items-center z-20">
      <Draggable handle=".handle">
        <div className="rounded-lg border text-card-foreground w-2xl max-w-full bg-white shadow-lg overflow-hidden font-mono ambient-card border-none">
          <div className="hidden bg-gray-200 dark:bg-zinc-500 px-4 py-2 sm:flex items-center justify-between border-b border-gray-300 dark:border-zinc-500 font-mono handle cursor-move">
            <div className="flex space-x-2">
              <div className="size-3 rounded-full bg-red-500 dark:bg-red-400"></div>
              <div className="size-3 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
              <div className="size-3 rounded-full bg-green-500 dark:bg-green-400 cursor-pointer flex justify-center items-center" title="Maximize/Restore"></div>
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-200">Terminal</div>
            <div className="w-4 ease-in-out transition-transform active:scale-90 text-gray-600 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer w-4 stroke-1">
                <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" fill="currentColor" strokeWidth="0"></path>
              </svg>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-600 font-mono text-sm">
            <div className="text-gray-800 dark:text-zinc-200">
              <span className="opacity-50">Last login: Sun Sep 14 12:00:49 on console</span><br/>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
