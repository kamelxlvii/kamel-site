'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { VIDEOS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Video() {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const video = VIDEOS[active]

  return (
    <AnimatedSection id="video" className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-8 text-center"
        >
          Watch
        </motion.h2>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video overflow-hidden shadow-2xl ring-1 ring-[var(--accent)]/20"
        >
          <iframe
            key={video.id}
            src={`https://www.youtube.com/embed/${video.id}`}
            title={`KAMEL - ${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] border transition-colors',
                i === active
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                  : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              )}
            >
              {v.title}
            </button>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
