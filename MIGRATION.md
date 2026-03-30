# Migration Guide

## Migrating from separate packages to `@symphony-ai/central-ds`

This guide covers how to migrate from the three individual packages to the unified umbrella package.

---

## Before (3 separate installs)

```bash
npm install @symphony-ai/central-ds-react@1.100.1
npm install @symphony-ai/central-ds-variables@1.23.1
npm install @symphony-ai/central-ds-icons@1.12.5
```

```tsx
import { Button } from "@symphony-ai/central-ds-react";
import { IconSearch } from "@symphony-ai/central-ds-icons";
import { colors } from "@symphony-ai/central-ds-variables";
```

## After (1 install)

```bash
npm install @symphony-ai/central-ds
```

```tsx
import { Button } from "@symphony-ai/central-ds/react";
import { IconSearch } from "@symphony-ai/central-ds/icons";
import { colors } from "@symphony-ai/central-ds/variables";
```

---

## Step-by-Step Migration

### 1. Remove old packages

```bash
npm uninstall @symphony-ai/central-ds-react @symphony-ai/central-ds-icons @symphony-ai/central-ds-variables
```

### 2. Install the umbrella package

```bash
npm install @symphony-ai/central-ds
```

### 3. Update imports

Use find-and-replace across your codebase:

| Old Import | New Import |
|---|---|
| `from "@symphony-ai/central-ds-react"` | `from "@symphony-ai/central-ds/react"` |
| `from "@symphony-ai/central-ds-icons"` | `from "@symphony-ai/central-ds/icons"` |
| `from "@symphony-ai/central-ds-variables"` | `from "@symphony-ai/central-ds/variables"` |

**Regex for bulk replacement:**

```bash
# React components
find . -name '*.ts' -o -name '*.tsx' | xargs sed -i '' \
  's|@symphony-ai/central-ds-react|@symphony-ai/central-ds/react|g'

# Icons
find . -name '*.ts' -o -name '*.tsx' | xargs sed -i '' \
  's|@symphony-ai/central-ds-icons|@symphony-ai/central-ds/icons|g'

# Variables
find . -name '*.ts' -o -name '*.tsx' | xargs sed -i '' \
  's|@symphony-ai/central-ds-variables|@symphony-ai/central-ds/variables|g'
```

### 4. Verify

```bash
# Type-check
npx tsc --noEmit

# Build
npm run build

# Run tests
npm test
```

---

## For Maintainers: Migrating Source Code into the Monorepo

### Step 1: Clone the monorepo

```bash
git clone <repo-url> central-ds
cd central-ds
```

### Step 2: Copy source from existing repos

```bash
# From your existing central-ds-react repo
cp -r ../central-ds-react/src/* packages/react/src/

# From your existing central-ds-icons repo
cp -r ../central-ds-icons/src/* packages/icons/src/

# From your existing central-ds-variables repo
cp -r ../central-ds-variables/src/* packages/variables/src/
```

### Step 3: Update package.json dependencies

Review each `packages/*/package.json` and ensure all dependencies from the original repos are included.

### Step 4: Install and build

```bash
pnpm install
pnpm build
```

### Step 5: Test the umbrella package locally

```bash
# Create a tarball
cd packages/central-ds
pnpm pack

# In a test project
npm install /path/to/symphony-ai-central-ds-1.0.0.tgz
```

### Step 6: Publish

```bash
# From the repo root
pnpm publish:umbrella
```

---

## Alternative: Git Subtree Migration

If you want to preserve git history from the original repos:

```bash
# Add each repo as a subtree
git subtree add --prefix=packages/react <react-repo-url> main --squash
git subtree add --prefix=packages/icons <icons-repo-url> main --squash
git subtree add --prefix=packages/variables <variables-repo-url> main --squash
```

---

## Auth / Registry Setup

### Public npm (recommended)

No special auth needed for consumers:

```bash
npm install @symphony-ai/central-ds
```

### Private registry

Configure `.npmrc` in your consuming project:

```ini
@symphony-ai:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
always-auth=true
```

### Hybrid model

Publish these publicly:
- `@symphony-ai/central-ds-icons`
- `@symphony-ai/central-ds-variables`
- `@symphony-ai/central-ds` (umbrella)

Keep private:
- `@symphony-ai/central-ds-react` (if it contains proprietary enterprise components)

---

## Troubleshooting

### "Cannot find module '@symphony-ai/central-ds/react'"

Ensure your TypeScript version is ≥ 4.7 and `moduleResolution` is set to `"bundler"` or `"node16"` in your `tsconfig.json`. Subpath exports require modern module resolution.

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### "ERR! 402 Payment Required" when publishing

Scoped packages default to private on npm. Use:

```bash
npm publish --access public
```

Or set in `package.json`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

### Workspace protocol `workspace:*` in published package

pnpm automatically replaces `workspace:*` with the actual version number when publishing. If you see `workspace:*` in a published `package.json`, the package was not published through pnpm. Always use `pnpm publish` from the package directory.
