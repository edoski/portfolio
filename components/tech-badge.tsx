"use client"

import type { AnimationEvent } from "react"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { useCompletingSheen } from "@/lib/use-completing-sheen"
import { cn } from "@/lib/utils"

/** `md` is 12/400, the small style of the home page type scale. */
const techBadgeSizes = {
  sm: "text-[11px]",
  md: "text-xs font-normal",
} as const

export type TechBadgeSize = keyof typeof techBadgeSizes

interface TechBadgeProps {
  children: ReactNode
  size?: TechBadgeSize
  className?: string
}

export function TechBadge({ children, size = "sm", className }: TechBadgeProps) {
  const { finishSheen, isSheenActive, startSheen } = useCompletingSheen()

  function handleAnimationEnd(event: AnimationEvent<HTMLSpanElement>) {
    if (event.animationName !== "tech-badge-sheen") {
      return
    }

    finishSheen()
  }

  return (
    <Badge
      variant="outline"
      data-sheen-active={isSheenActive ? "true" : undefined}
      onAnimationEnd={handleAnimationEnd}
      onFocus={startSheen}
      onPointerDown={startSheen}
      onPointerEnter={startSheen}
      className={cn(
        "tech-badge relative rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono",
        techBadgeSizes[size],
        "text-muted-foreground transition-colors duration-200 hover:border-white/20 hover:text-foreground",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </Badge>
  )
}
