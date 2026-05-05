import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TechBadgeProps {
  children: ReactNode
  className?: string
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "tech-badge relative rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors duration-200 hover:border-white/20 hover:text-foreground",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </Badge>
  )
}
