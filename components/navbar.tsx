import { FaLinkedin } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"

import { Button, buttonVariants } from "@/components/ui/button"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"
import { links, navigation } from "@/lib/portfolio-content"
import { cn } from "@/lib/utils"

const socialIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
}

export function Navbar() {
  const socialLinks = links.filter((link) => link.kind === "github" || link.kind === "linkedin")

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 px-6 backdrop-blur-xl lg:px-8">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-muted-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <SmoothScrollLink
                    href={item.href}
                    className="font-mono text-muted-foreground"
                  >
                    {item.label}
                  </SmoothScrollLink>
                )}
              </Button>
            ))}
          </div>
          <div className="mx-1 h-5 w-px bg-white/10" />
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.kind as keyof typeof socialIcons]
            return (
              <a
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
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
