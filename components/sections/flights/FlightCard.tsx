'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Briefcase, Clock } from 'lucide-react';
import { Flight } from '@/types/flights';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

export const FlightCard = React.memo(function FlightCard({
  flight,
  onBook,
}: FlightCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800/80 dark:bg-slate-900/70"
    >
      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:w-1/4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 font-bold text-[#0f2043] ring-1 ring-slate-200/60 dark:bg-slate-800 dark:text-white dark:ring-slate-700/60">
            {flight.logo}
          </div>
          <div>
            <span className="block text-xs font-black tracking-wide text-[#0f2043] uppercase dark:text-white">
              {flight.airline}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Рейс #{flight.id}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 px-2 sm:px-6">
          <div className="text-left">
            <span className="block font-mono text-xl font-black text-[#0f2043] dark:text-white">
              {flight.timeStart}
            </span>
            <span className="block text-xs font-bold text-slate-500">{flight.fromCode}</span>
            <span className="hidden text-[11px] font-medium text-slate-400 md:block">
              {flight.fromCity}
            </span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-4">
            <span className="absolute top-[-14px] flex items-center gap-1 text-[10px] font-bold tracking-tight text-slate-400 uppercase">
              <Clock className="h-3 w-3" /> {flight.duration}
            </span>

            <svg
              className="h-8 w-full overflow-visible"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,15 Q 50,0 100,15"
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <motion.path
                d="M 0,15 Q 50,0 100,15"
                fill="none"
                stroke="url(#flightArcGradient)"
                strokeWidth="1"
                initial={{ strokeDasharray: '0 100' }}
                animate={{ strokeDasharray: '100 100' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="flightArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              className="absolute text-blue-600 dark:text-blue-400"
              animate={{ x: ['-45%', '45%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              style={{ top: '-2px' }}
            >
              <Plane className="h-3.5 w-3.5 rotate-45" />
            </motion.div>

            <span className="mt-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {flight.isDirect ? 'Прямой' : '1 пересадка'}
            </span>
          </div>

          <div className="text-right">
            <span className="block font-mono text-xl font-black text-[#0f2043] dark:text-white">
              {flight.timeEnd}
            </span>
            <span className="block text-xs font-bold text-slate-500">{flight.toCode}</span>
            <span className="hidden text-[11px] font-medium text-slate-400 md:block">
              {flight.toCity}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 sm:w-1/4 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
          <div className="flex flex-col sm:items-end">
            <div className="mb-1 flex items-center gap-1.5 text-slate-400">
              {flight.hasBaggage && <Briefcase className="h-3.5 w-3.5 text-emerald-500" />}
              <span className="text-[10px] font-bold uppercase">
                {flight.hasBaggage ? 'Багаж включен' : 'Без багажа'}
              </span>
            </div>
            <span className="font-mono text-2xl font-black text-[#0f2043] tabular-nums dark:text-white">
              {flight.price.toLocaleString('ru-RU')}{' '}
              <span className="text-sm font-bold text-slate-400">c.</span>
            </span>
          </div>

          <button
            onClick={() => onBook(flight)}
            className="mt-2 rounded-full bg-gradient-to-r from-[#2563eb] to-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:brightness-110 active:scale-95 dark:from-[#ff7e21] dark:to-[#ff6a00]"
          >
            Выбрать
          </button>
        </div>
      </div>
    </motion.div>
  );
});
