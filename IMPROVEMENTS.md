# Site Improvements - Priority Checklist

## ⚡ CRITICAL - Must Do By Tomorrow

### 1. Contact Information Display Component

**Current State:** Contact form at bottom of page (currently commented out in page.tsx)

**Required:** Display host contact info instead of/alongside the form

**Task:**
- Create `ContactInfo.tsx` component showing:
  - Host name (likely Vinko based on reviews)
  - Phone number
  - Email address (if applicable)
  - WhatsApp link (recommended for international guests)
  - Small profile photo (optional but builds trust)

**Design:**
```
┌─────────────────────────────────────────┐
│         Get In Touch                     │
│                                          │
│  👤 Vinko                                │
│  📞 +385 XX XXX XXXX                     │
│  📧 contact@villaoasismarina.com         │
│  💬 WhatsApp: [Click to Chat]           │
│                                          │
│  "Available 24/7 to help with your stay" │
└─────────────────────────────────────────┘
```

**Files to modify:**
- `src/components/ContactInfo.tsx` (NEW)
- `src/app/page.tsx` (replace Contact with ContactInfo)
- `src/lib/data.ts` (add contact constants)

**Estimated time:** 30 minutes

---

### 2. Gallery Expansion (40 Images)

**Current State:** 19 gallery images (image02-20)

**Required:** Expand to 40 images

**Task:**
- Select best 40 images from `slike-stranica/` folder
- Copy to `public/images/gallery/` as image02-41
- Update `data.ts` galleryImages array to generate 40 images instead of 19

**Selection Criteria (to help you pick):**
1. **Hero shots** (5-7 images): Pool area, villa exterior, sunset views
2. **Living spaces** (8-10 images): Living room, kitchen, dining area from multiple angles
3. **Bedrooms** (8-10 images): Each bedroom + bathrooms
4. **Outdoor spaces** (6-8 images): Pool from different angles, terrace, BBQ area, garden
5. **Details** (4-6 images): Amenities close-ups (coffee machine, outdoor shower, pool lights at night)
6. **Surrounding area** (3-5 images): View from villa, nearby beach, Marina harbor

**Avoid:**
- Blurry or dark images
- Duplicate angles
- Images with construction/mess in background
- Overly similar shots

**Files to modify:**
- `public/images/gallery/` (add image21-41.jpg)
- `src/lib/data.ts` (change `{ length: 19 }` to `{ length: 40 }`)

**Command to copy:**
```bash
# Select your best images and copy them
copy "D:\VillaMarinaStranica\slike-stranica\image21.jpg" "D:\VillaMarinaStranica\villa-oasis\public\images\gallery\image21.jpg"
# ... repeat for image22-41
```

**Estimated time:** 1-2 hours (most time spent selecting best images)

---

### 3. Update Amenities (Remove Fireplace, Add Other)

**Current State:** 9 amenities including Fireplace

**Required:** Remove Fireplace (unlikely needed in Croatian summer villa)

**Suggested replacement:** "Heated Pool" (if applicable)

**Files to modify:**
- `src/lib/data.ts` (amenities array)
- `src/components/Amenities.tsx` (add new icon if needed)

**New amenity options to consider:**
- Beach Access (4 min with car)
- Heated Pool (if applicable)

**Example change in `data.ts`:**
```typescript
export const amenities = [
  { name: "Pool", icon: "pool" },
  { name: "Washer", icon: "washer" },
  { name: "Free WiFi", icon: "wifi" },
  { name: "Air Conditioning", icon: "ac" },
  { name: "Outdoor Space", icon: "outdoor" },
  { name: "Parking Available", icon: "parking" },
  { name: "Barbecue Grill", icon: "bbq" },
  { name: "Beach Nearby", icon: "beach" }, // CHANGED
  { name: "Mountain View", icon: "mountain" },
] as const;
```

**If using "Beach Nearby", add icon to Amenities.tsx:**
```typescript
beach: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
    <path d="M3 17h18M3 17s3-3 9-3 9 3 9 3M12 3v11" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
),
```

**Estimated time:** 15 minutes

---

### 4. Nearby Restaurants Section

**Current State:** Only nearby attractions exist

**Required:** New "Nearby Restaurants" section below attractions

