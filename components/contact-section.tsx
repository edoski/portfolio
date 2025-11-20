"use client"

import TextType from "@/components/TextType"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import { SiGithub, SiLinkedin } from "react-icons/si"  // Simple Icons (brands)
import { LuMail } from "react-icons/lu"                // Lucide icons (generic)

const contactLinks = [
  {
    permission: "-rwxr-xr-x",
    command: "github",
    description: "view my code and projects",
    href: "https://github.com/edoski",
    external: true,
    icon: SiGithub
  },
  {
    permission: "-rwxr-xr-x",
    command: "linkedin",
    description: "connect professionally",
    href: "https://www.linkedin.com/in/edoardo-galli-5074321b9/",
    external: true,
    icon: SiLinkedin
  },
  {
    permission: "-rwxr-xr-x",
    command: "email",
    description: "send me a message",
    href: "mailto:edoski.dev@gmail.com",
    external: false,
    icon: LuMail
  }
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <TerminalChrome title="~/contact">

          {/* Command prompt with ls -la */}
          <TerminalPrompt
            path="~/contact"
            command="ls -la"
            className="text-sm"
          />

          {/* Contact links - clickable with typing animation */}
          <div className="space-y-1 mt-2">
            {contactLinks.map((link, index) => (
              <a
                key={link.command}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={`${link.command} - ${link.description}`}
                className="group block py-2 px-3 rounded hover:bg-card/50 focus-visible:outline-2 focus-visible:outline-[color:var(--color-terminal-green)] focus-visible:outline-offset-2 focus-visible:bg-card/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-sm">
                  {/* Icon */}
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

                  {/* Permission - STATIC (instant) */}
                  <span className="text-muted-foreground" aria-hidden="true">
                    {link.permission}
                  </span>

                  {/* Command + Description - TYPING */}
                  <TextType
                    text={`${link.command.padEnd(12)}  # ${link.description}`}
                    as="span"
                    typingSpeed={20}
                    loop={false}
                    startOnVisible={true}
                    showCursor={false}
                    initialDelay={200}
                    variableSpeed={{min: 50, max: 75}}
                    className="text-muted-foreground font-bold group-hover:text-foreground transition-colors duration-200 inline"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Bottom prompt with cursor */}
          <div className="mt-6 pt-4 border-t border-border/30">
            <TerminalPrompt
              path="~/contact"
              showCursor
              className="text-sm"
            />
          </div>

        </TerminalChrome>
      </div>
    </section>
  )
}