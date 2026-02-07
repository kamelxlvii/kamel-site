# App Flow

## Site Structure

Single page, scroll-based navigation. No separate routes for v1.

```
/                   # Main (and only) page
```

---

## User Journey

### Entry Point
User arrives from link in bio, social share, or direct URL.

### Journey Flow

```
[ARRIVAL]
    │
    ▼
┌─────────────────────────────────────┐
│            HERO SECTION             │
│                                     │
│  • Artist name (large, centered)    │
│  • Optional tagline                 │
│  • Sets tone, captures attention    │
│                                     │
│  User action: Scroll down           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│         MUSIC LINKS SECTION         │
│                                     │
│  • Latest release featured          │
│  • Streaming platform buttons       │
│    (Spotify, Apple Music, YouTube)  │
│                                     │
│  User action: Tap to open platform  │
│               (new tab)             │
│               OR scroll down        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│          ABOUT SECTION              │
│                                     │
│  • Short bio (2-3 sentences)        │
│  • "Read more" expands full bio     │
│                                     │
│  User action: Read or skip          │
│               Scroll down           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│          GALLERY SECTION            │
│                                     │
│  • 3-6 image grid                   │
│  • Press photos, album art          │
│  • Optional: tap to enlarge         │
│                                     │
│  User action: View or skip          │
│               Scroll down           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│          SOCIALS / FOOTER           │
│                                     │
│  • Social icons (IG, X, TikTok)     │
│  • Contact email (optional)         │
│  • Copyright                        │
│                                     │
│  User action: Follow on social      │
│               OR exit               │
└─────────────────────────────────────┘
```

---

## Screen-by-Screen Specification

### 1. Hero Section

**Purpose:** Immediate brand impression, establish visual identity

**Elements:**
| Element | Description | Behavior |
|---------|-------------|----------|
| Artist Name | "KAMEL" | Static, centered, display-xl typography |
| Tagline | Optional descriptor | Static, text-secondary, body-lg |
| Background | Solid dark (#0A0A0A) or subtle gradient | Static |
| Scroll Indicator | Subtle down arrow or fade | Optional, animate on load |

**Viewport Behavior:**
- Mobile: Full viewport height (100vh), name centered vertically
- Tablet: Same as mobile
- Desktop: Same, content remains centered

**Empty State:** N/A (always has content)

**Loading State:** Instant (no async content)

---

### 2. Music Links Section

**Purpose:** Convert visitors to streams — the primary conversion point

**Elements:**
| Element | Description | Behavior |
|---------|-------------|----------|
| Section Title | "LISTEN" or similar | Optional, heading-lg |
| Latest Release | Album art + title | Featured prominently |
| Platform Buttons | Spotify, Apple Music, YouTube Music | Tap opens new tab |

**Button Specifications:**
- Minimum 44px touch target height
- Full width on mobile, max-width on desktop
- Consistent styling per DESIGN_SYSTEM.md button tokens
- Platform icons (Lucide or custom SVG)

**Viewport Behavior:**
- Mobile: Stacked vertically, full-width buttons
- Tablet: Same as mobile
- Desktop: Centered column, max-width 400px

**Empty State:** Always has at least one streaming link

**Loading State:** N/A (static content)

---

### 3. About Section

**Purpose:** Build connection, provide context on artist identity

**Elements:**
| Element | Description | Behavior |
|---------|-------------|----------|
| Section Title | "ABOUT" | heading-lg |
| Short Bio | 2-3 sentences | Always visible |
| Expand Toggle | "Read more" | Shows full bio |
| Full Bio | Extended bio text | Revealed on toggle |

**Interaction:**
- "Read more" tap reveals full bio with smooth expand animation
- "Read less" collapses back
- Expand uses Framer Motion height animation

**Viewport Behavior:**
- Mobile: Full width with page margins
- Tablet/Desktop: Max-width container-sm (640px), centered

**Empty State:** Section hidden if no bio provided

**Loading State:** N/A

---

### 4. Gallery Section

**Purpose:** Visual identity reinforcement, press-ready imagery

**Elements:**
| Element | Description | Behavior |
|---------|-------------|----------|
| Section Title | "GALLERY" or none | Optional |
| Image Grid | 3-6 images | Responsive grid |
| Lightbox | Full-screen image view | Optional for v1 |

**Grid Specifications:**
- Mobile: 2 columns
- Tablet: 2-3 columns
- Desktop: 3 columns
- Gap: space-4 (16px)
- Images: square aspect ratio (1:1), radius-lg

**Interaction (if lightbox enabled):**
- Tap image opens full-screen overlay
- Swipe or arrows to navigate
- Tap outside or X to close

**Viewport Behavior:**
- Grid adapts columns based on breakpoint
- Images maintain 1:1 aspect ratio

**Empty State:** Section hidden if no images provided

**Loading State:** Skeleton shimmer while images load (Next/Image handles this)

---

### 5. Socials / Footer Section

**Purpose:** Secondary conversion (follows), legal, contact

**Elements:**
| Element | Description | Behavior |
|---------|-------------|----------|
| Social Icons | IG, Twitter/X, TikTok | Tap opens platform (new tab) |
| Contact Email | Optional mailto link | Tap opens email client |
| Copyright | "© 2025 Kamel" | Static |

**Icon Specifications:**
- Size: 24px (icon default)
- Gap: space-6 (24px) between icons
- Color: text-secondary, hover: text-primary
- Touch target: 44x44px minimum (padded)

**Viewport Behavior:**
- All breakpoints: centered, horizontal row of icons
- Footer content centered below

**Empty State:** At least one social link required

**Loading State:** N/A

---

## Navigation

**v1:** No navigation menu. Single page scroll.

**Future consideration:** If content grows, add minimal sticky header with section anchors:
- Music
- About
- Gallery
- Contact

---

## Transitions & Animation

| Event | Animation | Duration |
|-------|-----------|----------|
| Page load | Fade in hero content | duration-slow (400ms) |
| Scroll reveal | Sections fade + slide up | duration-normal (250ms) |
| Button hover | Background/border transition | duration-fast (150ms) |
| Bio expand | Height + opacity | duration-normal (250ms) |
| Image hover | Subtle scale (1.02) | duration-fast (150ms) |

All animations respect `prefers-reduced-motion`.

---

## External Links

All external links (streaming platforms, socials) open in new tab with:
- `target="_blank"`
- `rel="noopener noreferrer"`

---

## Error States

Minimal error scenarios for static site:

| Scenario | Handling |
|----------|----------|
| Image fails to load | Placeholder or hide broken image |
| 404 | Custom 404 page with link back to home |

---

## Analytics Events (Future)

Track these user actions when analytics added:
- `click_streaming_link` (platform)
- `click_social_link` (platform)
- `expand_bio`
- `open_gallery_image` (if lightbox)
- `scroll_depth` (25%, 50%, 75%, 100%)
