"use client"

import { motion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

interface TiltTechBadgeProps {
  children: string
}

export function TiltTechBadge({ children }: TiltTechBadgeProps) {
  const { style, sheen, isTouchActive, tiltHandlers } =
    usePointerTiltPreset("techBadge")

  return (
    <motion.span
      style={style}
      {...tiltHandlers}
      className="group/tech-badge inline-flex transform-gpu"
    >
      <Badge
        variant="outline"
        className="relative overflow-hidden rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors duration-200 hover:border-white/20 hover:text-foreground"
      >
        <motion.span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
            "group-hover/tech-badge:opacity-100",
            isTouchActive && "opacity-100",
          )}
          style={{ background: sheen }}
        />
        <span className="relative">{children}</span>
      </Badge>
    </motion.span>
  )
}
