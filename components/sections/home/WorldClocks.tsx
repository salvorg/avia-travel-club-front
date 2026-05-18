'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';

export const WORLD_CLOCKS = [
  { city: 'Бишкек', country: 'KG', flag: '🇰🇬', tz: 'Asia/Bishkek' },
  { city: 'Стамбул', country: 'TR', flag: '🇹🇷', tz: 'Europe/Istanbul' },
  { city: 'Ханой', country: 'VN', flag: '🇻🇳', tz: 'Asia/Ho_Chi_Minh' },
  { city: 'Бангкок', country: 'TH', flag: '🇹🇭', tz: 'Asia/Bangkok' },
  { city: 'Дубай', country: 'AE', flag: '🇦🇪', tz: 'Asia/Dubai' },
  { city: 'Москва', country: 'RU', flag: '🇷🇺', tz: 'Europe/Moscow' },
  { city: 'Лондон', country: 'GB', flag: '🇬🇧', tz: 'Europe/London' },
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
    <section
      aria-label="Мировое время"
      className="overflow-hidden border-y border-slate-200/60 bg-gradient-to-b from-transparent to-slate-100/40 py-6 dark:border-slate-800/40 dark:to-slate-900/20"
    >
      <div className="w-full">
        <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f58220] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f58220]" />
            </span>
            <p className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
              Глобальное время — внутренние и международные рейсы
            </p>
          </div>
          <span className="hidden text-xs text-slate-400 sm:inline dark:text-slate-500">
            Синхронизация в реальном времени
          </span>
        </div>

        <div className="dark:before:from-background dark:after:from-background relative w-full overflow-hidden before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
          <div className="unique-marquee-clocks flex w-max gap-4 hover:[animation-play-state:paused]">
            {clocksData.map((clock) => (
              <div
                key={clock.key}
                className="group relative w-[170px] shrink-0 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:bg-white dark:border-slate-800/80 dark:bg-slate-950/40 dark:hover:border-slate-700 dark:hover:bg-slate-950"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-xl drop-shadow-sm filter"
                      role="img"
                      aria-label={clock.city}
                    >
                      {clock.flag}
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
                      {clock.city}
                    </span>
                  </div>

                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full transition-colors duration-300 ${
                      clock.isNight
                        ? 'bg-slate-900 text-indigo-400 dark:bg-slate-800'
                        : 'bg-amber-50 text-amber-500 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}
                    aria-hidden="true"
                  >
                    {clock.isNight ? (
                      <Moon className="h-3.5 w-3.5" />
                    ) : (
                      <Sun className="h-3.5 w-3.5" />
                    )}
                  </span>
                </div>

                <div className="mt-3 font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
                  {clock.data.time}
                </div>

                <div className="mt-1 flex items-center justify-between text-[10px] font-medium tracking-wider text-slate-400 uppercase dark:text-slate-500">
                  <span>{clock.data.offset}</span>
                </div>
              </div>
            ))}

            {clocksData.length === 0 &&
              DOUBLE_CLOCKS.map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-[108px] w-[170px] shrink-0 rounded-2xl border border-slate-200/40 bg-slate-100/50 dark:border-slate-800/40 dark:bg-slate-900/20"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
