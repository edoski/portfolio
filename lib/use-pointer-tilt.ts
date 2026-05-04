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
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInteracting = useRef(false)
  const current = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const target = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const sheenX = useMotionValue("50%")
  const sheenY = useMotionValue("50%")
  const sheen = useMotionTemplate`radial-gradient(${sheenSize}px circle at ${sheenX} ${sheenY}, rgba(255,255,255,${sheenOpacity}), transparent 42%)`

  function tick() {
    const lerpFactor = isInteracting.current
      ? activeLerpFactor
      : idleLerpFactor

    current.current.rotateX +=
      (target.current.rotateX - current.current.rotateX) * lerpFactor
    current.current.rotateY +=
      (target.current.rotateY - current.current.rotateY) * lerpFactor
    current.current.scale +=
      (target.current.scale - current.current.scale) * lerpFactor

    rotateX.set(current.current.rotateX)
    rotateY.set(current.current.rotateY)
    scale.set(current.current.scale)

    const isSettled =
      Math.abs(target.current.rotateX - current.current.rotateX) < 0.01 &&
      Math.abs(target.current.rotateY - current.current.rotateY) < 0.01 &&
      Math.abs(target.current.scale - current.current.scale) < 0.001

    if (!isInteracting.current && isSettled) {
      current.current = { ...target.current }
      rotateX.set(target.current.rotateX)
      rotateY.set(target.current.rotateY)
      scale.set(target.current.scale)
      animationFrame.current = null
      return
    }

    animationFrame.current = requestAnimationFrame(tick)
  }

  function startAnimation() {
    if (animationFrame.current !== null) {
      return
    }

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
