# Architecture

This document describes the architecture of **taekwondo.naismith.dev** — a client-side single-page application (SPA) that visualizes Taekwondo belt progression.

## Overview

The application is a static, browser-rendered React app with no backend or API layer. All UI runs in the client. Routing is handled entirely on the client via TanStack Router. There is no server-side rendering (SSR), no global state management library, and no data fetching layer at present.

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
│                     │  └─ Outlet                   │   │
│                     │      ├─ /  → index.tsx       │   │
│                     │      └─ /about → about.tsx   │   │
│                     └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer                | Technology                | Role                               |
| -------------------- | ------------------------- | ---------------------------------- |
| Runtime              | React 19                  | UI rendering                       |
| Language             | TypeScript 5.9            | Type safety                        |
| Bundler / dev server | Vite 8                    | Build tooling, HMR                 |
| Routing              | TanStack Router           | File-based client routing          |
| Styling              | Tailwind CSS v4           | Utility-first CSS                  |
| Class utilities      | `clsx` + `tailwind-merge` | Conditional and merged class names |

## Project Structure

```
taekwondo.naismith.dev/
├── index.html              # HTML shell; mounts React at #root
├── vite.config.ts          # Vite plugins and build config
├── src/
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles; Tailwind import
│   ├── routeTree.gen.ts    # Auto-generated route tree (do not edit)
│   ├── utils.ts            # Shared utilities (cn helper)
│   └── routes/
│       ├── __root.tsx      # Root layout: nav + <Outlet />
│       ├── index.tsx       # Home route (/)
│       └── about.tsx       # About route (/about)
```

Routes are defined as individual files under `src/routes/`. TanStack Router's Vite plugin scans this directory and generates `routeTree.gen.ts` at build/dev time.

## Application Bootstrap

Bootstrapping follows a standard Vite + React pattern:

1. **`index.html`** loads `/src/main.tsx` as an ES module into a `#root` div.
2. **`main.tsx`** imports the generated `routeTree`, creates a router with `createRouter`, and renders `<RouterProvider>` inside React `StrictMode`.
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

| Path     | File                   | Purpose                               |
| -------- | ---------------------- | ------------------------------------- |
| `/`      | `src/routes/index.tsx` | Home — belt progression visualization |
| `/about` | `src/routes/about.tsx` | About page (placeholder)              |

All routes are children of the root route defined in `src/routes/__root.tsx`.

### Root layout

`__root.tsx` defines the persistent shell:

- A fixed top navigation bar with `<Link>` components to `/` and `/about`
- An `<Outlet />` where child route components render
- Active link styling via TanStack Router's `.active` class

Child routes do not define their own layouts; they render directly into the root outlet.

### Route generation

The `@tanstack/router-plugin/vite` plugin (configured in `vite.config.ts`) watches `src/routes/` and regenerates `src/routeTree.gen.ts` on change. This file:

- Wires each route file into a typed route tree
- Exports TypeScript interfaces for path literals (`'/' | '/about'`)
- Enables type-safe `<Link to="...">` and programmatic navigation

**Do not edit `routeTree.gen.ts` manually.** Add or rename files under `src/routes/` instead.

### Code splitting

`autoCodeSplitting: true` in the router plugin config means each route file is emitted as a separate chunk at build time, loaded on demand when the user navigates to that route.

## Pages and Components

### Home (`/`)

The home page renders a full-viewport column of `Belt` components representing the Taekwondo belt color progression (white → yellow → green → blue → red → black), including stripe variants between ranks.

`Belt` is a local component defined in `index.tsx` — not extracted to a shared components directory. It uses the `cn()` utility to compose Tailwind classes for layout, hover effects, and stripe overlays.

### About (`/about`)

A minimal placeholder page with centered text. No shared layout beyond the root nav.

### Shared utilities

`src/utils.ts` exports `cn()`, which combines `clsx` (conditional classes) with `tailwind-merge` (deduplication of conflicting Tailwind utilities). This is the standard pattern for dynamic class composition in Tailwind projects.

## Styling

Styling is **Tailwind CSS v4** integrated via the `@tailwindcss/vite` plugin.

- **`src/index.css`** imports Tailwind with `@import "tailwindcss"` and defines a custom `dark` variant scoped to `[data-theme=dark]`.
- **`index.html`** sets `data-theme="dark"` on the `<html>` element, activating dark-mode styles globally.
- Components use Tailwind utility classes directly in JSX; there are no CSS modules or styled-components.

The visual language is dark (`bg-black` backgrounds) with belt colors drawn from Tailwind's default palette (`yellow-300`, `green-400`, etc.).

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

There is currently **no application state** beyond React's local component state. Specifically:

- No global store (Redux, Zustand, TanStack Store, etc.)
- No server state / data fetching (TanStack Query, SWR, etc.)
- No URL search params or route loaders in use
- No environment variables or external API integration

Each page is self-contained. Adding shared state or data fetching would require introducing new dependencies and likely a provider in `main.tsx`.

## Deployment Model

The app is a static SPA suitable for deployment to any static host (Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages, etc.):

1. Run `yarn build`
2. Deploy the contents of `dist/`
3. Configure the host to serve `index.html` for all routes (SPA fallback), since routing is client-side

No server runtime is required.

## Conventions for Extension

When adding features, follow the patterns already established:

- **New pages** — add a file under `src/routes/`; the route tree regenerates automatically
- **Shared components** — create a `src/components/` directory (does not exist yet)
- **Shared hooks or logic** — create `src/hooks/` or extend `src/utils.ts` as appropriate
- **Styling** — Tailwind utilities in JSX; global tokens or variants in `src/index.css`
- **Type-safe navigation** — use `<Link to="...">` or `useNavigate()` from TanStack Router; paths are typed via the generated route tree

Avoid editing generated files (`routeTree.gen.ts`).
