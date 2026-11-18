'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { MONACO, SITE, STREAMING_LINKS } from '@/lib/constants'
import { Countdown } from '@/components/ui/Countdown'
import { FloatingParticles } from '@/components/ui/FloatingParticles'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const spotify = STREAMING_LINKS.find(l => l.platform === 'spotify')!.url

  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion ? {} : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-5 md:px-10 pt-24 pb-20 overflow-hidden"
    >
      {/* Cover painting with parallax */}
      <motion.div
        style={shouldReduceMotion ? {} : { y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/monaco/painting-crop.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[30%_40%] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-[var(--background)]" />
      </motion.div>

      <FloatingParticles count={30} />

      <motion.div
        style={shouldReduceMotion ? {} : { opacity }}
        className="relative z-10 w-full max-w-5xl text-center"
      >
        <motion.div {...fadeUp(0.35)} className="relative mx-auto w-full max-w-[820px]">
          {/* Logo artwork sits on black; screen blend drops the black onto the painting */}
          <Image
            src="/images/monaco/logo-f2.png"
            alt={MONACO.title}
            width={1600}
            height={339}
            priority
            className="w-full h-auto mix-blend-screen"
          />
          {/* Helmet-visor light under the logo */}
          <div className="mx-auto mt-6 h-px w-2/3 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_18px_var(--accent-glow)] animate-visor" />
        </motion.div>

        <motion.p
          {...fadeUp(0.55)}
          className="mt-8 font-display font-wide font-black italic text-sm md:text-lg uppercase tracking-[0.25em] text-[var(--cream)]"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div {...fadeUp(0.7)} className="mt-12">
          <Countdown target={MONACO.releaseDate} />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[var(--text-tertiary)]">
            8 tracks · {MONACO.runtime} · {MONACO.releaseLabel}
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.85)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[48px] px-8 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-display font-wide font-black italic uppercase tracking-wider text-sm transition-colors"
          >
            Listen now
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('player:play'))}
            className="inline-flex items-center justify-center min-h-[48px] px-8 border border-[var(--accent)]/50 hover:border-[var(--accent)] text-[var(--accent)] font-display font-wide font-black italic uppercase tracking-wider text-sm transition-colors"
          >
            ▶ Hear {MONACO.focusTrack}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-6 z-10"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--text-tertiary)]" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
