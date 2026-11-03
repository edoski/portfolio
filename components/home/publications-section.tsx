import { Fragment } from "react"

import { HomeSection } from "@/components/home/home-section"
import { TracedRuleField } from "@/components/traced-rule-field"
import type { Publication } from "@/lib/portfolio-content"
import { getPublicationsByYear, profile } from "@/lib/portfolio-content"

export function PublicationsSection() {
  const publicationGroups = getPublicationsByYear()

  return (
    <HomeSection id="publications">
      <div className="flex flex-col gap-8">
        {publicationGroups.map((group) => (
          <TracedRuleField key={group.year} label={group.year}>
            <ul className="space-y-2">
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
    </HomeSection>
  )
}

function PublicationRow({ publication }: { publication: Publication }) {
  return (
    <li className="traced-rule-row">
      <strong className="traced-rule-emphasis block">{publication.title}</strong>
      <span className="traced-rule-row-copy block">
        <span
          title={publication.venueFull}
          className="traced-rule-row-meta whitespace-nowrap"
        >
          {publication.venue}
        </span>
        <span aria-hidden="true" className="mx-2 text-muted-foreground/45">
          ·
        </span>
        {/* Each name stays whole, so a wrapped author line never strands an initial. */}
        {publication.authors.map((author, index) => (
          <Fragment key={author}>
            {index > 0 && ", "}
            {author === profile.citationName ? (
              <strong className="whitespace-nowrap font-semibold text-white">
                {author}
              </strong>
            ) : (
              <span className="whitespace-nowrap">{author}</span>
            )}
          </Fragment>
        ))}
      </span>
    </li>
  )
}
