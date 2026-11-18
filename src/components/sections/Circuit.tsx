'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { RaceGame } from '@/components/ui/RaceGame'

export function Circuit() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="circuit" className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-4">The Circuit</p>
          <h2 className="font-display font-wide font-black italic uppercase text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.05] text-[var(--text-primary)]">
            Kamel is the driver.
            <br />
            <span className="text-[var(--accent)]">The city is the circuit.</span>
          </h2>
        </div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <RaceGame />
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
