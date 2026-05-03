"use client"

import { ArrowRight, ExternalLink } from "lucide-react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react"
import Link from "next/link"
import { SiGithub } from "react-icons/si"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Project } from "@/lib/portfolio-content"

const spring = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)
  const scale = useSpring(1, spring)
  const sheenX = useMotionValue("50%")
  const sheenY = useMotionValue("50%")
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.08), transparent 42%)`

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const offsetX = x - rect.width / 2
    const offsetY = y - rect.height / 2

    rotateX.set((offsetY / (rect.height / 2)) * 5)
    rotateY.set((offsetX / (rect.width / 2)) * -5)
    scale.set(1.015)
    sheenX.set(`${(x / rect.width) * 100}%`)
    sheenY.set(`${(y / rect.height) * 100}%`)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <motion.article
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
      className="group h-full transform-gpu"
    >
      <Card className="relative h-full gap-0 overflow-hidden border-white/10 bg-secondary/80 py-0 shadow-[0_0_0_1px_rgba(255,255,255,0.025),0_18px_60px_rgba(255,255,255,0.035)] backdrop-blur-sm transition-colors duration-200 group-hover:border-white/20 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_22px_70px_rgba(255,255,255,0.05)]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: sheen }}
        />
        <Link
          href={`/projects/${project.directory}`}
          className="peer absolute inset-0 z-10"
          aria-label={`${project.title} details`}
        />
        <CardHeader className="relative gap-3 p-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="min-w-0 break-words font-mono text-base leading-6 text-foreground">
              {project.title}
            </CardTitle>
            <div className="relative z-20 flex shrink-0 items-center gap-1.5">
              {project.demo && (
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
              )}
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
            </div>
          </div>
          <p className="min-h-10 text-sm leading-5 text-muted-foreground">
            {project.summary}
          </p>
        </CardHeader>
        <CardContent className="relative flex-1 px-4 pb-3">
          <div className="flex min-h-12 flex-wrap content-start gap-1.5">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-md border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <div className="relative z-20 mt-auto p-4 pt-0">
          <Link
            href={`/projects/${project.directory}`}
            className="group/details inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground/85 focus-visible:text-foreground/85"
          >
            <ArrowRight className="size-4 transition-transform group-hover/details:translate-x-1 group-focus-visible/details:translate-x-1" />
            <span>details.</span>
          </Link>
        </div>
      </Card>
    </motion.article>
  )
}
