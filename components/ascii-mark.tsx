"use client"

import dynamic from "next/dynamic"

const ASCIIText = dynamic(() => import("@/components/ASCIIText"), {
  ssr: false,
})

interface AsciiMarkProps {
  text: string
}

export function AsciiMark({ text }: AsciiMarkProps) {
  return (
    <ASCIIText
      text={text}
      asciiFontSize={6}
      textFontSize={500}
      planeBaseHeight={15}
      textColor="#ff9d3d"
      enableWaves={false}
      trackingSelector="[data-ascii-pointer-region]"
    />
  )
}
