import { TechBadge } from "@/components/tech-badge"
import { cn } from "@/lib/utils"

interface TechBadgeListProps {
  tech: string[]
  className?: string
}

export function TechBadgeList({ tech, className }: TechBadgeListProps) {
  return (
    <div className={cn("flex flex-wrap content-start gap-1.5", className)}>
      {tech.map((item) => (
        <TechBadge key={item}>
          {item}
        </TechBadge>
      ))}
    </div>
  )
}
