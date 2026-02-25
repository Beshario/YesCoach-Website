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
}: {
  dark: string
  light?: string
  alt: string
  className?: string
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Before mount: show dark (matches defaultTheme="dark")
  const src = mounted && resolvedTheme === 'light' && light ? light : dark

  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={2340}
      className={cn('w-full h-full object-cover', className)}
    />
  )
}
