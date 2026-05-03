"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
} from "motion/react"
import Link from "next/link"
import { SiGithub } from "react-icons/si"

import { TechBadgeList } from "@/components/tech-badge-list"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Project } from "@/lib/portfolio-content"
import { cn } from "@/lib/utils"

const maxRotation = 5
const activeLerpFactor = 0.05
const idleLerpFactor = 0.025

interface ProjectCardProps {
  project: Project
  source?: "home" | "projects"
}

export function ProjectCard({ project, source = "projects" }: ProjectCardProps) {
  const [isTouchActive, setIsTouchActive] = useState(false)
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInteracting = useRef(false)
  const current = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const target = useRef({ rotateX: 0, rotateY: 0, scale: 1 })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const sheenX = useMotionValue("50%")
  const sheenY = useMotionValue("50%")
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.08), transparent 42%)`

  useAnimationFrame(() => {
    const lerpFactor = isInteracting.current
      ? activeLerpFactor
      : idleLerpFactor

    current.current.rotateX +=
      (target.current.rotateX - current.current.rotateX) * lerpFactor
    current.current.rotateY +=
      (target.current.rotateY - current.current.rotateY) * lerpFactor
    current.current.scale +=
      (target.current.scale - current.current.scale) * lerpFactor

    rotateX.set(current.current.rotateX)
    rotateY.set(current.current.rotateY)
    scale.set(current.current.scale)
  })

  useEffect(() => {
    return () => {
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current)
      }
    }
  }, [])

  function applyTilt(element: HTMLElement, clientX: number, clientY: number) {
    const rect = element.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const offsetX = x - rect.width / 2
    const offsetY = y - rect.height / 2

    target.current.rotateX = (offsetY / (rect.height / 2)) * maxRotation
    target.current.rotateY = (offsetX / (rect.width / 2)) * -maxRotation
    target.current.scale = 1.015
    sheenX.set(`${(x / rect.width) * 100}%`)
    sheenY.set(`${(y / rect.height) * 100}%`)
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current)
    }

    if (event.pointerType === "touch") {
      setIsTouchActive(true)
    }

    isInteracting.current = true
    applyTilt(event.currentTarget, event.clientX, event.clientY)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    isInteracting.current = true
    applyTilt(event.currentTarget, event.clientX, event.clientY)
  }

  function resetTilt() {
    isInteracting.current = false
    target.current.rotateX = 0
    target.current.rotateY = 0
    target.current.scale = 1
    setIsTouchActive(false)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "touch") {
      return
    }

    resetTimeout.current = setTimeout(resetTilt, 160)
  }

  return (
    <motion.article
      style={{ rotateX, rotateY, scale, transformPerspective: 900, touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetTilt}
      onBlur={resetTilt}
      className="group h-full transform-gpu"
    >
      <Card className="relative h-full cursor-pointer gap-0 overflow-hidden border-white/10 bg-secondary/80 py-0 shadow-[0_0_0_1px_rgba(255,255,255,0.025),0_18px_60px_rgba(255,255,255,0.035)] backdrop-blur-sm transition-colors duration-200 group-hover:border-white/20 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_22px_70px_rgba(255,255,255,0.05)]">
        <Link
          href={`/projects/${project.directory}?from=${source}`}
          aria-label={`View ${project.title} project details`}
          className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
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
        <CardContent className="relative px-4 pb-4">
          <TechBadgeList tech={project.tech} />
        </CardContent>
      </Card>
    </motion.article>
  )
}
