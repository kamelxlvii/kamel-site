'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { Globe } from '@/components/ui/Globe'
import { FloatingParticles } from '@/components/ui/FloatingParticles'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])


  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-5 md:px-10 overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={shouldReduceMotion ? {} : { y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/press-1.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center scale-110"
        />
        {/* Heavy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#0A0A0A]" />
      </motion.div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <FloatingParticles count={30} />

      {/* Content */}
      <motion.div
        style={shouldReduceMotion ? {} : { opacity }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-72 md:w-96 lg:w-[500px] h-24 md:h-32 lg:h-40 mx-auto"
        >
          <Image
            src="/images/kamel-logo.png"
            alt={SITE.name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {SITE.tagline && (
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-neutral-400 tracking-widest uppercase"
          >
            {SITE.tagline}
          </motion.p>
        )}

        {/* Globe showing LA ↔ Alexandria connection */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full max-w-xl mx-auto"
        >
          <Globe />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 z-10"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-neutral-500" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
