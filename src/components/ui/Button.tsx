'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'ghost'
  className?: string
  icon?: React.ReactNode
  magnetic?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  icon,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className={cn(
          'inline-flex items-center justify-center gap-3',
          'text-sm font-medium uppercase tracking-widest',
          'transition-colors duration-150 ease-out',
          'min-h-[44px]',
          variant === 'primary' && [
            'border border-white/20 text-white',
            'hover:bg-white/5 hover:border-white/40',
            'px-8 py-3 rounded',
          ],
          variant === 'ghost' && [
            'text-neutral-400 hover:text-white',
            'px-4 py-2',
          ],
          className
        )}
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </motion.a>
    </div>
  )
}
