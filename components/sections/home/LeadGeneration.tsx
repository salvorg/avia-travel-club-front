'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { type LeadFormData } from '@/types/lead';
import { LeadForm } from '@/components/sections/home/lead-generation-section/LeadForm';
import { SuccessState } from '@/components/sections/home/lead-generation-section/SuccessState';

export function LeadGeneration(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-48%', '48%']);

  const handleFormSubmit = useCallback(async (data: LeadFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log('Lead processed:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit tracking error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsSubmitted(false);
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Обратная связь"
      className="relative w-full overflow-hidden border-t border-b border-slate-200/60 py-30"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden select-none">
        <motion.div
          style={{ y, scale: 1.5 }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/assets/images/lead-bg2.jpeg"
            alt="Текстурный фон секции"
            fill
            sizes="100vw"
            quality={85}
            priority={false}
            className="object-cover opacity-60 transition-transform duration-700 dark:opacity-20 dark:brightness-50"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 backdrop-blur-[2px] dark:from-slate-950/90 dark:via-slate-950/70 dark:to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,126,33,0.08)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="lead-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="text-4xl font-black tracking-tight text-[#ff7e21] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-5xl dark:text-white dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                Не нашли подходящий тур?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-base font-semibold text-slate-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] dark:text-slate-300">
                Оставьте запрос, и наши эксперты подберут идеальный маршрут под ваш бюджет.
              </p>

              <div className="mt-8 flex flex-col items-center">
                {!isOpen && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(true)}
                    className="flex h-12 items-center justify-center rounded-full bg-[#2563eb] px-8 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 dark:bg-[#ff7e21] dark:shadow-orange-500/10 dark:hover:bg-orange-600"
                  >
                    Оставить запрос
                  </motion.button>
                )}

                <motion.div
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                  className="w-full overflow-hidden"
                >
                  <LeadForm
                    isLoading={isLoading}
                    onSubmit={handleFormSubmit}
                    onClose={handleClose}
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <SuccessState onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
