import type { Metadata } from "next"
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
    <main className="project-shell px-6 pb-12 pt-28 md:pb-16 md:pt-24 lg:px-8">
      <article className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-6">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <ProjectBackLink href="/projects" />
          </Button>

          <div className="space-y-4">
            <div className="space-y-6">
              <h1 className="font-mono text-3xl font-medium tracking-normal md:text-5xl">
                {project.title}
              </h1>
              <p className="text-base leading-7 text-muted-foreground">
                {project.details}
              </p>
            </div>
          </div>

          <TechBadgeList tech={project.tech} />
        </div>

        <div aria-hidden="true" className="h-0.5 w-full bg-foreground/15" />

        <div className="grid gap-8 md:grid-cols-2">
          <section className="space-y-4">
            <h2 className="font-mono text-sm text-foreground">focus</h2>
            <div className="space-y-3">
              {project.focus.map((item) => (
                <p key={item} className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-mono text-sm text-foreground">outcomes</h2>
            <div className="space-y-3">
              {project.outcomes.map((item) => (
                <p key={item} className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-wrap gap-3 border-t-2 border-foreground/15 pt-6">
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
      </article>
    </main>
  )
}
