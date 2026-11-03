import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { HomeSection } from "@/components/home/home-section"
import { ProjectCard } from "@/components/project-card"
import { getFeaturedProjects } from "@/lib/portfolio-content"
import {
  terminalNavLinkClassName,
  terminalNavLinkTextClassName,
} from "@/lib/terminal-nav-link"

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects()

  return (
    <HomeSection
      id="projects"
      action={
        <Link href="/projects" className={terminalNavLinkClassName}>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          <span className={terminalNavLinkTextClassName}>view more.</span>
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.directory}
            project={project}
            density="comfortable"
          />
        ))}
      </div>
    </HomeSection>
  )
}
