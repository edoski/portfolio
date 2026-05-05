import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { TerminalCue } from "@/components/terminal-cue"
import { education, profile, spokenLanguages } from "@/lib/portfolio-content"

export function TerminalHero() {
  return (
    <section
      id="about"
      data-ascii-pointer-region
      className="relative px-6 pb-4 pt-8 md:pb-5 md:pt-20 lg:px-8 xl:pt-24"
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
                <div className="relative w-full border-l border-foreground/35 pl-4 font-mono text-sm leading-7 text-foreground/80 md:pl-5">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      profile
                    </p>
                    <p className="min-w-0">
                      focused on <strong>deep learning</strong>, <strong>ai systems</strong>, and <strong>data-intensive</strong> software; studying at the <strong>university of bologna</strong>.
                    </p>
                  </div>
                </div>

                <div className="relative w-full border-l border-foreground/35 pl-4 font-mono text-sm leading-7 text-foreground/80 md:pl-5">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      education
                    </p>
                    <ul className="space-y-3 leading-6 lg:space-y-1.5">
                      {education.map((item) => (
                        <li
                          key={item.title}
                          className="grid gap-1 md:grid-cols-[22rem_1fr] md:gap-6 lg:whitespace-nowrap"
                        >
                          <span className="text-foreground/90">
                            {item.title}
                          </span>
                          <em className="not-italic text-muted-foreground">
                            {item.institution}
                          </em>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative w-full border-l border-foreground/35 pl-4 font-mono text-sm leading-7 text-foreground/80 md:pl-5">
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      languages
                    </p>
                    <ul className="space-y-3 leading-6 lg:space-y-1.5">
                      {spokenLanguages.map((item) => (
                        <li key={item.language} className="lg:whitespace-nowrap">
                          <span className="text-foreground/90">
                            {item.language}
                          </span>
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
                </div>
              </div>

              <div className="flex justify-end pt-4 md:absolute md:bottom-0 md:right-0 md:pt-0">
                <SmoothScrollLink
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-foreground/[0.03] px-3 py-2 font-mono text-sm text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] hover:text-foreground"
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
