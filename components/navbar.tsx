import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { contactLinks, navigation } from "@/lib/portfolio-content"
import {
  getAccessibleLinkLabel,
  getExternalAnchorProps,
  getNavbarSocialLinks,
  linkKindIcons,
} from "@/lib/link-presentation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const socialLinks = getNavbarSocialLinks(contactLinks)
  const mobileLinkClassName =
    "flex-1 rounded-md border border-white/10 px-1.5 py-1 text-center font-mono text-xs text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  const desktopLinkClassName =
    "rounded-md border border-white/10 px-3 py-1 font-mono text-sm text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

  return (
    <nav className="inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 px-3 backdrop-blur-xl md:fixed md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 py-3 md:gap-4">
        <div className="flex shrink-0 items-center">
          <SmoothScrollLink href="/" className="flex items-center">
            <span className="font-mono text-sm text-foreground/90">
              edo@portfolio
            </span>
          </SmoothScrollLink>
          <span
            aria-hidden="true"
            className="ml-2 h-5 w-px bg-white/10 md:hidden"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 md:hidden">
          {navigation.map((item) => {
            return item.external ? (
              <a
                key={item.href}
                href={item.href}
                {...getExternalAnchorProps(item)}
                className={mobileLinkClassName}
              >
                {item.label}
              </a>
            ) : item.href.includes("#") ? (
              <SmoothScrollLink
                key={item.href}
                href={item.href}
                className={mobileLinkClassName}
              >
                {item.label}
              </SmoothScrollLink>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={mobileLinkClassName}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <div className="hidden items-center gap-1.5 md:flex">
            {navigation.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className="h-auto bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent"
              >
                {item.external ? (
                  <a
                    href={item.href}
                    {...getExternalAnchorProps(item)}
                    className={desktopLinkClassName}
                  >
                    {item.label}
                  </a>
                ) : item.href.includes("#") ? (
                  <SmoothScrollLink
                    href={item.href}
                    className={desktopLinkClassName}
                  >
                    {item.label}
                  </SmoothScrollLink>
                ) : (
                  <Link
                    href={item.href}
                    className={desktopLinkClassName}
                  >
                    {item.label}
                  </Link>
                )}
              </Button>
            ))}
          </div>
          <div className="mx-1 h-5 w-px bg-white/10" />
          {socialLinks.map((link) => {
            const Icon = linkKindIcons[link.kind]
            const label = getAccessibleLinkLabel(link)

            return (
              <a
                key={link.kind}
                href={link.href}
                {...getExternalAnchorProps(link)}
                aria-label={label}
                title={label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-8 last:-mr-2",
                )}
              >
                <Icon className="size-3.5" />
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
