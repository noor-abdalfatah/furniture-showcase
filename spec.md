# Spec: Furniture Showcase PWA

Status: Approved (design). Pending user review of this document before the implementation plan.
Language of this document: English. Site content: Arabic and English.

---

## 1. Purpose

A bilingual (Arabic/English) Progressive Web App that showcases furniture designs. It is a **portfolio piece** for job applications and client acquisition.

**Explicitly NOT:** an online store. No cart, no checkout, no payment, no order tracking.

**Success criteria:**
- Installable on mobile and desktop (valid manifest + service worker).
- Full product catalog works offline after the first visit.
- Lighthouse PWA check passes. Performance and Accessibility scores are high (target 90+ on mobile).
- Arabic and English both render correctly, with RTL layout in Arabic.
- Deployed on Vercel under a dedicated subdomain or domain.

---

## 2. Scope

### In scope (v1)
- 5 pages: Home, Catalog, Product Detail, About, Contact.
- Catalog search and filter by category.
- Product detail: image gallery, material swatch row, dimensions table, WhatsApp button.
- Language switch: Arabic (RTL) and English (LTR).
- Light theme only.
- PWA: manifest, icons, install prompt, offline catalog.

### Out of scope (v1)
- Cart, checkout, payments, order tracking, user accounts.
- Favorites / wishlist.
- Dark mode.
- Hero video (planned for v2; v1 uses a static image).
- Blueprint or 3D dimension drawings.
- Backend or database. All data is static.

---

## 3. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), static generation (SSG) |
| Styling | Tailwind CSS |
| PWA | `serwist` with `@serwist/next` (service worker + precache) |
| Fonts | `next/font`: Tajawal (Arabic), Inter (Latin) |
| Icons | `lucide-react`, stroke width 1.5 |
| Hosting | Vercel (Git-connected, auto deploy on push) |
| Language | TypeScript |

Do not use: `zustand`, any state library, `framer-motion` (not needed for v1), `shadcn/ui` (not needed for v1).

---

## 4. Pages and Routes

| Route | Page | Content |
|---|---|---|
| `/[locale]` | Home | Hero image with headline and CTA to catalog. Featured products (up to 3). |
| `/[locale]/catalog` | Catalog | Search box, category filter, product grid. |
| `/[locale]/catalog/[slug]` | Product Detail | See section 6. |
| `/[locale]/about` | About | Designer story, bio, process, contact link. |
| `/[locale]/contact` | Contact | Static contact info and WhatsApp button. No form. |
| `/[locale]/offline` | Offline fallback | Shown when a non-cached page is requested offline. Links to cached catalog. |

`[locale]` is `ar` or `en`. Root `/` redirects to `/ar` (default). Each page is statically generated for both locales.

---

## 5. Data Model

All content lives in `src/data/products.json`. No runtime API.

```ts
// src/types/furniture.ts

export type Locale = 'ar' | 'en';

export type Category = 'seating' | 'tables' | 'storage' | 'lighting' | 'beds';

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Material {
  id: string;            // e.g. "oak"
  name: LocalizedText;   // e.g. { ar: "خشب البلوط", en: "Oak" }
  swatchImage: string;   // path in /public/images
}

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthCm: number;
  weightKg?: number;
}

export interface Product {
  id: string;
  slug: string;          // URL-safe, English, unique
  name: LocalizedText;
  category: Category;
  shortDescription: LocalizedText;   // 1-2 sentences, for cards
  description: LocalizedText;        // 2-4 sentences, for detail page
  year: number;
  featured: boolean;
  dimensions: Dimensions;
  materials: Material[];             // 1 to 4 items
  images: string[];                  // first image is the main one, min 1, max 5
}
```

Rules:
- `slug` must be unique and must not change once published.
- Every text field has both `ar` and `en`. Missing translation is a build error.
- `images` paths point to `/public/images/products/`.
- Catalog ships with 6 placeholder products (see section 11).

---

## 6. Product Detail Page

