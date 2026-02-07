'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { TiltCard } from '@/components/ui/TiltCard'
import { STREAMING_LINKS, LATEST_RELEASE } from '@/lib/constants'

const platformIcons: Record<string, React.ReactNode> = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.228-2.403-.96-.63-.767-.7-1.636-.33-2.5.39-.914 1.15-1.397 2.06-1.612.592-.14 1.196-.14 1.8-.14.315 0 .315 0 .315-.315V7.06c0-.03 0-.058-.006-.088a.097.097 0 00-.082-.082c-.026-.003-.052 0-.078-.002h-.02c-1.157.236-2.312.48-3.47.718l-2.97.61c-.013.003-.027.005-.04.01-.127.038-.166.09-.172.217v.006l-.002.068V17.49c-.001.365-.02.73-.114 1.086-.21.79-.637 1.404-1.38 1.768-.41.2-.856.3-1.306.355-.657.08-1.3.02-1.895-.315a2.124 2.124 0 01-1.11-1.315c-.2-.62-.15-1.23.127-1.816.384-.816 1.063-1.316 1.904-1.586.478-.152.97-.198 1.468-.198.217 0 .437.006.653.017.224.01.224.01.224-.212V6.05c0-.023 0-.045.003-.068.013-.144.07-.21.21-.246.027-.007.055-.01.083-.017l1.096-.225.664-.137c1.133-.232 2.268-.463 3.4-.696l1.7-.35c.53-.108 1.062-.22 1.592-.325.34-.067.682-.133 1.022-.202.142-.03.26.018.298.16.016.06.02.122.02.183v5.56z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
}

export function Music() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="music" className="px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Album Art */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-sm mx-auto md:max-w-none"
          >
            {/* Glow effect behind album */}
            <div className="absolute -inset-4 bg-white/5 rounded-2xl blur-2xl" />

            <TiltCard
              className="rounded-lg shadow-2xl"
              tiltStrength={12}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/images/album-art.jpg"
                  alt={`${LATEST_RELEASE.title} album artwork`}
                  fill
                  className="object-cover"
                />
              </div>
            </TiltCard>

            {/* Large floating cover art - same size as first gallery photo */}
            <motion.a
              href="https://youtube.com/@kamelxlvii"
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-20 -right-20 md:-bottom-32 md:-right-32 z-10 block"
            >
              <TiltCard
                className="rounded-lg shadow-2xl ring-2 ring-white/10 hover:ring-[var(--accent)]/50 transition-all"
                tiltStrength={10}
              >
                <div className="relative w-48 h-48 md:w-72 md:h-72 overflow-hidden rounded-lg">
                  <Image
                    src="/images/album-art.jpg"
                    alt="Watch on YouTube"
                    fill
                    className="object-cover"
                  />
                </div>
              </TiltCard>
            </motion.a>
          </motion.div>

          {/* Info & Links */}
          <div className="text-center md:text-left">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-neutral-500 mb-3"
            >
              Latest Release
            </motion.p>

            <motion.h2
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-2"
            >
              {LATEST_RELEASE.title}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-neutral-500 mb-10"
            >
              {LATEST_RELEASE.type} • {LATEST_RELEASE.year}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {STREAMING_LINKS.map((link, i) => (
                <motion.div
                  key={link.platform}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <Button
                    href={link.url}
                    icon={platformIcons[link.platform]}
                    className="w-full md:w-auto"
                  >
                    {link.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
