import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avia-travel.club'),
  title: {
    default: 'Avia Travel Club — Путешествия Переосмысленные',
    template: '%s | Avia Travel Club',
  },
  description:
    'Умный поиск авиабилетов и маршрутов в реальном времени. Максимальная скорость и простота.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Avia Travel Club',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col bg-[#0A192F]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
