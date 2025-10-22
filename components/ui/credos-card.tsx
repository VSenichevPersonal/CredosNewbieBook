import type React from "react"
import { type HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CredosCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
}

export const CredosCard = forwardRef<HTMLDivElement, CredosCardProps>(
  ({ className, icon, title, description, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("card-credos", className)} {...props}>
        {icon && <div className="mb-4 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">{icon}</div>}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {description && <p className="text-white/90">{description}</p>}
        {children}
      </div>
    )
  },
)

CredosCard.displayName = "CredosCard"
