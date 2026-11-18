'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface NewsletterModalProps {
  delay?: number // Delay before showing (ms)
}

export function NewsletterModal({ delay = 5000 }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Check if already subscribed or dismissed
    const dismissed = localStorage.getItem('newsletter-dismissed')
    if (dismissed) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('newsletter-dismissed', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call - replace with actual newsletter API
    await new Promise(resolve => setTimeout(resolve, 1000))

    setStatus('success')
    localStorage.setItem('newsletter-subscribed', 'true')

    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6"
          >
            <div className="relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent)]/20 rounded-full blur-3xl" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/monaco/logo-f2.png"
                    alt="MONACO"
                    width={1600}
                    height={339}
                    className="w-56 h-auto mix-blend-screen"
                  />
                </div>

                <h2 className="font-display font-wide font-black italic uppercase text-2xl text-white mb-2">
                  Get in the car
                </h2>
                <p className="text-neutral-400 text-sm mb-6">
                  First access to MONACO, the merch drop and everything behind the job.
                </p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[var(--accent)] font-medium"
                  >
                    Welcome to the family ✨
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[var(--border)] rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                )}

                <p className="text-xs text-neutral-600 mt-4">
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