Order of sections, top to bottom:
1. Image gallery: main image, thumbnail row below. Click thumbnail to change main image. No animation.
2. Name, category, year.
3. Short description (full `description`).
4. Materials row: small square swatch per material with its name below. Clicking a swatch shows the material name and updates the description line below the row. Swatches are buttons with `aria-pressed`. No color-wheel, no crossfade.
5. Dimensions table: Width, Height, Depth (cm). Weight (kg) only if present.
6. WhatsApp button (see section 7).

Layout: single column on mobile; two columns on desktop (gallery left, info right).

---

## 7. WhatsApp Integration

- Number comes from environment variable `NEXT_PUBLIC_WHATSAPP_NUMBER` (international format, digits only, e.g. `970591234567`).
- Link format:
  `https://wa.me/{number}?text={encodedMessage}`
- Message template (per language):
  - AR: `مرحباً، أنا مهتم بالقطعة: {productName}`
  - EN: `Hello, I'm interested in: {productName}`
- The product name in the message uses the current locale.
- Button label: AR "تواصل عبر واتساب", EN "Contact on WhatsApp".
- If the env variable is missing at build time, the button is hidden and the build logs a warning.

---

## 8. Internationalization

- Locales: `ar` (default), `en`.
- Language switch in the navbar, on every page. Switching keeps the current path and changes only the locale segment.
- `dir="rtl"` on `<html>` for Arabic, `dir="ltr"` for English.
- All UI strings live in `src/i18n/ar.json` and `src/i18n/en.json` with identical keys.
- Numbers and dimensions: Western digits in both locales.

---

## 9. Design System

### Colors (Scandinavian, earthy)

| Token | Hex | Use |
|---|---|---|
| `background` | `#F7F4EF` | Page background |
| `surface` | `#FFFFFF` | Cards, table background |
| `text-primary` | `#2B2A28` | Headings, body |
| `text-muted` | `#7A7368` | Captions, secondary text |
| `accent` | `#A68A64` | Buttons, links, active states |
| `accent-hover` | `#8C7150` | Hover on accent |
| `border` | `#E5DFD5` | Dividers, card borders, table lines |

Define these as Tailwind theme colors. Do not use raw hex in components.

### Typography
- Arabic: Tajawal. Latin: Inter.
- Body 16px, line-height 1.7 (Arabic needs more height).
- Headings: weight 600 to 700. Do not use weight 800 or 900.

### Shape and spacing
- Border radius: 12px for cards and images, 8px for buttons.
- Spacing scale: Tailwind default. Generous whitespace, max content width 1200px.
- Shadows: none, or a single very soft shadow on hover only.

### Navbar
- Solid background (`background` color) with a 1px `border` bottom line.
- No blur, no transparency.
- Contents: logo/name (left in LTR, right in RTL), page links, language switch.
- Mobile: hamburger menu opens a full-width panel below the bar.

### Motion
- Only CSS transitions, 150 to 200ms, on hover and focus. No scroll animations. No JS animation library.

---

## 10. PWA and Offline

### Manifest (`public/manifest.json`)
- `name`: site name (see section 13, open item).
- `short_name`: shorter version.
- `start_url`: `/ar`.
- `display`: `standalone`.
- `background_color` and `theme_color`: `#F7F4EF`.
- Icons: 192x192 and 512x512, plus a 512x512 maskable icon.

### Service worker (serwist)
- Precache: app shell, all 5 pages for both locales, `products.json`, all product images, fonts, offline page.
- Strategy: precache-first for static assets, network-first for HTML with cache fallback.
- Offline behavior: all cached pages and product pages work. Uncached pages show `/[locale]/offline`.
- Update: new service worker activates on next load. No forced reload prompt in v1.

### Install prompt
- Android and desktop Chrome/Edge: capture `beforeinstallprompt`, show a small bottom card "Install app" with an Install button and a dismiss button.
- iOS Safari (no install event): show a bottom card with steps: tap Share, then "Add to Home Screen".
- Dismissal is stored in `localStorage` and the card is not shown again for 14 days.
- The card never appears on the first page load before the user has interacted with the site.

---

## 11. Placeholder Content

Six products, all fictional, all with `year` 2024 to 2026. Images are placeholder photos from a free-license source (Pexels or Pixabay). Credit is not required by those licenses, but record the source in a comment in `products.json`.

