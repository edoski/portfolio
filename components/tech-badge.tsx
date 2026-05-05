import { Badge } from "@/components/ui/badge"

interface TechBadgeProps {
  children: string
}

export function TechBadge({ children }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="tech-badge relative rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors duration-200 hover:border-white/20 hover:text-foreground"
    >
      <span className="relative z-10">{children}</span>
    </Badge>
  )
}
