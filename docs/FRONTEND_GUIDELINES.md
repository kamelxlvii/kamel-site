# Frontend Guidelines

## Project Structure

```
kamel-site/
├── docs/                     # Documentation (you are here)
│   ├── DESIGN_SYSTEM.md
│   ├── FRONTEND_GUIDELINES.md
│   ├── APP_FLOW.md
│   ├── PRD.md
│   ├── TECH_STACK.md
│   ├── LESSONS.md
│   └── progress.txt
├── public/
│   ├── images/               # Static images (press photos, album art)
│   ├── fonts/                # Self-hosted fonts (if any)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata)
│   │   ├── page.tsx          # Main page component
│   │   ├── globals.css       # Global styles, CSS custom properties
│   │   └── not-found.tsx     # 404 page
│   ├── components/
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Music.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Gallery.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/               # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── SocialIcon.tsx
│   │       └── Image.tsx     # Wrapper around next/image
│   ├── lib/
│   │   ├── constants.ts      # Site content, links, metadata
│   │   └── utils.ts          # Utility functions (cn, etc.)
│   └── types/
│       └── index.ts          # TypeScript types
├── tailwind.config.ts        # Tailwind config with design tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Component Architecture

### Principles

1. **Flat hierarchy** — No deep nesting. Components are either sections or UI primitives.
2. **Colocation** — Section components are self-contained. All section logic lives in its file.
3. **Composition over inheritance** — UI components are composed, not extended.
4. **No prop drilling** — For a site this size, props are passed directly. No context needed.

### Component Naming

- **PascalCase** for component files: `Button.tsx`, `Hero.tsx`
- **kebab-case** for non-component files: `utils.ts`, `constants.ts`
- **Descriptive names** — `SocialIcon.tsx` not `Icon.tsx`

### Component Template

```tsx
// src/components/ui/Button.tsx

import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'ghost'
  className?: string
}

export function Button({
  children,
  href,
  variant = 'primary',
  className
}: ButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'text-sm font-medium uppercase tracking-wide',
        'transition-colors duration-150',
        // Variant styles
        variant === 'primary' && [
          'border border-white text-white',
          'hover:bg-white/10',
          'px-6 py-3 rounded',
        ],
        variant === 'ghost' && [
          'text-neutral-400 hover:text-white',
        ],
        className
      )}
    >
      {children}
    </a>
  )
}
```

---

## Styling Rules

### Tailwind Only

- All styling via Tailwind utility classes
- No inline styles
- No CSS modules
- No styled-components

### Design Token Enforcement

All values must come from the design system. Reference `DESIGN_SYSTEM.md` tokens.

```tsx
// CORRECT — uses design system values
<div className="bg-neutral-950 text-neutral-50 p-6 rounded-lg" />

// INCORRECT — arbitrary values
<div className="bg-[#0f0f0f] text-[#fafafa] p-[26px] rounded-[13px]" />
```

### The `cn` Utility

Use the `cn` utility for conditional classes:

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Responsive Design

Mobile-first. Always. Default styles are mobile, add breakpoint modifiers to scale up.

```tsx
// CORRECT — mobile-first
<h1 className="text-4xl md:text-5xl lg:text-6xl" />

// INCORRECT — desktop-first (using max-width or desktop default)
<h1 className="text-6xl max-md:text-4xl" />
```

---

## TypeScript Rules

### Strict Mode

`tsconfig.json` has strict mode enabled. No `any` types.

### Interface Over Type

Prefer `interface` for object shapes, `type` for unions/primitives.

```ts
// Object shape
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
}

// Union type
type Variant = 'primary' | 'ghost'
```

### Explicit Return Types

Components don't need explicit return types. Utility functions do.

```ts
// Component — inferred return type is fine
export function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}

// Utility — explicit return type
export function formatDate(date: Date): string {
  return date.toLocaleDateString()
}
```

---

## Animation with Framer Motion

### Import Pattern

```tsx
import { motion } from 'framer-motion'
```

### Scroll Reveal Pattern

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

### Reduced Motion

Always respect user preference:

```tsx
const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

<motion.div
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
  // ...
/>
```

Or use Framer Motion's built-in:

```tsx
import { useReducedMotion } from 'framer-motion'

function Component() {
  const shouldReduceMotion = useReducedMotion()
  // ...
}
```

---

## Image Handling

### Always Use Next/Image

```tsx
import Image from 'next/image'

<Image
  src="/images/album-art.jpg"
  alt="Album artwork for [Album Name]"
  width={400}
  height={400}
  className="rounded-lg"
  priority={isAboveFold}
/>
```

### Image Requirements

- All images in `/public/images/`
- Provide explicit width/height to prevent layout shift
- Use `priority` for above-the-fold images (hero, first visible)
- Always include descriptive `alt` text

---

## Content Management

### Constants File

All content lives in `src/lib/constants.ts`:

```ts
export const SITE = {
  name: 'Kamel',
  tagline: '', // Optional
  description: 'Artist, rapper, genre-fluid.',
}

export const STREAMING_LINKS = [
  { platform: 'spotify', label: 'Spotify', url: 'https://...' },
  { platform: 'apple', label: 'Apple Music', url: 'https://...' },
  { platform: 'youtube', label: 'YouTube Music', url: 'https://...' },
]

export const SOCIAL_LINKS = [
  { platform: 'instagram', url: 'https://instagram.com/...' },
  { platform: 'twitter', url: 'https://twitter.com/...' },
  { platform: 'tiktok', url: 'https://tiktok.com/@...' },
]

export const BIO = {
  short: '...',
  full: '...',
}
```

### No Hardcoded Strings

All user-facing text comes from constants or props. No strings buried in components.

---

## Performance Rules

1. **No client-side data fetching** — All content is static
2. **Minimal dependencies** — Only install what's needed
3. **Image optimization** — Always use Next/Image
4. **Font optimization** — Use `next/font`, no external font requests
5. **Bundle analysis** — Run `next build` and check for bloat
6. **Lighthouse checks** — Target 95+ performance score

---

## Accessibility Checklist

- [ ] Semantic HTML (`header`, `main`, `section`, `footer`, `nav`)
- [ ] Heading hierarchy (one `h1`, logical `h2`-`h6` order)
- [ ] Alt text on all images
- [ ] Focus states visible on all interactive elements
- [ ] Touch targets minimum 44x44px
- [ ] Color contrast meets WCAG AA
- [ ] Links have descriptive text (not "click here")
- [ ] External links marked with `aria-label` or visually indicated

---

## Git Conventions

### Commit Messages

```
feat: add hero section with scroll reveal
fix: correct button hover state color
style: adjust spacing in gallery grid
docs: update FRONTEND_GUIDELINES with animation rules
refactor: extract social icon component
```

### Branch Naming

```
feature/hero-section
fix/button-hover-state
```

---

## Pre-Flight Checklist

Before considering any page or component complete:

- [ ] Works on mobile (375px), tablet (768px), desktop (1280px)
- [ ] Passes Lighthouse accessibility audit
- [ ] All colors from design system
- [ ] All spacing from design system
- [ ] All typography from design system
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] External links open in new tab
- [ ] Images have alt text
- [ ] Animations respect reduced motion preference
