# Holiday Home Oasis Villa - Complete Project Documentation

This document explains every single technical decision, concept, and detail
in this project. It is written for someone who knows React + Vite but is
new to Next.js.

---

## Table of Contents

1. [What Is This Project](#what-is-this-project)
2. [How to Run It](#how-to-run-it)
3. [Why Next.js Instead of React + Vite](#why-nextjs-instead-of-react--vite)
4. [The Fundamental Differences: Next.js vs React + Vite](#the-fundamental-differences-nextjs-vs-react--vite)
5. [Technology Choices Explained](#technology-choices-explained)
6. [The `[slug]` System Explained (Dynamic Routing)](#the-slug-system-explained-dynamic-routing)
7. [Server Components vs Client Components](#server-components-vs-client-components)
8. [Every Magic Number Explained](#every-magic-number-explained)
9. [SEO: What It Is and What We Did](#seo-what-it-is-and-what-we-did)
10. [How to Test Speed with Lighthouse](#how-to-test-speed-with-lighthouse)
11. [The `npm install` Problem and Moving node_modules to D Drive](#the-npm-install-problem-and-moving-node_modules-to-d-drive)
12. [Deploying to Vercel](#deploying-to-vercel)
13. [Future Improvements](#future-improvements)
14. [File-by-File Breakdown](#file-by-file-breakdown)

---

## What Is This Project

A business-focused vacation rental website for a real villa in Marina, Croatia.
It is a single-page scrolling site with one exception: each nearby attraction
gets its own dedicated URL (page) for SEO purposes.

The goal is simple: a visitor lands on the site, sees the villa, reads the
reviews, and clicks "Book Now" which takes them to VRBO to complete the booking.

---

## How to Run It

### Prerequisites

1. Install Node.js from https://nodejs.org (download the LTS version)
2. After installing, **restart your terminal** (close and reopen it)
3. Verify it works:

```bash
node --version
npm --version
```

### Running the Project

```bash
cd D:\VillaMarinaStranica\villa-oasis
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

### Building for Production

```bash
npm run build
npm start
```

`npm run build` creates an optimized production build. `npm start` serves it.

---

## Why Next.js Instead of React + Vite

React + Vite is great for web **applications** (dashboards, tools, SPAs where
the user logs in). But for a **public-facing business website** that needs to
rank on Google, load fast, and convert visitors to bookings, Next.js is the
better choice. Here is why:

### SEO (Search Engine Optimization)

When Google's crawler visits a React + Vite site, it sees an empty `<div id="root"></div>`
and a big JavaScript bundle. The crawler has to execute that JavaScript to see
any content. Google can do this, but it is slower, less reliable, and your site
may rank lower.

With Next.js, the server renders the HTML **before** sending it to the browser.
Google's crawler immediately sees all the text, headings, images, and metadata.
This is called **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)**.

### Performance

React + Vite sends a big JavaScript bundle to the browser. The browser downloads
it, parses it, executes it, and only then does the user see content.

Next.js sends **pre-rendered HTML** first. The user sees content immediately.
Then JavaScript "hydrates" (attaches interactivity) in the background. This makes
the perceived load time much faster.

### Built-in Image Optimization

Next.js has a built-in `<Image>` component that:
- Converts images to modern formats (WebP, AVIF) automatically
- Generates multiple sizes for different screen widths
- Lazy loads images by default
- Serves images from an optimized pipeline

With Vite, you would need to set up something like `vite-plugin-imagemin` or
an external service yourself.

### File-Based Routing

In React + Vite, you install `react-router-dom` and manually define routes:

```jsx
// React + Vite
<Route path="/krka-national-park" element={<AttractionPage />} />
```

In Next.js, you just create a file:

```
src/app/[slug]/page.tsx   -->   automatically becomes /:slug route
```

No router configuration needed. The file system IS the router.

---

## The Fundamental Differences: Next.js vs React + Vite

Here is a side-by-side comparison of the same concepts:

| Concept | React + Vite | Next.js (App Router) |
|---|---|---|
| Entry point | `main.tsx` + `App.tsx` | `app/layout.tsx` + `app/page.tsx` |
| Routing | `react-router-dom` (manual) | File system (automatic) |
| Where code runs | Everything runs in browser | Server by default, browser opt-in |
| Adding a page | Create component + add Route | Create `app/pagename/page.tsx` |
| SEO metadata | Manual `<Helmet>` or `document.title` | Export `metadata` object |
| Image optimization | DIY or plugins | Built-in `<Image>` component |
| Build output | Static HTML + JS bundle | HTML + JS + server functions |
| Dev server | Vite dev server | Next.js dev server |
| Deployment | Any static host (Netlify, etc.) | Vercel (optimized), or any Node host |

### The Mental Model Shift

In React + Vite, **everything is a client component**. Every single component
you write runs in the browser. There is no server.

In Next.js App Router, **everything is a server component by default**. Your
components run on the server at build time (or request time), generate HTML,
and send that HTML to the browser. The browser never downloads or executes
the code for server components.

If a component needs browser APIs (useState, useEffect, onClick, window, etc.),
you add `"use client"` at the top of the file. This tells Next.js: "this
component needs to run in the browser too."

### What `layout.tsx` Is

In React + Vite, you have an `App.tsx` that wraps everything. In Next.js, that
role is filled by `layout.tsx`. It wraps all pages and is the place for:

- The `<html>` and `<body>` tags
- Global CSS imports
- Metadata (SEO tags)
- Shared UI elements (if any)

The key difference: `layout.tsx` does NOT re-render when you navigate between
pages. It persists. Only the `page.tsx` content inside it swaps out.

### What `page.tsx` Is

Every `page.tsx` file represents a URL route:

- `app/page.tsx` = the homepage (`/`)
- `app/about/page.tsx` = `/about`
- `app/[slug]/page.tsx` = `/:slug` (dynamic, explained below)

This is the equivalent of your route components in React Router, but the file
location determines the URL path automatically.

---

## Technology Choices Explained

### Why Tailwind CSS (Not CSS Modules)

Both were options. Tailwind was chosen because:

1. **Zero runtime CSS.** Tailwind scans your files at build time and generates
   only the CSS classes you actually use. The final CSS file is tiny (often <10KB
   gzipped). CSS Modules also have zero runtime, but you tend to write more CSS.

2. **No context switching.** With CSS Modules you jump between `.tsx` and `.module.css`
   files constantly. With Tailwind, styling is inline with the markup.

3. **Consistency.** Tailwind enforces a design system (spacing scale, color palette,
   font sizes). You cannot accidentally use `padding: 13px` — you use `p-3` (12px)
   or `p-4` (16px). This prevents visual inconsistency.

4. **Performance.** The final CSS bundle from Tailwind is smaller than what CSS
   Modules typically produce because Tailwind deduplicates utility classes across
   components.

For a small business site like this, either approach works. Tailwind was chosen
for speed of development and smaller output size.

### Why No UI Library (No Chakra, MUI, Ant Design, etc.)

Heavy UI libraries add 50-200KB of JavaScript to your bundle. For a simple
business website, that is absurd. We need:

- A navbar
- A slideshow
- Some cards
- A form
- Icons

All of these are trivial to build with plain HTML + Tailwind. The icons are
inline SVGs (literally just `<svg>` elements in the JSX), so there is no icon
library download either. The total custom JS in this project is minimal.

### Why Inline SVG Icons (Not an Icon Library)

Icon libraries like `react-icons` or `lucide-react` include hundreds or
thousands of icons in their package. Even with tree-shaking, the bundler
has to process them. Inline SVGs:

- Have zero import cost
- Are rendered as part of the HTML (no JS execution needed)
- Can be styled with Tailwind classes directly
- Are visible to screen readers with proper `aria-label`

The downside is more verbose JSX, but for 9 amenity icons and a few UI arrows,
it is a good tradeoff.

### Why TypeScript

TypeScript catches errors at build time. For example, if you mistype a review
property name (`reveiw.titl` instead of `review.title`), TypeScript tells you
immediately instead of letting it fail silently at runtime.

The `src/types/index.ts` file defines the shape of our data:

```typescript
export interface Review {
  name: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  stayDuration: string;
}
```

Every review object in `data.ts` is type-checked against this interface. If you
add a review and forget the `stayDuration` field, the build will fail with a
clear error message.

### Why `system-ui` and `Georgia` Fonts (Not Google Fonts)

Google Fonts require a network request to download the font files. This adds
latency. `system-ui` uses whatever font the user's operating system already has:

- Windows: Segoe UI
- macOS: San Francisco
- Android: Roboto
- Linux: varies

The result: **zero font download time**, and the text looks native on every
platform. `Georgia` is used for headings — it is a serif font installed on
essentially every computer since the late 1990s.

If you want Google Fonts later, Next.js has a built-in `next/font` module that
self-hosts them (no external requests). But for Lighthouse 95+, system fonts
are the safest choice.

---

## The `[slug]` System Explained (Dynamic Routing)

### What Are the Square Brackets?

The folder name `[slug]` uses square brackets. This is Next.js **dynamic route
syntax**. The brackets tell Next.js: "this part of the URL is a variable."

```
app/[slug]/page.tsx
```

This single file handles ALL of these URLs:

- `/marinska-kula-marina-tower`
- `/krka-national-park`
- `/diocletians-palace-split`
- `/klis-fortress`
- `/literally-anything-you-put-here`

The value in the URL is passed to the page component as a parameter called `slug`.

### What Is a "Slug"?

A slug is a URL-friendly version of a title. It is all lowercase, uses hyphens
instead of spaces, and strips special characters:

| Title | Slug |
|---|---|
| Krka National Park | `krka-national-park` |
| Diocletian's Palace - Split | `diocletians-palace-split` |
| Klis Fortress | `klis-fortress` |

The word "slug" comes from newspaper typesetting, where it referred to a short
label for an article. In web development, it is the standard term for a
human-readable URL identifier.

### The Programming Technique: "Dynamic Routing" / "Parameterized Routes"

The technique of using `[slug]` is called **dynamic routing** or
**parameterized routing**. The `slug` inside the brackets is a **route parameter**
(also called a **URL parameter** or **path parameter**).

### Can You Use a Different Name Instead of `slug`?

Yes. The name inside the brackets is just a variable name. You can use anything:

```
[slug]     --> params.slug
[id]       --> params.id
[name]     --> params.name
[postId]   --> params.postId
[anything] --> params.anything
```

`slug` is a convention because URLs typically use slugs. If your attractions
had numeric IDs, you might use `[id]` instead. The choice is purely semantic —
pick whatever describes the parameter best.

### Advanced: Other Bracket Patterns in Next.js

Next.js supports more than just `[slug]`:

| Pattern | Example | What It Does |
|---|---|---|
| `[slug]` | `/krka-national-park` | Single dynamic segment |
| `[...slug]` | `/a/b/c/d` | Catch-all (matches any depth) |
| `[[...slug]]` | `/` or `/a/b/c` | Optional catch-all |

We only use `[slug]` (single segment) because each attraction has a flat URL
like `/krka-national-park`, not a nested one like `/attractions/croatia/krka`.

### How `generateStaticParams` Works

In `[slug]/page.tsx`, there is this function:

```typescript
export async function generateStaticParams() {
  return attractions.map((a) => ({ slug: a.slug }));
}
```

This tells Next.js at **build time**: "Here are all the possible values for `slug`.
Pre-render a static HTML page for each one."

The result is that Next.js generates these HTML files during `npm run build`:

```
.next/server/app/marinska-kula-marina-tower.html
.next/server/app/church-st-mary-drid-hill.html
.next/server/app/stari-trogir-beach-sevid.html
.next/server/app/krka-national-park.html
.next/server/app/diocletians-palace-split.html
.next/server/app/klis-fortress.html
```

When a user visits `/krka-national-park`, the server sends the pre-built HTML
instantly. No computation needed. This is called **Static Site Generation (SSG)**
and is the fastest possible response.

In React + Vite, there is no equivalent. Vite sends the same `index.html` for
every URL, and the JavaScript figures out which component to render based on
`window.location`. The content only appears after JS executes.

### How `generateMetadata` Works

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const attraction = attractions.find((a) => a.slug === slug);
  return {
    title: `${attraction.title} | Near ${VILLA_NAME}`,
    description: `${attraction.title} is ${attraction.distance} from ${VILLA_NAME}...`,
  };
}
```

This generates unique `<title>` and `<meta description>` tags for each attraction
page. So `/krka-national-park` has a different browser tab title and Google
snippet than `/klis-fortress`. This is critical for SEO.

In React + Vite, you would do this with `react-helmet` or `document.title = ...`
inside a `useEffect`. The problem: Google's crawler may not execute that JavaScript,
so it may never see the correct title. With Next.js, the title is baked into the
HTML before the browser even gets it.

---

## Server Components vs Client Components

### The Rule

In Next.js App Router:

- **Every component is a Server Component by default.** It runs on the server
  (or at build time), outputs HTML, and the browser never downloads its code.

- **Add `"use client"` at the top** only when you need browser-specific features:
  `useState`, `useEffect`, `onClick`, `window`, `document`, etc.

### Which Components Are Client Components in This Project?

| Component | `"use client"` | Why |
|---|---|---|
| `Navbar.tsx` | Yes | Uses `useState` (mobile menu), `useEffect` (scroll detection), `onClick` |
| `Gallery.tsx` | Yes | Uses `useState` (current slide), `useEffect` (autoplay timer), touch events |
| `Reviews.tsx` | Yes | Uses `useState` (carousel position), `useEffect` (autoplay), `window.innerWidth` |
| `Contact.tsx` | Yes | Uses `useState` (form data), `onSubmit` |
| `ScrollToTopButton.tsx` | Yes | Uses `useState` (visibility), `useEffect` (scroll listener), `onClick` |

### Which Components Are Server Components?

| Component | Why Server |
|---|---|
| `Hero.tsx` | Pure HTML/CSS, no interactivity |
| `Amenities.tsx` | Static grid of icons, no interactivity |
| `ReviewCard.tsx` | Receives props, renders HTML, no hooks |
| `AttractionsPreview.tsx` | Static cards with links, no hooks |
| `Location.tsx` | Static iframe + text, no hooks |
| `Footer.tsx` | Static links and text, no hooks |
| `layout.tsx` | Application shell, no hooks |
| `page.tsx` (homepage) | Composes other components, no hooks |
| `[slug]/page.tsx` | Static content from data, no hooks |

**Why this matters:** The 6 server components above contribute **zero bytes**
to the JavaScript bundle. The browser never downloads their code. It only
gets the HTML they produce. This is why Next.js sites are often faster than
equivalent React + Vite sites — less JavaScript to download and execute.

---

## Every Magic Number Explained

### ScrollToTopButton: `window.scrollY > 400`

```typescript
const onScroll = () => setVisible(window.scrollY > 400);
```

**Why 400px?** The hero section is `min-h-screen` (100vh), which is typically
700-900px on most screens. 400px means the button appears roughly when the user
has scrolled past half the hero section. At this point:

- The user has clearly committed to scrolling (not an accidental scroll)
- The button does not appear immediately, which would be visually distracting
- The user has moved far enough from the top that a "back to top" shortcut is useful

If you set it to 100px, the button would flash in and out as the user barely scrolls.
If you set it to 1000px, mobile users might never see it (their viewport is short).
400px is the industry-standard sweet spot.

### Navbar: `window.scrollY > 50`

```typescript
const onScroll = () => setScrolled(window.scrollY > 50);
```

**Why 50px?** The navbar starts transparent over the hero image. It should become
solid (white background) as soon as the user starts scrolling, but not on tiny
accidental mouse wheel ticks. 50px is about 3-4 lines of text worth of scrolling —
enough to know the user intentionally scrolled, but small enough to feel responsive.

### Gallery Autoplay: `5000` (5 seconds)

```typescript
timerRef.current = setInterval(next, 5000);
```

**Why 5 seconds?** Research on image carousels shows:

- <3 seconds: too fast, users cannot absorb the image
- 3-5 seconds: ideal for visual content (photos)
- >7 seconds: too slow, users may not realize it auto-advances
- 5 seconds gives enough time to appreciate each villa photo without feeling rushed

### Reviews Autoplay: `6000` (6 seconds)

```typescript
timerRef.current = setInterval(next, 6000);
```

**Why 6 seconds (not 5 like gallery)?** Reviews contain text that needs to be read.
Reading takes longer than glancing at a photo. 6 seconds gives users enough time
to read a short review. Long reviews may still get cut off, but the manual arrows
let users pause and read at their own pace.

### Gallery Swipe Threshold: `50` pixels

```typescript
if (Math.abs(diff) > 50) {
```

**Why 50px?** On mobile, touch events fire for all kinds of gestures: taps, scrolls,
accidental touches. A 50px horizontal movement threshold distinguishes an intentional
swipe from a tap or a slight finger drag. Less than 30px catches too many false
positives. More than 80px feels unresponsive. 50px is standard in swipe libraries
like Hammer.js and Swiper.

### Hero Overlay: `bg-black/45`

```typescript
<div className="absolute inset-0 bg-black/45" />
```

**Why 45% opacity?** The hero background image is a photograph. Without an overlay,
white text is often unreadable against bright areas of the photo. 45% black overlay:

- Darkens the image enough for white text to have sufficient contrast (WCAG AA compliance)
- Does not darken it so much that the beautiful villa photo becomes invisible
- 30% is too transparent (text hard to read on light parts of the image)
- 60% is too dark (image barely visible, feels oppressive)

### Parallax Disabled on Mobile: `@media (max-width: 768px)`

```css
@media (max-width: 768px) {
  .parallax-hero {
    background-attachment: scroll;
  }
}
```

**Why disable parallax on mobile?** `background-attachment: fixed` causes severe
performance issues on iOS Safari and older Android browsers. It forces the browser
to repaint the entire background on every scroll frame, causing visible jutter and
dropped frames. On mobile, we fall back to normal scrolling — the user does not
notice the difference on a small screen anyway.

### Gallery Aspect Ratio: `aspect-[16/10]`

**Why 16:10 instead of 16:9?** Villa photos often include vertical elements (rooms,
pools, buildings). 16:10 is slightly taller than 16:9, giving more vertical space
to show these elements without cropping important parts. It also feels less
cinematic/theatrical and more photographic, which suits real estate imagery.

### Bounce Animation: `translateY(8px)` over `2s`

```css
@keyframes bounce-slow {
  50% { transform: translateY(8px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
```

**Why 8px and 2 seconds?** The scroll indicator arrow needs to be noticeable but
not distracting. Tailwind's default `animate-bounce` uses `translateY(-25%)` which
is aggressive. 8px is subtle — it catches the eye without being annoying. 2 seconds
(vs the default 1s) makes it feel calm and luxurious, matching the villa brand.

### Review Card: `hover:-translate-y-0.5`

**Why 0.5 (2px)?** This is a micro-interaction. The card lifts very slightly on
hover to indicate it is interactive or to add depth. 2px is barely perceptible but
subconsciously creates a "floating" feeling. More than 4px looks like the card is
jumping and feels cartoonish for a luxury brand.

### Content Max Width: `max-w-7xl` (Navbar), `max-w-5xl` (Gallery), `max-w-6xl` (Reviews)

- `max-w-7xl` (1280px) for navbar: spans the full comfortable reading width
- `max-w-5xl` (1024px) for gallery: keeps images large but not stretched
- `max-w-6xl` (1152px) for review cards: fits 3 cards in a row with gaps
- `max-w-4xl` (896px) for amenity grid: 3 columns with appropriate card sizes
- `max-w-3xl` (768px) for attraction article text: optimal reading line length (60-80 characters)

These follow typographic principles. Text lines longer than ~80 characters
become hard to read because the eye struggles to find the beginning of the next line.

---

## SEO: What It Is and What We Did

SEO (Search Engine Optimization) is the practice of making your site rank higher
on Google. For a vacation rental, someone searching "villa with pool Marina Croatia"
should find your site.

### What We Implemented

1. **`<title>` tag** — The text that appears in browser tabs and Google search results.
   Set via the `metadata` export in `layout.tsx`.

2. **`<meta name="description">` tag** — The snippet Google shows under your title.
   Should be 150-160 characters and include keywords naturally.

3. **Open Graph tags** — Control how the site looks when shared on Facebook, WhatsApp,
   LinkedIn, etc. We set `og:title`, `og:description`, `og:image`.

4. **Twitter Card tags** — Same as Open Graph but for X (Twitter). Uses `twitter:card`,
   `twitter:title`, `twitter:image`.

5. **JSON-LD Structured Data** — A `<script type="application/ld+json">` block that
   tells Google exactly what this site is about in a machine-readable format.
   We use the `LodgingBusiness` schema, which tells Google:
   - This is a lodging business
   - It is located at this address
   - It has these amenities
   - Its aggregate rating is 10/10

   This can result in rich snippets in Google search results (star ratings, address,
   amenities shown directly on the search page).

6. **Semantic HTML** — Using `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`,
   `<footer>`, `<address>` instead of divs everywhere. This helps search engines
   understand the page structure.

7. **Single H1** — Only one `<h1>` per page (the villa name on the homepage, the
   attraction title on attraction pages). Multiple H1s confuse search engines
   about what the page is primarily about.

8. **Alt text on images** — Every `<Image>` has an `alt` attribute describing the
   image content. This helps Google Image Search and screen readers.

9. **Canonical URL** — Tells Google "this is the definitive URL for this content,"
   preventing duplicate content issues.

10. **Per-page metadata on attraction pages** — Each `/krka-national-park` etc. has
    its own unique title and description via `generateMetadata`, so Google can index
    each attraction page separately.

---

## How to Test Speed with Lighthouse

Lighthouse is Google's built-in tool for measuring website performance,
accessibility, SEO, and best practices. Here is how to use it:

### Method 1: Chrome DevTools (Easiest)

1. Open your site in Google Chrome (http://localhost:3000 for dev, or the Vercel URL for production)
2. Press `F12` (or right-click → "Inspect") to open DevTools
3. Click the **"Lighthouse"** tab at the top of DevTools
   - If you do not see it, click the `>>` arrows to find it in the overflow menu
4. Settings:
   - Mode: **Navigation** (default)
   - Device: **Mobile** (test mobile first, then desktop)
   - Categories: check all (Performance, Accessibility, Best Practices, SEO)
5. Click **"Analyze page load"**
6. Wait 30-60 seconds for the audit to complete
7. You will see scores from 0-100 for each category

### Method 2: Google PageSpeed Insights (Production Only)

1. Go to https://pagespeed.web.dev/
2. Enter your production URL (e.g., `https://villaoasismarina.com`)
3. Click "Analyze"
4. Shows both mobile and desktop scores with specific recommendations

### Method 3: Chrome Command Line

```bash
npx lighthouse http://localhost:3000 --view
```

This runs Lighthouse from the command line and opens the report in your browser.

### Important Notes

- **Always test the production build**, not the dev server. The dev server is
  intentionally slow (it does not optimize). Run `npm run build && npm start`
  first, then test against `http://localhost:3000`.
- **Test on Mobile** — Lighthouse mobile scores are always lower than desktop
  because it throttles the CPU and network to simulate a mid-range phone.
  A 95+ on mobile is excellent.
- **Close other tabs** — Other tabs consume CPU and can lower your scores.
- **Use Incognito mode** — Browser extensions can interfere with Lighthouse.

### What the Scores Mean

| Score | Rating |
|---|---|
| 90-100 | Green (Excellent) |
| 50-89 | Orange (Needs Improvement) |
| 0-49 | Red (Poor) |

Our target is 95+ across all four categories.

---

## The `npm install` Problem and Moving node_modules to D Drive

### Why Does `npm install` Exist?

When you run `npm install`, npm reads `package.json` and downloads every package
listed in `dependencies` and `devDependencies`, along with all THEIR dependencies
(transitive dependencies). A Next.js project typically has 200-500 transitive
packages, totaling 200-400 MB in the `node_modules` folder.

This happens **per project**. If you have 10 projects, you could have 4 GB of
duplicated packages.

### Why Can't Packages Be Shared?

They technically can, but npm's default behavior is to install everything locally
in each project's `node_modules` folder. This is because different projects might
need different versions of the same package. Local installs prevent version conflicts.

### How to Move npm's Cache to D Drive

npm downloads packages to a cache before installing them. By default, this cache
is on your C drive. You can move it:

```bash
npm config set cache "D:\npm-cache" --global
```

This moves the **cache** (the download storage) to D drive. However, `node_modules`
will still be created inside each project directory. If your project is on D drive,
`node_modules` is already on D drive.

### Alternative: Use pnpm Instead of npm

pnpm is a drop-in replacement for npm that solves the disk space problem. It stores
all packages in a single global store and uses **hard links** (not copies) in each
project. 10 projects using React 19 will only have ONE copy of React on disk.

Install it:

```bash
npm install -g pnpm
```

Then use it instead of npm:

```bash
pnpm install     # instead of npm install
pnpm run dev     # instead of npm run dev
pnpm run build   # instead of npm run build
```

pnpm can save 50-70% of disk space across multiple projects.

To set pnpm's store location to D drive:

```bash
pnpm config set store-dir "D:\pnpm-store"
```

### Alternative: Delete node_modules When Not Working on a Project

If you are not actively developing a project, you can delete its `node_modules`
folder. It can always be recreated with `npm install`. The `package.json` and
`package-lock.json` files are the source of truth — `node_modules` is just
a generated cache.

```bash
# Delete node_modules (Windows)
rmdir /s /q node_modules

# Recreate when needed
npm install
```

### Summary of Disk Space Solutions

| Solution | Savings | Effort |
|---|---|---|
| Move npm cache to D drive | Moderate | One command |
| Keep projects on D drive | Full (per project) | Move project folder |
| Use pnpm | 50-70% across all projects | Install pnpm, use `pnpm` instead of `npm` |
| Delete unused node_modules | Full (temporarily) | Manual cleanup |

---

## Deploying to Vercel

Vercel is the company that makes Next.js. Their hosting platform is optimized for it.

### Option 1: GitHub Integration (Recommended)

1. Push your project to a GitHub repository
2. Go to https://vercel.com and sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Vercel auto-detects Next.js and configures everything
6. Click "Deploy"
7. Your site is live at `your-project.vercel.app`
8. Every `git push` to `main` automatically redeploys

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd D:\VillaMarinaStranica\villa-oasis
vercel
```

Follow the prompts. It will deploy and give you a URL.

### Custom Domain

1. In the Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add `villaoasismarina.com` (or whatever domain you own)
4. Update your domain's DNS records as Vercel instructs

### The `output: "standalone"` in next.config.ts

```typescript
output: "standalone"
```

This tells Next.js to create a self-contained build that includes only the
necessary dependencies (not the entire `node_modules`). This is required for
Docker deployments and recommended for Vercel for faster cold starts.

---

## Future Improvements

Here is what you can add to this project, ordered by impact:

### High Impact

1. **Real Contact Form Backend** — Currently the form only logs to console. Options:
   - **Resend** (email API): Send form submissions to your email. Free tier: 100 emails/day.
   - **Next.js API Route**: Create `app/api/contact/route.ts` that receives the form
     data and sends an email via Resend/SendGrid/Nodemailer.
   - **Formspree/Getform**: Third-party form backends. No code needed, just change the
     form `action` URL.

2. **Real Google Maps Embed** — The current Maps embed uses approximate coordinates.
   Go to Google Maps, search for the exact villa address, click "Share" → "Embed a map",
   and replace the `src` URL in `Location.tsx` with the actual embed URL.

3. **Image Optimization** — The current images are raw JPGs from `slike-stranica/`.
   Before production:
   - Resize hero image to max 1920px wide
   - Resize gallery images to max 1200px wide
   - Compress all images using https://squoosh.app or https://tinypng.com
   - Consider converting to WebP format (Next.js `<Image>` does this automatically
     for images served through its pipeline, but the hero uses CSS `background-image`
     which bypasses it)

4. **Analytics** — Add Vercel Analytics or Google Analytics to track visitor behavior.
   Which section do they scroll to? How many click "Book Now"?
   ```bash
   npm install @vercel/analytics
   ```

5. **Cookie Consent Banner** — Required by EU law (GDPR) if you use any tracking
   cookies or analytics. Croatia is in the EU, so your visitors likely are too.

### Medium Impact

6. **Multilingual Support (i18n)** — Add Croatian, German, Swedish, and Polish
   translations (based on your actual guest nationalities from reviews).
   Next.js has built-in i18n routing support.

7. **Attraction Page Images** — Each attraction page (`/krka-national-park` etc.)
   currently has no images. Add a hero image for each attraction to make the pages
   more engaging and better for SEO (Google Image Search).

8. **Blog / Travel Tips Section** — Writing content like "Best beaches near Marina"
   or "Day trips from Split" would generate organic search traffic. Each blog post
   would be a new page, driving more visitors to your booking page.

9. **Testimonial Video Embeds** — If any guests recorded video testimonials, embedding
   them increases trust and conversion rates.

10. **Price Display** — Show nightly rates or a "Starting from X/night" badge.
    People who see pricing are more likely to click "Book Now" than those who have
    to go to VRBO to find out.

### Low Impact (Nice to Have)

11. **Dark Mode** — Add a theme toggle. Mostly cosmetic but some users prefer it.

12. **Loading Skeleton** — Show placeholder content while images load. This improves
    perceived performance even if actual performance is the same.

13. **Sitemap Generation** — Create `app/sitemap.ts` to auto-generate a sitemap.xml
    for Google Search Console. Next.js has built-in support for this:
    ```typescript
    // app/sitemap.ts
    export default function sitemap() {
      return [
        { url: 'https://villaoasismarina.com', lastModified: new Date() },
        // ... attraction pages
      ];
    }
    ```

14. **PWA (Progressive Web App)** — Add a service worker and manifest so the site
    can be "installed" on mobile home screens and works offline.

15. **A/B Testing** — Test different hero text, button colors, or CTA copy to see
    what converts best. Vercel has a built-in Edge Config for this.

16. **Booking Widget** — If VRBO provides an embeddable booking widget, embed it
    directly on the site so users can check availability without leaving.

17. **Weather Widget** — Show current weather in Marina, Croatia. Useful for
    potential guests deciding when to visit.

---

## File-by-File Breakdown

### Configuration Files

| File | Purpose |
|---|---|
| `package.json` | Lists dependencies, defines scripts (`dev`, `build`, `start`, `lint`) |
| `tsconfig.json` | TypeScript compiler configuration. The `@/*` path alias maps to `./src/*` |
| `next.config.ts` | Next.js configuration. Enables standalone output and AVIF/WebP image formats |
| `tailwind.config.ts` | Tailwind configuration. Defines custom colors (primary blue, gold) and fonts |
| `postcss.config.mjs` | PostCSS configuration. Just loads the Tailwind plugin |
| `.gitignore` | Tells Git to ignore `node_modules`, `.next`, `.env` files, etc. |
| `next-env.d.ts` | Auto-generated TypeScript declarations for Next.js |

### Source Files

| File | Server/Client | Purpose |
|---|---|---|
| `src/types/index.ts` | N/A (types only) | TypeScript interfaces for Review, Attraction, GalleryImage |
| `src/lib/data.ts` | N/A (data only) | All static data: reviews, attractions, amenities, gallery images, constants |
| `src/app/globals.css` | N/A (CSS) | Tailwind imports, parallax CSS, animations, component utility classes |
| `src/app/layout.tsx` | Server | Root layout: HTML shell, metadata, JSON-LD structured data |
| `src/app/page.tsx` | Server | Homepage: composes all section components in scroll order |
| `src/app/[slug]/page.tsx` | Server | Dynamic attraction pages with generateStaticParams and generateMetadata |
| `src/components/Navbar.tsx` | Client | Transparent-to-solid navbar, mobile hamburger menu, smooth scroll links |
| `src/components/Hero.tsx` | Server | Fullscreen parallax hero with buzz phrases and Book Now CTA |
| `src/components/Gallery.tsx` | Client | Image slideshow with autoplay, arrows, swipe, dot indicators |
| `src/components/Amenities.tsx` | Server | 3-column icon grid showing 9 villa amenities |
| `src/components/ReviewCard.tsx` | Server | Individual review card with star rating, hover lift |
| `src/components/Reviews.tsx` | Client | Review carousel with autoplay, responsive per-page count |
| `src/components/AttractionsPreview.tsx` | Server | Card grid linking to individual attraction pages |
| `src/components/Location.tsx` | Server | Google Maps iframe embed with address display |
| `src/components/Contact.tsx` | Client | Contact form (name, phone, message) with placeholder handler |
| `src/components/Footer.tsx` | Server | Social links, quick nav links, copyright |
| `src/components/ScrollToTopButton.tsx` | Client | Fixed button that appears after 400px scroll |

### Public Files

| Path | Purpose |
|---|---|
| `public/images/hero.jpg` | Hero section background image (image01 from slike-stranica) |
| `public/images/gallery/image02-20.jpg` | 19 gallery slideshow images |
| `public/data/buzzWords.md` | Source marketing copy (used to derive buzz phrases) |
| `public/data/attractionsNearMarina.md` | Source attraction descriptions (used to derive attraction data) |
