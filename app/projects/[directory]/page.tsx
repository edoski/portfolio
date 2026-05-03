import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { TerminalCue } from "@/components/terminal-cue"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProject, projects } from "@/lib/portfolio-content"

interface ProjectPageProps {
  params: Promise<{
    directory: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { directory } = await params
  const project = getProject(directory)

  if (!project) notFound()

  return (
    <main className="project-shell site-shell min-h-screen bg-background px-6 pb-16 pt-28 text-foreground lg:px-8">
      <div className="site-shell-noise" aria-hidden="true" />
      <article className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-6">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href="/#projects">
              <ArrowLeft className="size-3.5" />
              projects
            </Link>
          </Button>

          <div className="space-y-4">
            <TerminalCue
              path={`~/projects/${project.directory}`}
              command="cat README.md"
            />
            <div className="space-y-3">
              <h1 className="font-mono text-3xl font-medium tracking-normal md:text-5xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {project.details}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-md border-white/10 bg-white/[0.03] font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
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
