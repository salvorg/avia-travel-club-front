import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Регистрация | AviaTravelClub',
  description: 'Создание аккаунта в системе бронирования и управления путешествиями AviaTravelClub',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <Image
          src="/assets/images/tours-collage.webp"
          alt="Travel background"
          fill
          priority
          quality={65}
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.78),rgba(15,23,42,0.48))]" />
      <div className="pointer-events-none absolute top-[-200px] left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />

      <section className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/20 bg-white/92 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl duration-500">
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="relative z-10 p-4 md:p-8">
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-[72px] w-full max-w-[260px]">
              <Image
                src="/assets/images/logo/ATC-logo.webp"
                alt="Avia Travel Club"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="mt-6 hidden text-center md:block">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Создание аккаунта
              </h1>
            </div>
          </div>

          <form className="space-y-5" noValidate>
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                Имя и фамилия
              </label>

              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Иван Иванов"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="example@mail.com"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Пароль
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Подтверждение пароля
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
              />
            </div>
            <label
              htmlFor="terms"
              className="flex cursor-pointer items-start gap-3 pt-1 text-sm text-slate-600"
            >
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
              />

              <span>
                Я согласен с{' '}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  политикой конфиденциальности
                </Link>{' '}
                и условиями использования сервиса
              </span>
            </label>
            <button
              type="submit"
              className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition-all hover:bg-orange-600 active:scale-[0.99]"
            >
              Создать аккаунт
            </button>
          </form>
          <div className="mb-8 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Уже есть аккаунт?{' '}
              <Link
                href="/sign-in"
                className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-6 z-10 text-center text-xs tracking-wide text-white/70">
        © {new Date().getFullYear()} AviaTravelClub. Все права защищены.
      </footer>
    </main>
  );
}
