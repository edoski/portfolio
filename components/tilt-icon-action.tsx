"use client"

import { motion } from "motion/react"

import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

interface TiltIconActionProps {
  children: React.ReactNode
}

export function TiltIconAction({ children }: TiltIconActionProps) {
  const { style, sheen, isTouchActive, tiltHandlers } =
    usePointerTiltPreset("iconAction")

  return (
    <motion.span
      style={style}
      {...tiltHandlers}
      className="group/icon-action relative inline-flex transform-gpu overflow-hidden rounded-md"
    >
      {children}
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
          "group-hover/icon-action:opacity-100",
          isTouchActive && "opacity-100",
        )}
        style={{ background: sheen }}
      />
    </motion.span>
  )
}
