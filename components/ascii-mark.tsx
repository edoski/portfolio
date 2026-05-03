"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const ASCIIText = dynamic(() => import("@/components/ASCIIText"), {
  ssr: false,
})

interface AsciiMarkProps {
  text: string
}

export function AsciiMark({ text }: AsciiMarkProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)")
    const updateIsMobile = () => setIsMobile(mediaQuery.matches)

    updateIsMobile()
    mediaQuery.addEventListener("change", updateIsMobile)

    return () => mediaQuery.removeEventListener("change", updateIsMobile)
  }, [])

  return (
    <ASCIIText
      key={isMobile ? "mobile" : "desktop"}
      text={text}
      asciiFontSize={isMobile ? 4 : 6}
      textFontSize={500}
      planeBaseHeight={isMobile ? 11 : 15}
      textColor="#ff9d3d"
      enableWaves={false}
      trackingSelector="[data-ascii-pointer-region]"
    />
  )
}
