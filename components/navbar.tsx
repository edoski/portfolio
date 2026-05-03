import { FaLinkedin } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { links, navigation } from "@/lib/portfolio-content"

const socialIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
}

export function Navbar() {
  const socialLinks = links.filter((link) => link.kind === "github" || link.kind === "linkedin")

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 px-6 backdrop-blur-xl lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <a href="#" className="flex items-center">
          <span className="font-mono text-sm text-foreground/90">
            edo@portfolio
          </span>
        </a>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 md:flex">
            {navigation.map((item) => (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="font-mono text-muted-foreground"
                >
                  {item.label}
                </a>
              </Button>
            ))}
          </div>
          <div className="mx-1 h-5 w-px bg-white/10" />
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.kind as keyof typeof socialIcons]
            return (
              <Tooltip key={link.kind}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon" className="size-8">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Icon className="size-3.5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{link.label}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
