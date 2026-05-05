import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { TerminalCue } from "@/components/terminal-cue"
import { getFeaturedProjects } from "@/lib/portfolio-content"

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects()

  return (
    <section id="projects" className="px-6 pb-0 pt-6 md:pt-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <TerminalCue path="~/projects" command="ls" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.directory} project={project} />
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-foreground/[0.03] px-3 py-2 font-mono text-sm text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            <span>view more.</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
