"use client"

import { motion } from "motion/react"

import type { PortfolioLink } from "@/lib/portfolio-content"
import {
  getAccessibleLinkLabel,
  getContactDisplayLabel,
  getExternalAnchorProps,
  linkKindIcons,
} from "@/lib/link-presentation"
import { usePointerTiltPreset } from "@/lib/use-pointer-tilt"
import { cn } from "@/lib/utils"

interface ContactLinkProps {
  link: PortfolioLink
}

export function ContactLink({ link }: ContactLinkProps) {
  const Icon = linkKindIcons[link.kind]
  const label = getContactDisplayLabel(link)
  const accessibleLabel = getAccessibleLinkLabel(link)
  const { style, sheen, isTouchActive, tiltHandlers } =
    usePointerTiltPreset("contactLink")

  return (
    <motion.a
      href={link.href}
      {...getExternalAnchorProps(link)}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      style={style}
      {...tiltHandlers}
      className="group relative inline-flex min-w-0 transform-gpu items-center justify-center gap-2.5 rounded-md py-0.5 font-mono text-sm leading-6 text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-base"
    >
      <motion.span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-x-20 -inset-y-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
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
      <Icon className="relative size-4 shrink-0 transition-colors group-hover:text-foreground" />
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
