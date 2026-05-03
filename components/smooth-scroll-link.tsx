"use client"

import { useEffect } from "react"
import type { AnchorHTMLAttributes, MouseEvent } from "react"
import { usePathname, useRouter } from "next/navigation"

const NAV_OFFSET = 80
const PENDING_HASH_KEY = "portfolio:pending-scroll-hash"

function splitHashHref(href: string) {
  const hashIndex = href.indexOf("#")

  if (hashIndex === -1) {
    return null
  }

  return {
    path: href.slice(0, hashIndex) || window.location.pathname,
    hash: href.slice(hashIndex),
  }
}

function getScrollTarget(hash: string) {
  if (hash === "" || hash === "#") {
    return 0
  }

  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) {
    return null
  }

  return target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
}

export function SmoothScrollLink({
  href,
  onClick,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}) {
  const router = useRouter()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    const target = splitHashHref(href)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      !target
    ) {
      return
    }

    if (target.path !== window.location.pathname) {
      event.preventDefault()
      sessionStorage.setItem(PENDING_HASH_KEY, target.hash)
      router.push(target.path)
      return
    }

    const top = getScrollTarget(target.hash)
    if (top === null) {
      return
    }

    event.preventDefault()
    window.scrollTo({ top, behavior: "smooth" })

    const hash = target.hash === "#" ? window.location.pathname : target.hash
    window.history.pushState(null, "", hash)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export function HashScrollRestorer() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = sessionStorage.getItem(PENDING_HASH_KEY)
    if (!hash) {
      return
    }

    sessionStorage.removeItem(PENDING_HASH_KEY)

    requestAnimationFrame(() => {
      const top = getScrollTarget(hash)
      if (top === null) {
        return
      }

      window.scrollTo({ top, behavior: "smooth" })
      window.history.replaceState(null, "", hash)
    })
  }, [pathname])

  return null
}
