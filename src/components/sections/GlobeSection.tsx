'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PlanetRing } from '@/components/ui/PlanetRing'

export function GlobeSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="globe" className="px-5 md:px-10 pt-4 pb-16 md:pb-20">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlanetRing />
        <p className="mt-1 text-center text-[10px] tracking-wide text-[var(--text-muted)]">drag to rotate</p>
      </motion.div>
    </AnimatedSection>
  )
}
