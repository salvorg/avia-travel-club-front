'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users, ChevronDown } from 'lucide-react';

interface PassengerFieldProps {
  value: number;
  onChange: (count: number) => void;
}

export function PassengerField({ value, onChange }: PassengerFieldProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative z-[30]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10"
      >
        <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
          Пассажиры
        </label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
            <span className="text-xl font-black tracking-tighter text-white">{value} чел.</span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-white/40 transition-all ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute top-full right-0 left-0 z-[50] mt-4 min-w-[140px] rounded-[1.5rem] border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-2xl"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  onChange(num);
                  setIsOpen(false);
                }}
                className={`mb-1 w-full rounded-xl px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all last:mb-0 ${
                  value === num ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {num} чел.
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
