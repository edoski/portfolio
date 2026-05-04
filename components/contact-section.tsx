import { ContactLink } from "@/components/contact-link"
import { TerminalCue } from "@/components/terminal-cue"
import { contactLinks } from "@/lib/portfolio-content"

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
                  <ContactLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
