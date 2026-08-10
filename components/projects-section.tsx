import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { TerminalCue } from "@/components/terminal-cue"
import { getFeaturedProjects } from "@/lib/portfolio-content"
import {
  terminalNavLinkClassName,
  terminalNavLinkTextClassName,
} from "@/lib/terminal-nav-link"

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="projects" className="px-6 pb-0 pt-6 md:pt-4 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <TerminalCue path="~/projects" command="ls --featured" />
          <Link
            href="/projects"
            className={`${terminalNavLinkClassName} ml-auto shrink-0`}
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            <span className={terminalNavLinkTextClassName}>view more.</span>
          </Link>
        </div>

        <div className="grid gap-4 pt-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.directory} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
