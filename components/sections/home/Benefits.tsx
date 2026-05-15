const items = [
  'Умный поиск маршрутов',
  'Лучшие цены в реальном времени',
  'Актуальная доступность рейсов',
  'Гибкие маршруты и пересадки',
];

export function Benefits() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-3xl font-bold">Benefits Section</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item} className="rounded-3xl border p-6 shadow-sm">
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
