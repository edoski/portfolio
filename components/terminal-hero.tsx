import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import { education, profile, spokenLanguages } from "@/lib/portfolio-content"
import { terminalActionLinkClassName } from "@/lib/terminal-action-link"
import { cn } from "@/lib/utils"

export function TerminalHero() {
  return (
    <section
      id="about"
      data-ascii-pointer-region
      className="relative px-6 pb-3 pt-6 md:pb-4 md:pt-16 lg:px-8 xl:pt-20"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <TerminalCue path="~" command="whoami" />

          <div className="relative -mt-4 h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
            <AsciiMark text={profile.asciiText} />
          </div>

          <div className="space-y-6 pt-2 font-mono">
            <div>
              <TerminalCue path="~/about" command="cat README.md" />
            </div>

            <div className="relative">
              <div className="space-y-5">
                <TracedRuleBlock className="font-mono text-sm leading-7 text-foreground/80">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      profile
                    </p>
                    <p className="min-w-0 [&_strong]:font-semibold [&_strong]:text-foreground/90">
                      focused on <strong>deep learning</strong>, <strong>ai systems</strong>, and <strong>data-intensive</strong> software; studying at the <strong>university of bologna</strong>.
                    </p>
                  </div>
                </TracedRuleBlock>

                <TracedRuleBlock className="font-mono text-sm leading-7 text-foreground/80">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      education
                    </p>
                    <ul className="space-y-3 leading-6 lg:space-y-1.5">
                      {education.map((item) => (
                        <li
                          key={item.title}
                          className="grid gap-1 md:grid-cols-[22rem_1fr] md:gap-6 lg:grid-cols-[24rem_1fr] lg:whitespace-nowrap"
                        >
                          <strong className="font-semibold text-foreground/90">
                            {item.title}
                          </strong>
                          <em className="not-italic text-muted-foreground">
                            {item.institution}
                          </em>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TracedRuleBlock>

                <TracedRuleBlock className="font-mono text-sm leading-7 text-foreground/80">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      languages
                    </p>
                    <ul className="space-y-3 leading-6 lg:space-y-1.5">
                      {spokenLanguages.map((item) => (
                        <li key={item.language} className="lg:whitespace-nowrap">
                          <strong className="font-semibold text-foreground/90">
                            {item.language}
                          </strong>
                          <span className="text-muted-foreground">, </span>
                          <span className="text-muted-foreground">
                            {item.level}
                            {"credential" in item && item.credential
                              ? `, ${item.credential}`
                              : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TracedRuleBlock>
              </div>

              <div className="flex justify-end pt-4 md:absolute md:bottom-0 md:right-0 md:pt-0">
                <SmoothScrollLink
                  href="#contact"
                  className={cn(terminalActionLinkClassName, "px-3 py-2")}
                >
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  <span>reach out.</span>
                </SmoothScrollLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
