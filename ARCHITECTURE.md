# Architecture Documentation

This document explains the software architecture of the Holiday Home Oasis Villa
website. It covers how data flows, how rendering works, how the build process
operates, and how every piece connects.

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Request Flow: What Happens When a User Visits the Site](#request-flow-what-happens-when-a-user-visits-the-site)
3. [Build Pipeline](#build-pipeline)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Rendering Strategy](#rendering-strategy)
7. [CSS Architecture](#css-architecture)
8. [Image Pipeline](#image-pipeline)
9. [Routing Architecture](#routing-architecture)
10. [SEO Architecture](#seo-architecture)
11. [Client-Side JavaScript Budget](#client-side-javascript-budget)
12. [Dependency Graph](#dependency-graph)

---

## High-Level Architecture

```
                                    +------------------+
                                    |     Vercel CDN   |
                                    |  (Edge Network)  |
                                    +--------+---------+
                                             |
                                             | serves pre-built HTML + assets
                                             |
                                    +--------v---------+
                                    |   Next.js App    |
                                    |   (standalone)   |
                                    +--------+---------+
                                             |
                    +------------------------+------------------------+
                    |                                                  |
           +--------v---------+                              +--------v---------+
           |  Static Pages    |                              |  Static Assets   |
           |  (pre-rendered)  |                              |  (images, CSS)   |
           +------------------+                              +------------------+
           |                  |                              |                  |
           | /  (homepage)    |                              | /images/hero.jpg |
           | /krka-national.. |                              | /images/gallery/ |
           | /klis-fortress   |                              | /_next/static/   |
           | /diocletians-..  |                              |                  |
           | etc.             |                              |                  |
           +------------------+                              +------------------+
```

The entire site is **statically generated at build time**. There is no database,
no API calls at runtime, no server-side computation per request. Vercel's CDN
serves pre-built HTML files from the nearest edge location to the user.

---

## Request Flow: What Happens When a User Visits the Site

### Step 1: DNS Resolution

User types `villaoasismarina.com`. Their browser resolves this to Vercel's edge
network IP address.

### Step 2: Edge Server Response

Vercel's edge server (closest to the user geographically) finds the pre-built
HTML file for the requested path and sends it immediately. No computation.

### Step 3: Browser Receives HTML

The browser receives a complete HTML document with all content visible. The user
sees the navbar, hero image, headings, and text immediately. This is the
**First Contentful Paint (FCP)**.

### Step 4: CSS Loading

The browser loads the Tailwind-generated CSS file (~8-15KB gzipped). Styles
are applied and the page looks correct.

### Step 5: JavaScript Hydration

The browser downloads the JavaScript chunks for **client components only**:
- Navbar (scroll listener, mobile menu toggle)
- Gallery (slideshow autoplay, swipe handlers)
- Reviews (carousel autoplay)
- Contact (form state)
- ScrollToTopButton (scroll listener)

React "hydrates" these components — it attaches event listeners to the
already-rendered HTML. The page becomes interactive. This is **Time to Interactive (TTI)**.

### Step 6: Lazy Loading

As the user scrolls, gallery images below the fold are loaded on demand via
the `loading="lazy"` attribute on `<Image>` components.

### Timeline

```
0ms ──── DNS lookup
50ms ─── Edge server responds with HTML
100ms ── Browser starts rendering HTML (FCP)
150ms ── CSS loaded, page styled
200ms ── Hero image starts loading (large, prioritized)
300ms ── JS chunks start downloading
500ms ── React hydration begins
700ms ── Page fully interactive (TTI)
```

These times assume a fast connection. On 3G, multiply by 3-5x.

---

## Build Pipeline

When you run `npm run build`, here is what happens:

```
npm run build
     |
     v
+--------------------+
|  1. TypeScript      |     Checks all .ts/.tsx files for type errors.
|     Compilation     |     If any error exists, the build fails.
+--------------------+
     |
     v
+--------------------+
|  2. Tailwind CSS    |     Scans all files in content paths (src/app, src/components).
|     Processing      |     Generates CSS containing only used classes.
+--------------------+     Result: one small CSS file (~8-15KB gzipped).
     |
     v
+--------------------+
|  3. Server          |     Renders all Server Components to HTML.
|     Component       |     Hero, Amenities, ReviewCard, AttractionsPreview,
|     Rendering       |     Location, Footer — all become static HTML.
+--------------------+
     |
     v
+--------------------+
|  4. Static Page     |     For each page with generateStaticParams:
|     Generation      |     - Calls generateStaticParams() to get all slugs
|     (SSG)           |     - Renders each page to HTML
+--------------------+     - Generates per-page metadata
     |
     v
+--------------------+
|  5. Client Bundle   |     Bundles Client Components into JS chunks:
|     Creation        |     - Navbar chunk
+--------------------+     - Gallery chunk
     |                      - Reviews chunk
     v                      - Contact chunk
+--------------------+     - ScrollToTopButton chunk
|  6. Asset           |
|     Optimization    |     Minifies HTML, CSS, JS.
+--------------------+     Generates content hashes for cache-busting.
     |
     v
+--------------------+
|  7. Output          |     Writes everything to .next/ directory:
|                     |     - .next/server/ (HTML files)
|                     |     - .next/static/ (JS, CSS, media)
+--------------------+     - .next/standalone/ (self-contained server)
```

### Output Structure

```
.next/
├── server/
│   └── app/
│       ├── index.html                      (homepage)
│       ├── marinska-kula-marina-tower.html  (attraction)
│       ├── krka-national-park.html          (attraction)
│       └── ...
├── static/
│   ├── chunks/
│   │   ├── app/
│   │   │   └── page-[hash].js              (homepage client JS)
│   │   └── [hash].js                       (shared React runtime)
│   ├── css/
│   │   └── [hash].css                      (Tailwind output)
│   └── media/
│       └── [hash].woff2                    (fonts, if any)
└── standalone/
    └── server.js                           (self-contained Node server)
```

---

## Component Architecture

### Component Tree

```
RootLayout (layout.tsx) [SERVER]
│
├── <html>
│   ├── <head>
│   │   └── JSON-LD script
│   └── <body>
│       └── HomePage (page.tsx) [SERVER]
│           │
│           ├── Navbar [CLIENT]
│           │   ├── Logo link
│           │   ├── Desktop nav links (7)
│           │   ├── Book Now button
│           │   └── Mobile hamburger menu
│           │
│           ├── Hero [SERVER]
│           │   ├── Parallax background
│           │   ├── Dark overlay
│           │   ├── H1 heading
│           │   ├── Buzz phrase badges (4)
│           │   ├── Subtitle paragraph
│           │   ├── Book Now CTA button
│           │   └── Scroll indicator arrow
│           │
│           ├── Gallery [CLIENT]
│           │   ├── Image slides (19)
│           │   ├── Prev/Next arrows
│           │   ├── Dot indicators
│           │   └── Counter badge
│           │
│           ├── Amenities [SERVER]
│           │   └── Amenity cards (9)
│           │       └── AmenityIcon (inline SVG)
│           │
│           ├── Reviews [CLIENT]
│           │   ├── ReviewCard [SERVER] (rendered 1-3 at a time)
│           │   │   ├── StarRating
│           │   │   ├── Rating badge
│           │   │   ├── Title
│           │   │   ├── Comment
│           │   │   └── Author info
│           │   ├── Prev/Next buttons
│           │   ├── Dot indicators
│           │   └── CTA button
│           │
│           ├── AttractionsPreview [SERVER]
│           │   └── Attraction cards (6)
│           │       └── Link to /[slug]
│           │
│           ├── Location [SERVER]
│           │   ├── Google Maps iframe
│           │   └── Address display
│           │
│           ├── Contact [CLIENT]
│           │   ├── Name input
│           │   ├── Phone input
│           │   ├── Message textarea
│           │   ├── Submit button
│           │   └── Success message
│           │
│           ├── Footer [SERVER]
│           │   ├── Brand description
│           │   ├── Quick links (7)
│           │   ├── Social links (Instagram, X)
│           │   ├── Book on VRBO button
│           │   └── Copyright
│           │
│           └── ScrollToTopButton [CLIENT]
```

### Component Categories

**Layout Components** — Define page structure:
- `RootLayout` — HTML shell, global metadata
- `Navbar` — Site navigation
- `Footer` — Site footer

**Content Section Components** — Each represents one scroll section:
- `Hero` — First impression, CTA
- `Gallery` — Photo slideshow
- `Amenities` — Feature list
- `Reviews` — Social proof carousel
- `AttractionsPreview` — Nearby places grid
- `Location` — Map embed
- `Contact` — Inquiry form

**Presentational Components** — Render data without side effects:
- `ReviewCard` — Single review display
- `AmenityIcon` — SVG icon selector (private, not exported)
- `StarRating` — Star visualization (private, inside ReviewCard)

**Utility Components** — Small interactive widgets:
- `ScrollToTopButton` — Floating action button

---

## Data Flow

```
src/types/index.ts                  Defines TypeScript interfaces
       |                            (Review, Attraction, GalleryImage)
       |
       v
src/lib/data.ts                     Exports static data arrays and constants
       |                            (reviews[], attractions[], amenities[],
       |                             galleryImages[], VILLA_NAME, etc.)
       |
       +---> Server Components      Import data directly at build time.
       |     (Hero, Amenities,       Data is embedded in HTML output.
       |      AttractionsPreview,    No JS sent to browser for these.
       |      Location, Footer)
       |
       +---> Client Components      Import data at build time.
             (Gallery, Reviews,      Data is embedded in the JS bundle.
              Navbar)                Used for interactive features
                                     (slideshow state, carousel position).
```

### Key Architecture Decision: No API, No Database, No CMS

All data lives in `src/lib/data.ts` as plain TypeScript objects. This is
intentional for a small business site:

- **No API latency** — Data is embedded at build time
- **No database costs** — Nothing to host or maintain
- **No CMS complexity** — Edit the TypeScript file directly
- **Type safety** — TypeScript validates the data shape
- **Zero runtime data fetching** — No loading states, no spinners

When the site needs to update (new review, new attraction), you:
1. Edit `data.ts`
2. Run `npm run build`
3. Deploy

If the site grows and needs a CMS, you can later replace `data.ts` with
API calls to a headless CMS (Sanity, Contentful, Strapi) without changing
the component structure.

---

## Rendering Strategy

### Static Site Generation (SSG)

Every page in this project uses SSG. At build time, Next.js:

1. Executes all Server Components
2. Generates HTML for each page
3. Saves the HTML to disk

At request time, the server sends the pre-built HTML. No computation.

```
Build Time                              Request Time
----------                              ------------
[data.ts] --> [Components] --> [HTML]    [HTML] --> Browser
              (executed once)            (served instantly)
```

### Why Not SSR (Server-Side Rendering)?

SSR regenerates HTML on **every request**. This is useful for personalized
content (user dashboards, shopping carts) but wasteful for a villa website
where the content is the same for every visitor.

SSG generates HTML **once** and serves it to all visitors. Faster, cheaper,
simpler.

### Why Not ISR (Incremental Static Regeneration)?

ISR is SSG with a revalidation interval — the page regenerates in the background
after a set time period. This is useful for content that changes frequently
(news sites, product catalogs). Our villa content changes maybe once a month
when a new review comes in. A full rebuild takes seconds and is sufficient.

---

## CSS Architecture

### Processing Pipeline

```
globals.css
     |
     ├── @tailwind base       -->  Tailwind's CSS reset (normalize.css equivalent)
     ├── @tailwind components -->  Component-level utility classes (section-padding, etc.)
     ├── @tailwind utilities  -->  All utility classes used in JSX
     |
     ├── @layer base          -->  Custom base styles (body font, heading font)
     ├── @layer components    -->  Reusable component classes (section-title, etc.)
     |
     ├── .parallax-hero       -->  CSS parallax effect
     ├── .gallery-slide       -->  Crossfade transition
     └── .animate-bounce-slow -->  Scroll indicator animation
```

### Custom Utility Classes

We define three reusable classes in `@layer components`:

```css
.section-padding  -->  Consistent vertical/horizontal padding for all sections
.section-title    -->  Centered, bold, responsive heading style
.section-subtitle -->  Centered, gray, max-width constrained subtitle
```

These are used across Gallery, Amenities, Reviews, Attractions, Location, and
Contact sections to enforce visual consistency.

### Why `@layer`?

Tailwind uses CSS layers to control specificity. Classes defined in `@layer components`
can be overridden by utility classes. Without `@layer`, a custom `.section-title`
class might accidentally override a Tailwind utility applied alongside it.

### Tailwind Configuration

```typescript
// tailwind.config.ts
colors: {
  primary: { 50-950 }  // Blue color scale (9 shades)
  gold: { 400-600 }    // Gold for star ratings (3 shades)
}
fontFamily: {
  heading: Georgia      // Serif for headings (luxury feel)
  body: system-ui       // System font for body text (fast, native)
}
```

The `primary` color scale follows Tailwind conventions:
- `primary-50` to `primary-200`: Light backgrounds, hover states
- `primary-500` to `primary-600`: Main brand color (buttons, links)
- `primary-700` to `primary-950`: Dark text, dark backgrounds

---

## Image Pipeline

### Hero Image

```
slike-stranica/image01.jpg
     |
     | (copied at project setup)
     v
public/images/hero.jpg
     |
     | (served via CSS background-image)
     v
.parallax-hero { background-image: url('/images/hero.jpg') }
```

The hero image uses CSS `background-image` instead of Next.js `<Image>` because:
- It needs `background-attachment: fixed` for the parallax effect
- `<Image>` renders an `<img>` tag, which does not support parallax
- The tradeoff: no automatic WebP/AVIF conversion for this one image

### Gallery Images

```
slike-stranica/image02-20.jpg
     |
     | (copied at project setup)
     v
public/images/gallery/image02-20.jpg
     |
     | (served via Next.js <Image> component)
     v
<Image src="/images/gallery/image02.jpg" fill sizes="..." />
     |
     | (Next.js image optimization pipeline)
     v
Automatic WebP/AVIF conversion, resizing, lazy loading
```

Next.js `<Image>` provides:
- **Format negotiation**: Serves AVIF to browsers that support it, WebP to others
- **Responsive sizes**: The `sizes` prop tells the browser which image width to request
- **Lazy loading**: Images below the fold load only when scrolled near
- **Priority loading**: The first gallery image has `priority` flag (preloaded)

### The `sizes` Prop Explained

```typescript
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
```

This tells the browser:
- On mobile (viewport < 768px): the image is 100% of viewport width
- On tablet (viewport < 1200px): the image is 80% of viewport width
- On desktop: the image is 1024px wide

The browser uses this to request the smallest appropriate image, saving bandwidth.

---

## Routing Architecture

```
app/
├── layout.tsx          -->  Wraps ALL routes (global shell)
├── page.tsx            -->  /  (homepage)
└── [slug]/
    └── page.tsx        -->  /:slug (dynamic attraction pages)
```

### Route Resolution

| URL | File | Params |
|---|---|---|
| `/` | `app/page.tsx` | none |
| `/krka-national-park` | `app/[slug]/page.tsx` | `{ slug: "krka-national-park" }` |
| `/klis-fortress` | `app/[slug]/page.tsx` | `{ slug: "klis-fortress" }` |
| `/nonexistent` | `app/[slug]/page.tsx` | `{ slug: "nonexistent" }` --> `notFound()` |

### Static Generation of Dynamic Routes

```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  return attractions.map((a) => ({ slug: a.slug }));
}
```

At build time, Next.js calls this function and gets:

```json
[
  { "slug": "marinska-kula-marina-tower" },
  { "slug": "church-st-mary-drid-hill" },
  { "slug": "stari-trogir-beach-sevid" },
  { "slug": "krka-national-park" },
  { "slug": "diocletians-palace-split" },
  { "slug": "klis-fortress" }
]
```

It then renders `page.tsx` once for each slug, producing 6 HTML files.

### 404 Handling

If someone visits `/nonexistent-page`, the `[slug]/page.tsx` component runs:

```typescript
const attraction = attractions.find((a) => a.slug === slug);
if (!attraction) {
  notFound(); // Returns Next.js default 404 page
}
```

---

## SEO Architecture

### Metadata Hierarchy

```
layout.tsx (global metadata)
├── title: "Holiday Home Oasis Villa | Luxury Vacation Rental in Marina, Croatia"
├── description: "Luxury private villa with pool..."
├── openGraph: { title, description, image, url, locale }
├── twitter: { card, title, description, image }
├── robots: { index: true, follow: true }
└── canonical: "https://villaoasismarina.com"

[slug]/page.tsx (per-page metadata via generateMetadata)
├── title: "Krka National Park | Near Holiday Home Oasis Villa"
├── description: "Krka National Park is ~1 hour by car from..."
└── openGraph: { title, description, type: "article" }
```

Per-page metadata **overrides** layout metadata for the fields it specifies.
Fields not overridden (like `robots`) inherit from the layout.

### Structured Data (JSON-LD)

```json
{
  "@type": "LodgingBusiness",
  "name": "Holiday Home Oasis Villa",
  "address": { "streetAddress": "Podubaščak 2B", ... },
  "geo": { "latitude": 43.5072, "longitude": 16.1153 },
  "amenityFeature": [ ... ],
  "aggregateRating": { "ratingValue": "10", "ratingCount": "11" }
}
```

This tells Google: "This is a place where people stay. It has these amenities
and this rating." Google may display this as a rich snippet with stars, address,
and amenities directly in search results.

---

## Client-Side JavaScript Budget

One of the most important architectural decisions is minimizing client-side JS.
Here is a breakdown of what JavaScript the browser actually downloads:

### React Runtime

- React core: ~40KB gzipped (unavoidable, needed for hydration)
- Next.js router: ~15KB gzipped

### Client Component Code

| Component | Estimated Size (gzipped) | Why Client |
|---|---|---|
| Navbar | ~1.5KB | scroll listener, mobile toggle |
| Gallery | ~2KB | autoplay timer, touch events, state |
| Reviews | ~1.5KB | autoplay timer, responsive perPage |
| Contact | ~1KB | form state, submit handler |
| ScrollToTopButton | ~0.5KB | scroll listener |
| **Total custom JS** | **~6.5KB** | |
| **Total with React** | **~61.5KB** | |

### What Is NOT in the Bundle

| Component | Size Saved |
|---|---|
| Hero | ~1KB (never sent to browser) |
| Amenities + AmenityIcon | ~3KB (SVG icons rendered as HTML) |
| ReviewCard + StarRating | ~1KB (rendered server-side) |
| AttractionsPreview | ~1KB (static links) |
| Location | ~0.5KB (static iframe) |
| Footer | ~1KB (static links) |
| data.ts (for server components) | ~4KB (review text, attraction text) |
| **Total saved** | **~11.5KB** |

Without Server Components (pure React + Vite approach), ALL of this would be
in the JavaScript bundle, making it ~73KB instead of ~61.5KB. The savings
compound as the site grows.

---

## Dependency Graph

### Build-Time Dependencies

```
tailwindcss ──> postcss ──> globals.css ──> final CSS file
typescript ──> all .ts/.tsx files ──> type checking
next ──> all app/ files ──> static HTML + JS chunks
eslint ──> all .ts/.tsx files ──> linting (code quality checks)
```

### Runtime Dependencies (What Ships to Browser)

```
react ──> Client Components (hydration)
react-dom ──> Client Components (DOM rendering)
next/image ──> Gallery component (image optimization)
next/link ──> AttractionsPreview, [slug] page (client-side navigation)
```

### Zero External Runtime Dependencies

This project has **no third-party runtime dependencies** beyond React and
Next.js. No animation libraries, no icon libraries, no CSS-in-JS libraries,
no form libraries, no carousel libraries. Everything is built with:

- Plain React hooks (useState, useEffect, useCallback, useRef)
- Plain HTML elements
- Inline SVGs
- Tailwind utility classes
- CSS transitions and keyframe animations

This keeps the bundle small, avoids version conflicts, and eliminates supply
chain risk (compromised npm packages).
