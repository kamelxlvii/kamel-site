'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { BIO } from '@/lib/constants'

export function About() {
  const [expanded, setExpanded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection className="px-5 md:px-10 py-24 md:py-32">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-8 text-center">
          About
        </h2>

        <div className="text-center">
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
            {BIO.short}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed mt-6 whitespace-pre-line">
                  {BIO.full.split('\n\n').slice(1).join('\n\n')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-8 text-sm text-neutral-500 hover:text-white transition-colors duration-150 uppercase tracking-widest"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}
