import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CredosButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
}

export const CredosButton = forwardRef<HTMLButtonElement, CredosButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variant === "primary" ? "btn-credos" : "btn-credos-outline", className)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

CredosButton.displayName = "CredosButton"
