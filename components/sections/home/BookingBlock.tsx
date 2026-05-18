import { ArrowRightLeft, Calendar, Plane, Users } from 'lucide-react';
import React, { useState } from 'react';

export default function BookingBlock() {
  const [fromCity, setFromCity] = useState('New York');
  const [toCity, setToCity] = useState('Paris');

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-3xl border border-white/50 bg-white/50 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-2xl">
        {/*<h2 className="mb-4 text-xl font-bold text-[#0f2043]">Поиск направлений</h2>*/}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Откуда */}
          <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-inner">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Из
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Plane className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full text-sm font-semibold text-[#0f2043] outline-none"
              />
            </div>
          </div>

          {/* Куда */}
          <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-inner">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              В
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Plane className="h-4 w-4 rotate-90 text-slate-400" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full text-sm font-semibold text-[#0f2043] outline-none"
              />
            </div>
          </div>

          {/* Дата */}
          <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-inner">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Дата
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-[#0f2043]">Jan 22, 2026</span>
            </div>
          </div>

          <div className="relative rounded-xl border border-slate-200 bg-white p-3 shadow-inner">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Пассажиры
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-[#0f2043]">2 Adults</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            timeStart: '08:30',
            timeEnd: '15:00',
            duration: '2h 38m',
            price: '$450',
            from: 'JFK',
            to: 'CDG',
          },
          {
            timeStart: '10:30',
            timeEnd: '12:30',
            duration: '22h 25m',
            price: '$780',
            from: 'JFK',
            to: 'ORY',
          },
        ].map((flight, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  {flight.from} → {flight.to}
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-xl font-bold text-[#0f2043]">{flight.timeStart}</span>
                  <ArrowRightLeft className="h-3 w-3 text-slate-400" />
                  <span className="text-xl font-bold text-[#0f2043]">{flight.timeEnd}</span>
                </div>
                <span className="mt-1 block text-[11px] font-medium text-slate-400">
                  Время полета • {flight.duration}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-black text-[#0f2043]">{flight.price}</span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
                  Arriv
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
