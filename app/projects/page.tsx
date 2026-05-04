import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { Button } from "@/components/ui/button"
import { projectIndexProjects, type ProjectCategory } from "@/lib/portfolio-content"

export const metadata: Metadata = {
  title: "Projects | Edoardo Galli",
  description: "More software, AI, and data projects by Edoardo Galli.",
}

const projectCategories = ["ai", "systems", "web"] satisfies ProjectCategory[]

export default function ProjectsPage() {
  return (
    <main className="project-shell px-6 pb-16 pt-10 md:pt-24 lg:px-8">
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <SmoothScrollLink href="/">
              <ArrowLeft className="size-3.5" />
              back
            </SmoothScrollLink>
          </Button>

          <div className="space-y-3">
            <h1 className="font-mono text-3xl font-medium tracking-normal md:text-5xl">
              projects
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              broader project index.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {projectCategories.map((category) => {
            const categoryProjects = projectIndexProjects.filter(
              (project) => project.category === category,
            )

            return (
              <section key={category} className="space-y-4">
                <h2 className="font-mono text-base font-bold underline underline-offset-4 text-muted-foreground">
                  {category}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.directory} project={project} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}
