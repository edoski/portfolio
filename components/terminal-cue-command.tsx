"use client"

import { useEffect, useRef, useState } from "react"

const CURSOR_REVEAL_DELAY_MS = 250
const CURSOR_BLINK_CYCLE_MS = 1000

interface TerminalCueCommandProps {
  children: string
}

export function TerminalCueCommand({ children }: TerminalCueCommandProps) {
  const [isCursorActive, setIsCursorActive] = useState(false)
  const [isCursorVisible, setIsCursorVisible] = useState(false)
  const [cursorCycle, setCursorCycle] = useState(0)
  const blinkStartedAt = useRef(0)
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearTimers() {
    if (revealTimer.current) {
      clearTimeout(revealTimer.current)
      revealTimer.current = null
    }

    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (revealTimer.current) {
        clearTimeout(revealTimer.current)
      }

      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
      }
    }
  }, [])

  function startCursor() {
    clearTimers()

    revealTimer.current = setTimeout(() => {
      blinkStartedAt.current = performance.now()
      setCursorCycle((cycle) => cycle + 1)
      setIsCursorActive(true)
      setIsCursorVisible(true)
    }, CURSOR_REVEAL_DELAY_MS)
  }

  function stopCursor() {
    if (revealTimer.current) {
      clearTimeout(revealTimer.current)
      revealTimer.current = null
    }

    if (!isCursorActive) {
      setIsCursorVisible(false)
      return
    }

    const elapsed = performance.now() - blinkStartedAt.current
    const cycleOffset = elapsed % CURSOR_BLINK_CYCLE_MS
    const remainingCycle = CURSOR_BLINK_CYCLE_MS - cycleOffset

    hideTimer.current = setTimeout(() => {
      setIsCursorActive(false)
      setIsCursorVisible(false)
    }, remainingCycle)
  }

  return (
    <span
      className="terminal-cue-command text-foreground"
      onPointerEnter={startCursor}
      onPointerLeave={stopCursor}
    >
      {children}
      <span
        key={cursorCycle}
        aria-hidden="true"
        className="terminal-cue-command-cursor"
        data-active={isCursorActive ? "true" : undefined}
        data-visible={isCursorVisible ? "true" : undefined}
      >
        _
      </span>
    </span>
  )
}
