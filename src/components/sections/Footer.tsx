'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SITE, SOCIAL_LINKS, STREAMING_LINKS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatedSection className="px-5 md:px-10 py-16 md:py-24 border-t border-[var(--border)]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Kamel Pack Logo - Click to scroll to top */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center mb-10 mx-auto cursor-pointer"
          aria-label="Back to top"
        >
          <div className="relative w-20 h-24 drop-shadow-[0_0_15px_var(--accent-glow)] hover:drop-shadow-[0_0_25px_var(--accent)] transition-all duration-300">
            <Image
              src="/images/camel-logo.png"
              alt="Kamel"
              fill
              className="object-contain"
            />
          </div>
        </motion.button>

        <nav className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.25em]">
          {[...STREAMING_LINKS, ...SOCIAL_LINKS].map(link => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-neutral-600">
          &copy; {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </AnimatedSection>
  )
}
