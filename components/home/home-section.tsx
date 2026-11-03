/**
 * HomeSection: one Portfolio Section of the home page below the hero, owning the page rhythm.
 *
 * Anatomy: `<section data-slot="home-section">` holding
 *   1. header: a `TerminalPathCue` (`~/<id>`), with an optional trailing action pushed right;
 *   2. body: the section content.
 *
 * Sizes:
 * - 96px (64px below md) from the end of the previous section's content to this cue. The
 *   space sits above each section only, so every section break is the same. Carbon spacing-10
 *   to -12, Apple HIG "consistent spacing", observed 100/80/60 on bchiang v4.
 * - 24px from the cue to the first content, cards included: the space above a header is at
 *   least twice the space below it, so the cue groups with its own content (Carbon spacing-06).
 * - The 1152px (max-w-6xl) column and 24/32px side padding of the rest of the site.
 */
import type { ReactNode } from "react"

import { TerminalPathCue } from "@/components/terminal-path-cue"

interface HomeSectionProps {
  id: string
  children: ReactNode
  action?: ReactNode
}

export function HomeSection({ id, children, action }: HomeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      data-slot="home-section"
      className="px-6 pt-16 md:pt-24 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <TerminalPathCue id={`${id}-heading`} directory={id} />
          {action && <div className="shrink-0 sm:ml-auto">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
