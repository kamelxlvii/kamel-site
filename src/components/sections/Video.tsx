'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Video() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="video" className="px-5 md:px-10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-neutral-500 mb-8 text-center"
        >
          Watch
        </motion.h2>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10"
        >
          <iframe
            src="https://www.youtube.com/embed/_9wd1lKtBuA?si=vMX8YxND5x50rsaS"
            title="KAMEL - Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