| # | Name (EN) | Category | Materials | Featured |
|---|---|---|---|---|
| 1 | Nour Sofa (L-shape) | seating | grey fabric, oak legs | yes |
| 2 | Olive Dining Table (6 seats) | tables | olive wood | yes |
| 3 | Two-door Wardrobe | storage | white MDF, brass handles | no |
| 4 | Minimal Pine Bed | beds | pine | yes |
| 5 | Corner Desk | tables | oak | no |
| 6 | Wall-mounted TV Unit | storage | aluminum, wood | no |

Each product needs: 2 to 3 images, 2 to 3 materials, dimensions, Arabic and English text.

Hero image: one landscape photo of a furnished living room, from a free-license source. Path: `public/images/hero.webp`.

---

## 12. Folder Structure

```
.
├── public/
│   ├── icons/                 # 192, 512, maskable 512
│   ├── images/
│   │   ├── hero.webp
│   │   └── products/          # per-product images
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx     # html lang/dir, fonts, navbar, footer
│   │   │   ├── page.tsx       # Home
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── offline/page.tsx
│   │   ├── sw.ts              # serwist service worker source
│   │   └── layout.tsx         # root (minimal)
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, LanguageSwitch
│   │   ├── home/              # Hero, FeaturedGrid
│   │   ├── catalog/           # ProductCard, SearchBox, CategoryFilter
│   │   ├── product/           # Gallery, MaterialSwatches, DimensionsTable, WhatsAppButton
│   │   └── pwa/               # InstallPrompt
│   ├── data/
│   │   └── products.json
│   ├── i18n/
│   │   ├── ar.json
│   │   └── en.json
│   ├── lib/
│   │   ├── products.ts        # load and filter products
│   │   ├── whatsapp.ts        # build wa.me link
│   │   └── i18n.ts            # locale helpers
│   └── types/
│       └── furniture.ts
├── next.config.mjs            # Next.js + serwist
├── tailwind.config.ts         # design tokens from section 9
└── .env.example               # NEXT_PUBLIC_WHATSAPP_NUMBER=
```

---

## 13. Open Items (must be decided before launch, not blocking v1 build)

1. **Site name.** Used in manifest, navbar, page titles. Set in one constant file (`src/lib/site.ts`) so it can be changed later. Working name: `Furniture Showcase`.
2. **WhatsApp number.** Set in `.env.local` and Vercel project settings.
3. **Real content.** Replace placeholder products, images, and About text when real work is ready.
4. **Hero video.** v2 only. When added, use a compressed WebM and MP4 with the static image as poster, and only if the owner has the rights to the footage.

---

## 14. Acceptance Criteria

- [ ] `/` redirects to `/ar`.
- [ ] All 5 pages render in both `ar` and `en`, with correct `dir` attribute.
- [ ] Language switch keeps the current page.
- [ ] Catalog search and category filter work with no page reload.
- [ ] Product page: gallery, material swatches, dimensions table, WhatsApp link all work.
- [ ] WhatsApp link opens with the correct product name in the message, in the current language.
- [ ] Manifest validates. Installable on Chrome Android and desktop.
- [ ] iOS install card shows steps on Safari.
- [ ] Offline: after one full visit, all pages and product pages load with network disabled.
- [ ] Uncached page offline shows the offline page.
- [ ] No cart, checkout, payment, or favorites code exists in the repo.
- [ ] No dark mode code exists.
- [ ] Lighthouse PWA check passes. Mobile Performance 90+ on the home page.
- [ ] Build fails if any product is missing an `ar` or `en` text field.
- [ ] Deployed to Vercel and reachable on the chosen subdomain.

---

## 15. Constraints for Implementers (AI tools)

- Do not add features outside section 2 "In scope". If something seems missing, add it to section 13 as a question instead of building it.
- Do not add a backend, database, authentication, or analytics in v1.
- Do not add libraries beyond section 3 without asking.
- Keep components small and single-purpose. Prefer server components; use client components only for interactive parts (gallery, swatches, search, language switch, install prompt).
- Use Tailwind theme tokens from section 9. No raw hex values in components.
