'use client';

import React from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { Plane } from 'lucide-react';
import { WorldClocks } from '@/components/sections/home/WorldClocks';
import BookingBlock from '@/components/sections/home/BookingBlock';
import Link from 'next/link';
import { ROUTES } from '@/utils/routes';

export function Hero(): React.JSX.Element {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-28 md:pt-32">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[90%] flex-1 flex-col justify-between px-4 md:px-8">
        <div className="mb-8 w-full lg:mb-0">
          <WorldClocks />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-12 py-6 lg:py-12">
          <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="flex w-full min-w-0 flex-1 flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#ff7e21] dark:bg-orange-950/40">
                <Plane className="h-3.5 w-3.5 animate-pulse fill-current" />
                <span>Умные перелеты</span>
              </div>

              <h1 className="mt-4 bg-gradient-to-r from-[#0f2043] via-[#2563eb] to-[#ff7e21] bg-clip-text text-3xl leading-[1.15] font-black tracking-tight text-transparent uppercase sm:text-4xl md:text-5xl">
                Сокращаем расстояния
                <br />
                Экономим время
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-relaxed font-medium text-[#1e293b]/90 md:text-base">
                Компания осуществляет бронирование и продажу авиабилетов и туристических услуг и
                работает на туристическом рынке Кыргызстана с 2000 года.
              </p>

              <div className="mt-8 flex w-full flex-wrap gap-4 sm:w-auto">
                <Link
                  href={ROUTES.FLIGHTS}
                  className="group relative flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7e21] to-[#ff6a00] px-8 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 hover:brightness-110 active:scale-95 sm:w-auto"
                >
                  Поиск билетов
                  <Plane className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="flex h-14 w-full items-center justify-center rounded-full border border-slate-300 bg-white/30 px-8 font-bold text-[#0f2043] backdrop-blur-sm transition-all hover:bg-white/60 active:scale-95 sm:w-auto">
                  Найти маршрут
                </button>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-1 justify-center lg:justify-end">
              <div className="w-full max-w-xl lg:max-w-none">
                <BookingBlock />
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden h-2 w-full border-b border-transparent lg:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
