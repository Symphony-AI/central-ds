/**
 * Placeholder color tokens.
 * Replace with your actual color tokens from central-ds-variables.
 */
export const colors = {
  // ─── Brand ──────────────────────────────────────────────
  primary: "#0066FF",
  primaryHover: "#0052CC",
  primaryActive: "#003D99",

  // ─── Neutral ────────────────────────────────────────────
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  black: "#000000",

  // ─── Semantic ───────────────────────────────────────────
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

export type ColorToken = keyof typeof colors;
