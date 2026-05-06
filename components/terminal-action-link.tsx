"use client"

import type {
  AnchorHTMLAttributes,
  AnimationEvent,
  FocusEvent,
  PointerEvent,
} from "react"

import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { useCompletingSheen } from "@/lib/use-completing-sheen"

export function TerminalActionLink({
  onAnimationEnd,
  onFocus,
  onPointerDown,
  onPointerEnter,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}) {
  const { finishSheen, isSheenActive, startSheen } = useCompletingSheen()

  function handleAnimationEnd(event: AnimationEvent<HTMLAnchorElement>) {
    onAnimationEnd?.(event)
    finishSheen()
  }

  function handleFocus(event: FocusEvent<HTMLAnchorElement>) {
    onFocus?.(event)
    startSheen()
  }

  function handlePointerDown(event: PointerEvent<HTMLAnchorElement>) {
    onPointerDown?.(event)
    startSheen()
  }

  function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    onPointerEnter?.(event)
    startSheen()
  }

  return (
    <SmoothScrollLink
      {...props}
      data-sheen-active={isSheenActive ? "true" : undefined}
      onAnimationEnd={handleAnimationEnd}
      onFocus={handleFocus}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
    />
  )
}
