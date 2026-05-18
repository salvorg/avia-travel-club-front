'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { type LeadFormData, LeadFormSchema } from '@/types/lead';

interface LeadFormProps {
  isLoading: boolean;
  onSubmit: (data: LeadFormData) => Promise<void>;
  onClose: () => void;
}

export function LeadForm({ isLoading, onSubmit, onClose }: LeadFormProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4 rounded-3xl border border-white/60 bg-white/60 p-6 text-left shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-none"
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
              placeholder="Введите имя"
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

        {/* Поле: Телефон */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
            Телефон *
          </label>
          <div className="relative">
            <Phone className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
            <input
              {...register('phone')}
              type="tel"
              placeholder="+996 (___) __ __ __"
              disabled={isLoading}
              className={`h-11 w-full rounded-xl border bg-white/40 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
                errors.phone
                  ? 'border-red-500/80 focus:border-red-500'
                  : 'border-white/60 dark:border-slate-800/80'
              }`}
            />
          </div>
          {errors.phone && (
            <span className="text-[11px] font-bold text-red-500">{errors.phone.message}</span>
          )}
        </div>
      </div>

      {/* Поле: Email */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
          Электронная почта{' '}
          <span className="font-medium text-slate-500 dark:text-slate-400">(опционально)</span>
        </label>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            {...register('email')}
            type="email"
            placeholder="example@domain.com"
            disabled={isLoading}
            className={`h-11 w-full rounded-xl border bg-white/40 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
              errors.email
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-white/60 dark:border-slate-800/80'
            }`}
          />
        </div>
        {errors.email && (
          <span className="text-[11px] font-bold text-red-500">{errors.email.message}</span>
        )}
      </div>

      {/* Поле: Комментарий */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-bold tracking-wider text-[#0f2043] uppercase dark:text-slate-300">
          Пожелания к туру{' '}
          <span className="font-medium text-slate-500 dark:text-slate-400">(опционально)</span>
        </label>
        <div className="relative">
          <MessageSquare className="absolute top-3 left-3.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
          <textarea
            {...register('comment')}
            rows={5}
            placeholder="Например: Хотим отель 5* на первой линии, вылет в начале июля..."
            disabled={isLoading}
            className={`w-full rounded-xl border bg-white/40 py-2.5 pr-4 pl-10 text-sm font-medium backdrop-blur-md transition-all outline-none focus:border-[#2563eb] focus:bg-white/80 dark:bg-slate-950/40 dark:focus:border-blue-500 dark:focus:bg-slate-950/80 ${
              errors.comment
                ? 'border-red-500/80 focus:border-red-500'
                : 'border-white/60 dark:border-slate-800/80'
            }`}
          />
        </div>
        {errors.comment && (
          <span className="text-[11px] font-bold text-red-500">{errors.comment.message}</span>
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
          <span>{isLoading ? 'Отправка...' : 'Отправить запрос'}</span>
        </button>
      </div>
    </form>
  );
}
