import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { TerminalActionLink } from "@/components/terminal-action-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TerminalPathCue } from "@/components/terminal-path-cue"
import { TracedRuleField } from "@/components/traced-rule-field"
import { TracedRuleText } from "@/components/traced-rule-text"
import { profile } from "@/lib/portfolio-content"
import { terminalActionLinkClassName } from "@/lib/terminal-action-link"
import { cn } from "@/lib/utils"

export function TerminalHero() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      data-ascii-pointer-region
      className="relative px-6 pt-10 md:pt-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="sr-only">{profile.name}</h1>
        <TerminalCue
          className="relative z-10"
          path="~"
          command="whoami"
        />

        <div className="relative -mt-10 h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
          <AsciiMark text={profile.asciiText} />
        </div>

        <div className="flex flex-col gap-6">
          <TerminalPathCue id="about-heading" directory="about" />

          <div className="flex flex-col items-start gap-8">
            <TracedRuleField label="focus">
              <p>
                <TracedRuleText segments={profile.summary} />
              </p>
            </TracedRuleField>

            <TracedRuleField label="now">
              <p>
                <TracedRuleText segments={profile.now} />
              </p>
            </TracedRuleField>

            <TerminalActionLink
              href="#contact"
              className={cn(terminalActionLinkClassName, "px-3 py-2")}
            >
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              <span>reach out.</span>
            </TerminalActionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
