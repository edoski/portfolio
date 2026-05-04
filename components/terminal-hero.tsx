import { ArrowRight } from "lucide-react"

import { AsciiMark } from "@/components/ascii-mark"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { TerminalCue } from "@/components/terminal-cue"
import { education, profile } from "@/lib/portfolio-content"

export function TerminalHero() {
  return (
    <section
      id="about"
      data-ascii-pointer-region
      className="relative min-h-[76vh] px-6 pb-4 pt-8 md:min-h-[78vh] md:pb-6 md:pt-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <TerminalCue path="~" command="whoami" />

          <div className="relative h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
            <AsciiMark text={profile.asciiText} />
          </div>

          <div className="space-y-6 pt-2 font-mono">
            <div>
              <TerminalCue path="~/about" command="cat README.md" />
            </div>

            <div className="relative">
              <div className="w-full space-y-4 border-l border-foreground/35 pl-4 pr-0 font-mono text-sm leading-7 text-foreground/80 md:pl-5 md:pr-40">
                <p>focused on <strong>deep learning</strong>, <strong>AI systems</strong>, and <strong>data-intensive</strong> software. native <strong>English & Italian</strong> speaker.</p>
                <div className="space-y-2">
                  <p className="inline-block pb-0.5 font-bold lowercase leading-none text-muted-foreground">
                    education
                  </p>
                  <ul className="list-disc space-y-1.5 pl-5 pt-0.5 leading-6 marker:text-muted-foreground">
                    {education.map((item) => (
                      <li key={item.title}>
                        <span className="text-foreground/90">{item.title}</span>
                        <span className="text-muted-foreground">, </span>
                        <em className="text-muted-foreground">{item.institution}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end md:mt-0">
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