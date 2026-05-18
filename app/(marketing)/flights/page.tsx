'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightLeft,
  Calendar as CalendarIcon,
  CheckCircle,
  Loader2,
  Plane,
  Search,
  SlidersHorizontal,
  Users,
  ChevronDown,
  MapPin,
  ChevronLeft,
  ChevronRight,
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

const CITY_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?q=80&w=2000',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000',
];

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function FlightsPage(): React.JSX.Element {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % CITY_BACKGROUNDS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const [fromCity, setFromCity] = useState('Бишкек');
  const [toCity, setToCity] = useState('Москва');

  // Работа с датой
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 15)); // Июнь 15, 2026
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(5); // Июнь
  const [currentYear, setCurrentYear] = useState(2026);

  const [passengers, setPassengers] = useState(2);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);

  const [filterDirectOnly, setFilterDirectOnly] = useState(false);
  const [filterWithBaggage, setFilterWithBaggage] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [bookedFlight, setBookedFlight] = useState<Flight | null>(null);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдаунов по клику вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  // Генерация дней для сетки календаря
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const shiftIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Корректировка под Пн-Вс
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: (number | null)[] = Array(shiftIndex).fill(null);
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  }, [currentMonth, currentYear]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const formattedDateString = useMemo(() => {
    return selectedDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [selectedDate]);

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
    }).sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      return 0;
    });
  }, [filterDirectOnly, filterWithBaggage, sortBy, fromCity, toCity]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black antialiased">
      {/* Background Slideshow */}
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
              className="animate-kenburns h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${CITY_BACKGROUNDS[currentBgIndex]})` }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
      </div>

      {/* Cloud Ornaments */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <motion.div
          animate={{ x: [-2000, 0] }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-100px] left-0 h-[500px] w-[4000px] bg-repeat-x opacity-20"
          style={{
            backgroundImage:
              'url("https://www.transparentpng.com/download/clouds/heavy-clouds-clipart-9.png")',
            backgroundSize: 'contain',
          }}
        />
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-150px] left-0 h-[600px] w-[4000px] bg-repeat-x opacity-30"
          style={{
            backgroundImage:
              'url("https://www.transparentpng.com/download/clouds/white-clouds-free-png-15.png")',
            backgroundSize: 'contain',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90%] px-4 pt-26 pb-24 sm:px-6 lg:px-8">
        {/* Title Block */}
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
          <p className="mt-2 text-sm font-bold tracking-wide text-white/40">
            Находите лучшие предложения от ведущих авиакомпаний
          </p>
        </motion.div>

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-[3rem] border border-white/10 bg-black/40 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* FROM */}
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

            {/* SWAP BUTTON */}
            <div className="absolute top-[124px] left-[18%] z-20 hidden lg:block">
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

            {/* TO */}
            <div className="group relative rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10">
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Куда
              </label>
              <div className="flex items-center gap-3">
                <Plane className="h-5 w-5 rotate-90 text-white/40 transition-colors group-hover:text-blue-400" />
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

            {/* CUSTOM DATE PICKER */}
            <div
              ref={datePickerRef}
              className="group relative cursor-pointer rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Дата вылета
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
                  <span className="truncate text-xl font-black tracking-tighter text-white">
                    {formattedDateString}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white/40 transition-all ${showDatePicker ? 'rotate-180' : ''}`}
                />
              </div>

              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-0 z-[160] mt-4 w-[290px] rounded-[2rem] border border-white/10 bg-black/85 p-4 shadow-2xl backdrop-blur-2xl lg:right-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 text-white/40 transition-colors hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-black tracking-widest text-white uppercase">
                        {MONTHS[currentMonth]} {currentYear}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 text-white/40 transition-colors hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                      {WEEKDAYS.map((d) => (
                        <span key={d} className="text-[9px] font-bold text-white/30 uppercase">
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, idx) => {
                        if (day === null) return <div key={`empty-${idx}`} />;

                        const isSelected =
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === currentMonth &&
                          selectedDate.getFullYear() === currentYear;

                        return (
                          <button
                            key={`day-${day}`}
                            type="button"
                            onClick={() => {
                              setSelectedDate(new Date(currentYear, currentMonth, day));
                              setShowDatePicker(false);
                            }}
                            className={`h-8 w-8 rounded-xl font-mono text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PASSENGERS */}
            <div
              ref={passengerRef}
              className="group relative cursor-pointer rounded-[2rem] border border-white/5 bg-white/5 px-6 py-4 transition-all hover:border-white/20 hover:bg-white/10"
              onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            >
              <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Пассажиры
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-white/40 transition-colors group-hover:text-blue-400" />
                  <span className="text-xl font-black tracking-tighter text-white">
                    {passengers} чел.
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-white/40 transition-all ${showPassengerDropdown ? 'rotate-180' : ''}`}
                />
              </div>

              <AnimatePresence>
                {showPassengerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full right-0 z-[150] mt-4 min-w-[140px] rounded-[1.5rem] border border-white/10 bg-black/85 p-2 shadow-2xl backdrop-blur-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setPassengers(num);
                          setShowPassengerDropdown(false);
                        }}
                        className={`mb-1 w-full rounded-xl px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all last:mb-0 ${
                          passengers === num
                            ? 'bg-blue-600 text-white'
                            : 'text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {num} чел.
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              disabled={isSearching}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-[2.2rem] border border-blue-400/20 bg-blue-600 py-4 text-sm font-black tracking-[0.1em] text-white uppercase shadow-2xl shadow-blue-500/30 transition-all hover:bg-blue-700 disabled:opacity-50 lg:col-span-1"
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

        {/* Filters and Search Results */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
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
                    className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold tracking-wider uppercase transition-all ${
                      sortBy === 'price'
                        ? 'border border-blue-400/30 bg-blue-500/20 text-blue-400'
                        : 'border border-transparent text-white/60 hover:bg-white/5'
                    }`}
                  >
                    Сначала дешевые
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('duration')}
                    className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold tracking-wider uppercase transition-all ${
                      sortBy === 'duration'
                        ? 'border border-blue-400/30 bg-blue-500/20 text-blue-400'
                        : 'border border-transparent text-white/60 hover:bg-white/5'
                    }`}
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
                    className="h-5 w-5 rounded-lg border-white/30 bg-white/5 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
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
                    className="h-5 w-5 rounded-lg border-white/30 bg-white/5 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-xs font-bold text-white/60 transition-colors group-hover:text-white">
                    Включен багаж
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Flight Cards list */}
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
                  <p className="mt-2 text-xs text-white/20">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
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
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-2xl shadow-emerald-500/20"
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-white">
                  Успешно забронировано!
                </h3>
                <p className="mt-3 text-xs font-medium text-white/50">
                  Билет на рейс <span className="font-bold text-blue-400">{bookedFlight.id}</span> (
                  {bookedFlight.fromCode} → {bookedFlight.toCode}) сохранен в личном кабинете
                </p>

                <div className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-xl">
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                    <span>Пассажиры</span>
                    <span>К оплате</span>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-lg font-black text-white">
                    <span>{passengers} взрослый</span>
                    <span>{(bookedFlight.price * passengers).toLocaleString('ru-RU')} с.</span>
                  </div>
                </div>

                <motion.button
                  onClick={() => setBookedFlight(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full rounded-full bg-white py-4 text-xs font-black tracking-[0.1em] text-black uppercase transition-all hover:bg-white/90"
                >
                  Отлично
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CursorOrnament />
    </main>
  );
}

function CursorOrnament() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-12 w-12 rounded-full border border-blue-400/30 blur-[2px]"
        animate={{ x: mousePos.x - 24, y: mousePos.y - 24 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 15, stiffness: 400 }}
      />
    </>
  );
}
