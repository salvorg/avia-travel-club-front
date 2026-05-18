'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export type ClockCardData = {
  city: string;
  flag: string;
  isNight: boolean;
  data: {
    time: string;
    offset: string;
  };
};

interface ClockCardProps {
  clock: ClockCardData;
}

export const ClockCard = React.memo(function ClockCard({
  clock,
}: ClockCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      className="group relative flex w-[150px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md hover:shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:shadow-none"
    >
      <div className="flex items-center justify-between gap-1">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="shrink-0 text-base drop-shadow-sm saturate-[0.9] filter"
            role="img"
            aria-label={clock.city}
          >
            {clock.flag}
          </span>
          <span className="truncate text-xs font-medium tracking-tight text-[#0f2043] dark:text-white">
            {clock.city}
          </span>
        </div>

        <span className="shrink-0">
          {clock.isNight ? (
            <Moon className="h-3 w-3 text-indigo-400 dark:text-indigo-300" />
          ) : (
            <Sun className="h-3 w-3 fill-amber-400/20 text-amber-500" />
          )}
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-1">
        <span className="font-mono text-base tracking-tight text-[#0f2043] tabular-nums transition-colors group-hover:text-[#2563eb] dark:text-white dark:group-hover:text-blue-400">
          {clock.data.time}
        </span>
        <span className="text-[9px] font-bold tracking-wide text-slate-400 uppercase dark:text-slate-500">
          {clock.data.offset}
        </span>
      </div>
    </motion.div>
  );
});
