'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { TiltCard } from '@/components/ui/TiltCard'
import { MONACO, STREAMING_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Tracklist() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="music" className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-12 md:gap-16 items-start">
        {/* Cover */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm mx-auto md:max-w-none md:sticky md:top-28"
        >
          <div className="absolute -inset-4 bg-[var(--accent)]/10 blur-2xl" />
          <TiltCard className="shadow-2xl" tiltStrength={10}>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/monaco/painting-crop.jpg"
                alt="MONACO cover painting"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </TiltCard>
          <div className="mt-5 flex items-baseline justify-between text-[11px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
            <span>{MONACO.artist}</span>
            <span>{MONACO.releaseLabel}</span>
          </div>
        </motion.div>

        {/* Tracks */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-3">The Tape</p>
          <h2 className="font-display font-wide font-black italic text-5xl md:text-7xl tracking-tight text-[var(--accent)] leading-none">
            {MONACO.title}
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            8 tracks · {MONACO.runtime} · Out now
          </p>

          <ol className="mt-10 border-t border-[var(--border)]">
            {MONACO.tracks.map((track, i) => {
              const isFocus = track.title === MONACO.focusTrack
              return (
                <motion.li
                  key={track.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={cn(
                    'group flex items-center gap-4 md:gap-6 py-4 border-b border-[var(--border)]',
                    isFocus && 'bg-[var(--accent)]/[0.06] -mx-3 px-3'
                  )}
                >
                  <span className="w-6 text-xs tabular-nums text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={cn(
                        'font-display font-wide font-bold italic uppercase text-base md:text-xl tracking-wide',
                        isFocus ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                      )}
                    >
                      {track.title}
                    </span>
                    {'feat' in track && (
                      <span className="ml-3 text-[11px] uppercase tracking-widest text-[var(--text-tertiary)]">
                        w/ {track.feat}
                      </span>
                    )}
                  </span>
                  {'preview' in track && (
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event('player:play'))}
                      className="shrink-0 px-3 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                    >
                      ▶ Preview
                    </button>
                  )}
                </motion.li>
              )
            })}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            {STREAMING_LINKS.map(link => (
              <Button key={link.platform} href={link.url}>
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
