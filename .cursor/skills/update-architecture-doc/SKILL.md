---
name: update-architecture-doc
description: Updates ARCHITECTURE.md to reflect current codebase structure and architectural decisions. Use when making architectural changes, adding new top-level directories or frameworks, changing routing/build/deploy patterns, introducing state management or APIs, or after large feature additions that alter how the app is organized.
---

# Update Architecture Doc

Keep [ARCHITECTURE.md](../../../ARCHITECTURE.md) accurate after structural or architectural changes.

## When to Update

Update `ARCHITECTURE.md` when changes affect **how the app is built, organized, or deployed** — not individual feature behavior.

**Update required:**

- New or removed top-level `src/` directories (`components/`, `hooks/`, `api/`, etc.)
- Routing changes (new routes, layout nesting, loaders, SSR)
- New runtime dependencies that change architecture (state libs, data fetching, auth, UI frameworks)
- Build tool, bundler, or deployment model changes
- Bootstrap/provider tree changes in `main.tsx`
- Backend, API layer, or environment variable integration added
- Styling system changes (e.g. Tailwind → CSS modules)

**Skip update:**

- Bug fixes, copy, or styling tweaks within existing patterns
- New components using established conventions
- Patch/minor dependency bumps with no behavioral impact

**Always update** route tables, project structure trees, and the overview diagram when routes or top-level directories change — even if the new route follows existing file-based routing patterns.

When uncertain, update — stale docs are worse than brief over-documentation.

## Workflow

```
Task Progress:
- [ ] Step 1: Identify what changed architecturally
- [ ] Step 2: Read ARCHITECTURE.md and affected source files
- [ ] Step 3: Update only impacted sections
- [ ] Step 4: Verify against codebase (no aspirational content)
```

### Step 1: Identify changes

Review the diff or completed work. Classify each change:

| Change type                  | Sections likely affected                                         |
| ---------------------------- | ---------------------------------------------------------------- |
| New dependency               | Tech Stack, Bootstrap, State and Data, Build                     |
| New route                    | Routing (route tree), Project Structure, Pages, Overview diagram |
| New `src/` directory         | Project Structure, Conventions for Extension                     |
| Provider added to `main.tsx` | Bootstrap, State and Data                                        |
| API/data layer               | Overview, State and Data, Deployment Model                       |
| Build/config change          | Build and Development, Tech Stack                                |
| Styling system change        | Styling, Tech Stack                                              |

See [reference.md](reference.md) for the full section guide.

### Step 2: Read before writing

Always read these before editing:

1. Current `ARCHITECTURE.md`
2. `package.json` (dependencies and scripts)
3. `vite.config.ts` (or equivalent build config)
4. `src/main.tsx` (bootstrap and providers)
5. `src/routes/` (route files and layouts)
6. Any new top-level directories under `src/`

Do not document files or patterns that do not exist. Do not leave references to removed patterns.

### Step 3: Edit principles

- **Minimal diff** — change only sections affected by the work; preserve tone and structure
- **Present tense, factual** — describe what exists now, not planned future state
- **No code dumps** — short snippets only when they clarify non-obvious bootstrap or config
- **Keep tables and diagrams current** — route tables, tech stack table, and the ASCII overview diagram must match reality
- **Version numbers** — pull major versions from `package.json`; avoid pinning patch versions unless meaningful

### Step 4: Verify

Before finishing, confirm:

- [ ] Every route in `src/routes/` appears in the Routing section (excluding generated files)
- [ ] Project Structure tree matches the filesystem
- [ ] Tech Stack lists all architectural dependencies (not every devDependency)
- [ ] Bootstrap section matches `main.tsx` provider tree
- [ ] State and Data accurately reflects current data flow (or explicitly states "none")
- [ ] Scripts table matches `package.json`
- [ ] Conventions for Extension reflects actual directories and patterns

## Section Quick Reference

| Section                   | Update when…                                                        |
| ------------------------- | ------------------------------------------------------------------- |
| Overview                  | Deployment model, SSR, backend, or high-level data flow changes     |
| Tech Stack                | New architectural dependency or replacement                         |
| Project Structure         | Files/directories added, moved, or removed at top level             |
| Application Bootstrap     | `main.tsx` providers, entry flow, or router setup changes           |
| Routing                   | Routes, layouts, loaders, or router config changes                  |
| Pages and Components      | Major new pages or shared component directories                     |
| Styling                   | CSS framework, theme approach, or global style architecture changes |
| Build and Development     | Scripts, Vite config, TypeScript setup, or linting changes          |
| State and Data            | Stores, fetching, env vars, or URL state introduced/removed         |
| Deployment Model          | Output dir, hosting requirements, or server runtime needs change    |
| Conventions for Extension | New established patterns or directories agents should follow        |

## Overview Diagram

Update the ASCII diagram in Overview when the render/bootstrap flow changes. Keep it high-level:

```
index.html → main.tsx → RouterProvider → __root.tsx → child routes
```

Add nodes only for significant layers (providers, API client, layout nesting). Do not diagram every component.

## Propose vs. Apply

- If architecture changes were **made in the current session**, update `ARCHITECTURE.md` as part of the same task — do not leave it for later.
- If reviewing **existing drift** (doc outdated but no recent changes), update the doc and briefly note what was stale.

Do not create `ARCHITECTURE.md` if missing — use the template in [reference.md](reference.md).

## Additional Resources

- Section-by-section authoring guide: [reference.md](reference.md)
