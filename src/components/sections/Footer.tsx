'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SITE } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatedSection className="px-5 md:px-10 py-24 md:py-32">
      <div className="max-w-md mx-auto text-center">
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
          <div className="relative w-20 h-24 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300">
            <Image
              src="/images/camel-logo.png"
              alt="Kamel"
              fill
              className="object-contain"
            />
          </div>
        </motion.button>

        <p className="text-sm text-neutral-600">
          &copy; {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </AnimatedSection>
  )
}
