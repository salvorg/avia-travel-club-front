import type { Metadata } from 'next';
import Image from 'next/image';

import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Вход | AviaTravelClub',
  description: 'Авторизация в системе бронирования и управления путешествиями AviaTravelClub',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
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
      <div className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-[520px] duration-500">
        <SignInForm />
      </div>
      <footer className="absolute bottom-6 z-10 text-center text-xs tracking-wide text-white/70">
        © {new Date().getFullYear()} AviaTravelClub. Все права защищены.
      </footer>
    </main>
  );
}
