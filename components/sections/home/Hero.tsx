import { AnimatedBackground } from './AnimatedBackground';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-xl">
            Smart Flight Platform
          </p>

          <h1 className="max-w-xl text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-7xl">
            Путешествия.
            <br />
            Переосмысленные.
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
            Умный поиск авиабилетов и маршрутов в реальном времени с максимальной скоростью,
            простотой и контролем.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="bg-main-orange rounded-2xl px-8 py-4 font-semibold text-white shadow-xl">
              Найти рейсы
            </button>
            <button className="rounded-2xl border border-white/40 px-8 py-4 font-semibold text-white">
              Исследовать маршруты
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {['Нью-Йорк → Париж', '07:30 → 13:00', 'Прямой рейс', '$350'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/90 p-5 text-sm font-medium shadow-md">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
