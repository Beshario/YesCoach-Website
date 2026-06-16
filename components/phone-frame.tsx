import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>

      {/* Decorative side buttons */}
      <div aria-hidden="true" className="absolute -left-[5px] top-[19%] w-[5px] h-7 rounded-l-sm bg-border" />
      <div aria-hidden="true" className="absolute -left-[5px] top-[27%] w-[5px] h-7 rounded-l-sm bg-border" />
      <div aria-hidden="true" className="absolute -right-[5px] top-[23%] w-[5px] h-11 rounded-r-sm bg-border" />

      {/* Chassis */}
      <div className="relative rounded-[2.5rem] border-[6px] border-border bg-card overflow-hidden shadow-2xl">

        {/* Top bezel with pill camera (decorative) */}
        <div aria-hidden="true" className="h-7 bg-card flex items-center justify-center">
          <div className="w-[68px] h-[22px] rounded-full bg-black/70 flex items-center justify-center">
            <div className="w-[7px] h-[7px] rounded-full bg-white/10" />
          </div>
        </div>

        {/* Screen */}
        {children}

        {/* Bottom bezel with home indicator (decorative) */}
        <div aria-hidden="true" className="h-5 bg-card flex items-end justify-center pb-1.5">
          <div className="w-24 h-1 rounded-full bg-foreground/20" />
        </div>

      </div>
    </div>
  )
}
