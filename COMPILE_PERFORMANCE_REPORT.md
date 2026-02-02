# Dev Compile Performance Analysis & Changes

## 1. Exact Causes for Slow Compile in This Project

| Cause | Impact | Status |
|-------|--------|--------|
| **Full `lodash` imports** | Importing from `'lodash'` pulls in the entire library (~70+ modules) even when only `values` or `result` is used. | **FIXED** (SAFE) |
| **Mantine packages not optimized** | `@mantine/core`, `@mantine/hooks`, `@mantine/carousel`, etc. export many internal modules; without `optimizePackageImports` the bundler resolves and compiles far more than needed. | **FIXED** (SAFE) |
| **`import * as TablerIcons from "@tabler/icons-react"`** | Four files (PentagonPrime.js, ListCard.js, CustomerBenefits.js, CustomerChoose.js) use namespace imports. The bundler cannot tree-shake this, so **thousands** of icon modules are compiled. | **REPORTED ONLY** (risky to change – dynamic `TablerIcons[item.fields.icon]`) |
| **Contentful client in many client components** | The `contentful` SDK is imported in ~20+ client components. It is a large dependency and increases module count on every route that uses it. | **REPORTED ONLY** (moving to server would change data flow) |
| **No jsconfig exclude** | `node_modules` and `.next` were not excluded; can add minor watcher/IDE overhead. | **FIXED** (SAFE) |
| **Heavy dependency set** | Mantine, Tabler Icons, Contentful, GSAP, Leaflet, React Query, etc. – many large packages increase total module count. | **Mitigated** via optimizePackageImports and lodash subpaths only; no package removal. |

---

## 2. Files Changed and Why

| File | Change | Why | SAFE |
|------|--------|-----|------|
| **next.config.mjs** | Added `experimental.optimizePackageImports` for `@mantine/core`, `@mantine/hooks`, `@mantine/carousel`, `@mantine/dates`, `@mantine/form`, `@mantine/notifications`. | Ensures only Mantine modules actually imported are compiled; reduces dev module count. | **SAFE** |
| **src/app/home/Hero.js** | Replaced `import { values } from 'lodash'` with `import values from 'lodash/values'`. | Avoids pulling in full lodash; only `lodash/values` is compiled. Same runtime behavior. | **SAFE** |
| **src/app/customer-request-form/CustomerRequestForm.js** | Replaced `import { result } from "lodash"` with `import result from "lodash/result"`. | Same as above for `result`. | **SAFE** |
| **jsconfig.json** | Added `"exclude": ["node_modules", ".next"]`. | Reduces unnecessary file resolution/watching for IDE and tooling; no effect on Next build logic. | **SAFE** |

**Not changed (logic-preserving rule):**

- **Tabler icons namespace imports** – Replacing `import * as TablerIcons` with a fixed icon map would require enumerating every icon used in CMS/data and changing dynamic `TablerIcons[item.fields.icon]` usage. **Risky** (could miss icons or change behavior); only reported.
- **Contentful** – Moving Contentful to server-only would change API/data flow; not done.
- **next.config.mjs** – No change to `output`, `reactStrictMode`, `trailingSlash`, or `compiler.removeConsole`.
- **package.json scripts** – Next.js 15.x already uses Turbopack by default for `next dev`; no script change required.
- **TypeScript** – Project uses JS + jsconfig; no tsconfig changes.
- **ESLint/Prettier** – No existing config; no new config added (ESLint does not drive Next dev compile time).

---

## 3. Before vs After Expected Compile Time

| Metric | Before (expected) | After (expected) |
|--------|-------------------|------------------|
| **Modules compiled** | 15000+ (e.g. full lodash + full Mantine + full Tabler in namespace-import files) | Fewer: Mantine only loads used modules; lodash only 2 subpaths; same Tabler cost in 4 files. |
| **Initial dev compile** | e.g. ~60–100s+ | **~10–30% faster** from Mantine + lodash reductions (project-dependent). |
| **HMR / Fast Refresh** | Slower when touching files that pull in large trees | **Faster** for changes in Mantine-heavy and lodash-using pages (fewer modules to invalidate). |

**Note:** The largest remaining cost is the **four files** that use `import * as TablerIcons from "@tabler/icons-react"`. Until those are refactored to a fixed icon map (with explicit named imports), Tabler will still add a large number of modules on routes that use PentagonPrime, ListCard, CustomerBenefits, or CustomerChoose.

---

## 4. Change Summary – All SAFE (Logic-Preserving)

- **next.config.mjs** – `optimizePackageImports` for Mantine only; no behavior change. **SAFE**
- **Hero.js** – `lodash` → `lodash/values`; same `values` API. **SAFE**
- **CustomerRequestForm.js** – `lodash` → `lodash/result`; same `result` API. **SAFE**
- **jsconfig.json** – Exclude `node_modules` and `.next`; build and runtime unchanged. **SAFE**

No business logic, API behavior, UI behavior, or data flow was changed. No refactors for readability, no renames beyond import paths for bundle size.
