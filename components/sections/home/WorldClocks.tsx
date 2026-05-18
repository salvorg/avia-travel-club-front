'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ClockCard } from '@/components/sections/home/hero-section/ClockCard';

export const WORLD_CLOCKS = [
  { city: 'Бишкек', country: 'KG', flag: '🇰🇬', tz: 'Asia/Bishkek' },
  { city: 'Стамбул', country: 'TR', flag: '🇹🇷', tz: 'Europe/Istanbul' },
  { city: 'Дубай', country: 'AE', flag: '🇦🇪', tz: 'Asia/Dubai' },
  { city: 'Москва', country: 'RU', flag: '🇷🇺', tz: 'Europe/Moscow' },
  { city: 'Лондон', country: 'GB', flag: '🇬🇧', tz: 'Europe/London' },
  { city: 'Ханой', country: 'VN', flag: '🇻🇳', tz: 'Asia/Ho_Chi_Minh' },
  { city: 'Бангкок', country: 'TH', flag: '🇹🇭', tz: 'Asia/Bangkok' },
  { city: 'Токио', country: 'JP', flag: '🇯🇵', tz: 'Asia/Tokyo' },
  { city: 'Пекин', country: 'CN', flag: '🇨🇳', tz: 'Asia/Shanghai' },
  { city: 'Нью-Йорк', country: 'US', flag: '🇺🇸', tz: 'America/New_York' },
] as const;

const DOUBLE_CLOCKS = [...WORLD_CLOCKS, ...WORLD_CLOCKS];

type ClockData = {
  time: string;
  hour: number;
  offset: string;
};

const formattersCache = new Map<
  string,
  {
    timeFormatter: Intl.DateTimeFormat;
    hourFormatter: Intl.DateTimeFormat;
    offsetFormatter: Intl.DateTimeFormat;
  }
>();

function getOrCreateFormatters(tz: string) {
  let formatters = formattersCache.get(tz);
  if (!formatters) {
    formatters = {
      timeFormatter: new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: tz,
      }),
      hourFormatter: new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        hour12: false,
        timeZone: tz,
      }),
      offsetFormatter: new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortOffset',
      }),
    };
    formattersCache.set(tz, formatters);
  }
  return formatters;
}

function formatTimeZone(tz: string, date: Date): ClockData {
  const { timeFormatter, hourFormatter, offsetFormatter } = getOrCreateFormatters(tz);

  const time = timeFormatter.format(date);
  const hour = Number(hourFormatter.format(date));
  const offset =
    offsetFormatter.formatToParts(date).find((p) => p.type === 'timeZoneName')?.value ?? '';

  return { time, hour, offset };
}

export function WorldClocks(): React.JSX.Element {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const handle = requestAnimationFrame(() => {
      setNow(new Date());
      id = setInterval(() => setNow(new Date()), 1000);
    });

    return () => {
      cancelAnimationFrame(handle);
      if (id) clearInterval(id);
    };
  }, []);

  const clocksData = useMemo(() => {
    if (!now) return [];
    return DOUBLE_CLOCKS.map((c, i) => {
      const data = formatTimeZone(c.tz, now);
      const isNight = data.hour < 6 || data.hour >= 20;
      return { ...c, data, isNight, key: `${c.tz}-${i}` };
    });
  }, [now]);

  return (
    <div className="relative w-full antialiased">
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#ff7e21] dark:bg-orange-950/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7e21] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff7e21]" />
          </span>
          <span className="tracking-wide uppercase">Глобальное время</span>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <motion.div
          className="unique-marquee-clocks relative flex w-max gap-4 py-2 hover:[animation-play-state:paused]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {clocksData.map((clock) => (
            <ClockCard key={clock.key} clock={clock} />
          ))}

          {clocksData.length === 0 &&
            DOUBLE_CLOCKS.map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="h-[76px] w-[150px] shrink-0 rounded-2xl border border-slate-200/40 bg-slate-100/50 dark:border-slate-800/40 dark:bg-slate-900/20"
              />
            ))}
        </motion.div>
      </div>
    </div>
  );
}
