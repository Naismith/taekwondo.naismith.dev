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
│                     │ __root.tsx                   │   │
│                     │  NavBar, AppToaster, update  │   │
│                     │  └─ Outlet → route pages    │   │
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
| Icons                | `lucide-react`                                   | Nav and UI icons                            |
| Toasts               | `sonner`                                         | App update notifications                    |
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
│   ├── hooks/
│   │   └── use-app-update-check.ts # Poll version.json; toast on new build
│   ├── components/
│   │   ├── app-toaster.tsx # Sonner toast host
│   │   ├── belt.tsx        # Belt, MiniBelt, rankToBeltStyle
│   │   ├── nav-bar.tsx     # Fixed top nav (desktop links, mobile section picker)
│   │   ├── nav-link.tsx    # Typed TanStack Router nav link
│   │   ├── pattern-scene.tsx # R3F dojang mat + path visualization
│   │   └── section-link.tsx  # Home / mobile nav section card
│   ├── data/
│   │   ├── glossary.ts     # Korean terminology entries and search
│   │   ├── itf-patterns.ts # Pattern list, ranks, slug helpers
│   │   ├── nav.ts          # Nav section metadata and path helpers
│   │   ├── pattern-steps.ts # Step-by-step movement text per pattern
│   │   ├── sparring.ts     # 2-step and 3-step sparring definitions
│   │   ├── syllabus.ts     # Belt ranks, grading requirements, links
│   │   ├── techniques.ts   # Stances and ready stances (theory page)
│   │   └── theory.ts       # Theory reference content
│   └── routes/
│       ├── __root.tsx      # Root layout: NavBar + <Outlet /> + update notifier
│       ├── index.tsx       # Home (/)
│       ├── belts.tsx       # Belt progression (/belts)
│       ├── patterns.tsx    # Pattern list (/patterns)
│       ├── pattern.$id.tsx # Pattern detail (/pattern/:id)
│       ├── sparring.tsx    # Sparring layout (/sparring)
│       ├── sparring.index.tsx
│       ├── sparring.$type.tsx
│       ├── sparring.$type.$number.tsx
│       ├── theory.tsx      # Theory reference (/theory)
│       └── glossary.tsx    # Terminology glossary (/glossary)
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
| `/`                       | `src/routes/index.tsx`                  | Home — section links to main areas           |
| `/belts`                  | `src/routes/belts.tsx`                  | Belt progression and grading requirements    |
| `/patterns`               | `src/routes/patterns.tsx`               | Browse ITF patterns by section               |
| `/pattern/:id`            | `src/routes/pattern.$id.tsx`            | Pattern detail, step list, 3D viewer         |
| `/sparring`               | `src/routes/sparring.index.tsx`         | All sparring types and sequence links        |
| `/sparring/:type/:number` | `src/routes/sparring.$type.$number.tsx` | Single sparring sequence detail              |
| `/theory`                 | `src/routes/theory.tsx`                 | Theory reference (tenets, definitions, oath) |
| `/glossary`               | `src/routes/glossary.tsx`               | Searchable Korean terminology glossary       |

All routes are children of the root route defined in `src/routes/__root.tsx`.

Pattern IDs are slugs derived from pattern names (`Chon-Ji` → `chon-ji`) via `patternToId()` in `~/data/itf-patterns`. Sparring `:type` values match `SparringType` in `~/data/sparring.ts` (e.g. `3-step`, `2-step`).

### Nested layouts

Sparring uses two layout routes that render only an `<Outlet />`:

- **`sparring.tsx`** — parent for all `/sparring/*` routes
- **`sparring.$type.tsx`** — parent for `/sparring/:type/*` routes

Leaf routes (`sparring.index.tsx`, `sparring.$type.$number.tsx`) render page content into these outlets. There is no separate sequence-list page at `/sparring/:type` — the index lists all types and links directly to individual sequences. All other routes render directly into the root outlet.

### Root layout

`__root.tsx` defines the persistent shell:

- `AppToaster` (Sonner) and `AppUpdateNotifier` (`useAppUpdateCheck` polls `/version.json` emitted at build time)
- `NavBar` — fixed top bar with desktop text links to all main sections; on mobile (non-home routes), a section picker dropdown using `SectionLink` cards
- An `<Outlet />` where child route components render

Nav section metadata lives in `~/data/nav.ts`. Active link styling uses TanStack Router's `.active` class on desktop `NavLink` components.

### Route generation

The `@tanstack/router-plugin/vite` plugin (configured in `vite.config.ts`) watches `src/routes/` and regenerates `src/routeTree.gen.ts` on change. This file wires each route file into a typed route tree and enables type-safe `<Link to="...">` and programmatic navigation.

**Do not edit `routeTree.gen.ts` manually.** Add or rename files under `src/routes/` instead.

