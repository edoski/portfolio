import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { ProjectCard } from "@/components/project-card"
import { TerminalCue } from "@/components/terminal-cue"
import { getFeaturedProjects } from "@/lib/portfolio-content"
import { terminalActionLinkClassName } from "@/lib/terminal-action-link"
import { cn } from "@/lib/utils"

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
            className={cn(terminalActionLinkClassName, "px-3 py-2")}
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            <span>view more.</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
