'use client';

import { useEffect, useRef } from 'react';

export const Routes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Route points (simplified world map coordinates)
    const routes = [
      // North America to Europe
      { from: { x: 0.2, y: 0.35 }, to: { x: 0.5, y: 0.3 }, color: '#F58220' },
      // Europe to Asia
      { from: { x: 0.5, y: 0.3 }, to: { x: 0.75, y: 0.35 }, color: '#64B5F6' },
      // Asia to Australia
      { from: { x: 0.75, y: 0.35 }, to: { x: 0.8, y: 0.65 }, color: '#F58220' },
      // North America to Asia
      { from: { x: 0.2, y: 0.35 }, to: { x: 0.75, y: 0.35 }, color: '#64B5F6' },
      // Europe to Africa
      { from: { x: 0.5, y: 0.3 }, to: { x: 0.5, y: 0.55 }, color: '#F58220' },
    ];

    let animationFrame = 0;

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw routes
      routes.forEach((route, index) => {
        const progress = (Math.sin(animationFrame * 0.01 + index) + 1) / 2;

        const x1 = route.from.x * w;
        const y1 = route.from.y * h;
        const x2 = route.to.x * w;
        const y2 = route.to.y * h;

        // Control point for curve
        const cpX = (x1 + x2) / 2;
        const cpY = Math.min(y1, y2) - 50;

        // Draw curved line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpX, cpY, x2, y2);
        ctx.strokeStyle = route.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        ctx.stroke();

        // Draw animated dot
        const t = progress;
        const dotX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpX + t * t * x2;
        const dotY = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpY + t * t * y2;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = route.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fillStyle = route.color;
        ctx.globalAlpha = 0.2;
        ctx.fill();

        // Draw destination markers
        ctx.beginPath();
        ctx.arc(x1, y1, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.6;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y2, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });

      animationFrame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-[#0A192F]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Визуализация маршрутов
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Интерактивная карта популярных направлений по всему миру
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a2942] to-[#0f1f35] p-8 backdrop-blur-sm">
            {/* Canvas for animated routes */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              style={{ width: '100%', height: '100%' }}
            />

            {/* Decorative grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />

            {/* Legend */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-lg bg-black/30 px-4 py-2 backdrop-blur-sm">
                <div className="h-3 w-3 rounded-full bg-[#F58220]" />
                <span className="text-sm text-white/80">Прямые рейсы</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-black/30 px-4 py-2 backdrop-blur-sm">
                <div className="h-3 w-3 rounded-full bg-[#64B5F6]" />
                <span className="text-sm text-white/80">С пересадками</span>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute top-8 right-8 rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <div className="mb-2 text-sm text-white/60">Активных маршрутов</div>
              <div className="text-3xl font-bold text-white">500+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
