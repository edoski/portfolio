import { ContactLink } from "@/components/contact-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import { contactLinks, profile } from "@/lib/portfolio-content"

const contactRowClassName =
  "traced-rule-row grid gap-1 md:grid-cols-[6rem_minmax(0,1fr)] md:items-center md:gap-6"
const contactKeyClassName = "traced-rule-emphasis lowercase leading-6"

export function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-10 pt-12 md:pb-14 md:pt-14 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <TerminalCue path="~/contact" command="ping edo" />

        <div className="font-mono">
          <TracedRuleBlock className="text-sm leading-7">
            <ul className="space-y-2.5">
              <li className={contactRowClassName}>
                <span className={contactKeyClassName}>location</span>
                <span className="traced-rule-row-copy leading-6">
                  {profile.location}
                </span>
              </li>

              {contactLinks.map((link) => (
                <li key={link.kind} className={contactRowClassName}>
                  <span className={contactKeyClassName}>{link.label}</span>
                  <span className="flex min-w-0 justify-start">
                    <ContactLink link={link} />
                  </span>
                </li>
              ))}
            </ul>
          </TracedRuleBlock>
        </div>
      </div>
    </section>
  )
}
