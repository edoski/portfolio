import { Fragment } from "react"

import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleField } from "@/components/traced-rule-field"
import type { Publication } from "@/lib/portfolio-content"
import { getPublicationsByYear, profile } from "@/lib/portfolio-content"

export function PublicationsSection() {
  const publicationGroups = getPublicationsByYear()

  return (
    <section id="publications" className="px-6 pt-10 md:pt-12 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <TerminalCue path="~/publications" command="ls" />

        <div className="space-y-5 font-mono">
          {publicationGroups.map((group) => (
            <TracedRuleField key={group.year} label={group.year}>
              <ul className="space-y-3">
                {group.publications.map((publication) => (
                  <PublicationRow
                    key={publication.title}
                    publication={publication}
                  />
                ))}
              </ul>
            </TracedRuleField>
          ))}
        </div>
      </div>
    </section>
  )
}

function PublicationRow({ publication }: { publication: Publication }) {
  return (
    <li className="traced-rule-row leading-6">
      <strong className="traced-rule-emphasis block">{publication.title}</strong>
      <span className="traced-rule-row-copy block">
        <span title={publication.venueFull}>{publication.venue}</span>
        <span aria-hidden="true" className="mx-2 text-muted-foreground/45">
          ·
        </span>
        {publication.authors.map((author, index) => (
          <Fragment key={author}>
            {index > 0 && ", "}
            {author === profile.citationName ? (
              <strong className="traced-rule-emphasis">{author}</strong>
            ) : (
              author
            )}
          </Fragment>
        ))}
      </span>
    </li>
  )
}
