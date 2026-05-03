import { ProjectCard } from "@/components/project-card"
import { TerminalCue } from "@/components/terminal-cue"
import { projects } from "@/lib/portfolio-content"

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 pb-12 pt-6 md:pb-16 md:pt-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <TerminalCue path="~/projects" command="ls -la" />

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.directory} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}