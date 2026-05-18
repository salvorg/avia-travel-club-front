'use client';

import React, { useEffect, useRef } from 'react';

// ============================================================================
// CONFIGURATION MATRIX: Полный контроль линий и летающих самолётов
// ============================================================================
const TRACKS_CONFIG = {
  glow: {
    shadowBlur: 35, // Радиус размытия неонового свечения линий
    canvasOpacity: 0.9, // Общая прозрачность слоя Canvas
  },
  planes: {
    size: 24, // Размер самолёта в пикселях (увеличено для теста)
    speed: 0.0015, // Скорость движения по линии (приращение параметра t за кадр)
    countPerTrack: 2, // Количество самолётов на ОДИН трек
    shadowBlur: 20, // Сила неонового свечения самого самолёта
  },
  lines: [
    {
      id: 'cyan-track',
      startPct: { x: -0.1, y: 0.2 },
      cp1Pct: { x: 0.3, y: -0.05 },
      cp2Pct: { x: 0.6, y: 0.7 },
      endPct: { x: 1.1, y: 0.5 },
      rangeX: 90,
      rangeY: 90,
      speedMin: 0.002,
      speedMax: 0.005,
      lineWidth: 4.0,
      color: 'rgba(0, 242, 254, 0.45)',
      planeColor: '#00f2fe', // Яркий неоновый бирюзовый
      shadowColor: 'rgba(0, 242, 254, 0.9)',
    },
    {
      id: 'purple-track',
      startPct: { x: 0.1, y: 1.1 },
      cp1Pct: { x: 0.4, y: 0.5 },
      cp2Pct: { x: 0.5, y: 0.2 },
      endPct: { x: 1.1, y: -0.1 },
      rangeX: 140,
      rangeY: 110,
      speedMin: 0.001,
      speedMax: 0.004,
      lineWidth: 4.5,
      color: 'rgba(168, 85, 247, 0.50)',
      planeColor: '#c084fc', // Неоновый фиолетовый
      shadowColor: 'rgba(168, 85, 247, 0.8)',
    },
    {
      id: 'orange-track',
      startPct: { x: 0.2, y: -0.1 },
      cp1Pct: { x: 0.2, y: 0.4 },
      cp2Pct: { x: 0.8, y: 0.6 },
      endPct: { x: 0.9, y: 1.1 },
      rangeX: 110,
      rangeY: 130,
      speedMin: 0.003,
      speedMax: 0.006,
      lineWidth: 5.2,
      color: 'rgba(255, 126, 33, 0.35)',
      planeColor: '#ff9742', // Неоновый оранжевый
      shadowColor: 'rgba(255, 126, 33, 0.7)',
    },
  ],
};

interface BezierPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  angleX: number;
  angleY: number;
  speedX: number;
  speedY: number;
  rangeX: number;
  rangeY: number;
}

interface PlaneInstance {
  t: number;
  offset: number;
}

interface RuntimeTrack {
  start: BezierPoint;
  cp1: BezierPoint;
  cp2: BezierPoint;
  end: BezierPoint;
  color: string;
  planeColor: string;
  shadowColor: string;
  lineWidth: number;
  planes: PlaneInstance[];
}

// Идеально отцентрованный векторный путь самолёта (ось носа направлена строго вправо по оси X на 0 радиан)
const PLANE_SVG_DATA =
  'M 14 0 ' +
  'C 12 -1.5, 9 -2, 6 -2 ' +
  'L 2 -12 C 1 -13, -1 -13, -1 -12 L 1 -2 ' +
  'L -6 -2 ' +
  'L -9 -6 C -9.5 -6.5, -10.5 -6.5, -10.5 -5.5 L -9.5 -1.5 ' +
  'L -11 0 ' +
  'L -9.5 1.5 ' +
  'L -10.5 5.5 C -10.5 6.5, -9.5 6.5, -9 -6 L -6 2 ' +
  'L -2 2 ' +
  'L -1 12 C -1 13, 1 13, 2 12 L 1 2 ' +
  'L 6 2 ' +
  'C 9 2, 12 1.5, 14 0 Z';

