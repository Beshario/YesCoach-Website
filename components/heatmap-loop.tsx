'use client'

import { useEffect, useState } from 'react'

const FRAMES = [
  {
    src: '/blog/watch-a-lift-light-up/shot-b-heatmap-3sets.webp',
    alt: 'YesCoach live heatmap after 3 sets of bench press — chest and front delts warming',
  },
  {
    src: '/blog/watch-a-lift-light-up/shot-c-heatmap-7sets.webp',
    alt: 'YesCoach live heatmap after 7 sets — same chain, deeper red and orange',
  },
]

export function HeatmapLoop() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => setIdx(i => (i + 1) % FRAMES.length), 2400)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="relative w-full aspect-[500/844] bg-background">
      {FRAMES.map((f, i) => (
        <img
          key={f.src}
          src={f.src}
          alt={f.alt}
          width={500}
          height={844}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
