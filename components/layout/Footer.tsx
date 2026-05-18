'use client';

import React, { useMemo } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

type Branch = {
  address: string;
  phones: string[];
  schedule: string[];
};

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

function InstagramIcon({ className, ...props }: CustomIconProps): React.JSX.Element {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
    </svg>
  );
}

function FacebookIcon({ className, ...props }: CustomIconProps): React.JSX.Element {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  );
}

function TelegramIcon({ className, ...props }: CustomIconProps): React.JSX.Element {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.7-2.48 2.75-2.7.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.03-.1.02-1.69 1.07-4.77 3.15-.45.3-.86.46-1.22.45-.4 0-1.17-.22-1.74-.41-.7-.23-1.25-.35-1.2-.74.03-.2.3-.41.82-.62 3.2-1.39 5.34-2.31 6.42-2.75 3.07-1.27 3.7-1.49 4.12-1.5.09 0 .3.02.43.13.11.1.14.23.15.33v.21z" />
    </svg>
  );
}

const BRANCHES: Branch[] = [
  {
    address: 'ул. Насирдина Исанова, 102',
    phones: ['+996 552 61 50 50', '+996 312 31 13 00'],
    schedule: ['Пн-Чт: 10:00 - 19:00', 'Пт: 9:00 - 17:00'],
  },
  {
    address: 'ул. Тыныстанова, 62',
    phones: ['+996 312 302 300', '+996 559 61 50 50', '+996 556 61 50 50'],
    schedule: ['Пн-Чт: 9:00 - 18:00', 'Пт: 9:00 - 17:00'],
  },
  {
    address: 'пр-кт Манаса, 57',
    phones: ['+996 312 31 13 00', '+996 552 61 50 50'],
    schedule: ['Пн-Чт: 9:00 - 18:00', 'Пт: 9:00 - 17:00'],
  },
];

const MULTI_CHANNELS = ['+996 312 302 302', '+996 771 302 302', '+996 559 302 302'];

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com',
    icon: InstagramIcon,
    label: 'Instagram',
    hoverClass: 'hover:text-pink-400',
  },
  {
    href: 'https://facebook.com',
    icon: FacebookIcon,
    label: 'Facebook',
    hoverClass: 'hover:text-blue-400',
  },
  { href: 'https://t.me', icon: TelegramIcon, label: 'Telegram', hoverClass: 'hover:text-sky-400' },
];

const cleanPhoneForLink = (phone: string): string => phone.replace(/[^+\d]/g, '');

export default function Footer(): React.JSX.Element {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full border-t border-slate-900 bg-[#070c19] text-slate-100 antialiased">
      <div className="mx-auto max-w-[90%] px-4 pt-12 pb-6 tracking-wider sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Колонки филиалов */}
          {BRANCHES.map((branch, index) => (
            <div key={index} className="flex flex-col space-y-3.5">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                <h3 className="text-xs tracking-wide uppercase">{branch.address}</h3>
              </div>

              <div className="flex flex-col space-y-1.5 pl-5.5 tracking-wider">
                {branch.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${cleanPhoneForLink(phone)}`}
                    className="inline-flex items-center gap-2 text-xs text-slate-300 tabular-nums transition-colors hover:text-[#ff7e21]"
                  >
                    <Phone className="h-3 w-3 opacity-40" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              {/* График работы филиала */}
              <div className="pt-2.5 pl-5.5 tracking-wider">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-100 uppercase">
                  <Clock className="h-3 w-3" />
                  <span>График работы:</span>
                </div>
                <div className="mt-1 flex flex-col space-y-0.5 text-xs text-slate-300">
                  {branch.schedule.map((timeLine, sIdx) => (
                    <span key={sIdx}>{timeLine}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Четвертая колонка: Многоканальные телефоны и соцсети */}
          <div className="flex flex-col justify-between space-y-6 sm:col-span-2 lg:col-span-1 lg:space-y-0">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f58220] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f58220]" />
                </span>
                <h3 className="text-xs tracking-wider uppercase">Многоканальные</h3>
              </div>

              <div className="flex flex-col space-y-1.5 pl-3.5">
                {MULTI_CHANNELS.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${cleanPhoneForLink(phone)}`}
                    className="inline-flex items-center gap-2 text-xs tracking-wider text-slate-300 tabular-nums transition-colors hover:text-[#ff7e21]"
                  >
                    <Phone className="h-3 w-3 text-[#f58220] opacity-50" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Блок социальных сетей внизу четвертой колонки */}
            <div className="pt-2 pl-3.5">
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-slate-500 transition-colors duration-200 ${social.hoverClass}`}
                      aria-label={social.label}
                    >
                      <IconComponent className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Сдержанный нижний блок */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-900 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] font-medium text-slate-600">
            &copy; {currentYear} Avia Travel Club. Все права защищены.
          </p>
          <p className="text-[11px] font-medium text-slate-600">
            Работаем на рынке авиабилетов и туризма Кыргызстана с 2000 года.
          </p>
        </div>
      </div>
    </footer>
  );
}
