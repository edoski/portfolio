import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TechBadgeListProps {
  tech: string[]
  className?: string
}

export function TechBadgeList({ tech, className }: TechBadgeListProps) {
  return (
    <div className={cn("flex flex-wrap content-start gap-1.5", className)}>
      {tech.map((item) => (
        <Badge
          key={item}
          variant="outline"
          className="rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
        >
          {item}
        </Badge>
      ))}
    </div>
  )
}
