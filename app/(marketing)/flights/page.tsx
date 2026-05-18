'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightLeft,
  Calendar,
  CheckCircle,
  Loader2,
  Plane,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { Flight } from '@/types/flights';
import { FlightCard } from '@/components/sections/flights/FlightCard';

const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'KC-104',
    airline: 'Air Astana',
    logo: 'KC',
    fromCode: 'FRU',
    fromCity: 'Бишкек',
    toCode: 'ALA',
    toCity: 'Алматы',
    timeStart: '08:20',
    timeEnd: '09:15',
    duration: '55м',
    durationMinutes: 55,
    price: 8400,
    hasBaggage: true,
    isDirect: true,
  },
  {
    id: 'SU-1883',
    airline: 'Aeroflot',
    logo: 'SU',
    fromCode: 'FRU',
    fromCity: 'Бишкек',
    toCode: 'SVO',
    toCity: 'Москва',
    timeStart: '16:40',
    timeEnd: '18:50',
    duration: '4ч 10м',
    durationMinutes: 250,
    price: 18500,
    hasBaggage: true,
    isDirect: true,
  },
  {
    id: 'FZ-744',
    airline: 'FlyDubai',
    logo: 'FZ',
    fromCode: 'FRU',
    fromCity: 'Бишкек',
    toCode: 'DXB',
    toCity: 'Дубай',
    timeStart: '05:05',
    timeEnd: '08:30',
    duration: '5ч 25м',
    durationMinutes: 325,
    price: 24300,
    hasBaggage: false,
    isDirect: true,
  },
  {
    id: 'TK-345',
    airline: 'Turkish Airlines',
    logo: 'TK',
    fromCode: 'FRU',
    fromCity: 'Бишкек',
    toCode: 'IST',
    toCity: 'Стамбул',
    timeStart: '02:45',
    timeEnd: '06:15',
    duration: '5ч 30м',
    durationMinutes: 330,
    price: 29100,
    hasBaggage: true,
    isDirect: true,
  },
  {
    id: 'PC-703',
    airline: 'Pegasus',
    logo: 'PC',
    fromCode: 'FRU',
    fromCity: 'Бишкек',
    toCode: 'SAW',
    toCity: 'Стамбул',
    timeStart: '06:50',
    timeEnd: '14:20',
    duration: '9ч 30м',
    durationMinutes: 570,
    price: 16400,
    hasBaggage: false,
    isDirect: false,
  },
];

