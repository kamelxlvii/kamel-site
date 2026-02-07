'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  )
}
