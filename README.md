# Airbnb Clone

Vacation rental platform built with Next.js 16, TypeScript, and Tailwind CSS.

## Requirements

- Node.js >= 20.9.0 (see `.nvmrc`)

## Getting Started

```bash
nvm use
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/catalog` | Catalog / search results |
| `/rooms/[id]` | Listing detail |

See `COMP.md` for the full component specification.
