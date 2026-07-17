import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { TerminalActionLink } from "@/components/terminal-action-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import { TracedRuleText } from "@/components/traced-rule-text"
import { education, profile } from "@/lib/portfolio-content"
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
        <div>
          <TerminalCue className="relative z-10" path="~" command="whoami" />

          <div className="relative -mt-10 h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
            <AsciiMark text={profile.asciiText} />
          </div>

          <div className="space-y-6 font-mono">
            <div>
              <TerminalCue path="~/about" command="cat README.md" />
            </div>

            <div className="space-y-5">
              <TracedRuleBlock className="font-mono text-sm leading-7">
                <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                  <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
                    profile
                  </p>
                  <p className="min-w-0">
                    <TracedRuleText segments={profile.summary} />
                  </p>
                </div>
              </TracedRuleBlock>

              <TracedRuleBlock className="font-mono text-sm leading-7">
                <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                  <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
                    education
                  </p>
                  <ul className="space-y-3 leading-6 lg:space-y-1.5">
                    {education.map((item) => (
                      <li
                        key={item.title}
                        className="traced-rule-row grid gap-1 md:grid-cols-[22rem_1fr] md:gap-6 lg:grid-cols-[24rem_1fr] lg:whitespace-nowrap"
                      >
                        <strong className="traced-rule-emphasis">
                          {item.title}
                        </strong>
                        <em className="traced-rule-row-copy not-italic">
                          {item.institution}
                        </em>
                      </li>
                    ))}
                  </ul>
                </div>
              </TracedRuleBlock>

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
      </div>
    </section>
  )
}
