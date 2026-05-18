'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightLeft,
  CheckCircle,
  Loader2,
  Plane,
  Search,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react';
import { Flight, FlightSearchSchema } from '@/types/flights';
import { FlightCard } from '@/components/sections/flights/FlightCard';
import { DatePickerField } from '@/components/sections/flights/DatePickerField';
import { PassengerField } from '@/components/sections/flights/PassengerField';

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

const CITY_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?q=80&w=2000',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000',
];

export default function FlightsPage(): React.JSX.Element {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fromCity, setFromCity] = useState('Бишкек');
  const [toCity, setToCity] = useState('Москва');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 15));
  const [passengers, setPassengers] = useState(2);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [filterDirectOnly, setFilterDirectOnly] = useState(false);
  const [filterWithBaggage, setFilterWithBaggage] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [bookedFlight, setBookedFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % CITY_BACKGROUNDS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // const validation = FlightSearchSchema.safeParse({ fromCity, toCity, selectedDate, passengers });
    //
    // if (!validation.success) {
    //   const fieldErrors: Record<string, string> = {};
    //   validation.error.errors.forEach((err) => {
    //     if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    //   });
    //   setErrors(fieldErrors);
    //   return;
    // }

    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((flight) => {
      if (filterDirectOnly && !flight.isDirect) return false;
      if (filterWithBaggage && !flight.hasBaggage) return false;
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
    }).sort((a, b) =>
      sortBy === 'price' ? a.price - b.price : a.durationMinutes - b.durationMinutes
    );
  }, [filterDirectOnly, filterWithBaggage, sortBy, fromCity, toCity]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black antialiased">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${CITY_BACKGROUNDS[currentBgIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90%] px-4 pt-26 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-blue-400 backdrop-blur-xl">
            <Plane className="h-3.5 w-3.5" />
            <span>ПОИСК РЕЙСОВ</span>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white drop-shadow-2xl sm:text-5xl">
            Авиабилеты по всему миру
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-[3rem] border border-white/10 bg-black/40 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="group relative rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10">
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Откуда
              </label>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-xl font-black tracking-tighter text-white outline-none"
                  placeholder="Город"
                />
              </div>
              {errors.fromCity && (
                <span className="absolute bottom-[-18px] left-4 text-[10px] font-bold text-red-400">
                  {errors.fromCity}
                </span>
              )}
            </div>

            <div className="absolute top-[37%] left-[19.5%] z-20 hidden lg:block">
              <motion.button
                type="button"
                onClick={handleSwapCities}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 shadow-2xl backdrop-blur-xl transition-all hover:border-blue-400/50 hover:bg-blue-500/20"
              >
                <ArrowRightLeft className="h-3.5 w-3.5 text-blue-400" />
              </motion.button>
            </div>

            <div className="group relative rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10">
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Куда
              </label>
              <div className="flex items-center gap-3">
                <Plane className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-xl font-black tracking-tighter text-white outline-none"
                  placeholder="Город"
                />
              </div>
              {errors.toCity && (
                <span className="absolute bottom-[-18px] left-4 text-[10px] font-bold text-red-400">
                  {errors.toCity}
                </span>
              )}
            </div>

            <DatePickerField value={selectedDate} onChange={setSelectedDate} />
            <PassengerField value={passengers} onChange={setPassengers} />

            <motion.button
              type="submit"
              disabled={isSearching}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-[2.2rem] border border-blue-400/20 bg-blue-600 py-4 text-sm font-black text-white uppercase shadow-2xl shadow-blue-500/30 transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>Поиск</span>
            </motion.button>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="h-fit rounded-[2.5rem] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <SlidersHorizontal className="h-4 w-4 text-blue-400" />
              <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase">Фильтры</h3>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  Сортировать по
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSortBy('price')}
                    className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold tracking-wider uppercase transition-all ${sortBy === 'price' ? 'border border-blue-400/30 bg-blue-500/20 text-blue-400' : 'border border-transparent text-white/60 hover:bg-white/5'}`}
                  >
                    Сначала дешевые
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('duration')}
                    className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold tracking-wider uppercase transition-all ${sortBy === 'duration' ? 'border border-blue-400/30 bg-blue-500/20 text-blue-400' : 'border border-transparent text-white/60 hover:bg-white/5'}`}
                  >
                    Самые быстрые
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filterDirectOnly}
                    onChange={(e) => setFilterDirectOnly(e.target.checked)}
                    className="h-5 w-5 rounded-lg border-white/30 bg-white/5 text-blue-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-white/60 transition-colors group-hover:text-white">
                    Только прямые рейсы
                  </span>
                </label>
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filterWithBaggage}
                    onChange={(e) => setFilterWithBaggage(e.target.checked)}
                    className="h-5 w-5 rounded-lg border-white/30 bg-white/5 text-blue-600 focus:ring-0"
                  />
                  <span className="text-xs font-bold text-white/60 transition-colors group-hover:text-white">
                    Включен багаж
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <AnimatePresence mode="popLayout">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FlightCard flight={flight} onBook={setBookedFlight} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[2.5rem] border border-dashed border-white/20 bg-white/5 p-12 py-16 text-center backdrop-blur-xl"
                >
                  <Plane className="mx-auto mb-4 h-12 w-12 animate-pulse text-white/20" />
                  <p className="font-bold tracking-widest text-white/40 uppercase">
                    Рейсы не найдены
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {bookedFlight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookedFlight(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/20 bg-black/80 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-2xl"
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>
                <h3 className="mt-6 text-2xl font-black text-white">Успешно забронировано!</h3>
                <p className="mt-3 text-xs font-medium text-white/50">
                  Билет на рейс <span className="font-bold text-blue-400">{bookedFlight.id}</span>{' '}
                  сохранен в личном кабинете
                </p>
                <div className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                    <span>Пассажиры</span>
                    <span>К оплате</span>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-lg font-black text-white">
                    <span>{passengers} чел.</span>
                    <span>{(bookedFlight.price * passengers).toLocaleString('ru-RU')} с.</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => setBookedFlight(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full rounded-full bg-white py-4 text-xs font-black text-black uppercase"
                >
                  Отлично
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
