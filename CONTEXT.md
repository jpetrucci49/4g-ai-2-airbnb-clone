# Airbnb UI Clone - Specification Document

## Project Overview
This project is a high-fidelity frontend clone of Airbnb’s vacation rental platform. The goal is to recreate the look, feel, and user experience of Airbnb using **Next.js 14+ (App Router)** and **React components**, with a strong emphasis on modern UI/UX patterns.

**Tech Stack & Constraints**
- Next.js 14+ with App Router
- React + TypeScript
- Tailwind CSS (utility classes only)
- No external UI component libraries

## Target Users
- Travelers looking for short-term vacation rentals, apartments, houses, and unique stays.
- Users who want to easily browse, filter, and book accommodations.

## Core Pages to Implement

### 1. Home Page (Landing)
- Top navigation bar with logo, search input, and user menu icons
- Hero search bar with where, when, who fields
- Horizontal scrollable category filter row (Beach, Mansions, Trending, etc.)
- Responsive grid of listing cards below the categories
- Each card shows: photo, title, location, rating, and price per night
- Real-time search filtering on the listing cards using `useState`
- Loading state simulation on page mount using `useEffect` + `setTimeout`

### 2. Catalog / Search Results Page
- Results header showing number of stays and a sort dropdown (Price: Low to High / High to Low)
- Top filters (price, dates, guests, property type, amenities, etc.)
- Reusable listing card component from the Home page
- Responsive layout (2–4 columns depending on screen size)
- Sidebar or bottom section with a map placeholder (gray box with “Map” text is acceptable)
- Map toggle button
- Sorting functionality using `useState` to reorder displayed cards
- Grid of property cards (image, title, location, rating, price)
- Pagination or "Load more" functionality

### 3. Room / Listing Detail Page
- Large hero image gallery with Previous/Next controls and current index state
- Property title, location, rating, and host info
- Host information section (avatar, name, years hosting) and reviews
- Description and highlights
- Amenities section
- Booking calendar and price breakdown
- "Reserve" button with modal confirmation flow
- Back button / breadcrumb navigation to return to catalog

## Navigation Requirements
- Use Next.js `<Link>` component for all internal navigation
- Clicking a listing card on Home or Catalog navigates to the Room Detail page using dynamic route `/rooms/[id]`
- Include proper back navigation on the Room Detail page

## Main Reusable Components
- Navbar (with logo, search, host mode, user menu)
- Property Card
- Search Bar (with advanced filters)
- Filter Bar
- Image Gallery
- Booking Widget / Calendar
- Review Card
- Modal (for images, booking, etc.)

## Component Strategy
Before generating any code, first create a detailed **Component Specification** that includes:
- Component names
- Props interface for each component
- Layout relationship between components on each page
- State management approach (useState, useEffect, etc.)

## Design & Technical Goals
- Closely match Airbnb’s visual style and interactions
- Excellent responsiveness across mobile, tablet, and desktop
- Smooth animations and hover states
- Strong attention to typography, spacing, and visual hierarchy
- Use of Next.js Image component and modern React patterns

## Vision Prompting Approach
I will provide screenshots of the original Airbnb interface for each page/component. Please use these references to ensure pixel-perfect or near-identical design fidelity while maintaining clean, maintainable React + Next.js code.

---
