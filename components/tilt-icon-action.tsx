"use client"

import { motion } from "motion/react"

import { usePointerTilt } from "@/lib/use-pointer-tilt"

interface TiltIconActionProps {
  children: React.ReactNode
}

export function TiltIconAction({ children }: TiltIconActionProps) {
  const { rotateX, rotateY, scale, tiltHandlers } = usePointerTilt({
    maxRotation: 10,
    activeScale: 1.08,
    activeLerpFactor: 0.08,
    idleLerpFactor: 0.04,
  })

  return (
    <motion.span
      style={{ rotateX, rotateY, scale, transformPerspective: 320, touchAction: "pan-y" }}
      {...tiltHandlers}
      className="inline-flex transform-gpu"
    >
      {children}
    </motion.span>
  )
}
