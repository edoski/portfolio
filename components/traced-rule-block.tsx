"use client"

import { useEffect, useRef } from "react"
import type { PointerEvent, ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue } from "motion/react"

import { cn } from "@/lib/utils"

interface TracedRuleBlockProps {
  children: ReactNode
  className?: string
}

const ruleTraceRadius = 76
const ruleTraceMaxSpeed = 620
const ruleTraceFollowFactor = 0.32
const ruleTraceFadeFactor = 0.16

export function TracedRuleBlock({
  children,
  className,
}: TracedRuleBlockProps) {
  const animationFrame = useRef<number | null>(null)
  const lastFrameTime = useRef<number | null>(null)
  const current = useRef({ y: 0, radius: 0, opacity: 0 })
  const target = useRef({ y: 0, radius: 0, opacity: 0 })
  const traceY = useMotionValue(0)
  const traceRadius = useMotionValue(0)
  const traceOpacity = useMotionValue(0)
  const traceMidOpacity = useMotionValue(0)
  const traceTailOpacity = useMotionValue(0)
  const ruleTrace = useMotionTemplate`radial-gradient(${traceRadius}px circle at 0px ${traceY}px, rgba(255,255,255,${traceOpacity}) 0%, rgba(255,255,255,${traceMidOpacity}) 18%, rgba(255,255,255,${traceTailOpacity}) 50%, transparent 76%)`

  function tick(timestamp: number) {
    const deltaSeconds = lastFrameTime.current === null
      ? 1 / 60
      : Math.min((timestamp - lastFrameTime.current) / 1000, 0.05)
    const maxStep = ruleTraceMaxSpeed * deltaSeconds
    const distance = target.current.y - current.current.y
    const step = Math.min(Math.abs(distance) * ruleTraceFollowFactor, maxStep)

    lastFrameTime.current = timestamp
    current.current.y += Math.sign(distance) * step
    current.current.radius +=
      (target.current.radius - current.current.radius) * ruleTraceFadeFactor
    current.current.opacity +=
      (target.current.opacity - current.current.opacity) * ruleTraceFadeFactor

    traceY.set(current.current.y)
    traceRadius.set(current.current.radius)
    traceOpacity.set(current.current.opacity * 0.92)
    traceMidOpacity.set(current.current.opacity * 0.48)
    traceTailOpacity.set(current.current.opacity * 0.18)

    const isSettled =
      Math.abs(target.current.y - current.current.y) < 0.5 &&
      Math.abs(target.current.radius - current.current.radius) < 0.5 &&
      Math.abs(target.current.opacity - current.current.opacity) < 0.01

    if (isSettled) {
      current.current = { ...target.current }
      traceY.set(target.current.y)
      traceRadius.set(target.current.radius)
      traceOpacity.set(target.current.opacity * 0.92)
      traceMidOpacity.set(target.current.opacity * 0.48)
      traceTailOpacity.set(target.current.opacity * 0.18)
      animationFrame.current = null
      lastFrameTime.current = null
      return
    }

    animationFrame.current = requestAnimationFrame(tick)
  }

  function startAnimation() {
    if (animationFrame.current !== null) {
      return
    }

    lastFrameTime.current = null
    animationFrame.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  function updateTrace(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const y = event.clientY - rect.top

    if (current.current.opacity < 0.02) {
      current.current.y = y
      traceY.set(y)
    }

    target.current.y = y
    target.current.radius = ruleTraceRadius
    target.current.opacity = 1
    startAnimation()
  }

  function hideTrace() {
    target.current.radius = 0
    target.current.opacity = 0
    startAnimation()
  }

  return (
    <motion.div
      onPointerEnter={updateTrace}
      onPointerMove={updateTrace}
      onPointerLeave={hideTrace}
      onBlur={hideTrace}
      style={
        {
          "--rule-trace": ruleTrace,
        } as React.ComponentProps<typeof motion.div>["style"]
      }
      className={cn("traced-rule-block relative w-full pl-4 md:pl-5", className)}
    >
      <div className="relative">{children}</div>
    </motion.div>
  )
}
