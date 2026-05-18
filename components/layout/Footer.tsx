'use client';

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

type Schedule = {
  days: string;
  hours: string;
};

type Branch = {
  address: string;
  phones: string[];
  schedule: Schedule[];
};

const BRANCHES: Branch[] = [
  {
    address: 'ул. Насирдина Исанова, 102',
    phones: ['+996 552 61 50 50', '+996 312 31 13 00'],
    schedule: [
      { days: 'Пн–Чт', hours: '10:00–19:00' },
      { days: 'Пт', hours: '09:00–17:00' },
    ],
  },
  {
    address: 'ул. Тыныстанова, 62',
    phones: ['+996 312 302 300', '+996 559 61 50 50'],
    schedule: [
      { days: 'Пн–Чт', hours: '09:00–18:00' },
      { days: 'Пт', hours: '09:00–17:00' },
    ],
  },
  {
    address: 'пр-кт Манаса, 57',
    phones: ['+996 312 31 13 00', '+996 552 61 50 50'],
    schedule: [
      { days: 'Пн–Чт', hours: '09:00–18:00' },
      { days: 'Пт', hours: '09:00–17:00' },
    ],
  },
];

const MULTI_CHANNELS = ['+996 312 302 302', '+996 559 302 302'];

const cleanPhoneForLink = (phone: string): string => phone.replace(/[^+\d]/g, '');

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-[#0b1329] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {BRANCHES.map((branch, index) => (
            <div
              key={index}
              className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4"
            >
              <div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <h3 className="text-xs font-bold tracking-wider uppercase">{branch.address}</h3>
                </div>

                <div className="mt-3 flex flex-col space-y-1 pl-6">
                  {branch.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${cleanPhoneForLink(phone)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-[#ff7e21]"
                    >
                      <Phone className="h-3 w-3 opacity-60" />
                      <span className="tabular-nums">{phone}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-2 pl-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                  <Clock className="h-3 w-3" />
                  <span>Режим работы:</span>
                </div>
                <div className="mt-1 space-y-0.5 text-[11px] font-medium text-slate-400">
                  {branch.schedule.map((item, sIndex) => (
                    <div key={sIndex} className="flex justify-between">
                      <span>{item.days}</span>
                      <span className="font-semibold text-slate-200 tabular-nums">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col justify-between space-y-4 p-2">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Колл-центр 24/7
              </h3>
              <div className="mt-2 flex flex-col space-y-1">
                {MULTI_CHANNELS.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${cleanPhoneForLink(phone)}`}
                    className="text-sm font-black tracking-tight text-white transition-colors hover:text-[#ff7e21]"
                  >
                    <span className="tabular-nums">{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-slate-400 transition-colors hover:bg-pink-950/40 hover:text-pink-400"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-slate-400 transition-colors hover:bg-blue-950/40 hover:text-blue-400"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-slate-400 transition-colors hover:bg-sky-950/40 hover:text-sky-400"
                  aria-label="Telegram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.7-2.48 2.75-2.7.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.03-.1.02-1.69 1.07-4.77 3.15-.45.3-.86.46-1.22.45-.4 0-1.17-.22-1.74-.41-.7-.23-1.25-.35-1.2-.74.03-.2.3-.41.82-.62 3.2-1.39 5.34-2.31 6.42-2.75 3.07-1.27 3.7-1.49 4.12-1.5.09 0 .3.02.43.13.11.1.14.23.15.33v.21z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/60 pt-4 text-center">
          <p className="text-[11px] font-medium text-slate-500">
            Работаем на рынке авиабилетов и туризма Кыргызстана с 2000 года.
          </p>
        </div>
      </div>
    </footer>
  );
}
