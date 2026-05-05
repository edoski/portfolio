import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { ProjectBackLink } from "@/components/project-back-link"
import { TechBadgeList } from "@/components/tech-badge-list"
import { Button } from "@/components/ui/button"
import { getProject, projectIndexProjects } from "@/lib/portfolio-content"

interface ProjectPageProps {
  params: Promise<{
    directory: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return projectIndexProjects.map((project) => ({
    directory: project.directory,
  }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { directory } = await params
  const project = getProject(directory)

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

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { directory } = await params
  const project = getProject(directory)

  if (!project) notFound()

  return (
    <main className="project-shell px-6 pb-12 pt-10 md:pb-16 md:pt-24 lg:px-8">
      <article className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-7">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <ProjectBackLink href="/projects" />
          </Button>

          <div className="space-y-6">
            <h1 className="break-words font-mono text-3xl font-medium tracking-normal md:text-5xl">
              {project.title}
            </h1>
            <div className="space-y-5">
              <p className="max-w-3xl text-lg leading-8 text-foreground/85">
                {project.detail.tagline}
              </p>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                {project.summary}
              </p>
            </div>
          </div>
        </header>

        <div aria-hidden="true" className="h-px w-full bg-foreground/15" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="space-y-10">
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
          </div>

          <aside className="space-y-8 lg:border-l lg:border-foreground/15 lg:pl-6">
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
          </aside>
        </div>
      </article>
    </main>
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
