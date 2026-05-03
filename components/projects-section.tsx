import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { TerminalCue } from "@/components/terminal-cue"
import { featuredProjects } from "@/lib/portfolio-content"

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 pb-0 pt-6 md:pt-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TerminalCue path="~/projects" command="ls" />
          <Link
            href="/projects"
            className="group hidden items-center gap-2 border-b border-foreground/40 pb-1 font-mono text-sm text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground sm:inline-flex"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            <span>view more.</span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.directory} project={project} source="home" />
          ))}
        </div>

        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 font-mono text-sm text-foreground transition-colors hover:border-muted-foreground hover:text-muted-foreground sm:hidden"
        >
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          <span>view more.</span>
        </Link>
      </div>
    </section>
  )
}
