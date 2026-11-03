import { HomeSection } from "@/components/home/home-section"
import { TracedRuleField } from "@/components/traced-rule-field"
import type { TimelineEntry } from "@/lib/portfolio-content"
import { education, experience } from "@/lib/portfolio-content"

const timelineGroups = [
  { label: "work", entries: experience },
  { label: "education", entries: education },
]

export function ExperienceSection() {
  return (
    <HomeSection id="experience">
      <div className="flex flex-col gap-8">
        {timelineGroups.map((group) => (
          <TracedRuleField key={group.label} label={group.label}>
            <ul className="space-y-2">
              {group.entries.map((entry) => (
                <TimelineRow key={entry.title} entry={entry} />
              ))}
            </ul>
          </TracedRuleField>
        ))}
      </div>
    </HomeSection>
  )
}

function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <li className="traced-rule-row grid gap-1 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-x-6 lg:gap-y-0">
      <strong className="traced-rule-emphasis">{entry.title}</strong>
      <span className="traced-rule-row-meta">{entry.organization}</span>
    </li>
  )
}
