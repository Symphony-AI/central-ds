# Central Design System — Monorepo

Unified Central Design System for SymphonyAI. One install, one import — React components, design tokens, and icons.

## Quick Start

```bash
# Install the umbrella package
npm install @symphony-ai/central-ds
```

```tsx
// Subpath imports (recommended for tree-shaking)
import { Button } from "@symphony-ai/central-ds/react";
import { IconSearch } from "@symphony-ai/central-ds/icons";
import { colors, spacing } from "@symphony-ai/central-ds/variables";

// Or import everything from the root
import { Button, IconSearch, colors } from "@symphony-ai/central-ds";
```

## Monorepo Structure

```
central-ds/
├── package.json                  # Root workspace config (private)
├── pnpm-workspace.yaml           # PNPM workspace definition
├── tsconfig.base.json            # Shared TypeScript config
├── .npmrc                        # Registry / auth config
├── packages/
│   ├── react/                    # @symphony-ai/central-ds-react (internal)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── src/
│   ├── icons/                    # @symphony-ai/central-ds-icons (internal)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── src/
│   ├── variables/                # @symphony-ai/central-ds-variables (internal)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── src/
│   └── central-ds/               # @symphony-ai/central-ds (PUBLIC umbrella)
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts
│       └── src/
│           ├── index.ts          # Re-exports everything
│           ├── react.ts          # Re-exports react components
│           ├── icons.ts          # Re-exports icons
│           └── variables.ts      # Re-exports design tokens
├── README.md
└── MIGRATION.md
```

## Packages

| Package | Description | Registry |
|---------|-------------|----------|
| `@symphony-ai/central-ds` | Umbrella package — bundles everything, the only one consumers install | 📦 GitHub Packages (public) |
| `@symphony-ai/central-ds-react` | React UI components | 📦 GitHub Packages |
| `@symphony-ai/central-ds-icons` | SVG icon components | 📦 GitHub Packages |
| `@symphony-ai/central-ds-variables` | Design tokens (colors, spacing, typography) | 📦 GitHub Packages |

> **Architecture:** All packages are published to GitHub Packages. The umbrella `central-ds` **bundles** all sub-package code at build time, so consumers only need `@symphony-ai/central-ds`.

## Development

### Prerequisites

- Node.js ≥ 18
- [pnpm](https://pnpm.io/) ≥ 10

### Setup

```bash
# Install all dependencies across the workspace
pnpm install

# Build all packages (respects dependency order)
pnpm build

# Build only the umbrella package
pnpm --filter @symphony-ai/central-ds build

# Watch mode for development
pnpm dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages |
| `pnpm dev` | Watch mode for all packages |
| `pnpm test` | Run tests across all packages |
| `pnpm lint` | Lint all packages |
| `pnpm clean` | Remove all `dist/` directories |
| `pnpm typecheck` | Type-check all packages |

## CI/CD & Publishing

### GitHub Actions Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **CI** (`.github/workflows/ci.yml`) | Push / PR to `main` | Builds all packages and runs typecheck |
| **Publish Sub-Packages** (`.github/workflows/publish-packages.yml`) | Push to `main` (version change in sub-package) | Publishes changed sub-packages to GitHub Packages (private), then triggers central-ds rebuild |
| **Publish Central DS** (`.github/workflows/publish-central-ds.yml`) | Auto (after sub-packages update) or manual | Builds & bundles all sub-packages, bumps version, publishes to GitHub Packages |
| **Version Bump** (`.github/workflows/version-bump.yml`) | Manual dispatch | Bumps version of one or all sub-packages and pushes to main |

### How Publishing Works

```
┌─────────────────────────────────────────────────────────────────┐
│  Developer bumps version in react/icons/variables package.json  │
│  (manually or via "Version Bump" workflow)                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ push to main
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  "Publish Sub-Packages" workflow detects version change         │
│  → Builds & publishes changed packages to GitHub Packages 📦   │
│  → Triggers repository_dispatch event                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ repository_dispatch
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  "Publish Central DS" workflow                                  │
│  → Builds all sub-packages from workspace source               │
│  → Bundles everything into central-ds (no external deps)       │
│  → Bumps central-ds version (patch)                            │
│  → Publishes to GitHub Packages 📦                             │
│  → Commits changes & creates GitHub Release                    │
└─────────────────────────────────────────────────────────────────┘
```

### Setup Requirements

1. **GITHUB_TOKEN** — Automatically provided by GitHub Actions. No additional secrets needed!
2. **Repository permissions** — Ensure the repo has **Settings → Actions → General → Workflow permissions** set to **"Read and write permissions"**

### Consumer Setup

To install `@symphony-ai` packages from GitHub Packages, consumers need to configure their `.npmrc`:

```ini
# .npmrc (in the consuming project)
@symphony-ai:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Manual Publishing

```bash
# Build all packages and publish the umbrella to GitHub Packages
pnpm build && pnpm publish:umbrella
```

### Version Bumping

```bash
# Via GitHub Actions (recommended)
# Go to Actions → "Version Bump" → Run workflow → Select package & bump type

# Or manually
cd packages/react
npm version patch  # or minor / major
git add package.json && git commit -m "chore: bump react version" && git push
```

## Subpath Exports

| Import Path | Contents |
|---|---|
| `@symphony-ai/central-ds` | Everything (react + icons + variables) |
| `@symphony-ai/central-ds/react` | React UI components |
| `@symphony-ai/central-ds/icons` | SVG icon components |
| `@symphony-ai/central-ds/variables` | Design tokens |

## Auth & Registry

All `@symphony-ai` packages are published to **GitHub Packages**. See [`.npmrc`](.npmrc) for registry configuration. For detailed migration instructions, see [`MIGRATION.md`](MIGRATION.md).

To install packages, consumers need a GitHub token with `read:packages` scope:

```ini
# Consumer's .npmrc
@symphony-ai:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## License

UNLICENSED — Internal SymphonyAI package.
