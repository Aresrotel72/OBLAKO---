'use client'

import { useEffect, useRef } from 'react'

interface BlobBgProps {
  /** Набор цветов для блобов */
  colors?: string[]
  /** Количество блобов */
  count?: number
  /** Интенсивность blur (px) */
  blur?: number
  /** Opacity контейнера */
  opacity?: number
  className?: string
}

// Генерируем стабильные позиции по индексу (без Math.random на сервере)
const POSITIONS = [
  { x: 20, y: 20, size: 45, dur: 18, delay: 0 },
  { x: 70, y: 15, size: 38, dur: 22, delay: 3 },
  { x: 55, y: 65, size: 50, dur: 16, delay: 6 },
  { x: 15, y: 70, size: 35, dur: 25, delay: 1 },
  { x: 80, y: 60, size: 42, dur: 20, delay: 9 },
  { x: 45, y: 40, size: 30, dur: 14, delay: 4 },
]

export default function BlobBg({
  colors = ['#0071e3', '#5ac8fa', '#34aadc'],
  count = 4,
  blur = 80,
  opacity = 0.18,
  className = '',
}: BlobBgProps) {
  const blobs = POSITIONS.slice(0, Math.min(count, POSITIONS.length))

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {blobs.map((b, i) => {
        const color = colors[i % colors.length]
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}vw`,
              height: `${b.size}vw`,
              maxWidth: `${b.size * 8}px`,
              maxHeight: `${b.size * 8}px`,
              background: `radial-gradient(circle, ${color}cc 0%, ${color}44 50%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              opacity,
              transform: 'translate(-50%, -50%)',
              animation: `blob-float-${i % 3} ${b.dur}s ${b.delay}s ease-in-out infinite`,
              willChange: 'transform',
            }}
          />
        )
      })}

      <style>{`
        @keyframes blob-float-0 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33%       { transform: translate(-44%, -58%) scale(1.08); }
          66%       { transform: translate(-56%, -44%) scale(0.94); }
        }
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33%       { transform: translate(-58%, -42%) scale(0.92); }
          66%       { transform: translate(-42%, -60%) scale(1.1); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-46%, -54%) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
