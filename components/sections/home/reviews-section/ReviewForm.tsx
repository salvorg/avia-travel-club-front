'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, User, Briefcase, MapPin, MessageSquare, Star } from 'lucide-react';
import { type ReviewFormData, ReviewFormSchema } from '@/types/review';

interface ReviewFormProps {
  isLoading: boolean;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  onClose: () => void;
}

export function ReviewForm({ isLoading, onSubmit, onClose }: ReviewFormProps): React.JSX.Element {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 5,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-12 max-w-3xl space-y-4 rounded-3xl border border-white/60 bg-white/60 p-6 text-left shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-none"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Поле: Имя */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
            Ваше имя *
          </label>
          <div className="relative">
            <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <input
              {...register('name')}
              type="text"
              placeholder="Иван Иванов"
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-white/40 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
                errors.name
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/60 dark:border-slate-800/80'
              }`}
            />
          </div>
          {errors.name && (
            <span className="text-[11px] font-bold text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Поле: Статус / Профессия */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
            Кто вы *
          </label>
          <div className="relative">
            <Briefcase className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <input
              {...register('role')}
              type="text"
              placeholder="Предприниматель / Путешественник"
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-white/40 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
                errors.role
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/60 dark:border-slate-800/80'
              }`}
            />
          </div>
          {errors.role && (
            <span className="text-[11px] font-bold text-red-500">{errors.role.message}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Поле: Название тура */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
            В каком туре были *
          </label>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <input
              {...register('tourName')}
              type="text"
              placeholder="Экспедиция на Иссык-Куль"
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-white/40 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
                errors.tourName
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/60 dark:border-slate-800/80'
              }`}
            />
          </div>
          {errors.tourName && (
            <span className="text-[11px] font-bold text-red-500">{errors.tourName.message}</span>
          )}
        </div>

        {/* Поле: Выбор рейтинга звездами */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
            Ваша оценка *
          </label>
          <Controller
            control={control}
            name="rating"
            render={({ field: { onChange, value } }) => (
              <div className="flex h-11 items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  const active =
                    hoveredRating !== null ? starValue <= hoveredRating : starValue <= value;
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={isLoading}
                      onClick={() => onChange(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="transition-transform active:scale-90 disabled:opacity-50"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          active
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>
      </div>

      {/* Поле: Текст отзыва */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
          Ваш отзыв *
        </label>
        <div className="relative">
          <MessageSquare className="absolute top-3 left-3.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <textarea
            {...register('text')}
            rows={4}
            placeholder="Поделитесь вашими впечатлениями о сервисе, гидах и маршруте..."
            disabled={isLoading}
            className={`w-full rounded-xl border bg-white/40 py-2.5 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
              errors.text
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-white/60 dark:border-slate-800/80'
            }`}
          />
        </div>
        {errors.text && (
          <span className="text-[11px] font-bold text-red-500">{errors.text.message}</span>
        )}
      </div>

      {/* Панель действий */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="text-xs font-bold text-slate-500 transition-colors hover:text-slate-700 disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Свернуть
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f2043] to-[#1e3a8a] px-6 text-xs font-bold text-white shadow-md shadow-blue-950/10 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 dark:from-[#ff7e21] dark:to-[#ff6a00]"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          <span>{isLoading ? 'Отправка...' : 'Оставить отзыв'}</span>
        </button>
      </div>
    </form>
  );
}
