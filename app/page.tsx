import { TerminalHero } from "@/components/terminal-hero"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Portfolio() {
  return (
    <main>
      <TerminalHero />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
