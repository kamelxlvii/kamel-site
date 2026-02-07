'use client'

import { Instagram, Twitter, Music2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = {
  instagram: Instagram,
  twitter: Twitter,
  tiktok: Music2, // Using Music2 as TikTok placeholder
} as const

interface SocialIconProps {
  platform: keyof typeof icons
  href: string
  label: string
  className?: string
}

export function SocialIcon({ platform, href, label, className }: SocialIconProps) {
  const Icon = icons[platform]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center',
        'w-11 h-11 rounded-full',
        'text-neutral-400 hover:text-white',
        'transition-colors duration-150',
        className
      )}
    >
      <Icon className="w-5 h-5" strokeWidth={1.5} />
    </a>
  )
}
