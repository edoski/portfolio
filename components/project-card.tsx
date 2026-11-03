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
import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

/**
 * Density of the card's anatomy.
 *
 * - `compact`: 16px padding, 16/600 title, 14px action icons, bold category, 11px badges. The
 *   whole card is a `role="link"` tab stop.
 * - `comfortable`: 20px padding with 12px between header, summary and badges (shadcn card
 *   pads 24, scaled down for a two-up grid). The badges sit on the card's bottom edge instead
 *   of the summary reserving a second line, so they still align across a row when one
 *   summary wraps. A 14/600 title centred on the 32px icon buttons, which carry 16px icons
 *   (shadcn `size-8` button with a `size-4` icon). Category and badges at 12/400, so the card
 *   uses only the page's four type styles.
 *   The title link is the card's one tab stop and the card draws its focus ring when that link
 *   is keyboard-focused (Inclusive Components "Cards"); a click anywhere else on the card still
 *   opens it. The icon buttons stay 32px but take 44px of touch on coarse pointers (Apple HIG
 *   44pt, Vercel "expand hit targets"). The summary wraps with `text-pretty` where it can't
 *   hold one line.
 */
const projectCardDensities = {
  compact: {
    wholeCardLink: true,
    surface: "group-focus-visible:ring-2 group-focus-visible:ring-foreground/50 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
    header: "p-4 pb-3",
    titleRow: "items-start",
    title: "text-base",
    titleFocus: "group-focus-visible:text-foreground",
    titleLink: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100",
    actionClip: "wrapper",
    action: "",
    icon: "size-3.5",
    category: "font-bold",
    summary: "min-h-10",
    content: "px-4 pb-4",
    badgeSize: "sm",
  },
  comfortable: {
    wholeCardLink: false,
    surface: "ring-offset-background has-[[data-slot=project-card-link]:focus-visible]:ring-2 has-[[data-slot=project-card-link]:focus-visible]:ring-foreground/50 has-[[data-slot=project-card-link]:focus-visible]:ring-offset-2",
    header: "p-5 pb-3",
    titleRow: "items-center",
    title: "text-sm",
    titleFocus: "group-has-[[data-slot=project-card-link]:focus-visible]:text-foreground",
    titleLink: "focus-visible:outline-hidden group-hover:after:scale-x-100 focus-visible:after:scale-x-100",
    actionClip: "sheen",
    action: "relative pointer-coarse:after:absolute pointer-coarse:after:-inset-1.5",
    icon: "size-4",
    category: "",
    summary: "text-pretty",
    content: "mt-auto px-5 pb-5",
    badgeSize: "md",
  },
} as const

interface ProjectCardProps {
  project: Project
  density?: keyof typeof projectCardDensities
}

export function ProjectCard({ project, density = "compact" }: ProjectCardProps) {
  const slots = projectCardDensities[density]
  const router = useRouter()
  const {
    style,
    edgeTracer,
    isTouchActive,
    tiltHandlers,
  } = usePointerTiltPreset("projectCard")
  const detailsHref = `/projects/${project.directory}`

  function isProjectAction(target: EventTarget) {
    return target instanceof Element && Boolean(target.closest("a, button"))
  }

  function endsTextSelection() {
    const selection = window.getSelection()
    return selection !== null && !selection.isCollapsed && selection.toString().trim() !== ""
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

    if (!slots.wholeCardLink && endsTextSelection()) {
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

  const wholeCardLinkProps = slots.wholeCardLink
    ? {
        role: "link",
        tabIndex: 0,
        "aria-label": `View ${project.title} project details`,
        onKeyDown: handleKeyDown,
      }
    : {}

  return (
    <motion.article
      {...wholeCardLinkProps}
      style={
        {
          ...style,
          "--project-card-edge-tracer": edgeTracer,
        } as React.ComponentProps<typeof motion.article>["style"]
      }
      {...tiltHandlers}
      onClick={handleClick}
      className="group relative h-full transform-gpu"
    >
      <Card
        data-touch-active={isTouchActive}
        className={cn("project-card-surface relative h-full cursor-pointer gap-0 overflow-hidden border-transparent py-0 shadow-none backdrop-blur-sm", slots.surface)}
      >
        <CardHeader className={cn("relative gap-3", slots.header)}>
          <div className={cn("flex", slots.titleRow, "justify-between gap-3")}>
            <CardTitle className={cn("min-w-0 break-words font-mono", slots.title, "leading-6 text-foreground/90 transition-colors duration-200 group-hover:text-foreground", slots.titleFocus)}>
              <Link
                href={detailsHref}
                onClick={rememberReturnPath}
                data-slot="project-card-link"
                className={cn("relative z-20 inline rounded-sm after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 hover:after:scale-x-100", slots.titleLink)}
              >
                {project.title}
              </Link>
            </CardTitle>
            <div className="relative z-20 flex shrink-0 items-center gap-1.5">
              {project.demo && (
                <TiltIconAction clip={slots.actionClip}>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className={cn("size-8 border-white/10 bg-white/[0.04] text-muted-foreground shadow-none hover:border-white/20 hover:bg-white/[0.04] hover:text-foreground dark:hover:bg-white/[0.04]", slots.action)}
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className={slots.icon} />
                    </a>
                  </Button>
                </TiltIconAction>
              )}
              <TiltIconAction clip={slots.actionClip}>
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className={cn("size-8 border-white/10 bg-white/[0.04] text-muted-foreground shadow-none hover:border-white/20 hover:bg-white/[0.04] hover:text-foreground dark:hover:bg-white/[0.04]", slots.action)}
                >
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository`}
                  >
                    <SiGithub className={slots.icon} />
                  </a>
                </Button>
              </TiltIconAction>
            </div>
          </div>
          <p className={cn(slots.summary, "text-sm leading-5 text-muted-foreground")}>
            <span className={cn("font-mono text-xs", slots.category, "lowercase text-muted-foreground")}>
              {project.category}
            </span>
            <span className="mx-2 text-muted-foreground/45">|</span>
            <span>{project.summary}</span>
          </p>
        </CardHeader>
        <CardContent className={cn("relative", slots.content)}>
          <TechBadgeList tech={project.tech} badgeSize={slots.badgeSize} />
        </CardContent>
      </Card>
    </motion.article>
  )
}
