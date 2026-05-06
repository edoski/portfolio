import { ContactLink } from "@/components/contact-link"
import { TerminalCue } from "@/components/terminal-cue"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import {
  contactDetails,
  contactLinks,
  spokenLanguages,
} from "@/lib/portfolio-content"

function ContactDetailValue({ detail }: {
  detail: (typeof contactDetails)[number]
}) {
  if (detail.label === "location") {
    return (
      <span className="traced-rule-row">
        <span className="traced-rule-row-copy">Bologna, Italy; </span>
        <strong className="traced-rule-emphasis">remote-friendly</strong>
        <span className="traced-rule-row-copy">.</span>
      </span>
    )
  }

  if (detail.label === "status") {
    return (
      <>
        M.Sc. ai student open to <strong className="traced-rule-emphasis">junior</strong> and{" "}
        <strong className="traced-rule-emphasis">internship</strong> <strong className="traced-rule-emphasis">roles</strong> across{" "}
        <strong className="traced-rule-emphasis">full-stack</strong> and <strong className="traced-rule-emphasis">ai/ml engineering</strong>.
      </>
    )
  }

  return null
}

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
                      <ContactDetailValue detail={detail} />
                    </p>
                  </div>
                </TracedRuleBlock>
              ))}

              <TracedRuleBlock className="text-sm leading-7">
                <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
                  <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
                    languages
                  </p>
                  <ul className="space-y-3 leading-6 lg:space-y-1.5">
                    {spokenLanguages.map((item) => (
                      <li
                        key={item.language}
                        className="traced-rule-row lg:whitespace-nowrap"
                      >
                        <strong className="traced-rule-emphasis">
                          {item.language}
                        </strong>
                        <span className="traced-rule-row-copy">, </span>
                        <span className="traced-rule-row-copy">
                          {item.level}
                          {"credential" in item && item.credential
                            ? `, ${item.credential}`
                            : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TracedRuleBlock>

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
