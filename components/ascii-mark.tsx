"use client"

import { useEffect, useState } from "react"

import ASCIIText from "@/components/ASCIIText"

interface AsciiMarkProps {
  text: string
}

export function AsciiMark({ text }: AsciiMarkProps) {
  const [isMobile, setIsMobile] = useState(false)
  const variant = isMobile ? "mobile" : "desktop"

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)")
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)

    updateIsMobile()
    mediaQuery.addEventListener("change", updateIsMobile)

    return () => mediaQuery.removeEventListener("change", updateIsMobile)
  }, [])

  return (
    <ASCIIText
      key={variant}
      text={text}
      asciiFontSize={isMobile ? 4 : 6}
      textFontSize={500}
      planeBaseHeight={isMobile ? 11.5 : 16}
      textColor="#ff9d3d"
      enableWaves={false}
      introDurationMs={1400}
      trackingSelector="[data-ascii-pointer-region]"
    />
  )
}