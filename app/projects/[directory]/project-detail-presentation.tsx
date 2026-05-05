import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { TechBadgeList } from "@/components/tech-badge-list"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/portfolio-content"

export function getProjectDetailMetadata(project: Project | undefined): Metadata {
  if (!project) {
    return {
      title: "Project not found | Edoardo Galli",
    }
  }

  return {
    title: `${project.title} | Edoardo Galli`,
    description: project.summary,
  }
}

export function ProjectDetailMainSections({ project }: { project: Project }) {
  return (
    <>
      <ProjectSection title="// overview">
        {project.detail.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProjectSection>

      <ProjectSection title="// how it works">
        {project.detail.implementation.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProjectSection>

      <ProjectSection title="// capabilities">
        <div className="grid gap-5 sm:grid-cols-2">
          {project.detail.capabilities.map((capability) => (
            <section key={capability.title} className="space-y-2">
              <h3 className="font-mono text-sm text-foreground">
                {capability.title}
              </h3>
              <p>{capability.description}</p>
            </section>
          ))}
        </div>
      </ProjectSection>
    </>
  )
}

export function ProjectDetailSidebarSections({ project }: { project: Project }) {
  return (
    <>
      <ProjectSection title="// stack">
        <TechBadgeList tech={project.tech} />
      </ProjectSection>

      <ProjectSection title="// status">
        <p>{project.detail.status}</p>
      </ProjectSection>

      {project.detail.artifacts && (
        <ProjectSection title="// artifacts">
          <ul className="space-y-2">
            {project.detail.artifacts.map((artifact) => (
              <li key={artifact}>{artifact}</li>
            ))}
          </ul>
        </ProjectSection>
      )}
    </>
  )
}

export function ProjectDetailActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3 border-t border-foreground/15 pt-6">
      <Button asChild variant="outline" size="sm">
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          <SiGithub className="size-3.5" />
          repository
        </a>
      </Button>
      {project.demo && (
        <Button asChild variant="secondary" size="sm">
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-3.5" />
            live demo
          </a>
        </Button>
      )}
    </div>
  )
}

interface ProjectSectionProps {
  title: string
  children: ReactNode
}

function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-sm text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </section>
  )
}
