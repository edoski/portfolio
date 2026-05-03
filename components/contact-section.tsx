import { FileText, Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"

import { TerminalCue } from "@/components/terminal-cue"
import { contactLinks } from "@/lib/portfolio-content"

const contactIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  resume: FileText,
  email: Mail,
}

function ContactItem({
  link,
}: {
  link: (typeof contactLinks)[number]
}) {
  const Icon = contactIcons[link.kind]
  const label = link.label.toLowerCase()

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      aria-label={link.label}
      title={link.label}
      className="group flex min-w-0 items-center justify-center gap-3 py-3 font-mono text-base leading-7 text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-lg"
    >
      <span
        aria-hidden="true"
        className="text-muted-foreground/55 transition-colors group-hover:text-foreground/80"
      >
        [
      </span>
      <Icon className="size-5 shrink-0 transition-colors group-hover:text-foreground" />
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="text-muted-foreground/55 transition-colors group-hover:text-foreground/80"
      >
        ]
      </span>
    </a>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-10 pt-16 md:pb-14 md:pt-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8">
          <TerminalCue path="~/contact" command='ping edo' />

          <div className="font-mono">
            <ul className="grid w-full grid-cols-2 gap-x-8 gap-y-4 md:flex md:flex-wrap md:items-center md:justify-between">
              {contactLinks.map((link) => (
                <li
                  key={link.kind}
                  className="group/item relative min-w-0"
                >
                  <ContactItem link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
