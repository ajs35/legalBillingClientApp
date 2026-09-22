# Brief — Legal Billing Client App

A React + TypeScript port of Brief, a mobile time-tracking and billing prototype for legal
professionals. Originally built as a single-file HTML/CSS/JS prototype and synced against a Figma
design system, then rebuilt here as a componentized React app.

## Screens

- **Schedule (Home)** — today's appointments, an "up next" summary card, and a logging reminder.
- **Matters** — budget usage, realization, AR aging, and per-team-member billing for a matter.
- **Review queue** — flagged time entries (missing narrative, block-billed, OCG risk) with
  AI-drafted suggestions and an entry-splitting detail view.
- **Payments** — outstanding client balances with reminder actions.
- **Profile** — identity, account settings, support links, and light/dark appearance.
- **Ask Elly** — a lightweight agentic chat for balances, matters, and reminders.
- **Contact us / FAQs** — support form and an accordion of common questions.
- **Modals** — voice/type time capture, entry review & split, edit profile, and password &
  security (with a live strength checklist).

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- No routing library — view switching is local state (`AppContext`), matching the original
  single-page-shell behavior
- No CSS framework — a single stylesheet (`src/styles.css`) built on CSS custom properties for
  theming (light/dark)

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  context/AppContext.tsx   # app-wide state: theme, routing, profile, drawer, modals, toast
  data.ts                  # static seed data (schedule, queue, payments, team, FAQs)
  types.ts                 # shared TypeScript types
  hooks/                   # useFloatingHeaderOffset, useSwipeReveal
  components/              # FloatingNav, Toast, Drawer, Icons, modals/
  views/                   # one component per screen
  styles.css               # design tokens + component styles
```
