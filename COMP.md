# Component Specification (COMP.md)

> Airbnb vacation rental clone — **Next.js 16**, **TypeScript**, **Tailwind CSS**, App Router.
> References: `CONTEXT.md`, `sample/desktop/`, `sample/mobile/`.

---

## 1. Routes & Stack

| Route | Page | Screenshots |
|-------|------|-------------|
| `/` | Home (discovery) | `airbnb_home.png` |
| `/catalog` | Catalog / search results | `airbnb_search_where.png` |
| `/rooms/[id]` | Listing detail | `airbnb_room.png` |

**Stack:** Next.js 16 App Router · TypeScript · Tailwind (utilities only) · no UI libraries · `next/image` · `next/link` · `useState` / `useEffect` · mock data in `src/data/`.

Search overlays (Where / When / Who) appear on Home and Catalog — see §5.

---

## 2. Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `brand` | `#FF385C` | Logo, CTAs, search button |
| `text-primary` | `#222222` | Headings |
| `text-secondary` | `#717171` | Meta, placeholders |
| `bg-subtle` | `#F7F7F7` | Sections, inactive toggles |
| `border-default` | `#DDDDDD` | Dividers, card borders |

**Font:** Inter or Geist Sans via `next/font` (Airbnb Cereal is proprietary).

**Radius:** `rounded-full` (search pill, counters) · `rounded-xl` (cards, images) · `rounded-3xl` (dropdowns, mobile panels).

**Breakpoints:** `md` (768px) desktop navbar · `lg` (1024px) room 2-col + catalog split · `xl` (1280px) full home grid.

**Icons:** Inline SVGs in `src/components/icons/` — no icon library.

---

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── rooms/[id]/
│       ├── page.tsx
│       └── loading.tsx
├── components/
│   ├── layout/       Navbar, NavbarCompact, Footer, BottomNav, CategoryBar
│   ├── search/       SearchBar, SearchBarMobile, WherePanel, WhenPanel,
│   │                 WhoPanel, DatePicker, GuestCounter
│   ├── listings/     PropertyCard, ListingSection, WishlistButton
│   ├── catalog/      ResultsHeader, SortDropdown, MapToggle, LoadMoreButton
│   ├── room/         PhotoGrid, PhotoCarousel, BookingWidget, HostCard,
│   │                 AmenitiesList, ReviewsSection, MapPlaceholder, ThingsToKnow
│   └── ui/           Modal, Button, Badge, Counter, Tabs, Skeleton
├── types/index.ts
├── data/             listings, destinations, categories, sections
├── hooks/            useMediaQuery, useCarousel
└── lib/              utils (cn, formatPrice, formatDateRange)
```

**Conventions:** Server Components for page shells; `"use client"` for search, carousels, sort, modals. `loading.tsx` + `setTimeout` skeleton on Home mount.

---

## 4. Core Types

```typescript
interface Listing {
  id: string;
  title: string;
  type: string;
  location: string;
  pricePerNight: number;
  priceLabel?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  isGuestFavorite?: boolean;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  coordinates?: { lat: number; lng: number };
}

interface ListingDetail extends Listing {
  description: string;
  highlights: string[];
  host: Host;
  amenities: Amenity[];
  bedrooms: Bedroom[];
  reviews: Review[];
  ratingBreakdown: Record<"cleanliness"|"accuracy"|"checkin"|"communication"|"location"|"value", number>;
  houseRules: string[];
  safetyInfo: string[];
  cancellationPolicy: string;
}

interface SearchState {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: { adults: number; children: number; infants: number; pets: number };
  flexibleDays?: number;
  category: "all" | "homes" | "experiences" | "services";
}

