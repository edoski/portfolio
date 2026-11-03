"use client"

import { motion } from "motion/react"

import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

interface TiltIconActionProps {
  children: React.ReactNode
  /**
   * `wrapper` (default) clips the sheen by clipping the whole wrapper. `sheen` rounds the sheen
   * itself instead, so it looks the same while a child's touch target can reach past the 32px
   * box (Apple HIG 44pt minimum hit area).
   */
  clip?: "wrapper" | "sheen"
}

export function TiltIconAction({ children, clip = "wrapper" }: TiltIconActionProps) {
  const { style, sheen, isTouchActive, tiltHandlers } =
    usePointerTiltPreset("iconAction")

  return (
    <motion.span
      style={style}
      {...tiltHandlers}
      className={cn(
        "group/icon-action relative inline-flex transform-gpu rounded-md",
        clip === "wrapper" && "overflow-hidden",
      )}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
          clip === "sheen" && "rounded-md",
          "group-hover/icon-action:opacity-100",
          isTouchActive && "opacity-100",
        )}
        style={{ background: sheen }}
      />
    </motion.span>
  )
}
