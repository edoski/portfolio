"use client"

import { useEffect } from "react"

/**
 * Sets a --scroll-progress CSS variable (0–1) on <html> as the user scrolls.
 * Used by the .site-shell background to create a scroll-driven parallax effect.
 * No RAF loop — updates only on scroll events.
 */
export function ScrollProgress() {
  useEffect(() => {
    function update() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
      document.documentElement.style.setProperty("--scroll-progress", String(progress))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return null
}
