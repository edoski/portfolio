import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProjectDetailMetadata,
  ProjectDetailActions,
  ProjectDetailMainSections,
  ProjectDetailSidebarSections,
} from "@/app/projects/[directory]/project-detail-presentation"
import { ProjectBackLink } from "@/components/project-back-link"
import { Button } from "@/components/ui/button"
import { getProject, getProjectDirectories } from "@/lib/portfolio-content"

interface ProjectPageProps {
  params: Promise<{
    directory: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getProjectDirectories().map((directory) => ({
    directory,
  }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { directory } = await params
  const project = getProject(directory)

  return getProjectDetailMetadata(project)
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
            <ProjectDetailMainSections project={project} />
          </div>

          <aside className="space-y-8 lg:border-l lg:border-foreground/15 lg:pl-6">
            <ProjectDetailSidebarSections project={project} />
            <ProjectDetailActions project={project} />
          </aside>
        </div>
      </article>
    </main>
  )
}
