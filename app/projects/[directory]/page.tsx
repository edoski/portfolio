import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { TechBadgeList } from "@/components/tech-badge-list"
import { TerminalCue } from "@/components/terminal-cue"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProject, projectIndexProjects } from "@/lib/portfolio-content"

interface ProjectPageProps {
  params: Promise<{
    directory: string
  }>
  searchParams: Promise<{
    from?: string
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
  searchParams,
}: ProjectPageProps) {
  const { directory } = await params
  const { from } = await searchParams
  const project = getProject(directory)

  if (!project) notFound()

  const backHref = from === "home" ? "/#projects" : "/projects"

  return (
    <main className="project-shell px-6 pb-12 pt-28 md:pb-16 md:pt-24 lg:px-8">
      <article className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-6">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <SmoothScrollLink href={backHref}>
              <ArrowLeft className="size-3.5" />
              back
            </SmoothScrollLink>
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

        <Separator className="bg-white/[0.08]" />

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

        <div className="flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
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
