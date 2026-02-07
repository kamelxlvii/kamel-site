'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltStrength?: number
  glareEnabled?: boolean
}

export function TiltCard({
  children,
  className = '',
  tiltStrength = 10,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateY = (mouseX / (rect.width / 2)) * tiltStrength
    const rotateX = -(mouseY / (rect.height / 2)) * tiltStrength

    setTilt({ rotateX, rotateY })

    // Glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => setIsHovering(true)

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovering ? 0.15 : 0,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}
