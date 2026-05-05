"use client"

import { motion } from "motion/react"

import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"

interface TiltIconActionProps {
  children: React.ReactNode
}

export function TiltIconAction({ children }: TiltIconActionProps) {
  const { style, tiltHandlers } = usePointerTiltPreset("iconAction")

  return (
    <motion.span
      style={style}
      {...tiltHandlers}
      className="inline-flex transform-gpu"
    >
      {children}
    </motion.span>
  )
}
