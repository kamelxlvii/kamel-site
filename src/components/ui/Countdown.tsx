'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CountdownProps {
  target: string
  className?: string
}

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now())
  return {
    done: ms === 0,
    parts: [
      { label: 'Days', value: Math.floor(ms / 86_400_000) },
      { label: 'Hrs', value: Math.floor(ms / 3_600_000) % 24 },
      { label: 'Min', value: Math.floor(ms / 60_000) % 60 },
      { label: 'Sec', value: Math.floor(ms / 1000) % 60 },
    ],
  }
}

export function Countdown({ target, className }: CountdownProps) {
  const targetMs = Date.parse(target)
  // Render placeholders on the server so hydration matches, then tick on the client
  const [state, setState] = useState<ReturnType<typeof remaining> | null>(null)

  useEffect(() => {
    setState(remaining(targetMs))
    const id = setInterval(() => setState(remaining(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  if (state?.done) {
    return (
      <p className={cn('font-display font-wide font-black italic text-3xl md:text-5xl text-[var(--accent)]', className)}>
        OUT NOW
      </p>
    )
  }

  return (
    <div className={cn('flex items-start justify-center gap-4 md:gap-8', className)} aria-label="Countdown to release">
      {(state?.parts ?? remaining(0).parts.map(p => ({ ...p, value: null }))).map((part, i) => (
        <div key={part.label} className="flex items-start gap-4 md:gap-8">
          {i > 0 && <span className="font-display text-2xl md:text-4xl text-[var(--text-muted)] leading-none">:</span>}
          <div className="text-center min-w-[3ch]">
            <span className="block font-display font-wide font-black italic text-3xl md:text-5xl leading-none text-[var(--accent)] tabular-nums">
              {part.value === null ? '--' : String(part.value).padStart(2, '0')}
            </span>
            <span className="block mt-2 text-[10px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
              {part.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
