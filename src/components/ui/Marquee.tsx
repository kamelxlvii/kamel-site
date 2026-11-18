import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
}

// Racing-tape ticker. Content is doubled so the -50% loop is seamless.
export function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items]

  return (
    <div className={cn('overflow-hidden bg-[var(--accent)] text-black py-3 -rotate-1 scale-[1.02]', className)}>
      <div className="flex w-max animate-marquee">
        {[row, row].map((group, g) => (
          <div key={g} className="flex shrink-0" aria-hidden={g === 1}>
            {group.map((item, i) => (
              <span
                key={i}
                className="mx-6 font-display font-wide font-black italic text-sm md:text-base uppercase tracking-wider whitespace-nowrap"
              >
                {item} <span className="ml-6">●</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
