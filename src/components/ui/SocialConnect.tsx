'use client'

import { motion } from 'framer-motion'
import { STREAMING_LINKS, SOCIAL_LINKS } from '@/lib/constants'

const allLinks = [
  ...STREAMING_LINKS.map(l => ({ ...l, type: 'streaming' as const })),
  ...SOCIAL_LINKS.map(l => ({ ...l, type: 'social' as const })),
]

const platformIcons: Record<string, React.ReactNode> = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.228-2.403-.96-.63-.767-.7-1.636-.33-2.5.39-.914 1.15-1.397 2.06-1.612.592-.14 1.196-.14 1.8-.14.315 0 .315 0 .315-.315V7.06c0-.03 0-.058-.006-.088a.097.097 0 00-.082-.082c-.026-.003-.052 0-.078-.002h-.02c-1.157.236-2.312.48-3.47.718l-2.97.61c-.013.003-.027.005-.04.01-.127.038-.166.09-.172.217v.006l-.002.068V17.49c-.001.365-.02.73-.114 1.086-.21.79-.637 1.404-1.38 1.768-.41.2-.856.3-1.306.355-.657.08-1.3.02-1.895-.315a2.124 2.124 0 01-1.11-1.315c-.2-.62-.15-1.23.127-1.816.384-.816 1.063-1.316 1.904-1.586.478-.152.97-.198 1.468-.198.217 0 .437.006.653.017.224.01.224.01.224-.212V6.05c0-.023 0-.045.003-.068.013-.144.07-.21.21-.246.027-.007.055-.01.083-.017l1.096-.225.664-.137c1.133-.232 2.268-.463 3.4-.696l1.7-.35c.53-.108 1.062-.22 1.592-.325.34-.067.682-.133 1.022-.202.142-.03.26.018.298.16.016.06.02.122.02.183v5.56z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
}

const platformColors: Record<string, string> = {
  spotify: '#1DB954',
  apple: '#FA2D48',
  youtube: '#FF0000',
  instagram: '#E4405F',
  twitter: '#FFFFFF',
  tiktok: '#25F4EE',
}

export function SocialConnect() {
  return (
    <div className="py-20 px-5 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4"
        >
          Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-sm mb-12"
        >
          Follow the journey
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {allLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex flex-col items-center gap-3"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                style={{
                  backgroundColor: platformColors[link.platform],
                  transform: 'scale(1.5)',
                }}
              />

              {/* Icon container */}
              <div
                className="relative z-10 p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-transparent transition-all duration-300"
                style={{
                  boxShadow: `0 0 0 0 ${platformColors[link.platform]}`,
                }}
              >
                <div
                  className="text-neutral-400 transition-colors duration-300"
                  style={{
                    color: undefined,
                  }}
                >
                  <span
                    className="block group-hover:hidden"
                    style={{ color: 'rgb(163 163 163)' }}
                  >
                    {platformIcons[link.platform]}
                  </span>
                  <span
                    className="hidden group-hover:block"
                    style={{ color: platformColors[link.platform] }}
                  >
                    {platformIcons[link.platform]}
                  </span>
                </div>
              </div>

              {/* Label */}
              <span
                className="relative z-10 text-xs uppercase tracking-wider text-neutral-500 group-hover:text-neutral-200 transition-colors duration-300"
              >
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
