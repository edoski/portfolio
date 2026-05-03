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
      className="relative min-h-[76vh] px-6 pb-4 pt-20 md:min-h-[78vh] md:pb-6 md:pt-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-6">
          <TerminalCue path="~/about" command="whoami" />

          <div className="relative h-52 overflow-hidden sm:h-56 md:h-[17rem] lg:h-[19rem]">
            <AsciiMark text={profile.asciiText} />
          </div>

          <div className="space-y-8 font-mono">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TerminalCue path="~/about" command="cat README.md" />
              <SmoothScrollLink
                href="#contact"
                className="group hidden items-center gap-2 border-b border-foreground/40 pb-1 font-mono text-sm text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground sm:inline-flex"
              >
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                <span>reach out.</span>
              </SmoothScrollLink>
            </div>

            <div className="w-full space-y-6 border-l border-foreground/35 pl-4 font-mono text-sm leading-7 text-foreground/80 md:pl-5">
              <div className="space-y-2">
                <p className="inline-block font-bold border-b border-foreground/35 pb-0.5 lowercase leading-none text-muted-foreground">
                  about
                </p>
                <p className="pt-0.5">Focused on <strong>deep learning</strong>, <strong>AI systems</strong>, and <strong>data-intensive</strong> software. Native <strong>English & Italian</strong> speaker.</p>
              </div>

              <div className="space-y-2">
                <p className="inline-block font-bold border-b border-foreground/35 pb-0.5 lowercase leading-none text-muted-foreground">
                  education
                </p>
                <ul className="list-disc space-y-1.5 pt-0.5 pl-5 leading-6 marker:text-muted-foreground">
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

            <SmoothScrollLink
              href="#contact"
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 font-mono text-sm text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground sm:hidden"
            >
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              <span>reach out.</span>
            </SmoothScrollLink>
          </div>
        </div>
      </div>
    </section>
  )
}
