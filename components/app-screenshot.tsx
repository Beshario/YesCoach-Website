'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function AppScreenshot({
  dark,
  light,
  alt,
  className,
  priority,
}: {
  dark: string
  light?: string
  alt: string
  className?: string
  priority?: boolean
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Before mount: show light (matches defaultTheme="light")
  const src = !mounted || resolvedTheme === 'light' ? (light ?? dark) : dark

  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={2340}
      className={cn('w-full h-full object-cover', className)}
      priority={priority}
    />
  )
}
