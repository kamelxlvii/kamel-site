'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { GALLERY } from '@/lib/constants'

export function Gallery() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="gallery" className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-12 text-center"
        >
          The World of Monaco
        </motion.h2>

        {/* Masonry: photos keep their own shape; each one opens its video */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {GALLERY.map((photo, index) => (
            <motion.a
              key={photo.src}
              href={photo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${photo.alt}: watch the video on YouTube`}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block mb-3 md:mb-4 break-inside-avoid overflow-hidden bg-[var(--surface)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--accent)] text-black text-sm opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all">
                  ▶
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
