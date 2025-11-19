"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import { cn } from "@/lib/utils"
import TiltedCard from "@/components/TiltedCard"

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
          scanlineIntensity={0.4}
          flickerAmount={0.6}
          glitchAmount={0}
          curvature={0.1}
          brightness={0.6}
          dither={1}
          mouseReact={true}
          mouseStrength={0.15}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
          className=""
          style={{}}
        />
      </div>
    ),
    [] // Empty deps is correct - FaultyTerminal should only mount once
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
                <TerminalPrompt path="~" command="whoami" className="text-sm" />
                <div className={cn(
                  "relative w-full h-48 md:h-64 transition-opacity duration-300",
                  showName ? "opacity-100" : "opacity-0"
                )}>
                  <ASCIITextDynamic
                    text="edo."
                    asciiFontSize={6}
                    textFontSize={200}
                    textColor="#ff9d3d"
                    planeBaseHeight={16}
                    enableWaves={false}
                  />
                </div>
              </div>

              {/* Bio text with typewriter */}
              <div className="space-y-2">
                <TerminalPrompt
                  path="~"
                  command={
                    <>
                      <span>echo &quot;an ambitious software engineer, studying </span>
                      <span className="font-bold">Computer Science</span>
                      <span> at the </span>
                      <span className="font-bold">University of Bologna</span>
                      <span>.&quot;</span>
                    </>
                  }
                  showCursor={showCursor}
                  className="text-sm"
                />
              </div>
            </div>
          </TerminalChrome>
        </TiltedCard>
      </div>
    </section>
  )
}