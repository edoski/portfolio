"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import type { AnchorHTMLAttributes, MouseEvent } from "react"

import {
  isProjectReturnPath,
  PROJECT_RETURN_PATH_KEY,
} from "@/lib/project-return"
import { terminalNavLinkTextClassName } from "@/lib/terminal-nav-link"

export function ProjectBackLink({
  href,
  onClick,
  children = "back",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: "/projects"
}) {
  const router = useRouter()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()

    const returnPath = sessionStorage.getItem(PROJECT_RETURN_PATH_KEY)
    sessionStorage.removeItem(PROJECT_RETURN_PATH_KEY)

    router.push(isProjectReturnPath(returnPath) ? returnPath : href)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
      <span className={terminalNavLinkTextClassName}>{children}</span>
    </a>
  )
}
