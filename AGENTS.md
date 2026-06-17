# AGENTS.md

Guide for AI agents working on **taekwondo.naismith.dev** — a static React SPA for ITF Taekwondo reference content: belt progression, patterns (tul), sparring sets, theory, and 3D pattern visualization.

## Documentation

When docs disagree, follow this order:

1. **Source code** — ground truth for what exists
2. **[DESIGN.md](./DESIGN.md)** — visual and styling decisions ([Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md))
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — structure, routing, build, and data flow
4. **AGENTS.md** (this file) — quick-start summary; defer to the docs above when details differ

| Doc             | Use for                                                   |
| --------------- | --------------------------------------------------------- |
| DESIGN.md       | Colors, typography, spacing, components, visual rationale |
| ARCHITECTURE.md | Routes, directories, bootstrap, static data, deployment   |
| AGENTS.md       | Commands, conventions, domain concepts, where to look     |

## What this app is

- Client-only SPA: no backend, no API, no auth, no global state library
- Static data in `src/data/` (patterns, sparring, theory, syllabus, glossary, techniques, nav)
- Dark UI with Tailwind CSS v4 — tokens and component patterns in [DESIGN.md](./DESIGN.md)
- Deployed as static files from `dist/` (SPA fallback required on the host)

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
yarn dev      # dev server + HMR
yarn build    # production build + tsc check
yarn lint     # ESLint
yarn preview  # serve dist/
```

## Project layout

```
src/
├── main.tsx                 # entry: RouterProvider + routeTree
├── routeTree.gen.ts         # auto-generated — do not edit
├── index.css                # Tailwind @theme tokens (from DESIGN.md) + utilities
├── utils.ts                 # cn() helper
├── utils/pattern-path.ts    # parse step text → 3D positions
├── hooks/
│   └── use-app-update-check.ts  # polls version.json, toast on new build
├── components/
│   ├── app-toaster.tsx      # Sonner toast host
│   ├── belt.tsx             # Belt, MiniBelt, rankToBeltStyle
│   ├── nav-bar.tsx          # fixed top nav (desktop links, mobile section picker)
│   ├── nav-link.tsx         # typed TanStack Router nav link
│   ├── pattern-scene.tsx    # R3F dojang mat + path visualization
│   └── section-link.tsx     # home / mobile nav section card
├── data/
│   ├── glossary.ts          # Korean terminology entries and search
│   ├── itf-patterns.ts      # pattern list, ranks, slug helpers
│   ├── nav.ts               # nav section metadata and path helpers
│   ├── pattern-steps.ts     # step-by-step movement text per pattern
│   ├── sparring.ts          # 2-step and 3-step sparring definitions
│   ├── syllabus.ts          # belt ranks, grading requirements, links
│   ├── techniques.ts        # stances and ready stances (theory page)
│   └── theory.ts            # theory reference content
└── routes/
    ├── __root.tsx           # NavBar + Outlet + app update notifier
    ├── index.tsx            # / — home with section links
    ├── belts.tsx            # /belts — belt progression and grading requirements
    ├── patterns.tsx         # /patterns — pattern list
    ├── pattern.$id.tsx      # /pattern/:id — detail + 3D viewer
    ├── sparring.tsx         # /sparring layout
    ├── sparring.index.tsx   # /sparring — all sparring types and sequences
    ├── sparring.$type.tsx   # /sparring/:type layout (Outlet only)
    ├── sparring.$type.$number.tsx  # /sparring/:type/:number — sequence detail
    ├── theory.tsx           # /theory
    └── glossary.tsx         # /glossary
```

## Routes

| Path                      | File                                | Purpose                                      |
| ------------------------- | ----------------------------------- | -------------------------------------------- |
| `/`                       | `routes/index.tsx`                  | Home — section links to main areas           |
| `/belts`                  | `routes/belts.tsx`                  | Belt progression and grading requirements  |
| `/patterns`               | `routes/patterns.tsx`               | Browse all ITF patterns by section           |
| `/pattern/:id`            | `routes/pattern.$id.tsx`            | Pattern detail, step list, R3F scene         |
| `/sparring`               | `routes/sparring.index.tsx`         | All sparring types and sequence links        |
| `/sparring/:type/:number` | `routes/sparring.$type.$number.tsx` | Single sparring sequence                     |
| `/theory`                 | `routes/theory.tsx`                 | Theory reference (tenets, definitions, oath) |
| `/glossary`               | `routes/glossary.tsx`               | Searchable Korean terminology glossary       |

Pattern IDs are slugs derived from names (`Chon-Ji` → `chon-ji`) via `patternToId()` in `~/data/itf-patterns`. Sparring `:type` values match `SparringType` in `~/data/sparring.ts` (e.g. `3-step`, `2-step`).

Sparring uses nested layout routes (`sparring.tsx`, `sparring.$type.tsx`) that render only an `<Outlet />`. The index page lists all types and sequences; there is no separate `/sparring/:type` list page. See [ARCHITECTURE.md](./ARCHITECTURE.md) for routing detail.

## Conventions

- **Imports:** use the `~` alias for `src/` (e.g. `import { cn } from "~/utils"`), not relative `../` paths
- **New routes:** add a file under `src/routes/`; TanStack Router regenerates `routeTree.gen.ts`
- **Styling:** follow [DESIGN.md](./DESIGN.md) (Google Labs spec); YAML frontmatter tokens are normative; implement with Tailwind utilities, `@theme` in `index.css`, and `cn()`
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
- Add sparring content → `src/data/sparring.ts`
- Add theory content → `src/data/theory.ts`
- Add glossary entries → `src/data/glossary.ts`
- Add belt syllabus content → `src/data/syllabus.ts`
- Add stances / ready stances → `src/data/techniques.ts`
- New shared UI → `src/components/`
- New pages → `src/routes/` (file name = URL shape, e.g. `pattern.$id.tsx`)
- Visual or styling changes → update [DESIGN.md](./DESIGN.md) tokens/prose; extend `@theme` in `index.css` when adding wired tokens
- Architectural changes → update [ARCHITECTURE.md](./ARCHITECTURE.md) using the `.cursor/skills/update-architecture-doc` skill

## What to avoid

- Introducing a backend or env-var secrets without explicit request
- Relative imports when `~/…` works
- Editing auto-generated route tree
- Over-engineering (no global store, no abstractions for one-off logic)
- Large unrelated diffs — keep changes scoped to the task
