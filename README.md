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

| Package | Description | Published? |
|---------|-------------|------------|
| `@symphony-ai/central-ds` | Umbrella package — the only one consumers install | ✅ Public (auto-published) |
| `@symphony-ai/central-ds-react` | React UI components | ✅ Public |
| `@symphony-ai/central-ds-icons` | SVG icon components | ✅ Public |
| `@symphony-ai/central-ds-variables` | Design tokens (colors, spacing, typography) | ✅ Public |

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
| **Publish Sub-Packages** (`.github/workflows/publish-packages.yml`) | Push to `main` (version change in sub-package) | Publishes changed sub-packages to npm, then triggers central-ds update |
| **Publish Central DS** (`.github/workflows/publish-central-ds.yml`) | Auto (after sub-packages publish) or manual | Updates umbrella package deps to latest npm versions, bumps version, publishes |
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
│  → Builds & publishes changed packages to npm                  │
│  → Triggers repository_dispatch event                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ repository_dispatch
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  "Publish Central DS" workflow                                  │
│  → Fetches latest versions from npm registry                   │
│  → Updates central-ds/package.json dependencies                │
│  → Bumps central-ds version (patch)                            │
│  → Builds & publishes to npm                                   │
│  → Commits changes & creates GitHub Release                    │
└─────────────────────────────────────────────────────────────────┘
```

### Setup Requirements

1. **NPM_TOKEN** — Add an npm access token as a repository secret:
   - Go to **Settings → Secrets and variables → Actions**
   - Add `NPM_TOKEN` with your npm publish token

2. **Registry** — Configure `.npmrc` for your registry (npm, GitHub Packages, or Azure Artifacts)

### Manual Publishing

```bash
# Publish a sub-package manually
pnpm --filter @symphony-ai/central-ds-react publish --access public

# Publish the umbrella package
pnpm publish:umbrella

# Or from the package directory
cd packages/central-ds && npm publish --access public
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

See [`.npmrc`](.npmrc) for registry configuration options. For detailed migration instructions, see [`MIGRATION.md`](MIGRATION.md).

## License

UNLICENSED — Internal SymphonyAI package.
