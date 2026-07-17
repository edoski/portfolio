import { ContactLink } from "@/components/contact-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import {
  contactDetails,
  contactLinks,
} from "@/lib/portfolio-content"

export function ContactSection() {
  return (
    <section id="contact" className="px-6 pb-10 pt-12 md:pb-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8">
          <TerminalCue path="~/contact" command='ping edo' />

          <div className="space-y-7 font-mono">
            <div className="space-y-5">
              {contactDetails.map((detail) => (
                <TracedRuleBlock
                  key={detail.label}
                  className="text-sm leading-7"
                >
                  <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                    <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
                      {detail.label}
                    </p>
                    <p className="min-w-0">
                      <span className="traced-rule-row-copy">
                        {detail.value}
                      </span>
                      {"qualifier" in detail && (
                        <>
                          <span className="traced-rule-row-copy">; </span>
                          <strong className="traced-rule-emphasis">
                            {detail.qualifier}
                          </strong>
                          <span className="traced-rule-row-copy">.</span>
                        </>
                      )}
                    </p>
                  </div>
                </TracedRuleBlock>
              ))}

              <TracedRuleBlock className="text-sm leading-7">
                <div className="grid gap-4 md:grid-cols-[6rem_minmax(0,1fr)] md:items-center md:gap-6">
                  <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
                    links
                  </p>
                  <ul className="grid min-w-0 grid-cols-2 justify-items-start gap-x-6 gap-y-3 sm:flex sm:w-full sm:items-center sm:justify-between sm:gap-6">
                    {contactLinks.map((link) => (
                      <li
                        key={link.kind}
                        className="group/item relative flex min-w-0 justify-start"
                      >
                        <ContactLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              </TracedRuleBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
