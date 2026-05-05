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

  return (
    <nav className="inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 px-6 backdrop-blur-xl md:fixed lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <SmoothScrollLink href="/" className="flex items-center">
          <span className="font-mono text-sm text-foreground/90">
            edo@portfolio
          </span>
        </SmoothScrollLink>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 md:flex">
            {navigation.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                {item.external ? (
                  <a
                    href={item.href}
                    {...getExternalAnchorProps(item)}
                    className="font-mono text-muted-foreground"
                  >
                    {item.label}
                  </a>
                ) : item.href.includes("#") ? (
                  <SmoothScrollLink
                    href={item.href}
                    className="font-mono text-muted-foreground"
                  >
                    {item.label}
                  </SmoothScrollLink>
                ) : (
                  <Link
                    href={item.href}
                    className="font-mono text-muted-foreground"
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
