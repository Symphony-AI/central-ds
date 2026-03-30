import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: "primary" | "secondary" | "ghost";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
}

/**
 * Placeholder Button component.
 * Replace with your actual Button implementation from central-ds-react.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button ref={ref} data-variant={variant} data-size={size} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
