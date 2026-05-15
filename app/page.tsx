import type { Metadata } from 'next';
import { Hero } from '@/components/sections/home/Hero';
import { Benefits } from '@/components/sections/home/Benefits';
import { Routes } from '@/components/sections/home/Routes';

export const metadata: Metadata = {
  title: 'Avia Travel Club — Умный поиск авиабилетов и маршрутов',
  description:
    'Путешествия переосмысленные. Умный поиск авиабилетов и маршрутов в реальном времени с максимальной скоростью, простотой и контролем. Лучшие цены от всех авиакомпаний.',
  keywords:
    'авиабилеты, поиск рейсов, дешевые авиабилеты, бронирование билетов, маршруты, путешествия',
  openGraph: {
    title: 'Avia Travel Club — Умный поиск авиабилетов',
    description:
      'Путешествия переосмысленные. Находите лучшие предложения на авиабилеты в реальном времени.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avia Travel Club — Умный поиск авиабилетов',
    description: 'Путешествия переосмысленные. Находите лучшие предложения на авиабилеты.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Routes />
    </>
  );
}
