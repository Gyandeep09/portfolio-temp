import type { JSX } from 'react';
import { TECH_ICON_MAP } from './TechStackIcons';

export default function StackPill({ tech }: { tech: string }) {
  const IconComp = TECH_ICON_MAP[tech];
  return (
    <span
      className="group/pill flex items-center gap-1.5 px-2 py-0.5 rounded cursor-default
                 text-[10px] font-mono font-semibold
                 bg-transparent
                 border border-gray-200 dark:border-zinc-700
                 text-gray-500 dark:text-gray-400
                 hover:border-gray-400 dark:hover:border-zinc-500
                 transition-colors duration-150"
    >
      {IconComp && (
        <span className="flex-shrink-0 flex items-center justify-center grayscale opacity-70 group-hover/pill:grayscale-0 group-hover/pill:opacity-100 transition-all duration-300">
          <IconComp />
        </span>
      )}
      {tech}
    </span>
  );
}