**Task:**
- Copy restaurant data from VRBO listing (you mentioned they're listed there)
- Create new component `NearbyRestaurants.tsx`
- Add section to homepage after `AttractionsPreview`

list of nearby restaurants from vrbo: 
Kaštel Stari Station - ‪31 min drive‬
Labin Dalmatinski Station - ‪36 min drive‬
Perkovic Station - ‪45 min drive‬
Split (SPU) - ‪25 min drive‬(ignore the icons here
)
**Data structure needed (add to `data.ts`):**
```typescript
export interface Restaurant {
  name: string;
  cuisine: string;
  distance: string;
  description: string;
  priceRange: string; // "€€" or "Budget" or "Mid-range" etc.
}

export const restaurants: Restaurant[] = [
  {
    name: "Konoba Marina",
    cuisine: "Traditional Dalmatian",
    distance: "~5 minutes by car",
    description: "Family-run restaurant serving fresh seafood and local specialties.",
    priceRange: "€€",
  },
  // ... add 4-6 restaurants from VRBO
];
```

**Component design:**
```tsx
// Similar to AttractionsPreview but simpler (no individual pages)
// Card grid showing:
// - Restaurant name
// - Cuisine type badge
// - Distance
// - Short description
// - Price indicator (€ / €€ / €€€)
```

**Files to create/modify:**
- `src/types/index.ts` (add Restaurant interface)
- `src/lib/data.ts` (add restaurants array)
- `src/components/NearbyRestaurants.tsx` (NEW)
- `src/app/page.tsx` (add <NearbyRestaurants /> after AttractionsPreview)

**Estimated time:** 45 minutes

---

## 📱 SOCIAL MEDIA - Recommendations

### Instagram Strategy (@luxuryvillamarina)

**Content Pillars:**

1. **Property Showcases** (40% of posts)
   - High-quality villa photos with captions highlighting one feature per post
   - Example: Pool photo with caption "Start your morning with a swim in crystal-clear waters 🏊‍♀️ Our private pool is heated and ready for you year-round."
   - **Post frequency:** 2-3 per week

2. **Guest Experiences** (30% of posts)
   - Repost guest photos (with permission) showing real stays
   - Testimonial quotes overlaid on images
   - Example: Photo of family at pool with quote from Grant M. review
   - **Post frequency:** 1-2 per week

3. **Local Area Highlights** (20% of posts)
   - Photos of Krka waterfalls, Split palace, Marina harbor
   - Caption: "Just 35 minutes from our villa..."
   - Drives home the location value
   - **Post frequency:** 1 per week

4. **Behind-the-Scenes / Preparation** (10% of posts)
   - Fresh linens being prepared
   - Pool maintenance
   - Welcome amenities setup
   - Shows care and professionalism
   - **Post frequency:** 1 per 2 weeks

**Instagram Reels Ideas:**
- Villa tour (30 seconds walking through rooms)
- Pool at different times of day (sunrise/sunset/night)
- "Pack with me for Croatian coast" (what to bring)
- "24 hours at our villa" time-lapse

**Hashtag Strategy:**
```
#CroatiaVilla #DalmatianCoast #VillaRental #CroatiaTravel
#MarinaCroatia #LuxuryTravel #PrivatePool #SplitCroatia
#VacationRental #TravelCroatia #VillaWithPool #CroatiaHoliday
```

**Bio Suggestion:**
```
🏖️ Luxury Private Villa | Marina, Croatia
🏊‍♀️ Heated Pool • Mountain Views • Sleeps 8+
⭐ Rated 10/10 by our guests
📍 35 min from Split | Book below 👇
[VRBO Link]
```

---

### X (Twitter) Strategy (@VillaOasisMarina)

**Content Types:**

1. **Special Offers & Availability** (PRIMARY FOCUS)
   - "🌟 Last-minute availability: July 15-22 now 15% off! Book within 48 hours."
   - "Early bird special: Book 2026 summer before March 1st, get free airport transfer 🚗"
   - **Post frequency:** Whenever you have gaps to fill or want to incentivize bookings

2. **Quick Tips & Local Knowledge**
   - "💡 Insider tip: Visit Krka National Park before 9am to avoid crowds"
   - "🍽️ Our favorite Marina restaurant: Konoba Marina. Ask for the octopus salad!"
   - **Post frequency:** 2-3 per week

3. **Weather & Seasonal Updates**
   - "☀️ 28°C and sunny in Marina today. Perfect pool weather! Check availability..."
   - "🌊 Sea temperature: 24°C. Ideal swimming conditions this week."
   - **Post frequency:** Weekly during high season

4. **Engagement / Questions**
   - "Poll: What's your must-have villa amenity? A) Pool B) AC C) BBQ D) WiFi"
   - "What's on your Croatia bucket list? 👇"
   - **Post frequency:** 1-2 per week

**Why X for Special Offers:**
- X users expect real-time deals
- Easy to share booking links
- Can pin special offer tweet to profile
- Good for retargeting people who showed interest but didn't book

**Sample Special Offer Tweet:**
```
⚡ FLASH SALE ⚡

August 20-27 now available at 20% off

✅ Private heated pool
✅ Sleeps 9 guests
✅ 35 min from Split
✅ Rated 10/10

Only 2 days left to book this rate!

🔗 [VRBO link]

#Croatia #VillaRental #TravelDeals
```

**Bio Suggestion:**
```
🏡 Luxury Villa Rental | Marina, Croatia 🇭🇷
🏊 Private Pool • Mountain Views • Sleeps 8+
⭐ Rated 10/10 | 35min from Split
📩 DM for special offers
🔗 Book now 👇
```

---

### Do You NEED This Level of Social Media?

**Short answer: No, not immediately.**

Your primary booking channel is VRBO, which handles discovery and transactions.
Social media is **supplementary** and works best when:

1. You have time to post consistently (or hire someone)
2. You want to build a brand beyond VRBO's platform
3. You want to offer direct booking discounts (to avoid VRBO's commission)

**Minimum Viable Social Strategy (If Time-Limited):**

**Instagram:**
- Post 1x per week: Best villa photo with simple caption
- Use same 15 hashtags every time
- Respond to DMs within 24 hours
- **Time commitment:** 30 min/week

**X:**
- Post only when you have:
  - Last-minute availability to fill
  - A special offer
  - Major news (new amenity added, renovation, etc.)
- **Time commitment:** 10 min/month (as needed)

**Better ROI Activities Than Daily Social Posts:**
1. Getting more VRBO reviews (ask every guest)
2. Professional photography (hire photographer for 1 day, get 50+ pro shots)
3. Updating VRBO listing with seasonal availability calendars
4. Responding quickly to VRBO inquiries (within 1 hour = higher booking rate)
5. Google Business Profile optimization (free, shows up in "villas near me" searches)

---

## 🎯 Priority Ranking Summary

| Task | Impact | Effort | Priority | Deadline |
|------|--------|--------|----------|----------|
| Contact info component | High | Low | **1** | Tomorrow |
| Gallery expansion to 40 images | High | Medium | **2** | Tomorrow |
| Remove fireplace amenity | Low | Very Low | **3** | Tomorrow |
| Nearby restaurants section | Medium | Medium | **4** | Tomorrow |
| Social media setup | Low | Ongoing | **5** | Optional |

**Recommended Order for Tomorrow:**

**Morning (2-3 hours):**
1. ✅ Select 40 best gallery images (1.5 hours)
2. ✅ Copy images to gallery folder (15 min)
3. ✅ Update data.ts gallery length (2 min)
4. ✅ Remove fireplace, add beach/other amenity (15 min)

**Afternoon (2-3 hours):**
5. ✅ Create ContactInfo component (30 min)
6. ✅ Get restaurant data from VRBO (15 min)
7. ✅ Create NearbyRestaurants component (45 min)
8. ✅ Add both to homepage (10 min)
9. ✅ Test everything locally (30 min)

**Evening (30 min):**
10. ✅ Build and deploy to Vercel (15 min)
11. ✅ Test live site on mobile and desktop (15 min)

**Total time needed:** ~5-6 hours of focused work

---

## 📋 Checklist Format (Copy This)

```
TOMORROW'S TASKS:

Gallery:
[ ] Select 21 additional images from slike-stranica (aim for variety)
[ ] Copy image21.jpg to gallery folder
[ ] Copy image22.jpg to gallery folder
[ ] ... (repeat for 21-41)
[ ] Update data.ts: change length from 19 to 40
[ ] Test gallery slideshow works with new images

Amenities:
[ ] Remove { name: "Fireplace", icon: "fireplace" } from data.ts
[ ] Add replacement amenity (decide: beach/heated pool/sea view)
[ ] Add icon for new amenity in Amenities.tsx if needed
[ ] Test amenities section displays 9 items

Contact Info:
[ ] Get your phone number in international format (+385...)
[ ] Get your email address for contact
[ ] Create src/components/ContactInfo.tsx
[ ] Add contact constants to data.ts
[ ] Add ContactInfo component to page.tsx (replace or alongside Contact form)
[ ] Test contact section displays correctly

Restaurants:
[ ] Open VRBO listing and copy restaurant recommendations
[ ] Create Restaurant interface in types/index.ts
[ ] Add restaurants array to data.ts (4-6 restaurants minimum)
[ ] Create src/components/NearbyRestaurants.tsx
[ ] Import and add <NearbyRestaurants /> to page.tsx after AttractionsPreview
[ ] Test restaurants section displays correctly

Final:
[ ] npm run build (check for errors)
[ ] npm start and test localhost:3000
[ ] Check all sections on mobile view (Chrome DevTools)
[ ] Deploy to Vercel (git push or vercel CLI)
[ ] Test live site on actual phone
[ ] Run Lighthouse audit (aim for 90+)

OPTIONAL (If Time):
[ ] Set up Instagram business account
[ ] Post first Instagram photo (best pool shot)
[ ] Set up X account
[ ] Pin special offer tweet (if you have one)
```

---

## 🚀 Quick Copy-Paste Code Snippets

### ContactInfo Component Template

Create `src/components/ContactInfo.tsx`:

```typescript
import { CONTACT_NAME, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/data";

export default function ContactInfo() {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">
        Have questions? Vinko is here to help make your stay perfect
      </p>

      <div className="mx-auto max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{CONTACT_NAME}</h3>
            <p className="text-sm text-gray-600">Your Host</p>
          </div>

          <div className="space-y-4">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50"
            >
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{CONTACT_PHONE}</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50"
            >
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{CONTACT_EMAIL}</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${CONTACT_PHONE.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 transition-all hover:border-green-300 hover:bg-green-100"
            >
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div className="flex-1">
                <p className="text-xs font-medium text-green-600">WhatsApp</p>
                <p className="font-medium text-green-700">Message on WhatsApp</p>
              </div>
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Available 24/7 to help plan your perfect Croatian getaway
          </p>
        </div>
      </div>
    </section>
  );
}
```

Add to `src/lib/data.ts`:
```typescript
export const CONTACT_NAME = "Vinko";
export const CONTACT_PHONE = "+385 XX XXX XXXX"; // REPLACE WITH REAL NUMBER
export const CONTACT_EMAIL = "contact@villaoasismarina.com"; // REPLACE WITH REAL EMAIL
```

---

### NearbyRestaurants Component Template

Create `src/components/NearbyRestaurants.tsx`:

```typescript
import { restaurants } from "@/lib/data";

export default function NearbyRestaurants() {
  return (
    <section id="restaurants" className="section-padding bg-gray-50">
      <h2 className="section-title">Nearby Restaurants</h2>
      <p className="section-subtitle">
        Discover authentic Dalmatian cuisine and fresh seafood just minutes away
      </p>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.name}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {restaurant.name}
              </h3>
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                {restaurant.priceRange}
              </span>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {restaurant.cuisine}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-600">{restaurant.distance}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              {restaurant.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Add to `src/types/index.ts`:
```typescript
export interface Restaurant {
  name: string;
  cuisine: string;
  distance: string;
  description: string;
  priceRange: string;
}
```

Add to `src/lib/data.ts`:
```typescript
export const restaurants: Restaurant[] = [
  {
    name: "Restaurant Name 1",
    cuisine: "Dalmatian",
    distance: "~5 minutes by car",
    description: "Description from VRBO listing.",
    priceRange: "€€",
  },
  {
    name: "Restaurant Name 2",
    cuisine: "Seafood",
    distance: "~10 minutes by car",
    description: "Description from VRBO listing.",
    priceRange: "€€€",
  },
  // Add 4-6 total restaurants
];
```

Update `src/app/page.tsx`:
```typescript
import NearbyRestaurants from "@/components/NearbyRestaurants";
import ContactInfo from "@/components/ContactInfo";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Gallery />
      <Amenities />
      <Reviews />
      <AttractionsPreview />
      <NearbyRestaurants />  {/* NEW */}
      <Location />
      <ContactInfo />  {/* NEW - replaces Contact form */}
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
```

---

## 📞 NEED HELP?

If you get stuck on any task tomorrow:

1. **TypeScript errors:** Run `npm run build` to see exactly what's wrong
2. **Component not showing:** Check browser console (F12) for errors
3. **Images not loading:** Make sure file paths match exactly (case-sensitive)
4. **Layout broken:** Check Tailwind classes, ensure no typos

**Emergency fix:** If something breaks and you need the site live:
```bash
git checkout main  # revert to last working version
npm run build
git push
```

Good luck! 🚀
