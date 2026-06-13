# AGENTS.md

Guide for AI agents working on **taekwondo.naismith.dev** — a static React SPA for ITF Taekwondo reference content (belt progression, patterns/tul, and 3D pattern visualization).

## What this app is

- Client-only SPA: no backend, no API, no auth, no global state library
- Static data in `src/data/` (pattern metadata and step-by-step movement text)
- Dark UI with Tailwind CSS v4 — colors, typography, layout, and component patterns are defined in [DESIGN.md](./DESIGN.md)
- Deployed as static files from `dist/` (SPA fallback required on the host)

For deeper architectural detail, see [ARCHITECTURE.md](./ARCHITECTURE.md). For all visual and styling decisions, see [DESIGN.md](./DESIGN.md).

## Tech stack

| Layer   | Technology                                                            |
| ------- | --------------------------------------------------------------------- |
| UI      | React 19, TypeScript 5.9                                              |
| Build   | Vite 8                                                                |
| Routing | TanStack Router (file-based, code-split)                              |
| Styling | Tailwind CSS v4, `cn()` from `~/utils` — see [DESIGN.md](./DESIGN.md) |
| 3D      | Three.js, React Three Fiber, `@react-three/drei`                      |

## Commands

```bash
npm run dev      # dev server + HMR
npm run build    # production build + tsc check
npm run lint     # ESLint
npm run preview  # serve dist/
```

## Project layout

```
src/
├── main.tsx                 # entry: RouterProvider + routeTree
├── routeTree.gen.ts         # auto-generated — do not edit
├── index.css                # Tailwind @theme tokens (from DESIGN.md) + utilities
├── utils.ts                 # cn() helper
├── utils/pattern-path.ts    # parse step text → 3D positions
├── components/
│   ├── belt.tsx             # Belt, MiniBelt, rankToBeltStyle
│   └── pattern-scene.tsx    # R3F dojang mat + path visualization
├── data/
│   ├── itf-patterns.ts      # pattern list, ranks, slug helpers
│   └── pattern-steps.ts     # step-by-step movement text per pattern
└── routes/
    ├── __root.tsx           # nav + Outlet
    ├── index.tsx            # / — belt ladder
    ├── patterns.tsx         # /patterns — pattern list
    ├── pattern.$id.tsx      # /pattern/:id — detail + 3D viewer
    └── about.tsx            # /about — placeholder
```

## Routes

| Path           | File                     | Purpose                              |
| -------------- | ------------------------ | ------------------------------------ |
| `/`            | `routes/index.tsx`       | Coloured belt progression ladder     |
| `/patterns`    | `routes/patterns.tsx`    | Browse all ITF patterns by section   |
| `/pattern/:id` | `routes/pattern.$id.tsx` | Pattern detail, step list, R3F scene |
| `/about`       | `routes/about.tsx`       | Placeholder about page               |

Pattern IDs are slugs derived from names (`Chon-Ji` → `chon-ji`) via `patternToId()` in `~/data/itf-patterns`.

## Conventions

- **Imports:** use the `~` alias for `src/` (e.g. `import { cn } from "~/utils"`), not relative `../` paths
- **New routes:** add a file under `src/routes/`; TanStack Router regenerates `routeTree.gen.ts`
- **Styling:** follow [DESIGN.md](./DESIGN.md) for colors, typography, spacing, and component patterns; implement with Tailwind utilities in JSX and `@theme` tokens in `index.css`; use `cn()` for conditional/merged classes
- **Components:** shared UI lives in `src/components/`
- **Data:** static TS modules in `src/data/` — no fetch layer
- **State:** local React state only (`useState`, `useMemo`); no Redux/Zustand/Query
- **Generated files:** never edit `src/routeTree.gen.ts`

## Key domain concepts

- **ITF training area:** patterns move between fixed points A–D (corners) and sometimes E/F (edge midpoints). The 3D scene and `buildPatternPath()` assume start at A facing D.
- **Pattern steps:** free-text strings in `pattern-steps.ts`, parsed with regex for `to X` / `toward X` to drive the 3D path.
- **Belts:** `rankToBeltStyle()` maps rank strings to colours/stripes/dan bars for `MiniBelt` / `Belt`.

## When extending

- Add pattern metadata → `src/data/itf-patterns.ts`
- Add step text → `src/data/pattern-steps.ts` (keyed by pattern name)
- New shared UI → `src/components/`
- New pages → `src/routes/` (file name = URL shape, e.g. `pattern.$id.tsx`)
- Visual or styling changes → follow [DESIGN.md](./DESIGN.md); extend `@theme` in `index.css` when adding tokens
- Architectural changes → update [ARCHITECTURE.md](./ARCHITECTURE.md) using the `.cursor/skills/update-architecture-doc` skill

## What to avoid

- Introducing a backend or env-var secrets without explicit request
- Relative imports when `~/…` works
- Editing auto-generated route tree
- Over-engineering (no global store, no abstractions for one-off logic)
- Large unrelated diffs — keep changes scoped to the task
