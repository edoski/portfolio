import { ContactLink } from "@/components/contact-link"
import { HomeSection } from "@/components/home/home-section"
import { TracedRuleBlock } from "@/components/traced-rule-block"
import { contactLinks } from "@/lib/portfolio-content"

// One row anatomy for every contact link: a 24px key beside a 28px value box (the link's
// 2px focus padding). Rows 8px apart, like the label-column rows above.
const contactRowClassName =
  "traced-rule-row grid gap-1 md:grid-cols-[6rem_minmax(0,1fr)] md:items-center md:gap-6"
const contactKeyClassName = "traced-rule-emphasis lowercase leading-6"

export function ContactSection() {
  return (
    <HomeSection id="contact">
      <TracedRuleBlock className="font-mono text-sm leading-6">
        <ul className="space-y-2">
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
    </HomeSection>
  )
}
