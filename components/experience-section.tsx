import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleField } from "@/components/traced-rule-field"
import type { TimelineEntry } from "@/lib/portfolio-content"
import { education, experience } from "@/lib/portfolio-content"

const timelineGroups = [
  { label: "work", entries: experience },
  { label: "education", entries: education },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 pt-8 md:pt-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <TerminalCue path="~/experience" command="git log" />

        <div className="space-y-5 font-mono">
          {timelineGroups.map((group) => (
            <TracedRuleField key={group.label} label={group.label}>
              <ul className="space-y-3 leading-6 lg:space-y-1.5">
                {group.entries.map((entry) => (
                  <TimelineRow key={entry.title} entry={entry} />
                ))}
              </ul>
            </TracedRuleField>
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <li className="traced-rule-row grid gap-x-6 gap-y-0.5 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[24rem_minmax(0,1fr)_auto] lg:whitespace-nowrap">
      <strong className="traced-rule-emphasis order-1">{entry.title}</strong>
      <span className="traced-rule-row-copy order-2 md:order-3 md:col-span-2 lg:order-2 lg:col-span-1">
        {entry.organization}
        {entry.note && <> · {entry.note}</>}
      </span>
      <span className="traced-rule-row-meta order-3 md:order-2 md:whitespace-nowrap md:text-right lg:order-3">
        {entry.period}
      </span>
    </li>
  )
}
