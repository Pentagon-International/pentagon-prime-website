# Development-Time Performance: Root Cause Analysis & Safe Fixes

**Constraints applied:** Zero behavior/runtime/UI/API change. No refactors, file moves, or dependency upgrades. Build, tooling, and config only.

---

## 1. Root Cause Analysis

| Root cause | Impact | Addressed |
|------------|--------|-----------|
| **Turbopack not explicit** | Next 15 uses Turbopack by default for `next dev`, but the script did not pass `--turbopack`. In some environments or future Next versions, default could differ; explicit flag ensures Turbopack is used and documents intent. | **Yes** – dev script now passes `--turbopack`. |
| **Heavy packages not in optimizePackageImports** | `@mantine/*` and `@tabler/icons-react` export many modules. Without optimization, the bundler resolves/compiles more than needed. | **Yes** – Mantine packages + `@tabler/icons-react` added to `experimental.optimizePackageImports`. |
| **Full lodash imports** | `import { values } from 'lodash'` / `import { result } from 'lodash'` pull in the whole library. | **Already fixed** (previous pass) – Hero.js and CustomerRequestForm.js use `lodash/values` and `lodash/result`. |
| **jsconfig scope too broad** | No `include`; tools using jsconfig could consider root files. `include: ["src"]` limits scope to app source. | **Yes** – `jsconfig.json` now has `"include": ["src"]`. |
| **ESLint linting unnecessary dirs** | Without `.eslintignore`, ESLint (when run via `next lint` or directly) may consider `node_modules`, `.next`, `public`, etc. Standard ignores reduce work. | **Yes** – `.eslintignore` added for `node_modules`, `.next`, `out`, `build`, `public`. |
| **Namespace Tabler imports** | Four files use `import * as TablerIcons from "@tabler/icons-react"` with dynamic `TablerIcons[item.fields.icon]`. Bundler cannot tree-shake; thousands of icon modules compile. | **Report only** – Fixing would require an icon map + logic change; not done. |
| **No TypeScript project** | Project uses `jsconfig.json` only; no `tsconfig.json`. No type-check execution to optimize. | **N/A** – No TS includes/excludes to adjust. |
| **Turbopack watch exclusions** | Next.js/Turbopack do not expose a config option to exclude directories from the file watcher. | **N/A** – Not configurable. |

---

## 2. Minimal Safe Fixes Applied

| File | Change | Why |
|------|--------|-----|
| **package.json** | `next dev` → `next dev --turbopack` | Explicitly enable Turbopack for dev; no behavior change. |
| **next.config.mjs** | Add `@tabler/icons-react` to `experimental.optimizePackageImports` | Improves tree-shaking for files that use **named** Tabler icon imports; no effect on namespace-import files. |
| **jsconfig.json** | Add `"include": ["src"]` | Restricts jsconfig scope to app source; improves IDE/tooling performance; path alias `@/*` still resolves to `./src/*`. |
| **.eslintignore** (new) | `node_modules`, `.next`, `out`, `build`, `public` | Reduces files considered by ESLint; faster `next lint`; no source files excluded. |

**No changes to:** runtime logic, UI, API, refactors, file moves, dependencies, or any file under `src/` (except previously applied lodash subpath imports in Hero.js and CustomerRequestForm.js).

---

## 3. Rollback Instructions

To undo **this round** of changes only:

### package.json
```diff
- "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev --turbopack",
+ "dev": "cross-env NODE_OPTIONS=--no-deprecation next dev",
```

### next.config.mjs
Remove `'@tabler/icons-react',` from the `optimizePackageImports` array (keep the Mantine entries if they were added earlier).

### jsconfig.json
Remove the `"include": ["src"],` line so it looks like:
```json
{
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },
  "exclude": ["node_modules", ".next"]
}
```

### .eslintignore
Delete the file:
```bash
rm .eslintignore
```
(or remove its contents and leave an empty file if you prefer to keep the file.)

---

**To roll back the earlier lodash + optimizePackageImports + jsconfig exclude changes** (if needed):

- **next.config.mjs:** Remove the entire `experimental: { optimizePackageImports: [ ... ] }` block.
- **Hero.js:** `import values from 'lodash/values'` → `import { values } from 'lodash'`.
- **CustomerRequestForm.js:** `import result from "lodash/result"` → `import { result } from "lodash"`.
- **jsconfig.json:** Remove `"exclude": ["node_modules", ".next"]` if you want the original state.

All changes are config- or import-path only; no behavior, UI, or API changes.
