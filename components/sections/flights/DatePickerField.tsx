'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerFieldProps {
  value: Date;
  onChange: (date: Date) => void;
}

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function DatePickerField({ value, onChange }: DatePickerFieldProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value.getMonth());
  const [currentYear, setCurrentYear] = useState(value.getFullYear());
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

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const shiftIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: (number | null)[] = Array(shiftIndex).fill(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  }, [currentMonth, currentYear]);

  const formattedDate = useMemo(() => {
    return value.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [value]);

  return (
    <div ref={containerRef} className="relative z-[40]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative cursor-pointer rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10"
      >
        <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
          Дата вылета
        </label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
            <span className="truncate text-xl font-black tracking-tighter text-white">
              {formattedDate}
            </span>
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
            className="absolute top-full right-0 left-0 z-[50] mt-4 min-w-[290px] rounded-[2rem] border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  currentMonth === 0
                    ? (setCurrentMonth(11), setCurrentYear((y) => y - 1))
                    : setCurrentMonth((m) => m - 1)
                }
                className="p-1 text-white/40 transition-colors hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-black tracking-widest text-white uppercase">
                {MONTHS[currentMonth]} {currentYear}
              </span>
              <button
                type="button"
                onClick={() =>
                  currentMonth === 11
                    ? (setCurrentMonth(0), setCurrentYear((y) => y + 1))
                    : setCurrentMonth((m) => m + 1)
                }
                className="p-1 text-white/40 transition-colors hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((d) => (
                <span key={d} className="text-[9px] font-bold text-white/30 uppercase">
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (day === null) return <div key={`empty-${idx}`} />;
                const isSelected =
                  value.getDate() === day &&
                  value.getMonth() === currentMonth &&
                  value.getFullYear() === currentYear;
                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => {
                      onChange(new Date(currentYear, currentMonth, day));
                      setIsOpen(false);
                    }}
                    className={`h-8 w-8 rounded-xl font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
