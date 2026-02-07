# Design System

## Design Philosophy

Dark, minimal, confident. The site should feel like negative space — the content emerges from darkness, everything else recedes. No decoration. No noise. Every element earns its place.

The visual language draws from editorial design: generous whitespace, restrained typography, sharp contrast. It should feel premium without being flashy.

---

## Color Tokens

### Core Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `background` | `#0A0A0A` | 10, 10, 10 | Primary page background |
| `surface` | `#141414` | 20, 20, 20 | Cards, elevated containers |
| `surface-elevated` | `#1C1C1C` | 28, 28, 28 | Hover states, modals |
| `border` | `#262626` | 38, 38, 38 | Subtle dividers, borders |
| `border-strong` | `#404040` | 64, 64, 64 | Emphasized borders |

### Text

| Token | Hex | Opacity | Usage |
|-------|-----|---------|-------|
| `text-primary` | `#FAFAFA` | 100% | Headlines, primary content |
| `text-secondary` | `#A3A3A3` | — | Body text, descriptions |
| `text-tertiary` | `#737373` | — | Captions, timestamps, metadata |
| `text-muted` | `#525252` | — | Disabled text, placeholders |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#FFFFFF` | Links, CTAs, interactive elements |
| `accent-hover` | `#E5E5E5` | Hover state for accent |
| `accent-muted` | `#A3A3A3` | Secondary interactive elements |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#22C55E` | Success states (if needed) |
| `error` | `#EF4444` | Error states (if needed) |

### Spotify Green (use sparingly)
| Token | Hex | Usage |
|-------|-----|-------|
| `spotify` | `#1DB954` | Spotify button/icon only |

---

## Typography

### Font Stack

- **Primary (Display/Headlines):** `var(--font-geist-sans)` or similar grotesque sans-serif
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Type Scale

| Token | Size (rem/px) | Line Height | Weight | Usage |
|-------|---------------|-------------|--------|-------|
| `display-xl` | 4rem / 64px | 1.0 | 500 | Hero headline (mobile: 2.5rem) |
| `display-lg` | 3rem / 48px | 1.1 | 500 | Section headlines (mobile: 2rem) |
| `display-md` | 2rem / 32px | 1.2 | 500 | Card headlines |
| `heading-lg` | 1.5rem / 24px | 1.3 | 500 | Sub-section headers |
| `heading-md` | 1.25rem / 20px | 1.4 | 500 | Component headers |
| `heading-sm` | 1rem / 16px | 1.4 | 500 | Small headers, labels |
| `body-lg` | 1.125rem / 18px | 1.6 | 400 | Lead paragraphs |
| `body-md` | 1rem / 16px | 1.6 | 400 | Body text |
| `body-sm` | 0.875rem / 14px | 1.5 | 400 | Secondary body, captions |
| `caption` | 0.75rem / 12px | 1.4 | 400 | Metadata, timestamps |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tracking-tight` | -0.02em | Display text |
| `tracking-normal` | 0 | Body text |
| `tracking-wide` | 0.05em | All-caps labels, buttons |

---

## Spacing Scale

Based on 4px base unit. All spacing uses this scale — no arbitrary values.

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0 | — |
| `space-1` | 4px | Inline spacing, icon gaps |
| `space-2` | 8px | Tight component padding |
| `space-3` | 12px | Default component padding |
| `space-4` | 16px | Card padding, list gaps |
| `space-5` | 20px | — |
| `space-6` | 24px | Section component gaps |
| `space-8` | 32px | Section internal padding |
| `space-10` | 40px | — |
| `space-12` | 48px | Section gaps |
| `space-16` | 64px | Large section spacing |
| `space-20` | 80px | Hero/section top margins |
| `space-24` | 96px | Page-level vertical rhythm |

### Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `container-sm` | 640px | Narrow content (bio text) |
| `container-md` | 768px | Standard content |
| `container-lg` | 1024px | Wide content |
| `container-xl` | 1280px | Full-width sections |

### Page Margins

| Breakpoint | Margin |
|------------|--------|
| Mobile (< 640px) | 20px (space-5) |
| Tablet (640px+) | 40px (space-10) |
| Desktop (1024px+) | 80px (space-20) or max-width container |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0 | Sharp edges |
| `radius-sm` | 4px | Buttons, small elements |
| `radius-md` | 8px | Cards, inputs |
| `radius-lg` | 12px | Large cards, images |
| `radius-xl` | 16px | Hero images, featured content |
| `radius-full` | 9999px | Pills, circular elements |

---

## Shadows

Minimal shadows — dark mode relies more on border/surface differentiation.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | Subtle lift |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.6)` | Modals, overlays |
| `shadow-glow` | `0 0 20px rgba(255,255,255,0.05)` | Subtle glow on hover |

---

## Animation & Motion

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | State changes |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Hover states, micro-interactions |
| `duration-normal` | 250ms | Standard transitions |
| `duration-slow` | 400ms | Page transitions, reveals |
| `duration-slower` | 600ms | Complex animations |

### Motion Principles

1. **Purposeful** — Animation communicates state change, not decoration
2. **Subtle** — Motion should be felt, not noticed
3. **Consistent** — Same interaction = same animation everywhere
4. **Performant** — Transform and opacity only, no layout thrashing

---

## Component Tokens

### Buttons

#### Primary Button
- Background: `transparent`
- Border: `1px solid text-primary`
- Text: `text-primary`
- Padding: `space-3 space-6` (12px 24px)
- Radius: `radius-sm`
- Font: `body-md`, `tracking-wide`, uppercase
- Hover: background `surface-elevated`, border `text-primary`

#### Ghost Button
- Background: `transparent`
- Border: none
- Text: `text-secondary`
- Hover: `text-primary`

### Links

- Color: `text-primary`
- Underline: on hover only (using border-bottom for control)
- Transition: `duration-fast`

### Cards

- Background: `surface`
- Border: `1px solid border` (optional)
- Radius: `radius-lg`
- Padding: `space-6`
- Hover: subtle `shadow-glow` or background shift to `surface-elevated`

---

## Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## Accessibility

- All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- Focus states: `2px solid accent` with `2px offset`
- Touch targets: minimum 44x44px
- Reduced motion: respect `prefers-reduced-motion` — disable animations, keep state changes

---

## Icon Guidelines

- Library: Lucide React
- Default size: 24px (space-6)
- Small size: 20px (space-5)
- Large size: 32px (space-8)
- Stroke width: 1.5 (default) — matches the minimal aesthetic
- Color: inherits from parent text color

---

## File Naming

All design tokens are implemented in:
- `tailwind.config.ts` — extended theme
- `globals.css` — CSS custom properties (if needed)
- Component files reference Tailwind classes only

No hardcoded values anywhere. If a value doesn't exist in this system, add it here first.
