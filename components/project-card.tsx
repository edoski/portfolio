"use client"

import { ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiGithub } from "react-icons/si"

import { TechBadgeList } from "@/components/tech-badge-list"
import { TiltIconAction } from "@/components/tilt-icon-action"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Project } from "@/lib/portfolio-content"
import { PROJECT_RETURN_PATH_KEY } from "@/lib/project-return"
import { usePointerTilt } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const { rotateX, rotateY, scale, sheen, isTouchActive, tiltHandlers } =
    usePointerTilt()
  const detailsHref = `/projects/${project.directory}`

  function isProjectAction(target: EventTarget) {
    return target instanceof Element && Boolean(target.closest("a, button"))
  }

  function rememberReturnPath() {
    sessionStorage.setItem(PROJECT_RETURN_PATH_KEY, window.location.pathname)
  }

  function openDetails() {
    rememberReturnPath()
    router.push(detailsHref)
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (isProjectAction(event.target)) {
      return
    }

    openDetails()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (isProjectAction(event.target)) {
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openDetails()
    }
  }

  return (
    <motion.article
      role="link"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      style={{ rotateX, rotateY, scale, transformPerspective: 900, touchAction: "pan-y" }}
      {...tiltHandlers}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group h-full transform-gpu"
    >
      <Card className="relative h-full cursor-pointer gap-0 overflow-hidden border-white/10 bg-secondary/80 py-0 shadow-[0_0_0_1px_rgba(255,255,255,0.025),0_18px_50px_rgba(255,255,255,0.028),0_0_48px_rgba(255,255,255,0.01)] backdrop-blur-sm transition-colors duration-200 group-hover:border-white/20 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.035),0_22px_58px_rgba(255,255,255,0.04),0_0_56px_rgba(255,255,255,0.016)] group-focus-visible:ring-2 group-focus-visible:ring-foreground/50 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
        <motion.div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            isTouchActive && "opacity-100",
          )}
          style={{ background: sheen }}
        />
        <CardHeader className="relative gap-3 p-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="min-w-0 break-words font-mono text-base leading-6 text-foreground/90 transition-colors duration-200 group-hover:text-foreground group-focus-visible:text-foreground">
              <Link
                href={detailsHref}
                onClick={rememberReturnPath}
                className="relative z-20 inline rounded-sm after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100"
              >
                {project.title}
              </Link>
            </CardTitle>
            <div className="relative z-20 flex shrink-0 items-center gap-1.5">
              {project.demo && (
                <TiltIconAction>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="size-8 border-white/10 bg-white/[0.04] text-muted-foreground shadow-none hover:bg-white/[0.07] hover:text-foreground"
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </Button>
                </TiltIconAction>
              )}
              <TiltIconAction>
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="size-8 border-white/10 bg-white/[0.04] text-muted-foreground shadow-none hover:bg-white/[0.07] hover:text-foreground"
                >
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository`}
                  >
                    <SiGithub className="size-3.5" />
                  </a>
                </Button>
              </TiltIconAction>
            </div>
          </div>
          <p className="min-h-10 text-sm leading-5 text-muted-foreground">
            {project.summary}
          </p>
        </CardHeader>
        <CardContent className="relative px-4 pb-4">
          <TechBadgeList tech={project.tech} />
        </CardContent>
      </Card>
    </motion.article>
  )
}
