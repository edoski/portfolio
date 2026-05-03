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
      className="group relative flex min-h-16 min-w-0 flex-1 items-center gap-4 overflow-hidden px-0 font-mono text-base leading-7 text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-inset sm:min-h-20 sm:justify-center sm:text-lg"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-0 h-10 translate-y-7 rounded-[100%] bg-white/20 opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:translate-y-3 group-hover:opacity-55"
      />
      <Icon className="size-5 shrink-0 transition-colors group-hover:text-foreground sm:size-6" />
      <span>{label}</span>
    </a>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-10 md:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8">
          <TerminalCue path="~/contact" command='echo "get in touch!"' />

          <div className="font-mono">
            <ul className="grid border-b border-foreground/35 sm:grid-cols-4">
              {contactLinks.map((link, index) => (
                <li
                  key={link.kind}
                  className="group/item relative flex min-w-0 items-center"
                >
                  <ContactItem link={link} />
                  {index < contactLinks.length - 1 && (
                    <span className="hidden px-6 text-base leading-7 text-muted-foreground/40 sm:block">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
