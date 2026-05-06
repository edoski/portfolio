"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useCompletingSheen() {
  const [isSheenActive, setIsSheenActive] = useState(false)
  const isSheenActiveRef = useRef(false)
  const animationFrame = useRef<number | null>(null)

  const startSheen = useCallback(() => {
    if (isSheenActiveRef.current || animationFrame.current !== null) {
      return
    }

    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = requestAnimationFrame(() => {
        isSheenActiveRef.current = true
        setIsSheenActive(true)
        animationFrame.current = null
      })
    })
  }, [])

  const finishSheen = useCallback(() => {
    isSheenActiveRef.current = false
    setIsSheenActive(false)
  }, [])

  useEffect(() => {
    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current)
      }

      animationFrame.current = null
      isSheenActiveRef.current = false
    }
  }, [])

  return {
    finishSheen,
    isSheenActive,
    startSheen,
  }
}
