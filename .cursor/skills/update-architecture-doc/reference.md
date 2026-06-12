# ARCHITECTURE.md Reference

Authoring guide for each section. Read only the sections you need to update.

## Document Template

Use this skeleton when creating `ARCHITECTURE.md` from scratch:

```markdown
# Architecture

One-paragraph summary: what the app is and its deployment shape (SPA, SSR, etc.).

## Overview

High-level description + ASCII diagram of bootstrap/render flow.

## Tech Stack

| Layer | Technology | Role |

## Project Structure

Directory tree with one-line comments per entry.

## Application Bootstrap

Numbered flow from index.html → main.tsx → providers → router.

## Routing

Route table, layout description, generation/code-splitting notes.

## Pages and Components

Per-route or per-feature summaries; shared utilities.

## Styling

CSS framework, theme, global vs component styles.

## Build and Development

Scripts table, Vite config summary, TypeScript, linting.

## State and Data

What state exists (or explicit "none"); fetching, env vars, stores.

## Deployment Model

Build output, hosting type, SPA fallback requirements.

## Conventions for Extension

Actionable patterns for adding routes, components, hooks, etc.
```

---

## Section Details

### Overview

- State deployment model upfront (static SPA, SSR, hybrid)
- Mention absence of backend/API if true
- ASCII diagram: browser shell → entry → router → layout → routes
- Update when any layer in the diagram is added or removed

### Tech Stack

Include only dependencies that define architecture:

| Include                               | Exclude                                  |
| ------------------------------------- | ---------------------------------------- |
| React, router, bundler, CSS framework | ESLint, Prettier, type packages          |
| State/data libraries                  | `@types/*`                               |
| Auth, API clients                     | Test runners (unless doc covers testing) |

Pull version major/minor from `package.json`.

### Project Structure

- Tree depth: repo root + `src/` one level deep; expand subdirs only when they exist
- Annotate generated files (`routeTree.gen.ts`) with "do not edit"
- Omit `node_modules`, `dist`, build artifacts, dotfiles

### Application Bootstrap

Mirror `main.tsx` exactly:

1. Entry HTML script tag
2. Router/store creation
3. Provider nesting order (outermost first)
4. Module augmentations if present

If no providers beyond router, say so explicitly.

### Routing

Maintain a route table:

| Path | File | Purpose |

Document:

- Root layout file and what it renders (nav, outlet)
- File-based vs code-based route definition
- Code splitting setting from vite config
- Generated route tree file and regeneration behavior
- Loaders, search params, or nested layouts if used

### Pages and Components

- One subsection per significant route or feature area
- Note whether components are local or in `src/components/`
- Describe shared utilities (`cn()`, formatters, etc.)
- Skip exhaustive component catalogs — focus on structure

### Styling

- CSS framework and integration method (Vite plugin, PostCSS, etc.)
- Global entry file (`index.css`)
- Theme mechanism (`data-theme`, CSS variables, dark mode)
- Component styling approach (utilities, modules, etc.)

### Build and Development

**Scripts table** — copy from `package.json` scripts with one-line descriptions.

**Vite config** — list plugins in order with purpose.

**TypeScript** — reference config files and key compiler options.

**Linting** — config file and major plugins.

### State and Data

Be explicit about what is **not** present. When adding state:

- Where it lives (provider, store file)
- What triggers updates
- How routes/components consume it
- External data sources and env vars

Remove "no X" bullets when X is added; don't leave contradictions.

### Deployment Model

- Build command and output directory
- Static vs server requirements
- SPA fallback note for client-side routers
- CI/CD references only if configured in repo

### Conventions for Extension

Action-oriented bullets for common additions:

- New pages → where to add files
- Shared components → directory to create/use
- Hooks, API calls, styling patterns

Update when a convention becomes real (e.g. `src/components/` is created — remove "does not exist yet").

---

## Common Update Scenarios

### Added a new route

1. Route table in Routing
2. Project Structure (if new file)
3. Pages and Components subsection
4. Overview diagram if layout nesting changed
5. Root layout nav links in Routing → Root layout

### Added TanStack Query (example)

1. Tech Stack row
2. Bootstrap — QueryClientProvider in main.tsx
3. State and Data — rewrite to describe fetching pattern
4. Conventions — how to add queries

### Added `src/components/`

1. Project Structure tree
2. Pages and Components — note shared extraction
3. Conventions — replace "create directory" with "add to src/components/"

### Switched to SSR

1. Overview — rewrite deployment model
2. Deployment Model — server runtime required
3. Build and Development — new scripts/output
4. Bootstrap — hydration flow
5. Routing — loader/SSR notes

### Dependency-only change

Update Tech Stack if the dependency is architectural. Skip other sections unless usage is implemented.