type SortOption = "recommended" | "price-asc" | "price-desc" | "rating-desc";
```

Also define: `Destination`, `Category`, `Host`, `Review`, `Amenity`, `Bedroom`, `ListingSection`.

---

## 5. Search UX

### Desktop (`SearchBar`)
Pill with three segments (Where · When · Who) + pink search button. Active segment gets white bg + shadow; opens dropdown below.

| Segment | Panel | Screenshot |
|---------|-------|------------|
| Where | Suggested destinations list | `desktop/airbnb_search_where.png` |
| When | 2-month calendar, Dates/Flexible toggle, ±day pills | `desktop/airbnb_search_when.png` |
| Who | Guest counters (Adults, Children, Infants, Pets) | `desktop/airbnb_search_who.png` |

### Mobile (`SearchBarMobile`)
Full-screen wizard from "Start your search" pill. Steps: Where → When → Who. Footer: Clear all / Search or Next. Refs: `mobile/airbnb_search_*.png`.

### Submit
Navigates to `/catalog?destination=...&checkIn=...&checkOut=...&guests=...`.

```typescript
const [searchState, setSearchState] = useState<SearchState>({...});
const [activePanel, setActivePanel] = useState<"where"|"when"|"who"|null>(null);
```

---

## 6. Components

### Layout

| Component | Key props | Notes |
|-----------|-----------|-------|
| `Navbar` | `variant: "home" \| "catalog" \| "room" \| "minimal"`, `searchState` | Logo → `/`. Catalog variant: Homes/Experiences/Services tabs |
| `NavbarCompact` | `onSearchOpen` | Mobile "Start your search" pill |
| `CategoryBar` | `categories`, `activeId`, `onSelect` | Horizontal icon tabs |
| `Footer` | — | Inspiration tabs + link grid + site map |
| `BottomNav` | `activeTab` | Mobile: Explore / Wishlists / Login |

### Search

| Component | Key props |
|-----------|-----------|
| `SearchBar` | `state`, `activePanel`, `onPanelChange`, `onStateChange`, `onSearch` |
| `SearchBarMobile` | `isOpen`, `onClose`, `state`, `onStateChange`, `onSearch`, `initialStep?` |
| `DatePicker` | `checkIn`, `checkOut`, `onChange`, `monthsToShow?` |
| `GuestCounter` | `label`, `sublabel?`, `value`, `min?`, `max?`, `onChange` |

### Listings

| Component | Key props | Notes |
|-----------|-----------|-------|
| `PropertyCard` | `listing`, `variant: "grid" \| "carousel" \| "catalog"` | Wraps `Link` → `/rooms/[id]`. Catalog variant: carousel arrows, specs, monthly pricing |
| `ListingSection` | `section`, `cardVariant?` | Horizontal scroll (mobile) / grid (desktop) |
| `WishlistButton` | `listingId`, `isSaved?`, `onToggle?` | Heart icon, local state |

### Catalog page

| Component | Key props |
|-----------|-----------|
| `ResultsHeader` | `totalCount`, `sortBy`, `onSortChange`, `isMapVisible`, `onMapToggle` |
| `SortDropdown` | `value`, `onChange` |
| `MapToggle` | `isVisible`, `onToggle` |
| `LoadMoreButton` | `onClick`, `hasMore`, `isLoading?` |

### Room detail

| Component | Key props | Notes |
|-----------|-----------|-------|
| `PhotoGrid` | `images`, `title`, `onShowAll` | Desktop 5-up collage |
| `PhotoCarousel` | `images`, `title` | Mobile swipe gallery |
| `BookingWidget` | `listing`, `checkIn`, `checkOut`, `guests`, `onReserve` | Sticky sidebar (desktop), inline (mobile). Reserve opens `Modal` |
| `ReviewsSection` | `reviews`, `rating`, `reviewCount`, `ratingBreakdown` | Grid (desktop) / carousel (mobile) |
| `HostCard` | `host`, `onMessage?` | |
| `AmenitiesList` | `amenities`, `maxVisible?`, `onShowAll?` | |
| `MapPlaceholder` | `location`, `coordinates?` | Gray box acceptable for v1 |
| `ThingsToKnow` | `houseRules`, `safetyInfo`, `cancellationPolicy` | |

### UI primitives

`Modal`, `Button` (primary/secondary/outline/ghost/dark), `Badge`, `Counter`, `Tabs`, `Skeleton`.

---

## 7. Page Layouts

### Home (`/`)

```
Navbar [home] → SearchBar | NavbarCompact
CategoryBar
ListingSection × 8–14 (skeleton while loading)
Footer + BottomNav (mobile)
```

**State:** `isLoading` (1.5s timeout), `searchQuery` (filters cards), `activeCategory`, `searchState`, `isMobileSearchOpen`.

### Catalog (`/catalog`)

```
Navbar [catalog] → SearchBar
├─ Left (55%, scrollable): ResultsHeader → PropertyCard[catalog] grid → LoadMoreButton
└─ Right (45%): MapPlaceholder with price markers (hidden on mobile unless toggled)
MapToggle (mobile floating)
```

**State:** `sortBy` + `useMemo`, `visibleCount`, `isMapVisible` (mobile), `searchState` from URL via `useSearchParams()`.

### Room (`/rooms/[id]`)

```
Navbar [room | minimal]
Title + Share/Save
PhotoGrid | PhotoCarousel
├─ Left: overview, host snippet, description, bedrooms, amenities, calendar, reviews, map, host card, things to know
└─ Right: BookingWidget (sticky, desktop)
BookingWidget (inline, mobile)
Breadcrumbs → Footer
```

**State:** `galleryIndex`, modal flags, `checkIn`/`checkOut`/`guests`, `isDescriptionExpanded`. Back → `router.back()` or `/catalog`.

---

## 8. Navigation

```
/  ──►  /catalog  ──►  /rooms/[id]
 ↑           ↑              │
 └───────────┴──────────────┘
