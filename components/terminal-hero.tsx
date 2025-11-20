"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import { cn } from "@/lib/utils"
import TiltedCard from "@/components/TiltedCard"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TERMINAL_BIO } from "@/lib/constants"

const FaultyTerminal = dynamic(
  () => import("@/components/FaultyTerminal"),
  { ssr: false }
)

const ASCIITextDynamic = dynamic(
  () => import("@/components/ASCIIText"),
  { ssr: false }
)

export function TerminalHero() {
  const [showCursor, setShowCursor] = useState(true)
  const [showName, setShowName] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // ASCII art name animation
  useEffect(() => {
    const nameTimer = setTimeout(() => {
      setShowName(true)
    }, 300)

    return () => clearTimeout(nameTimer)
  }, [])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  // Memoize FaultyTerminal to prevent re-renders (required for WebGL performance)
  const faultyTerminalBackground = useMemo(
    () => (
      <div className="absolute inset-0 z-0">
        <FaultyTerminal
          tint="#9bed82"
          gridMul={isMobile ? [1, 1.8] : [1.2, 0.6]}
          scale={isMobile ? 0.5 : 1}
          scanlineIntensity={0.4}
          flickerAmount={0.6}
          glitchAmount={0}
          curvature={isMobile ? 0 : 0.08}
          brightness={0.6}
          dither={1}
          mouseReact={true}
          mouseStrength={0.15}
          className=""
          style={{}}
        />
      </div>
    ),
    []
  )

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* FaultyTerminal Background */}
      {faultyTerminalBackground}

      <div className="max-w-5xl mx-auto w-full space-y-8 relative z-10">
        {/* Main terminal window */}
        <TiltedCard
          containerHeight="auto"
          containerWidth="100%"
          imageHeight="auto"
          imageWidth="100%"
          scaleOnHover={1.02}
          rotateAmplitude={8}
          showMobileWarning={false}
          showTooltip={false}
        >
          <TerminalChrome title="~/about" className="p-0 min-h-[380px]">
            <div className="space-y-6 p-0 md:px-2">
              {/* Name display with ASCII-style effect */}
              <div className="space-y-2">
                <TerminalPrompt path="~/about" command="whoami" className="text-sm" />
                <div className={cn(
                  "relative w-full h-48 md:h-64 transition-opacity duration-300",
                  showName ? "opacity-100" : "opacity-0"
                )}>
                  <ASCIITextDynamic
                    text="edo."
                    asciiFontSize={isMobile ? 4 : 6}
                    textFontSize={200}
                    planeBaseHeight={isMobile ? 11 : 16}
                    textColor="#ff9d3d"
                    enableWaves={false}
                  />
                </div>
              </div>

              {/* Bio text with typewriter */}
              <div className="space-y-2">
                {/* Desktop version - inline with cursor */}
                <div className="hidden md:block">
                  <TerminalPrompt
                    path="~/about"
                    command={
                      <>
                        <span>echo &quot;</span>
                        {TERMINAL_BIO.segments.map((segment, i) => (
                          <span key={i} className={segment.bold ? "font-bold" : ""}>
                            {segment.text}
                          </span>
                        ))}
                        <span>&quot;</span>
                      </>
                    }
                    showCursor={showCursor}
                    className="text-sm"
                  />
                </div>

                {/* Mobile version - separated with line breaks */}
                <div className="md:hidden space-y-2">
                  <TerminalPrompt
                    path="~/about"
                    command="echo"
                    className="text-sm"
                  />
                  <div className="font-mono text-sm text-foreground space-y-0">
                    <div>
                      <span>&quot;</span>
                      {TERMINAL_BIO.segments.slice(0, 1).map((segment, i) => (
                        <span key={i} className={segment.bold ? "font-bold" : ""}>
                          {segment.text}
                        </span>
                      ))}
                    </div>
                    <div>
                      {TERMINAL_BIO.segments.slice(1, 3).map((segment, i) => (
                        <span key={i + 1} className={segment.bold ? "font-bold" : ""}>
                          {segment.text}
                        </span>
                      ))}
                    </div>
                    <div>
                      {TERMINAL_BIO.segments.slice(3).map((segment, i) => (
                        <span key={i + 3} className={segment.bold ? "font-bold" : ""}>
                          {segment.text}
                        </span>
                      ))}
                      <span>&quot;</span>
                      <span className={cn("ml-1", showCursor ? "opacity-100" : "opacity-0")}>▋</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TerminalChrome>
        </TiltedCard>
      </div>
    </section>
  )
}