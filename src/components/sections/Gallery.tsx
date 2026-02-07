'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { TiltCard } from '@/components/ui/TiltCard'
import { GALLERY_IMAGES } from '@/lib/constants'

export function Gallery() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatedSection id="gallery" className="px-5 md:px-10 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-neutral-500 mb-12 text-center"
        >
          Gallery
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <TiltCard
                className="rounded-lg bg-neutral-900 cursor-pointer"
                tiltStrength={8}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
