"use client"

import TextType from "@/components/TextType"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import TiltedCard from "@/components/TiltedCard"
import DecryptedText from "@/components/DecryptedText"
import { SiGithub, SiLinkedin } from "react-icons/si"  // Simple Icons (brands)
import { LuFileText, LuMail } from "react-icons/lu"
import {useMediaQuery} from "@/hooks/use-media-query";                // Lucide icons (generic)

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
    permission: "-r--r--r--",
    command: "resume",
    description: "view my resume",
    href: "/CV_Edoardo_Galli.pdf",
    external: true,
    icon: LuFileText
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
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className={`mb-4 font-mono text-lg ${isMobile ? 'mt-16' : ''}`}>
          <DecryptedText
            text="# contact"
            animateOn="view"
            sequential={true}
            speed={100}
            className="text-[color:var(--color-terminal-green)]"
          />
        </div>

        <TiltedCard
          containerHeight="auto"
          containerWidth="100%"
          imageHeight="auto"
          imageWidth="100%"
          scaleOnHover={1.02}
          rotateAmplitude={3}
          invertTilt={true}
          showMobileWarning={false}
          showTooltip={false}
        >
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
              <TiltedCard
                key={link.command}
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                scaleOnHover={1.005}
                rotateAmplitude={0}
                showMobileWarning={false}
                showTooltip={false}
              >
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-label={`${link.command} - ${link.description}`}
                  className="group block py-2 px-3 rounded hover:bg-card/50 focus-visible:outline-2 focus-visible:outline-[color:var(--color-terminal-green)] focus-visible:outline-offset-2 focus-visible:bg-card/50 transition-all duration-200 cursor-pointer"
                >
                  {isMobile ? (
                    // Mobile layout: Stack description on top, command below
                    <div className="flex flex-col gap-1 font-mono text-sm">
                      {/* Description on top */}
                      <div className="relative text-muted-foreground text-xs whitespace-nowrap">
                        <div className="invisible" aria-hidden="true">
                          {`# ${link.description}`}
                        </div>
                        <div className="absolute inset-0">
                          <TextType
                            text={`# ${link.description}`}
                            as="span"
                            typingSpeed={20}
                            loop={false}
                            startOnVisible={true}
                            showCursor={false}
                            initialDelay={200}
                            variableSpeed={{min: 50, max: 75}}
                          />
                        </div>
                      </div>
                      {/* Icon + Command below (static, no typing animation) */}
                      <div className="flex items-center gap-2">
                        <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                        <span className="text-muted-foreground font-bold group-hover:text-foreground transition-colors duration-200">
                          {link.command}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Desktop layout: Horizontal with icon, permissions, command, and description
                    <div className="flex items-center gap-2 sm:gap-3 font-mono text-sm">
                      {/* Icon */}
                      <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

                      {/* Permission - STATIC (instant) */}
                      <span className="text-muted-foreground" aria-hidden="true">
                        {link.permission}
                      </span>

                      {/* Command + Description - TYPING */}
                      <div className="relative inline-block text-muted-foreground font-bold group-hover:text-foreground transition-colors duration-200 whitespace-pre">
                        <div className="invisible" aria-hidden="true">
                          {`${link.command.padEnd(12)}  # ${link.description}`}
                        </div>
                        <div className="absolute inset-0">
                          <TextType
                            text={`${link.command.padEnd(12)}  # ${link.description}`}
                            as="span"
                            typingSpeed={20}
                            loop={false}
                            startOnVisible={true}
                            showCursor={false}
                            initialDelay={200}
                            variableSpeed={{min: 50, max: 75}}
                            className="whitespace-pre"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </a>
              </TiltedCard>
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
        </TiltedCard>
      </div>
    </section>
  )
}