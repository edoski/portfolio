"use client"

import { useEffect, useRef, useState } from "react"
import type { PointerEvent } from "react"
import {
  useMotionTemplate,
  useMotionValue,
} from "motion/react"

interface PointerTiltOptions {
  maxRotation?: number
  activeLerpFactor?: number
  idleLerpFactor?: number
  activeScale?: number
  sheenOpacity?: number
  sheenSize?: number
  sheenOutsetX?: number
  sheenOutsetY?: number
  touchResetDelay?: number
}

const tiltPresets = {
  projectCard: {
    options: {},
    perspective: 900,
  },
  contactLink: {
    options: {
      maxRotation: 7,
      activeScale: 1.04,
      sheenOpacity: 0.095,
      sheenSize: 150,
      sheenOutsetX: 80,
      sheenOutsetY: 48,
    },
    perspective: 700,
  },
  iconAction: {
    options: {
      maxRotation: 10,
      activeScale: 1.08,
      activeLerpFactor: 0.08,
      idleLerpFactor: 0.04,
      sheenOpacity: 0.12,
      sheenSize: 80,
    },
    perspective: 320,
  },
} satisfies Record<string, {
  options: PointerTiltOptions
  perspective: number
}>

type PointerTiltPreset = keyof typeof tiltPresets

const edgeTracerRadius = 220
const edgeTracerMaxSpeed = 960
const edgeTracerFollowFactor = 0.34
const edgeTracerFadeFactor = 0.16

function moveAroundPerimeter(
  current: number,
  target: number,
  perimeter: number,
  maxStep: number,
  followFactor: number,
) {
  if (perimeter <= 0) {
    return target
  }

  const halfPerimeter = perimeter / 2
  const delta =
    ((target - current + halfPerimeter + perimeter) % perimeter) -
    halfPerimeter
  const step = Math.min(Math.abs(delta) * followFactor, maxStep)

  if (step === 0) {
    return current
  }

  return (current + Math.sign(delta) * step + perimeter) % perimeter
}

function projectPointToBorder(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const centerX = width / 2
  const centerY = height / 2
  const dx = x - centerX
  const dy = y - centerY

  if (dx === 0 && dy === 0) {
    return { x: centerX, y: 0 }
  }

  const tx = dx === 0
    ? Number.POSITIVE_INFINITY
    : (dx > 0 ? width - centerX : -centerX) / dx
  const ty = dy === 0
    ? Number.POSITIVE_INFINITY
    : (dy > 0 ? height - centerY : -centerY) / dy
  const scale = Math.min(tx, ty)

  return {
    x: centerX + dx * scale,
    y: centerY + dy * scale,
  }
}

function borderPointToDistance(
  point: { x: number; y: number },
  width: number,
  height: number,
) {
  const epsilon = 0.001

  if (Math.abs(point.y) < epsilon) {
    return point.x
  }

  if (Math.abs(point.x - width) < epsilon) {
    return width + point.y
  }

  if (Math.abs(point.y - height) < epsilon) {
    return width + height + width - point.x
  }

  return width * 2 + height + height - point.y
}

function pointAtBorderDistance(
  distance: number,
  width: number,
  height: number,
) {
  const perimeter = width * 2 + height * 2

  if (perimeter <= 0) {
    return { x: 0, y: 0 }
  }

  const normalized = ((distance % perimeter) + perimeter) % perimeter

  if (normalized <= width) {
    return { x: normalized, y: 0 }
  }

  if (normalized <= width + height) {
    return { x: width, y: normalized - width }
  }

  if (normalized <= width * 2 + height) {
    return { x: width - (normalized - width - height), y: height }
  }

  return { x: 0, y: height - (normalized - width * 2 - height) }
}

