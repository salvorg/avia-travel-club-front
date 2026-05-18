'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Tour, TourSchema } from '@/types/tours';
import Link from 'next/link';
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

interface HotToursProps {
  initialTours: unknown[];
}

export function HotTours({ initialTours }: HotToursProps): React.JSX.Element {
  const validatedTours = useMemo(() => {
    return initialTours
      .map((tour) => {
        const result = TourSchema.safeParse(tour);
        return result.success ? result.data : null;
      })
      .filter((tour): tour is Tour => tour !== null);
  }, [initialTours]);

  if (validatedTours.length === 0) {
    return (
      <section className="py-16 text-center text-slate-500">
        <p>Горящие туры временно отсутствуют. Попробуйте позже.</p>
      </section>
    );
  }

  return (
    <section aria-label="Горящие туры" className="relative w-full overflow-hidden pb-16 md:pb-24">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#ff7e21] dark:bg-orange-950/40">
              <Flame className="h-3.5 w-3.5 animate-pulse fill-current" />
              <span>Успей забронировать</span>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0f2043] sm:text-4xl dark:text-white">
              Горящие туры недели
            </h2>
            <p className="mt-3 text-base font-medium text-slate-600 dark:text-slate-400">
              Самые выгодные предложения с максимальными скидками.
              <br />
              Цены актуальны на данный момент
            </p>
          </div>

          <Link
            href={ROUTES.TOURS}
            className="group hover:text-main-orange inline-flex items-center gap-2 text-sm font-bold text-white transition-colors dark:text-blue-400"
          >
            <span>Смотреть все туры</span>
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
          {validatedTours.map((tour) => (
            <motion.article
              key={tour.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-md backdrop-blur-md transition-shadow hover:shadow-xl hover:shadow-slate-200/40 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:shadow-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {tour.badge && (
                  <span className="bg-main-orange absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                    {tour.badge}
                  </span>
                )}

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-white">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{tour.rating.toFixed(1)}</span>
                </div>

                <Image
                  src={tour.imageUrl}
                  alt={tour.title}
                  fill
                  sizes="(max-w-[90%]) 33vw, 100vw"
                  priority={false}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-[#2563eb] dark:text-blue-400" />
                  <span>{tour.location}</span>
                </div>

                <h3 className="mt-2 line-clamp-1 text-xl leading-snug font-bold text-[#0f2043] transition-colors group-hover:text-[#2563eb] dark:text-white dark:group-hover:text-blue-400">
                  {tour.title}
                </h3>

                <div className="mt-3 flex items-center gap-4 border-b border-slate-100 pb-4 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{tour.duration}</span>
                  </div>
                  <div>
                    <span>• {tour.nights} ночей</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex flex-col">
                    {tour.oldPrice && (
                      <span className="text-xs font-bold text-slate-400 tabular-nums line-through">
                        {tour.oldPrice.toLocaleString('ru-RU')} c.
                      </span>
                    )}
                    <span className="text-xl font-black text-[#0f2043] tabular-nums dark:text-white">
                      {tour.price.toLocaleString('ru-RU')}{' '}
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        c.
                      </span>
                    </span>
                  </div>

                  <button className="flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:brightness-110 active:scale-95 dark:from-[#ff7e21] dark:to-[#ff6a00]">
                    Купить тур
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
