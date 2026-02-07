# Tech Stack

## Framework
- **Next.js 14** (App Router)
- Static site generation (SSG) for all pages — no server-side rendering needed
- Deploy target: **Vercel**

## Styling
- **Tailwind CSS 3.4+**
- All design tokens mapped to `tailwind.config.ts` (colors, spacing, typography, shadows, radii)
- No inline styles. No CSS modules. No styled-components.
- Utility classes only, composed via Tailwind

## Language
- **TypeScript** (strict mode)

## Animation
- **Framer Motion** — page transitions, scroll-triggered reveals, hover states
- No animation library bloat. Framer Motion covers everything this site needs.

## Media
- **Next/Image** for all images — automatic optimization, lazy loading, responsive srcsets
- Album art, press photos, and background imagery served from `/public` or a CDN

## Icons
- **Lucide React** — consistent, minimal, open-source icon set
- Single icon library across the entire app. No mixing icon sets.

## Fonts
- Loaded via `next/font` (self-hosted, no layout shift)
- Primary: To be defined in DESIGN_SYSTEM.md
- No Google Fonts external requests

## Deployment
- **Vercel** — zero-config for Next.js, automatic previews, edge CDN
- Custom domain support

## What This Stack Does NOT Include
- No CMS (content is hardcoded or JSON-driven for v1)
- No database
- No authentication
- No API routes
- No analytics (can be added later via Vercel Analytics or Plausible)
- No e-commerce

## Constraints
- Total bundle size target: < 150KB first load JS
- Lighthouse performance score target: 95+
- All pages must be statically generated at build time
- No client-side data fetching on initial load
