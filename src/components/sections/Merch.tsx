'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { TiltCard } from '@/components/ui/TiltCard'
import { MERCH_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Item = (typeof MERCH_ITEMS)[number]

const onSale = (item: Item) => item.sizes.some(s => s.checkout && !s.soldOut)

function Product({ item, index }: { item: Item; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const [picked, setPicked] = useState<string | null>(null)
  const size = item.sizes.find(s => s.size === picked)
  const open = onSale(item)

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="bg-[var(--surface)]" tiltStrength={8}>
        <div className="relative aspect-square overflow-hidden">
          <Image src={item.src} alt={item.name} fill sizes="(max-width: 640px) 90vw, 448px" className="object-cover" />
        </div>
      </TiltCard>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="font-display font-wide font-bold italic uppercase text-sm text-[var(--text-primary)]">{item.name}</span>
        <span className="font-display font-wide font-black italic text-lg text-[var(--accent)]">${item.price}</span>
      </div>
      <p className="mt-1 text-[11px] uppercase tracking-widest text-[var(--text-tertiary)]">
        {item.note} · ${item.shipping} US shipping
      </p>

      {/* Size picker: a size without a checkout link, or sold out, can't be picked */}
      <div className="mt-5 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Size">
        {item.sizes.map(s => {
          const available = !!s.checkout && !s.soldOut
          return (
            <button
              key={s.size}
              type="button"
              role="radio"
              aria-checked={picked === s.size}
              disabled={open && !available}
              onClick={() => setPicked(s.size)}
              className={cn(
                'h-11 border text-xs font-bold uppercase tracking-wider transition-colors',
                picked === s.size
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                  : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
                open && !available && 'opacity-30 line-through cursor-not-allowed hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]'
              )}
            >
              {s.size}
            </button>
          )
        })}
      </div>

      {open && size?.checkout ? (
        <a
          href={size.checkout}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center min-h-[52px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-display font-wide font-black italic uppercase tracking-wider text-sm transition-colors"
        >
          Buy now · {size.size}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-3 w-full min-h-[52px] border border-[var(--accent)]/40 text-[var(--accent)]/70 font-display font-wide font-black italic uppercase tracking-wider text-sm cursor-not-allowed"
        >
          {!open ? 'Checkout opens soon' : 'Pick a size'}
        </button>
      )}
    </motion.div>
  )
}

export function Merch() {
  const live = MERCH_ITEMS.some(onSale)

  return (
    <AnimatedSection id="merch" className="px-5 md:px-10 py-24 md:py-32 bg-[var(--navy)]/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-5 mb-12 text-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-3">Monaco Collection</p>
            <h2 className="font-display font-wide font-black italic uppercase text-3xl md:text-5xl text-[var(--text-primary)]">
              Kamel <span className="text-[var(--accent)]">Motorsport</span>
            </h2>
          </div>
          <span className="inline-block px-4 py-2 border border-[var(--accent)] text-[var(--accent)] text-[11px] font-bold uppercase tracking-[0.3em]">
            {live ? 'Available now' : 'Dropping soon'}
          </span>
        </div>

        <div className="grid gap-12 md:gap-8 md:grid-cols-2 max-w-md md:max-w-4xl mx-auto">
          {MERCH_ITEMS.map((item, i) => <Product key={item.name} item={item} index={i} />)}
        </div>
      </div>
    </AnimatedSection>
  )
}
