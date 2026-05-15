'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-2xl backdrop-blur-2xl sm:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src="/assets/images/logo/ATC-logo.webp"
            alt="Avia Travel Club"
            width={160}
            height={40}
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
              className="group text-main-orange relative text-sm font-medium transition-colors hover:text-white"
            >
              {link.label}
              <span className="bg-main-orange absolute -bottom-1 left-0 h-[1px] w-0 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-main-orange shadow-main-orange/30 hidden rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95 sm:block">
            Войти
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0f1f35] shadow-2xl backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-main-orange rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-main-orange mt-4 w-full rounded-xl px-6 py-3 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95">
              Войти
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
