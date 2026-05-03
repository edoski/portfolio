import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { TerminalCue } from "@/components/terminal-cue"
import { profile } from "@/lib/portfolio-content"

export function TerminalHero() {
  return (
    <section
      id="about"
      data-ascii-pointer-region
      className="relative min-h-[76vh] px-6 pb-4 pt-20 md:min-h-[78vh] md:pb-6 md:pt-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-6">
          <TerminalCue path="~/about" command="whoami" />

          <div className="relative h-48 overflow-hidden sm:h-60 md:h-72 lg:h-80">
            <AsciiMark text={profile.asciiText} />
          </div>

          <div className="space-y-8 font-mono">
            <TerminalCue path="~/about" command="cat README.md" />

            <div className="w-full border-l border-foreground/35 pl-4 font-mono text-sm leading-7 text-foreground/80 md:pl-5">
              {profile.userFile.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground"
            >
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              <span>reach out.</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
