# @symphony-ai/central-ds

> Unified Central Design System — React components, design tokens, and icons in a single package.

## Install

```bash
npm install @symphony-ai/central-ds
# or
pnpm add @symphony-ai/central-ds
# or
yarn add @symphony-ai/central-ds
```

## Usage

### Subpath imports (recommended)

```tsx
import { Button } from "@symphony-ai/central-ds/react";
import { IconSearch } from "@symphony-ai/central-ds/icons";
import { colors, spacing } from "@symphony-ai/central-ds/variables";
```

### Root import (convenience)

```tsx
import { Button, IconSearch, colors } from "@symphony-ai/central-ds";
```

> **Tip:** Subpath imports are preferred for better tree-shaking and smaller bundle sizes.

## Subpath Exports

| Subpath                            | Contents                        |
| ---------------------------------- | ------------------------------- |
| `@symphony-ai/central-ds`         | Everything (react + icons + variables) |
| `@symphony-ai/central-ds/react`   | React UI components             |
| `@symphony-ai/central-ds/icons`   | SVG icon components             |
| `@symphony-ai/central-ds/variables` | Design tokens (colors, spacing, typography) |

## Peer Dependencies

- `react` ^18 or ^19
- `react-dom` ^18 or ^19

## Version Mapping

| `@symphony-ai/central-ds` | `central-ds-react` | `central-ds-icons` | `central-ds-variables` |
| -------------------------- | ------------------- | ------------------- | ---------------------- |
| 1.0.0                      | 1.100.1             | 1.12.5              | 1.23.1                 |

## License

UNLICENSED — Internal SymphonyAI package.
