'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginInput, loginSchema } from '@/components/lib/validations/auth';

export function SignInForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);

    try {
      console.log('Login payload:', data);

      /**
       * production:
       * await signIn(...)
       */
    } catch {
      setServerError('Неверный email или пароль');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/92 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative z-10 p-4 md:p-10">
        <div className="flex flex-col items-center md:mb-8">
          <div className="relative h-[72px] w-full max-w-[260px]">
            <Image
              src="/assets/images/logo/ATC-logo.webp"
              alt="Avia Travel Club"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="mt-6 hidden text-center md:flex">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Добро пожаловать
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Войдите в личный кабинет для управления
              <br />
              бронированиями и путешествиями
            </p>
          </div>
        </div>
        {serverError && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="example@mail.com"
              {...register('email')}
              className={`h-14 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:ring-4 ${
                errors.email
                  ? 'border-red-400 focus:ring-red-100'
                  : 'border-slate-200 focus:border-orange-400 focus:ring-orange-50'
              } `}
            />

            {errors.email && (
              <p className="mt-2 ml-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Пароль
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-orange-500 transition-colors hover:text-orange-600"
              >
                Забыли пароль?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              className={`h-14 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:ring-4 ${
                errors.password
                  ? 'border-red-400 focus:ring-red-100'
                  : 'border-slate-200 focus:border-orange-400 focus:ring-orange-50'
              } `}
            />

            {errors.password && (
              <p className="mt-2 ml-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-1">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                id="remember"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
              />
              Запомнить меня
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition-all hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <div className="mb-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Нет аккаунта?{' '}
            <Link
              href="/sign-up"
              className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
