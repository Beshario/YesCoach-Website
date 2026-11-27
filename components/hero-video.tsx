'use client'

import { useEffect, useRef } from 'react'

// Silent promo loop. Respects reduced motion: shows the poster and controls instead of autoplaying.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      video.controls = true
    } else {
      video.play().catch(() => {
        video.controls = true
      })
    }
  }, [])

  return (
    <video
      ref={ref}
      src="/video/yescoach-promo.mp4"
      poster="/video/yescoach-promo-poster.webp"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="YesCoach in 28 seconds: log a set and see the muscles it worked, your day on a body map, import a plan from an AI chat, PRs called out when you finish, and your strength trend."
      className="w-[270px] aspect-[9/16] rounded-[28px] shadow-[0_24px_80px_-30px_rgba(0,0,0,0.45)] bg-[#0a1020]"
    />
  )
}
