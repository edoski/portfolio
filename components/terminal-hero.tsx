import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { TerminalActionLink } from "@/components/terminal-action-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleField } from "@/components/traced-rule-field"
import { TracedRuleText } from "@/components/traced-rule-text"
import { profile } from "@/lib/portfolio-content"
import { terminalActionLinkClassName } from "@/lib/terminal-action-link"
import { cn } from "@/lib/utils"

export function TerminalHero() {
  return (
    <section
      id="about"
      data-ascii-pointer-region
      className="relative px-6 pb-0 pt-10 md:pt-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <TerminalCue className="relative z-10" path="~" command="whoami" />

        <div className="relative -mt-10 h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
          <AsciiMark text={profile.asciiText} />
        </div>

        <div className="space-y-6 font-mono">
          <TerminalCue path="~/about" command="cat README.md" />

          <div className="space-y-5">
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
          </div>

          <div className="flex justify-start py-4">
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
