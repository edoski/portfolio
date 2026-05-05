import { ContactLink } from "@/components/contact-link"
import { TerminalCue } from "@/components/terminal-cue"
import { contactDetails, contactLinks } from "@/lib/portfolio-content"

export function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-10 pt-16 md:pb-14 md:pt-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8">
          <TerminalCue path="~/contact" command='ping edo' />

          <div className="space-y-7 font-mono">
            <div className="space-y-5">
              {contactDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="relative w-full border-l border-foreground/35 pl-4 text-sm leading-7 text-foreground/80 md:pl-5"
                >
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="inline-block pb-0.5 font-bold lowercase leading-6 text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="min-w-0 text-foreground/90">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <ul className="grid w-full grid-cols-2 gap-x-8 gap-y-4 md:flex md:flex-wrap md:items-center md:justify-between">
              {contactLinks.map((link) => (
                <li
                  key={link.kind}
                  className="group/item relative flex min-w-0 justify-center"
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
