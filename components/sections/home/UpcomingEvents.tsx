'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Ticket, Users } from 'lucide-react';
import { type UpcomingEvent, EventSchema } from '@/types/events';
import { ROUTES } from '@/utils/routes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

interface UpcomingEventsProps {
  initialEvents: unknown[];
}

export function UpcomingEvents({ initialEvents }: UpcomingEventsProps): React.JSX.Element {
  const validatedEvents = useMemo(() => {
    return initialEvents
      .map((event) => {
        const result = EventSchema.safeParse(event);
        return result.success ? result.data : null;
      })
      .filter((event): event is UpcomingEvent => event !== null);
  }, [initialEvents]);

  if (validatedEvents.length === 0) {
    return (
      <section className="py-16 text-center text-slate-500">
        <p>Предстоящие мероприятия временно отсутствуют. Попробуйте позже.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Предстоящие мероприятия"
      className="relative w-full overflow-hidden py-16 md:py-24 dark:bg-slate-950/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563eb] dark:bg-blue-950/40 dark:text-blue-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>Будь в центре событий</span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0f2043] sm:text-4xl dark:text-white">
              Предстоящие мероприятия
            </h2>
            <p className="mt-3 text-base font-medium text-slate-600 dark:text-slate-400">
              Интересные события, выставки, фестивали и туры выходного дня в Кыргызстане и мире.
            </p>
          </div>

          <Link
            href={ROUTES.EVENTS || '/events'}
            className="group hover:text-main-orange inline-flex items-center gap-2 text-sm font-bold text-white transition-colors dark:text-blue-400"
          >
            <span>Все мероприятия</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {validatedEvents.map((event) => {
            const eventDate = new Date(event.date);
            const day = eventDate.toLocaleString('ru-RU', { day: '2-digit' });
            const month = eventDate.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');
            const fullTime = eventDate.toLocaleString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <motion.article
                key={event.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:shadow-none"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {event.category && (
                    <span className="absolute top-4 left-4 z-10 rounded-full bg-[#0f2043] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm dark:bg-[#2563eb]">
                      {event.category}
                    </span>
                  )}

                  <div className="absolute top-4 right-4 z-10 flex h-14 min-w-[48px] flex-col items-center justify-center rounded-2xl bg-white/95 p-2 text-center shadow-md backdrop-blur-sm dark:bg-slate-900/95">
                    <span className="mt-0.5 text-[10px] font-bold tracking-wider text-[#ff7e21] uppercase">
                      {month}
                    </span>
                    <span className="text-lg leading-none font-black text-[#0f2043] tabular-nums dark:text-white">
                      {day}
                    </span>
                  </div>

                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-w-7xl) 33vw, 100vw"
                    priority={false}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#2563eb] dark:text-blue-400" />
                      <span>{event.location}</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="font-medium text-slate-600 tabular-nums dark:text-slate-400">
                      Начало в {fullTime}
                    </span>
                  </div>

                  <h3 className="mt-2.5 line-clamp-1 text-xl leading-snug font-bold text-[#0f2043] transition-colors group-hover:text-[#2563eb] dark:text-white dark:group-hover:text-blue-400">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                    {event.description}
                  </p>

                  {event.slotsLeft !== undefined && event.slotsLeft <= 15 && (
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7e21]">
                      <Users className="h-3.5 w-3.5" />
                      <span>Осталось всего {event.slotsLeft} мест!</span>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100/80 pt-4 dark:border-slate-800/60">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                        Стоимость
                      </span>
                      <span className="text-xl font-black text-[#0f2043] tabular-nums dark:text-white">
                        {event.price === 0 ? (
                          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                            Вход свободный
                          </span>
                        ) : (
                          <>
                            {event.price.toLocaleString('ru-RU')}{' '}
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                              c.
                            </span>
                          </>
                        )}
                      </span>
                    </div>

                    <button className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#0f2043] to-[#1e3a8a] px-5 text-xs font-bold text-white shadow-md shadow-blue-950/10 transition-all hover:brightness-110 active:scale-95 dark:from-[#ff7e21] dark:to-[#ff6a00]">
                      <Ticket className="h-3.5 w-3.5" />
                      Регистрация
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
