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

const TextType = dynamic(
  () => import("@/components/TextType"),
  { ssr: false }
)

export function TerminalHero() {
  const [showName, setShowName] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Convert TERMINAL_BIO segments to a single string
  const bioText = useMemo(() =>
    TERMINAL_BIO.segments.map(segment => segment.text).join(''),
    []
  )

  // ASCII art name animation
  useEffect(() => {
    const nameTimer = setTimeout(() => {
      setShowName(true)
    }, 300)

    return () => clearTimeout(nameTimer)
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

      <div className="max-w-6xl mx-auto w-full space-y-8 relative z-10">
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
              <div className="pt-4 border-t border-border/30">
                {/* Desktop version - inline with cursor */}
                <div className="hidden md:block">
                  <TerminalPrompt
                    path="~/about"
                    command={
                      <>
                        <TextType
                          text={`echo ${bioText}`}
                          as="span"
                          loop={false}
                          showCursor={true}
                          variableSpeed={{ min: 30, max: 60 }}
                          className="inline"
                          cursorCharacter={"▋"}
                        />
                      </>
                    }
                    showCursor={false}
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
                  <div className="font-mono text-sm text-foreground">
                    <TextType
                      text={bioText}
                      as="span"
                      loop={false}
                      showCursor={true}
                      variableSpeed={{ min: 50, max: 75 }}
                      className="inline"
                    />
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