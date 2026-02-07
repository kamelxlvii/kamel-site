'use client'

import { motion } from 'framer-motion'

interface EgyptianMotifProps {
  className?: string
  size?: number
  animated?: boolean
}

// Eye of Horus - Egyptian symbol of protection and royal power
export function EyeOfHorus({ className = '', size = 120, animated = true }: EgyptianMotifProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-light, #F4D03F)" />
          <stop offset="50%" stopColor="var(--accent, #D4AF37)" />
          <stop offset="100%" stopColor="var(--accent-dark, #B8860B)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main eye shape */}
      <motion.path
        d="M15 50 Q30 30 50 30 Q70 30 85 50 Q70 70 50 70 Q30 70 15 50"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
        fill="none"
        filter="url(#glow)"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      {/* Pupil */}
      <motion.circle
        cx="50"
        cy="50"
        r="12"
        fill="url(#goldGradient)"
        initial={animated ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* Inner pupil */}
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="var(--background, #0A0A0A)"
        initial={animated ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      />

      {/* Eyebrow line */}
      <motion.path
        d="M10 40 Q30 20 50 20 Q70 20 90 40"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Tear line (distinctive Eye of Horus feature) */}
      <motion.path
        d="M50 70 L45 85 Q48 90 50 85 Q52 90 55 85 L50 70"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        fill="url(#goldGradient)"
        initial={animated ? { pathLength: 0, fillOpacity: 0 } : { pathLength: 1, fillOpacity: 1 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />

      {/* Spiral tail */}
      <motion.path
        d="M15 50 Q5 55 8 65 Q12 75 20 72 Q28 70 25 60"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
    </motion.svg>
  )
}

// Ankh - Egyptian symbol of life
export function Ankh({ className = '', size = 80, animated = true }: EgyptianMotifProps) {
  return (
    <motion.svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 60 90"
      fill="none"
      className={className}
      initial={animated ? { opacity: 0 } : {}}
      animate={animated ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="ankhGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-light, #F4D03F)" />
          <stop offset="100%" stopColor="var(--accent-dark, #B8860B)" />
        </linearGradient>
      </defs>

      {/* Loop */}
      <motion.ellipse
        cx="30"
        cy="20"
        rx="15"
        ry="18"
        stroke="url(#ankhGold)"
        strokeWidth="4"
        fill="none"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Vertical line */}
      <motion.line
        x1="30"
        y1="38"
        x2="30"
        y2="85"
        stroke="url(#ankhGold)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Horizontal line */}
      <motion.line
        x1="10"
        y1="50"
        x2="50"
        y2="50"
        stroke="url(#ankhGold)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />
    </motion.svg>
  )
}
