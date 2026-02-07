'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Show cursor immediately if mouse is already in viewport
    setIsVisible(true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-12 h-14 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]">
        <Image
          src="/images/camel-logo.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
