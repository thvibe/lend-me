# Lend Me

A friendly, mobile-first peer-to-peer **lending marketplace** — borrow what you
need, lend what you don't. Browse items near you (or have them shipped), chat
with the owner, and lock in a lending **agreement** with set dates, a refundable
deposit, and a clear damage policy.

> Status: early prototype. Fully navigable UI with mock data — no backend yet.

## Highlights

- **Blue-first design system** — royal + navy, light **and** dark mode.
- **WCAG 2.2 AA** — every colour pair is contrast-checked (`npm run check:contrast`).
- **eBay-style posting** — a 4-step create-a-listing flow.
- **Lending agreement** — dates/times, handover (pickup or ship), cost breakdown,
  refundable deposit, and a damage-fee policy both sides confirm.
- **Messaging** — inbox + chat thread, with a shortcut to propose an agreement.
- No build-time UI framework — all components and accessibility are hand-rolled.

## Tech

Vite + React 19 + TypeScript + React Router. No backend; data lives in
`src/lib/data.ts`.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # type-check + production build
npm run preview        # serve the production build
npm run check:contrast # verify the palette meets WCAG 2.2 AA
```

## Project structure

```
src/
  main.tsx              # entry: router + theme provider + global styles
  App.tsx               # routes (tabbed shell + immersive screens)
  components/
    Icon.tsx            # stroke icon set
    ui.tsx              # Button, Chip, Field, Segmented, Sheet, Avatar, …
    AppShell.tsx        # frame, header, skip link
    TabBar.tsx          # bottom navigation
    ListingCard.tsx
  screens/              # Home, Search, ListingDetail, CreatePost,
                        # Messages, ChatThread, Agreement, Profile
  lib/
    data.ts             # types + mock listings, users, conversations
    format.ts           # money / date / distance helpers
    theme.tsx           # light/dark/system theme context
  styles/
    tokens.css          # design tokens (colour, type, spacing)
    base.css            # reset + a11y primitives
    app.css             # layout + components
    screens.css         # screen-specific styles
scripts/
  contrast-check.mjs    # WCAG AA contrast assertion (CI-friendly)
```

## Accessibility notes

- Semantic landmarks, one `<h1>` per screen, labelled controls.
- Visible focus rings, a skip link, `prefers-reduced-motion` support.
- Generous tap targets, radio/dialog roles, focus-trapped sheets.
- Photos are placeholder tiles for now; real listings will use uploaded images.
