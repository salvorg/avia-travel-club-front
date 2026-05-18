'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ReviewCard } from './ReviewCard';
import { type Review, type ReviewFormData } from '@/types/review';
import { ReviewForm } from '@/components/sections/home/reviews-section/ReviewForm';
import { ReviewSuccessState } from '@/components/sections/home/reviews-section/ReviewSuccessState';

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    name: 'Александр Вернер',
    role: 'Предприниматель',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    tourName: 'Экспедиция на Иссык-Куль',
    text: 'Организация на высшем уровне. Маршрут продуман до мелочей, гиды знают каждый камень. Glassmorphic интерфейс сайта сразу намекал на качество, но реальность превзошла ожидания!',
  },
  {
    id: '2',
    name: 'Елена Макарова',
    role: 'UI/UX Дизайнер',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 4,
    tourName: 'Трекинг в Сары-Челек',
    text: 'Как дизайнеру, мне безумно приятно находиться на вашем сайте, а как туристу — быть в ваших турах. Идеальный баланс дикой природы и премиального комфорта.',
  },
  {
    id: '3',
    name: 'Айбек Султанов',
    role: 'Team Lead',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    tourName: 'Джип-тур по Тянь-Шаню',
    text: 'Отличная разгрузка для мозгов. Всё четко, тайминги соблюдены, техника в идеальном состоянии. Обязательно поеду с вами еще раз в следующем сезоне.',
  },
  {
    id: '4',
    name: 'Камилла Исаева',
    role: 'Фотограф-блогер',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 3,
    tourName: 'Тур вокруг Сон-Куля',
    text: 'Нереальные локации для съемок! Гиды помогали ловить лучший свет и знали крутые нетуристические споты. Сервис стоит каждого сома.',
  },
];

export function ReviewsSection(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-48%', '48%']);

  const rowReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  const handleReviewSubmit = useCallback(async (data: ReviewFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log('Review submitted:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Review submit tracking error:', error);
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
      aria-label="Отзывы наших клиентов"
      className="relative w-full overflow-hidden border-t border-slate-200/60 py-24 dark:border-slate-900"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden select-none">
        <motion.div
          style={{ y, scale: 1.2 }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src="/assets/images/reviews-bg.jpeg"
            alt="Текстурный фон секции отзывов"
            fill
            sizes="100vw"
            quality={85}
            priority={false}
            className="object-cover opacity-60 transition-transform duration-700 dark:opacity-20 dark:brightness-50"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/80 backdrop-blur-[2px] dark:from-slate-950/90 dark:via-slate-950/70 dark:to-slate-950/90" />
        {/*<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,126,33,0.08)_0%,transparent_65%)]" />*/}
      </div>

      <div className="relative z-10 mx-auto max-w-[90%] px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-[#ff7e21] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-4xl dark:text-white dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Отзывы наших путешественников
        </h2>
        <p className="mt-3 text-base font-semibold text-slate-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] dark:text-slate-300">
          Истории реальных людей, которые доверили нам свои самые яркие моменты.
        </p>
      </div>

      <div className="dark:before:from-background dark:after:from-background relative mt-16 flex overflow-hidden before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-slate-950/50 before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-slate-950/50 after:to-transparent">
        <div className="unique-marquee-left flex w-max gap-6 hover:[animation-play-state:paused]">
          {rowReviews.map((review, idx) => (
            <ReviewCard key={`row-${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-[90%] px-4 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {!isOpen && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(true)}
                  className="mx-auto flex h-12 items-center justify-center rounded-full bg-[#2563eb] px-8 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 dark:bg-[#ff7e21] dark:shadow-orange-500/10 dark:hover:bg-orange-600"
                >
                  Оставить отзыв
                </motion.button>
              )}

              <motion.div
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                className="w-full overflow-hidden"
              >
                <ReviewForm
                  isLoading={isLoading}
                  onSubmit={handleReviewSubmit}
                  onClose={handleClose}
                />
              </motion.div>
            </motion.div>
          ) : (
            <ReviewSuccessState onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
