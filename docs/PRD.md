# Product Requirements Document

## Overview

**Product:** Kamel Artist Website
**Type:** Single-page artist landing site
**Primary Goal:** Convert social media traffic to music streams and follower connections
**Target User:** Music listeners arriving from Instagram, Twitter/X, TikTok, or direct links

---

## User Context

Users arrive from:
- Link in bio (Instagram, TikTok, Twitter)
- Direct shares (text, DM, social posts)
- Search (less common for emerging artists)

User intent when arriving:
1. **Listen to music** — highest priority
2. **Learn about the artist** — who is this?
3. **Follow / Connect** — stay updated

User behavior:
- 80%+ on mobile
- Attention span < 10 seconds to capture interest
- Will not scroll far if first impression is weak
- Looking for music links, not reading paragraphs

---

## Features (Prioritized)

### P0 — Must Have (v1 Launch)

#### 1. Hero Section
- Artist name prominently displayed
- Tagline or short descriptor (optional)
- Background: dark solid or subtle texture (no busy imagery)
- Immediate visual impact — this is the first impression

#### 2. Music Links
- Primary streaming platforms: Spotify, Apple Music, YouTube Music
- Each link opens in new tab
- Visual: clean list or button grid
- Latest release can be featured at top
- Links to artist profiles, not individual tracks (user can explore)

#### 3. Social Links
- Instagram, Twitter/X, TikTok (as applicable)
- Positioned for easy access but not competing with music
- Icon-based, minimal

#### 4. Footer
- Copyright
- Optional: small credits, contact email

---

### P1 — Should Have (v1 or fast follow)

#### 5. About / Bio Section
- 2-3 sentence artist bio
- Longer version available on tap/click (expandable or separate section)
- Press-ready but written for fans first

#### 6. Latest Release Feature
- Album art for latest single/EP
- Release title and date
- Direct link to stream
- This can be part of Hero or immediately below

#### 7. Visual Gallery
- Grid of 3-6 high-quality images
- Press photos, album art, performance shots
- Lightbox on tap (optional for v1)

---

### P2 — Nice to Have (Future)

#### 8. Email Capture
- Simple email signup for updates
- Integrate with Mailchimp/ConvertKit/etc.
- Non-intrusive placement

#### 9. Tour Dates / Events
- List of upcoming shows
- Venue, city, date, ticket link
- Empty state: "No upcoming shows" or hide section

#### 10. Press Kit
- Downloadable press kit (PDF or page)
- Hi-res photos, bio, contact

#### 11. Embedded Music Player
- Spotify embed or custom audio player
- Play preview without leaving site

---

## Non-Functional Requirements

### Performance
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Lighthouse Performance Score: 95+

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigable
- Screen reader compatible
- Touch targets minimum 44x44px

### SEO
- Meta tags: title, description, Open Graph, Twitter Card
- Semantic HTML
- Structured data (Person/MusicGroup schema)

### Browser Support
- Modern browsers: Chrome, Safari, Firefox, Edge (latest 2 versions)
- iOS Safari (critical — link in bio traffic)
- No IE11 support

---

## Content Requirements

All content provided by Kamel:
- [ ] Artist name: "Kamel"
- [ ] Tagline (optional)
- [ ] Short bio (2-3 sentences)
- [ ] Longer bio (optional, for expandable section)
- [ ] Streaming links (Spotify, Apple Music, YouTube Music)
- [ ] Social links (Instagram, Twitter/X, TikTok)
- [ ] Press photos (3-6 high-res images)
- [ ] Album artwork for latest release
- [ ] Contact email (optional)

---

## Success Metrics

1. **Engagement:** Users click through to streaming platforms
2. **Retention:** Users follow on socials
3. **Performance:** Page loads fast, Lighthouse scores high
4. **Perception:** Site feels premium, memorable

---

## Out of Scope (v1)

- E-commerce / merch store
- User accounts / login
- Blog / news section
- Music player with full playback
- Multi-language support
- CMS integration (content is hardcoded for v1)