export default function FlightsPage(): React.JSX.Element {
  // Стейты поисковой формы
  const [fromCity, setFromCity] = useState('Бишкек');
  const [toCity, setToCity] = useState('Москва');
  const [date, setDate] = useState('2026-06-15');
  const [passengers, setPassengers] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);

  // Стейты фильтрации
  const [filterDirectOnly, setFilterDirectOnly] = useState(false);
  const [filterWithBaggage, setFilterWithBaggage] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  // Стейт бронирования
  const [bookedFlight, setBookedFlight] = useState<Flight | null>(null);

  // Валидация и триггер поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800); // Имитация задержки сети
  };

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  // Вычисляемые/фильтруемые билеты
  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((flight) => {
      if (filterDirectOnly && !flight.isDirect) return false;
      if (filterWithBaggage && !flight.hasBaggage) return false;

      // Имитируем текстовый поиск, если пользователь изменил дефолтные значения
      if (
        fromCity &&
        !flight.fromCity.toLowerCase().includes(fromCity.toLowerCase()) &&
        !flight.fromCode.toLowerCase().includes(fromCity.toLowerCase())
      )
        return false;
      if (
        toCity &&
        !flight.toCity.toLowerCase().includes(toCity.toLowerCase()) &&
        !flight.toCode.toLowerCase().includes(toCity.toLowerCase())
      )
        return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      return 0;
    });
  }, [filterDirectOnly, filterWithBaggage, sortBy, fromCity, toCity]);

  return (
    <main className="relative min-h-screen w-full bg-slate-50/50 pt-10 pb-24 antialiased dark:bg-[#070c19]/40">
      <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
        {/* Шапка секции */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Plane className="h-3.5 w-3.5" />
            <span>Поиск регулярных рейсов</span>
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#0f2043] sm:text-4xl dark:text-white">
            Авиабилеты по всему миру
          </h1>
        </div>

        {/* Панель поиска (Glassmorphism) */}
        <div className="mb-8 rounded-3xl border border-white/60 bg-white/50 p-6 shadow-xl backdrop-blur-2xl dark:border-slate-800/40 dark:bg-slate-900/40">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Откуда */}
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Откуда
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Plane className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full text-sm font-bold text-[#0f2043] outline-none dark:bg-transparent dark:text-white"
                  />
                </div>
                {errors.fromCity && (
                  <span className="absolute bottom-[-18px] left-2 text-[10px] font-bold text-red-500">
                    {errors.fromCity}
                  </span>
                )}
              </div>

              {/* Кнопка реверса городов */}
              <div className="absolute top-[98px] left-[23%] z-20 hidden lg:block">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-transform active:scale-95 dark:border-slate-700 dark:bg-slate-800"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </button>
              </div>

              {/* Куда */}
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Куда
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Plane className="h-4 w-4 rotate-90 text-slate-400" />
                  <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full text-sm font-bold text-[#0f2043] outline-none dark:bg-transparent dark:text-white"
                  />
                </div>
                {errors.toCity && (
                  <span className="absolute bottom-[-18px] left-2 text-[10px] font-bold text-red-500">
                    {errors.toCity}
                  </span>
                )}
              </div>

              {/* Дата */}
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Дата вылета
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-sm font-bold text-[#0f2043] outline-none dark:bg-transparent dark:text-white"
                  />
                </div>
              </div>

              {/* Пассажиры */}
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-700/50 dark:bg-slate-900">
                <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Пассажиры
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full text-sm font-bold text-[#0f2043] outline-none dark:bg-transparent dark:text-white"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="dark:bg-slate-900">
                        {num} Пассажир{num > 1 ? 'а' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSearching}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-blue-600 px-8 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>Найти рейсы</span>
              </button>
            </div>
          </form>
        </div>

        {/* Контент: Панель фильтров + Список результатов */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Левый сайдбар: Фильтры */}
          <div className="h-fit rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-black tracking-wide text-[#0f2043] uppercase dark:text-white">
                Фильтры
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {/* Сортировка */}
              <div>
                <label className="mb-2 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Сортировать по
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSortBy('price')}
                    className={`w-full rounded-xl px-3 py-2 text-left text-xs font-bold transition-all ${sortBy === 'price' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                  >
                    Сначала дешевые
                  </button>
                  <button
                    onClick={() => setSortBy('duration')}
                    className={`w-full rounded-xl px-3 py-2 text-left text-xs font-bold transition-all ${sortBy === 'duration' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                  >
                    Самые быстрые
                  </button>
                </div>
              </div>

              {/* Чекбоксы */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-2 dark:border-slate-800">
                <label className="group flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filterDirectOnly}
                    onChange={(e) => setFilterDirectOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-[#0f2043] dark:text-slate-400 dark:group-hover:text-white">
                    Только прямые рейсы
                  </span>
                </label>

                <label className="group flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filterWithBaggage}
                    onChange={(e) => setFilterWithBaggage(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-[#0f2043] dark:text-slate-400 dark:group-hover:text-white">
                    Включен багаж
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Правая часть: Список билетов */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <AnimatePresence mode="popLayout">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} onBook={setBookedFlight} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl border border-dashed border-slate-200 p-8 py-12 text-center text-slate-500 dark:border-slate-800"
                >
                  Рейсы, удовлетворяющие заданным фильтрам, не найдены.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Интерактивная модалка бронирования */}
      <AnimatePresence>
        {bookedFlight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Оверлей */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookedFlight(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Контент Окна */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <h3 className="mt-4 text-xl font-black text-[#0f2043] dark:text-white">
                  Место успешно забронировано!
                </h3>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Билет на рейс <span className="font-bold text-blue-600">{bookedFlight.id}</span> (
                  {bookedFlight.fromCode} → {bookedFlight.toCode}) сохранен в вашем личном кабинете.
                </p>

                <div className="mt-6 w-full rounded-2xl bg-slate-50 p-4 text-left dark:bg-slate-800/50">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                    <span>Пассажиры</span>
                    <span>К оплате</span>
                  </div>
                  <div className="mt-1 flex justify-between font-mono text-base font-black text-[#0f2043] dark:text-white">
                    <span>{passengers} Взрослый</span>
                    <span>{(bookedFlight.price * passengers).toLocaleString('ru-RU')} c.</span>
                  </div>
                </div>

                <button
                  onClick={() => setBookedFlight(null)}
                  className="mt-6 w-full rounded-full bg-slate-900 py-3 text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  Отлично
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