### Code splitting

`autoCodeSplitting: true` in the router plugin config means each route file is emitted as a separate chunk at build time, loaded on demand when the user navigates to that route.

## Pages and Components

### Home (`/`)

Renders a list of `SectionLink` cards to the main content areas (belts, patterns, sparring, theory, glossary). Section metadata comes from `~/data/nav.ts`.

### Belts (`/belts`)

Interactive belt progression: rank selector (grid on desktop, dropdown on mobile) and grading requirements for the selected rank. Syllabus data from `~/data/syllabus.ts`. Selected rank persists in `localStorage`.

### Patterns (`/patterns`, `/pattern/:id`)

The patterns index lists all patterns grouped by section. The detail page loads metadata from `~/data/itf-patterns`, step text from `~/data/pattern-steps`, and renders an interactive step list plus a `PatternScene` 3D viewer. Step positions are derived at runtime by `buildPatternPath()` in `~/utils/pattern-path.ts`, which parses movement text for `to X` / `toward X` targets on the ITF training area.

### Sparring (`/sparring/*`)

Two-level navigation over static sparring definitions in `~/data/sparring.ts`: the index page lists all types with starting positions and sequence links; detail pages show attacks, defences, and counter for a single sequence.

### Theory (`/theory`)

Renders static theory content from `~/data/theory.ts` and stances from `~/data/techniques.ts` — tenets, student oath, theory of power, sine wave, and stances.

### Glossary (`/glossary`)

Searchable Korean terminology from `~/data/glossary.ts` with category filters.

### Shared components

| Component          | File                               | Role                                                                       |
| ------------------ | ---------------------------------- | -------------------------------------------------------------------------- |
| `NavBar`           | `src/components/nav-bar.tsx`       | Fixed top nav; desktop links, mobile section picker                        |
| `NavLink`          | `src/components/nav-link.tsx`      | Typed router link with active styling                                      |
| `SectionLink`      | `src/components/section-link.tsx`  | Card link for home and mobile nav                                          |
| `Belt`, `MiniBelt` | `src/components/belt.tsx`          | Belt colour bars; `rankToBeltStyle()` maps rank strings to colours/stripes |
| `PatternScene`     | `src/components/pattern-scene.tsx` | React Three Fiber scene: dojang mat, corner markers, animated path         |
| `AppToaster`       | `src/components/app-toaster.tsx`   | Sonner toast host for update notifications                                 |

### Shared utilities

- **`src/utils.ts`** — exports `cn()`, combining `clsx` with `tailwind-merge` for dynamic class composition.
- **`src/utils/pattern-path.ts`** — parses pattern step strings into 3D positions on the training area grid.

## Styling

Styling is **Tailwind CSS v4** integrated via the `@tailwindcss/vite` plugin. Visual direction, tokens, and component patterns are defined in [DESIGN.md](./DESIGN.md).

- **`src/index.css`** imports Tailwind with `@import "tailwindcss"`, defines a custom `dark` variant scoped to `[data-theme=dark]`, exposes design tokens via `@theme`, and provides shared `@utility` classes (`page-shell`, `content-column-wide`, glow helpers). All route pages use `content-column-wide` (`max-w-5xl`).
- **`index.html`** sets `data-theme="dark"` on the `<html>` element and loads Inter from Google Fonts.
- Components use Tailwind utility classes directly in JSX; there are no CSS modules or styled-components.

## Build and Development

### Scripts

| Command        | Action                                                                         |
| -------------- | ------------------------------------------------------------------------------ |
| `yarn dev`     | Start Vite dev server with HMR                                                 |
| `yarn build`   | Production build via Vite, then TypeScript project references check (`tsc -b`) |
| `yarn preview` | Serve the production build locally                                             |
| `yarn lint`    | Run ESLint across the project                                                  |

### Vite configuration

`vite.config.ts` registers three plugins in order:

1. **`tanstackRouter`** — route file scanning and code splitting
2. **`tailwindcss`** — Tailwind v4 processing
3. **`react`** — React Fast Refresh and JSX transform
4. **`versionJsonPlugin`** (local) — emits `version.json` with a build ID for update detection

The `~` alias resolves to `src/` for imports (e.g. `import { cn } from "~/utils"`). `__APP_BUILD_ID__` is defined at build time and compared against `/version.json` at runtime.

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
- No environment variables or external API integration (except polling static `version.json` for update detection)

Each page imports the data it needs from `src/data/` and manages UI state locally (e.g. selected pattern step on the detail page, selected belt rank on `/belts` with `localStorage` persistence). Adding shared state or data fetching would require introducing new dependencies and likely a provider in `main.tsx`.

## Deployment Model

The app is a static SPA suitable for deployment to any static host (Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, etc.):

1. Run `yarn build`
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