export function AnimatedBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const planePath = new Path2D(PLANE_SVG_DATA);
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const initPoint = (
      pct: { x: number; y: number },
      rX: number,
      rY: number,
      sMin: number,
      sMax: number
    ): BezierPoint => ({
      x: width * pct.x,
      y: height * pct.y,
      baseX: width * pct.x,
      baseY: height * pct.y,
      angleX: Math.random() * Math.PI * 2,
      angleY: Math.random() * Math.PI * 2,
      speedX: sMin + Math.random() * (sMax - sMin),
      speedY: sMin + Math.random() * (sMax - sMin),
      rangeX: rX,
      rangeY: rY,
    });

    const runtimeTracks: RuntimeTrack[] = TRACKS_CONFIG.lines.map((l) => {
      const planes: PlaneInstance[] = [];
      for (let i = 0; i < TRACKS_CONFIG.planes.countPerTrack; i++) {
        planes.push({
          t: i / TRACKS_CONFIG.planes.countPerTrack, // Равномерный старт вдоль траектории
          offset: Math.random() * 0.1,
        });
      }

      return {
        start: initPoint(l.startPct, l.rangeX, l.rangeY, l.speedMin, l.speedMax),
        cp1: initPoint(l.cp1Pct, l.rangeX, l.rangeY, l.speedMin, l.speedMax),
        cp2: initPoint(l.cp2Pct, l.rangeX, l.rangeY, l.speedMin, l.speedMax),
        end: initPoint(l.endPct, l.rangeX, l.rangeY, l.speedMin, l.speedMax),
        color: l.color,
        planeColor: l.planeColor,
        shadowColor: l.shadowColor,
        lineWidth: l.lineWidth,
        planes,
      };
    });

    const updatePoint = (p: BezierPoint) => {
      p.angleX += p.speedX;
      p.angleY += p.speedY;
      p.x = p.baseX + Math.sin(p.angleX) * p.rangeX;
      p.y = p.baseY + Math.cos(p.angleY) * p.rangeY;
    };

    const getBezierXY = (
      t: number,
      p0: BezierPoint,
      p1: BezierPoint,
      p2: BezierPoint,
      p3: BezierPoint
    ) => {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
      };
    };

    const getBezierDerivativeXY = (
      t: number,
      p0: BezierPoint,
      p1: BezierPoint,
      p2: BezierPoint,
      p3: BezierPoint
    ) => {
      const mt = 1 - t;
      return {
        dx: 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
        dy: 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
      };
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      runtimeTracks.forEach((track) => {
        updatePoint(track.start);
        updatePoint(track.cp1);
        updatePoint(track.cp2);
        updatePoint(track.end);

        // 1. Отрисовка треков-линий
        ctx.beginPath();
        ctx.moveTo(track.start.x, track.start.y);
        ctx.bezierCurveTo(
          track.cp1.x,
          track.cp1.y,
          track.cp2.x,
          track.cp2.y,
          track.end.x,
          track.end.y
        );

        ctx.shadowBlur = TRACKS_CONFIG.glow.shadowBlur;
        ctx.shadowColor = track.shadowColor;
        ctx.lineWidth = track.lineWidth;
        ctx.lineCap = 'round';

        const lineGrad = ctx.createLinearGradient(
          track.start.x,
          track.start.y,
          track.end.x,
          track.end.y
        );
        lineGrad.addColorStop(0, 'rgba(255,255,255,0)');
        lineGrad.addColorStop(0.15, track.color);
        lineGrad.addColorStop(0.85, track.color);
        lineGrad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.strokeStyle = lineGrad;
        ctx.stroke();

        // 2. Отрисовка самолётов
        track.planes.forEach((plane) => {
          plane.t += TRACKS_CONFIG.planes.speed;
          if (plane.t > 1) plane.t = 0;

          const pos = getBezierXY(plane.t, track.start, track.cp1, track.cp2, track.end);
          const deriv = getBezierDerivativeXY(
            plane.t,
            track.start,
            track.cp1,
            track.cp2,
            track.end
          );
          const angle = Math.atan2(deriv.dy, deriv.dx);

          // Рассчитываем альфа-канал, чтобы самолёты растворялись вместе с линией на краях экрана
          let planeOpacity = 1;
          if (plane.t < 0.15) planeOpacity = plane.t / 0.15;
          if (plane.t > 0.85) planeOpacity = (1 - plane.t) / 0.15;

          if (planeOpacity <= 0) return;

          ctx.save();
          ctx.translate(pos.x, pos.y);

          ctx.rotate(angle);

          const scale = TRACKS_CONFIG.planes.size / 24;
          ctx.scale(scale, scale);

          ctx.shadowBlur = TRACKS_CONFIG.planes.shadowBlur;
          ctx.shadowColor = track.shadowColor;
          ctx.fillStyle = track.planeColor;
          ctx.globalAlpha = planeOpacity;

          ctx.fill(planePath);
          ctx.restore();
        });
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="bg-avia-design pointer-events-none fixed inset-0 -z-50 h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ opacity: TRACKS_CONFIG.glow.canvasOpacity }}
        className="absolute inset-0 h-full w-full mix-blend-screen"
      />
    </div>
  );
}