```

| Action | Target |
|--------|--------|
| PropertyCard click | `/rooms/[id]` |
| Search submit | `/catalog?...` |
| Section "see all" | `/catalog?region=...` |
| Room back | `/catalog` or `router.back()` |
| Logo | `/` |

---

## 9. Responsive Summary

| Area | Mobile | Desktop |
|------|--------|---------|
| Nav | `NavbarCompact` + `BottomNav` | Full `Navbar` + `SearchBar` |
| Search | `SearchBarMobile` wizard | Inline dropdown panels |
| Home listings | Horizontal snap scroll | 6–7 col grid per section |
| Catalog | List + map toggle | 55/45 split list + map |
| Room photos | `PhotoCarousel` | `PhotoGrid` |
| Booking | Inline card | Sticky sidebar |

---

## 10. State (v1)

All via `useState` / `useEffect` — no global store required.

| Feature | Key state |
|---------|-----------|
| Home loading | `isLoading` + `setTimeout(1500)` |
| Home filter | `searchQuery`, `activeCategory` |
| Search form | `searchState`, `activePanel`, `currentStep` (mobile) |
| Catalog | `sortBy`, `visibleCount`, `isMapVisible` |
| Room | `galleryIndex`, `checkIn`/`checkOut`/`guests`, modal flags |
| Cards | `isSaved` per wishlist heart |

---

## 11. Mock Data

- `listings.ts` — 30–50 listings, 3–5 full `ListingDetail` (ids `"1"`, `"2"`, `"3"`)
- `destinations.ts` — Nearby, Cape Cod, Boston, Portland, Orlando
- `categories.ts` — Mansions, Beach, Cabins, etc. + Homes/Experiences/Services (NEW badges)
- `sections.ts` — Home page section groupings

---

## 12. Build Order

1. Scaffold + design tokens
2. Types + mock data
3. UI primitives + `PropertyCard` + `ListingSection`
4. Home page
5. `SearchBar` + `SearchBarMobile`
6. Catalog page
7. Room detail page
8. Footer + polish

---

## 13. Screenshot Index

| File | UI |
|------|-----|
| `desktop/airbnb_home.png` | Home: navbar, search pill, categories, sections, footer |
| `desktop/airbnb_search_where.png` | Catalog split view + Where dropdown |
| `desktop/airbnb_search_when.png` | When dropdown + calendar |
| `desktop/airbnb_search_who.png` | Who dropdown + guest counters |
| `desktop/airbnb_room.png` | Room: photo grid, booking widget, reviews |
| `mobile/airbnb_home.png` | Mobile home + bottom nav |
| `mobile/airbnb_search_*.png` | Mobile search wizard steps |
| `mobile/airbnb_room.png` | Mobile room carousel + inline booking |

---

## 14. Out of Scope (v1)

Real API, auth, functional maps, payments, host dashboard, i18n, external UI libraries. Experiences/Services are UI tabs only.
