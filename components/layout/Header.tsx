'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogIn, Menu, Plane, X } from 'lucide-react';
import { ROUTES } from '@/utils/routes';

const NAV_LINKS = [
  { href: ROUTES.ABOUT, label: 'О нас' },
  { href: ROUTES.PRICE, label: 'Цены' },
  { href: ROUTES.TOURS, label: 'Туры' },
  { href: ROUTES.HELP, label: 'Поддержка' },
  { href: ROUTES.CONTACT, label: 'Контакты' },
] as const;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-[90%] -translate-x-1/2 transition-all duration-300">
      {/* Основной контейнер:
        - bg-white/40 по умолчанию, bg-white/70 при скролле для защиты текста от пестрого фона
        - border-white/40 создает яркую световую грань сверху (как на макете)
        - text-[#1e293b] (Slate 800) гарантирует контрастность на светлом стекле
      */}
      <div
        className={`flex items-center justify-between rounded-2xl border border-white/40 px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-[#0f2043] sm:px-8 ${
          isScrolled ? 'bg-[#0f2043]/85 text-white' : 'bg-[#0f2043] shadow-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src="/assets/images/logo/ATC-logo.webp"
            alt="Avia Travel Club"
            width={160}
            height={30}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-md relative font-medium text-white transition-colors hover:text-black`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#f97316] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Прозрачная кнопка Sign In с тонкими границами и темным текстом */}
          <Link
            href={ROUTES.SIGN_IN}
            className="group hover:border-main-orange hover:bg-main-orange relative hidden h-11 items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-transparent px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 active:scale-95 sm:flex"
          >
            {/* Текст кнопки: по умолчанию на месте, при ховере уходит вверх */}
            <span className="block transform transition-all duration-300 group-hover:-translate-y-10 group-hover:opacity-0">
              Войти
            </span>

            {/* Контейнер иконки: по умолчанию опущен вниз и скрыт, при ховере встает по центру */}
            <div className="absolute inset-0 flex translate-y-10 transform items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <LogIn className="h-5 w-5 text-white" />
            </div>
          </Link>

          <Link
            href={ROUTES.FLIGHTS}
            className="group bg-main-orange relative hidden h-11 items-center justify-center overflow-hidden rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:brightness-110 active:scale-95 sm:flex"
          >
            {/* Текст кнопки: при ховере плавно смещается влево и исчезает */}
            <span className="block transform transition-all duration-300 group-hover:-translate-y-10 group-hover:opacity-0">
              Найти билеты
            </span>

            {/* Контейнер иконки самолета: изначально спрятан далеко справа, при ховере вылетает в центр */}
            <div className="absolute inset-0 flex translate-y-10 transform items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Plane className="h-5 w-5 -rotate-45 text-white" />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-2xl p-2 text-[#1e293b] transition-colors hover:bg-white/20 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border border-white/40 bg-white/90 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-[#1e293b] transition-colors hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-slate-200" />
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href={ROUTES.SIGN_IN}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 text-center text-base font-medium text-[#1e293b]"
            >
              Войти
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href={ROUTES.SIGN_IN}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ff7e21] to-[#ff6a00] py-3 text-center text-base font-semibold text-white shadow-lg shadow-orange-500/20"
            >
              Найти билеты
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
