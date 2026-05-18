import type { Metadata } from 'next';
import { Hero } from '@/components/sections/home/Hero';
import { HotTours } from '@/components/sections/home/HotTours';
import { UpcomingEvents } from '@/components/sections/home/UpcomingEvents';
import { LeadGeneration } from '@/components/sections/home/LeadGeneration';
import { ReviewsSection } from '@/components/sections/home/ReviewsSection';

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

const MOCK_TOURS = [
  {
    id: 'a3bd4782-7f89-4e12-b911-3abcf4291101',
    title: 'Роскошный отдых в Анталье',
    location: 'Турция, Анталья',
    price: 45000,
    oldPrice: 62000,
    badge: '-27% Скидка',
    rating: 4.9,
    imageUrl:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    duration: '7 дней',
    nights: 6,
  },
  {
    id: 'b8cf1194-22d4-4a89-9d74-c81bc8821a44',
    title: 'Сказочный Дубай Марина',
    location: 'ОАЭ, Дубай',
    price: 89000,
    oldPrice: 115000,
    badge: 'Хит продаж',
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    duration: '8 дней',
    nights: 7,
  },
  {
    id: 'c12a8843-91b1-4c77-a841-f763bb110299',
    title: 'Тропический рай на Пхукете',
    location: 'Таиланд, Пхукет',
    price: 72000,
    badge: 'Premium',
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    duration: '10 дней',
    nights: 9,
  },
];
const MOCK_EVENTS = [
  {
    id: 'f56c7811-192b-4cd3-bde2-d3434fa77100',
    title: 'Этно-фестиваль Nomad Культура',
    description:
      'Масштабный фестиваль кочевой культуры на берегу Иссык-Куля с конными играми и традиционной кухней.',
    location: 'Чолпон-Ата, Ипподром',
    date: '2026-07-15T10:00:00.000Z',
    price: 1500,
    category: 'Фестиваль',
    slotsLeft: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd91a2384-cb91-41c2-9e44-118833cbfa55',
    title: 'Горный трекинг к озеру Ала-Куль',
    description:
      'Профессиональный трехдневный поход с гидами и ночевкой в палаточном лагере на высоте 3500 метров.',
    location: 'Каракол, ущелье',
    date: '2026-06-20T07:30:00.000Z',
    price: 8500,
    category: 'Активный отдых',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e42b1893-8c31-4b11-a722-c9834fb99312',
    title: 'Гастро-тур "Вкус Шёлкового Пути"',
    description:
      'Уникальный ужин-презентация от ведущих шеф-поваров Центральной Азии. Традиционные рецепты в современной высокой интерпретации, дегустация и живая фольклорная музыка.',
    location: 'Бишкек, этно-комплекс',
    date: '2026-05-28T18:30:00.000Z',
    price: 3500,
    category: 'Гастрономия',
    slotsLeft: 8,
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <HotTours initialTours={MOCK_TOURS} />
      <LeadGeneration />
      <UpcomingEvents initialEvents={MOCK_EVENTS} />
      <ReviewsSection />
    </>
  );
}
