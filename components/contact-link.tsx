"use client"

import { FileText, Mail } from "lucide-react"
import { motion } from "motion/react"
import { FaLinkedin } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"

import type { PortfolioLink } from "@/lib/portfolio-content"
import { usePointerTilt } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

const contactIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  resume: FileText,
  email: Mail,
}

interface ContactLinkProps {
  link: PortfolioLink
}

export function ContactLink({ link }: ContactLinkProps) {
  const Icon = contactIcons[link.kind]
  const label = link.label.toLowerCase()
  const { rotateX, rotateY, scale, sheen, isTouchActive, tiltHandlers } =
    usePointerTilt({
      maxRotation: 7,
      activeScale: 1.04,
      sheenOpacity: 0.095,
      sheenSize: 220,
      sheenOutsetX: 128,
      sheenOutsetY: 80,
    })

  return (
    <motion.a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      aria-label={link.label}
      title={link.label}
      style={{ rotateX, rotateY, scale, transformPerspective: 700, touchAction: "pan-y" }}
      {...tiltHandlers}
      className="group relative flex min-w-0 transform-gpu items-center justify-center gap-3 rounded-md py-3 font-mono text-base leading-7 text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-lg"
    >
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-x-32 -inset-y-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          isTouchActive && "opacity-100",
        )}
        style={{ background: sheen }}
      />
      <span
        aria-hidden="true"
        className="relative text-muted-foreground/55 transition-colors group-hover:text-foreground/80"
      >
        [
      </span>
      <Icon className="relative size-5 shrink-0 transition-colors group-hover:text-foreground" />
      <span className="relative">{label}</span>
      <span
        aria-hidden="true"
        className="relative text-muted-foreground/55 transition-colors group-hover:text-foreground/80"
      >
        ]
      </span>
    </motion.a>
  )
}
