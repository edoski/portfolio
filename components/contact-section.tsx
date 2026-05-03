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
      className="group inline-flex min-w-0 items-center gap-3 py-2 font-mono text-base leading-7 text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-lg"
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
            <ul className="mx-auto grid max-w-sm grid-cols-2 justify-items-center gap-x-6 gap-y-4 md:flex md:max-w-none md:flex-wrap md:items-center md:justify-center md:gap-x-8">
              {contactLinks.map((link) => (
                <li
                  key={link.kind}
                  className="group/item relative flex min-w-0 items-center justify-center"
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