export function usePointerTilt({
  maxRotation = 5,
  activeLerpFactor = 0.05,
  idleLerpFactor = 0.025,
  activeScale = 1.015,
  sheenOpacity = 0.08,
  sheenSize = 420,
  sheenOutsetX = 0,
  sheenOutsetY = 0,
  touchResetDelay = 160,
}: PointerTiltOptions = {}) {
  const [isTouchActive, setIsTouchActive] = useState(false)
  const animationFrame = useRef<number | null>(null)
  const lastFrameTime = useRef<number | null>(null)
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInteracting = useRef(false)
  const current = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const target = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const currentEdge = useRef({
    distance: 0,
    width: 0,
    height: 0,
    perimeter: 0,
    radius: 0,
    opacity: 0,
  })
  const targetEdge = useRef({
    distance: 0,
    width: 0,
    height: 0,
    perimeter: 0,
    radius: 0,
    opacity: 0,
  })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const sheenX = useMotionValue("50%")
  const sheenY = useMotionValue("50%")
  const sheen = useMotionTemplate`radial-gradient(${sheenSize}px circle at ${sheenX} ${sheenY}, rgba(255,255,255,${sheenOpacity}), transparent 42%)`
  const edgeTracerX = useMotionValue(0)
  const edgeTracerY = useMotionValue(0)
  const edgeTracerVisibleRadius = useMotionValue(0)
  const edgeTracerOpacity = useMotionValue(0)
  const edgeTracerMidOpacity = useMotionValue(0)
  const edgeTracerTailOpacity = useMotionValue(0)
  const edgeTracer = useMotionTemplate`radial-gradient(${edgeTracerVisibleRadius}px circle at ${edgeTracerX}px ${edgeTracerY}px, rgba(255,255,255,${edgeTracerOpacity}) 0%, rgba(255,255,255,${edgeTracerMidOpacity}) 14%, rgba(255,255,255,${edgeTracerTailOpacity}) 48%, transparent 74%)`

  function tick(timestamp: number) {
    const deltaSeconds = lastFrameTime.current === null
      ? 1 / 60
      : Math.min((timestamp - lastFrameTime.current) / 1000, 0.05)
    const maxEdgeStep = edgeTracerMaxSpeed * deltaSeconds
    const lerpFactor = isInteracting.current
      ? activeLerpFactor
      : idleLerpFactor

    lastFrameTime.current = timestamp
    current.current.rotateX +=
      (target.current.rotateX - current.current.rotateX) * lerpFactor
    current.current.rotateY +=
      (target.current.rotateY - current.current.rotateY) * lerpFactor
    current.current.scale +=
      (target.current.scale - current.current.scale) * lerpFactor

    rotateX.set(current.current.rotateX)
    rotateY.set(current.current.rotateY)
    scale.set(current.current.scale)

    currentEdge.current.distance = moveAroundPerimeter(
      currentEdge.current.distance,
      targetEdge.current.distance,
      targetEdge.current.perimeter,
      maxEdgeStep,
      edgeTracerFollowFactor,
    )
    currentEdge.current.width = targetEdge.current.width
    currentEdge.current.height = targetEdge.current.height
    currentEdge.current.perimeter = targetEdge.current.perimeter
    currentEdge.current.radius +=
      (targetEdge.current.radius - currentEdge.current.radius) *
      edgeTracerFadeFactor
    currentEdge.current.opacity +=
      (targetEdge.current.opacity - currentEdge.current.opacity) *
      edgeTracerFadeFactor

    const edgePoint = pointAtBorderDistance(
      currentEdge.current.distance,
      currentEdge.current.width,
      currentEdge.current.height,
    )

    edgeTracerX.set(edgePoint.x)
    edgeTracerY.set(edgePoint.y)
    edgeTracerVisibleRadius.set(currentEdge.current.radius)
    edgeTracerOpacity.set(currentEdge.current.opacity * 0.78)
    edgeTracerMidOpacity.set(currentEdge.current.opacity * 0.40)
    edgeTracerTailOpacity.set(currentEdge.current.opacity * 0.16)

    const isEdgeDistanceSettled =
      targetEdge.current.perimeter <= 0 ||
      Math.abs(
        ((targetEdge.current.distance - currentEdge.current.distance +
          targetEdge.current.perimeter / 2 +
          targetEdge.current.perimeter) %
          targetEdge.current.perimeter) -
          targetEdge.current.perimeter / 2,
      ) < 0.5

    const isSettled =
      Math.abs(target.current.rotateX - current.current.rotateX) < 0.01 &&
      Math.abs(target.current.rotateY - current.current.rotateY) < 0.01 &&
      Math.abs(target.current.scale - current.current.scale) < 0.001 &&
      isEdgeDistanceSettled &&
      Math.abs(targetEdge.current.radius - currentEdge.current.radius) < 0.5 &&
      Math.abs(targetEdge.current.opacity - currentEdge.current.opacity) < 0.01

    if (!isInteracting.current && isSettled) {
      current.current = { ...target.current }
      rotateX.set(target.current.rotateX)
      rotateY.set(target.current.rotateY)
      scale.set(target.current.scale)
      currentEdge.current = { ...targetEdge.current }
      const targetEdgePoint = pointAtBorderDistance(
        targetEdge.current.distance,
        targetEdge.current.width,
        targetEdge.current.height,
      )

      edgeTracerX.set(targetEdgePoint.x)
      edgeTracerY.set(targetEdgePoint.y)
      edgeTracerVisibleRadius.set(targetEdge.current.radius)
      edgeTracerOpacity.set(targetEdge.current.opacity * 0.78)
      edgeTracerMidOpacity.set(targetEdge.current.opacity * 0.40)
      edgeTracerTailOpacity.set(targetEdge.current.opacity * 0.16)
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

      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current)
      }
    }
  }, [])

  function applyTilt(element: HTMLElement, clientX: number, clientY: number) {
    const rect = element.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const offsetX = x - rect.width / 2
    const offsetY = y - rect.height / 2

    target.current.rotateX = (offsetY / (rect.height / 2)) * maxRotation
    target.current.rotateY = (offsetX / (rect.width / 2)) * -maxRotation
    target.current.scale = activeScale
    if (sheenOutsetX || sheenOutsetY) {
      sheenX.set(`${x + sheenOutsetX}px`)
      sheenY.set(`${y + sheenOutsetY}px`)
    } else {
      sheenX.set(`${(x / rect.width) * 100}%`)
      sheenY.set(`${(y / rect.height) * 100}%`)
    }

    const edgePoint = projectPointToBorder(x, y, rect.width, rect.height)
    const edgeDistance = borderPointToDistance(edgePoint, rect.width, rect.height)
    const edgePerimeter = rect.width * 2 + rect.height * 2

    if (currentEdge.current.opacity < 0.02) {
      currentEdge.current.distance = edgeDistance
      currentEdge.current.width = rect.width
      currentEdge.current.height = rect.height
      currentEdge.current.perimeter = edgePerimeter
      edgeTracerX.set(edgePoint.x)
      edgeTracerY.set(edgePoint.y)
    }

    targetEdge.current.distance = edgeDistance
    targetEdge.current.width = rect.width
    targetEdge.current.height = rect.height
    targetEdge.current.perimeter = edgePerimeter
    targetEdge.current.radius = edgeTracerRadius
    targetEdge.current.opacity = 1

    startAnimation()
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current)
    }

    if (event.pointerType === "touch") {
      setIsTouchActive(true)
    }

    isInteracting.current = true
    applyTilt(event.currentTarget, event.clientX, event.clientY)
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    isInteracting.current = true
    applyTilt(event.currentTarget, event.clientX, event.clientY)
  }

  function resetTilt() {
    isInteracting.current = false
    target.current.rotateX = 0
    target.current.rotateY = 0
    target.current.scale = 1
    targetEdge.current.radius = 0
    targetEdge.current.opacity = 0
    setIsTouchActive(false)
    startAnimation()
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "touch") {
      return
    }

    resetTimeout.current = setTimeout(resetTilt, touchResetDelay)
  }

  return {
    rotateX,
    rotateY,
    scale,
    sheen,
    edgeTracer,
    isTouchActive,
    tiltHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
      onPointerUp: handlePointerUp,
      onPointerCancel: resetTilt,
      onBlur: resetTilt,
    },
  }
}

export function usePointerTiltPreset(preset: PointerTiltPreset) {
  const { options, perspective } = tiltPresets[preset]
  const tilt = usePointerTilt(options)

  return {
    ...tilt,
    style: {
      rotateX: tilt.rotateX,
      rotateY: tilt.rotateY,
      scale: tilt.scale,
      transformPerspective: perspective,
      touchAction: "pan-y",
    },
  }
}
