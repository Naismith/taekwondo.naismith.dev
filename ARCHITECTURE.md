# Architecture

This document describes the architecture of **taekwondo.naismith.dev** — a client-side single-page application (SPA) for ITF Taekwondo reference content: belt progression, patterns (tul), sparring sets, theory, and 3D pattern visualization.

## Documentation

When docs disagree, follow this order:

1. **Source code**
2. **[DESIGN.md](./DESIGN.md)** — visual and styling ([Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md))
3. **ARCHITECTURE.md** (this file) — structure, routing, build, data
4. **[AGENTS.md](./AGENTS.md)** — agent quick-start

## Overview

The application is a static, browser-rendered React app with no backend or API layer. All UI runs in the client. Content comes from static TypeScript modules in `src/data/`. Routing is handled entirely on the client via TanStack Router. There is no server-side rendering (SSR), no global state management library, and no data fetching layer.

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│  ┌─────────────┐    ┌──────────────────────────────┐   │
│  │ index.html  │───▶│ main.tsx                     │   │
│  └─────────────┘    │  └─ createRouter(routeTree) │   │
│                     │  └─ RouterProvider           │   │
│                     └──────────────┬───────────────┘   │
│                                    │                    │
│                     ┌──────────────▼───────────────┐   │
│                     │ __root.tsx (layout + nav)    │   │
│                     │  └─ Outlet → route pages     │   │
│                     └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer                | Technology                                       | Role                                        |
| -------------------- | ------------------------------------------------ | ------------------------------------------- |
| Runtime              | React 19                                         | UI rendering                                |
| Language             | TypeScript 5.9                                   | Type safety                                 |
| Bundler / dev server | Vite 8                                           | Build tooling, HMR                          |
| Routing              | TanStack Router                                  | File-based client routing, code splitting   |
| Styling              | Tailwind CSS v4                                  | Utility-first CSS                           |
| Class utilities      | `clsx` + `tailwind-merge`                        | Conditional and merged class names (`cn()`) |
| 3D                   | Three.js, React Three Fiber, `@react-three/drei` | Pattern path visualization on dojang mat    |

Visual design tokens and component patterns are defined in [DESIGN.md](./DESIGN.md); `src/index.css` maps key tokens into Tailwind's `@theme`.

## Project Structure

```
taekwondo.naismith.dev/
├── index.html              # HTML shell; mounts React at #root
├── vite.config.ts          # Vite plugins, `~` → src/ alias
├── src/
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Tailwind import, @theme tokens, @utility helpers
│   ├── routeTree.gen.ts    # Auto-generated route tree (do not edit)
│   ├── utils.ts            # Shared utilities (cn helper)
│   ├── utils/
│   │   └── pattern-path.ts # Parse step text → 3D positions
│   ├── components/
│   │   ├── belt.tsx        # Belt, MiniBelt, rankToBeltStyle
│   │   └── pattern-scene.tsx # R3F dojang mat + path visualization
│   ├── data/
│   │   ├── itf-patterns.ts # Pattern list, ranks, slug helpers
│   │   ├── pattern-steps.ts # Step-by-step movement text per pattern
│   │   ├── sparring.ts     # 2-step and 3-step sparring definitions
│   │   └── theory.ts       # Theory reference content
│   └── routes/
│       ├── __root.tsx      # Root layout: nav + <Outlet />
│       ├── index.tsx       # Home (/)
│       ├── patterns.tsx    # Pattern list (/patterns)
│       ├── pattern.$id.tsx # Pattern detail (/pattern/:id)
│       ├── sparring.tsx    # Sparring layout (/sparring)
│       ├── sparring.index.tsx
│       ├── sparring.$type.tsx
│       ├── sparring.$type.index.tsx
│       ├── sparring.$type.$number.tsx
│       ├── theory.tsx      # Theory reference (/theory)
│       └── about.tsx       # About page (/about)
```

Routes are defined as files under `src/routes/`. TanStack Router's Vite plugin scans this directory and generates `routeTree.gen.ts` at build/dev time.

## Application Bootstrap

Bootstrapping follows a standard Vite + React pattern:

1. **`index.html`** loads `/src/main.tsx` as an ES module into a `#root` div.
2. **`main.tsx`** imports global styles and the generated `routeTree`, creates a router with `createRouter`, and renders `<RouterProvider>` inside React `StrictMode`.
3. A module augmentation on `@tanstack/react-router` registers the router instance for end-to-end type safety on route paths and params.

```tsx
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

There is no additional provider tree (no theme context, no query client, no auth provider).

## Routing

Routing uses **TanStack Router** with **file-based route definitions** and **automatic code splitting**.

### Route tree

| Path                      | File                                    | Purpose                                      |
| ------------------------- | --------------------------------------- | -------------------------------------------- |
| `/`                       | `src/routes/index.tsx`                  | Belt progression ladder                      |
| `/patterns`               | `src/routes/patterns.tsx`               | Browse ITF patterns by section               |
| `/pattern/:id`            | `src/routes/pattern.$id.tsx`            | Pattern detail, step list, 3D viewer         |
| `/sparring`               | `src/routes/sparring.index.tsx`         | Sparring type index (via `/sparring` layout) |
| `/sparring/:type`         | `src/routes/sparring.$type.index.tsx`   | Sequence list for a sparring type            |
| `/sparring/:type/:number` | `src/routes/sparring.$type.$number.tsx` | Single sparring sequence detail              |
| `/theory`                 | `src/routes/theory.tsx`                 | Theory reference (tenets, definitions, oath) |
| `/about`                  | `src/routes/about.tsx`                  | About page (placeholder)                     |

All routes are children of the root route defined in `src/routes/__root.tsx`.

Pattern IDs are slugs derived from pattern names (`Chon-Ji` → `chon-ji`) via `patternToId()` in `~/data/itf-patterns`. Sparring `:type` values match `SparringType` in `~/data/sparring.ts` (e.g. `3-step`, `2-step`).

### Nested layouts

Sparring uses two layout routes that render only an `<Outlet />`:

- **`sparring.tsx`** — parent for all `/sparring/*` routes
- **`sparring.$type.tsx`** — parent for `/sparring/:type/*` routes

Leaf routes (`sparring.index.tsx`, `sparring.$type.index.tsx`, `sparring.$type.$number.tsx`) render page content into these outlets. All other routes render directly into the root outlet.

### Root layout

`__root.tsx` defines the persistent shell:

- A fixed top navigation bar with `<Link>` components to `/`, `/patterns`, `/sparring`, `/theory`, and `/about`
- An `<Outlet />` where child route components render
- Active link styling via TanStack Router's `.active` class

### Route generation

The `@tanstack/router-plugin/vite` plugin (configured in `vite.config.ts`) watches `src/routes/` and regenerates `src/routeTree.gen.ts` on change. This file wires each route file into a typed route tree and enables type-safe `<Link to="...">` and programmatic navigation.

**Do not edit `routeTree.gen.ts` manually.** Add or rename files under `src/routes/` instead.

### Code splitting

`autoCodeSplitting: true` in the router plugin config means each route file is emitted as a separate chunk at build time, loaded on demand when the user navigates to that route.

## Pages and Components

### Home (`/`)

Renders a vertical column of `Belt` components for the ITF belt colour progression, including stripe variants between ranks.

### Patterns (`/patterns`, `/pattern/:id`)

The patterns index lists all patterns grouped by section. The detail page loads metadata from `~/data/itf-patterns`, step text from `~/data/pattern-steps`, and renders an interactive step list plus a `PatternScene` 3D viewer. Step positions are derived at runtime by `buildPatternPath()` in `~/utils/pattern-path.ts`, which parses movement text for `to X` / `toward X` targets on the ITF training area.

### Sparring (`/sparring/*`)

Three-level navigation over static sparring definitions in `~/data/sparring.ts`: type index → sequence list → individual sequence with attacks, defences, and counter.

### Theory (`/theory`)

Renders static theory content from `~/data/theory.ts` — tenets, student oath, and terminology definitions.

### About (`/about`)

A minimal placeholder page. No shared layout beyond the root nav.

### Shared components

| Component          | File                               | Role                                                                       |
| ------------------ | ---------------------------------- | -------------------------------------------------------------------------- |
| `Belt`, `MiniBelt` | `src/components/belt.tsx`          | Belt colour bars; `rankToBeltStyle()` maps rank strings to colours/stripes |
| `PatternScene`     | `src/components/pattern-scene.tsx` | React Three Fiber scene: dojang mat, corner markers, animated path         |

### Shared utilities

- **`src/utils.ts`** — exports `cn()`, combining `clsx` with `tailwind-merge` for dynamic class composition.
- **`src/utils/pattern-path.ts`** — parses pattern step strings into 3D positions on the training area grid.

## Styling

Styling is **Tailwind CSS v4** integrated via the `@tailwindcss/vite` plugin. Visual direction, tokens, and component patterns are defined in [DESIGN.md](./DESIGN.md).

- **`src/index.css`** imports Tailwind with `@import "tailwindcss"`, defines a custom `dark` variant scoped to `[data-theme=dark]`, exposes design tokens via `@theme`, and provides shared `@utility` classes (`page-shell`, `content-column`, glow helpers).
- **`index.html`** sets `data-theme="dark"` on the `<html>` element and loads Inter from Google Fonts.
- Components use Tailwind utility classes directly in JSX; there are no CSS modules or styled-components.

## Build and Development

### Scripts

| Command           | Action                                                                         |
| ----------------- | ------------------------------------------------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR                                                 |
| `npm run build`   | Production build via Vite, then TypeScript project references check (`tsc -b`) |
| `npm run preview` | Serve the production build locally                                             |
| `npm run lint`    | Run ESLint across the project                                                  |

### Vite configuration

`vite.config.ts` registers three plugins in order:

1. **`tanstackRouter`** — route file scanning and code splitting
2. **`tailwindcss`** — Tailwind v4 processing
3. **`react`** — React Fast Refresh and JSX transform

The `~` alias resolves to `src/` for imports (e.g. `import { cn } from "~/utils"`).

Output goes to `dist/` (gitignored).

### TypeScript

The project uses TypeScript project references:

- **`tsconfig.app.json`** — application source (`src/`), strict mode, `noEmit` (Vite handles emit)
- **`tsconfig.node.json`** — Node-side config files (Vite config, ESLint)
- **`tsconfig.json`** — root references only

Key compiler options: `strict`, `verbatimModuleSyntax`, `jsx: "react-jsx"`, `moduleResolution: "bundler"`.

### Linting

ESLint 9 flat config (`eslint.config.js`) with:

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh` (Vite preset)

## State and Data

There is **no application state** beyond React's local component state and **no runtime data fetching**. All content is imported from static TypeScript modules in `src/data/` at build time.

Specifically:

- No global store (Redux, Zustand, TanStack Store, etc.)
- No server state / data fetching (TanStack Query, SWR, etc.)
- No route loaders or URL search params in use
- No environment variables or external API integration

Each page imports the data it needs from `src/data/` and manages UI state locally (e.g. selected pattern step on the detail page). Adding shared state or data fetching would require introducing new dependencies and likely a provider in `main.tsx`.

## Deployment Model

The app is a static SPA suitable for deployment to any static host (Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, etc.):

1. Run `npm run build`
2. Deploy the contents of `dist/`
3. Configure the host to serve `index.html` for all routes (SPA fallback), since routing is client-side

No server runtime is required.

## Conventions for Extension

When adding features, follow the patterns already established:

- **New pages** — add a file under `src/routes/`; the route tree regenerates automatically
- **Shared components** — add to `src/components/`
- **Static content** — add or extend modules in `src/data/`
- **Shared hooks or logic** — create `src/hooks/` or extend `src/utils/` as appropriate
- **Styling** — follow [DESIGN.md](./DESIGN.md); implement with Tailwind utilities and `@theme` tokens in `src/index.css`
- **Type-safe navigation** — use `<Link to="...">` or `useNavigate()` from TanStack Router; paths are typed via the generated route tree
- **Imports** — use the `~` alias for `src/` paths, not relative `../` imports

Avoid editing generated files (`routeTree.gen.ts`). Update this document when changes affect how the app is built, organized, or deployed.
