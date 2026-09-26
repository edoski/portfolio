import { TerminalHero } from "@/components/terminal-hero"
import { ExperienceSection } from "@/components/experience-section"
import { PublicationsSection } from "@/components/publications-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Portfolio() {
  return (
    <main>
      <TerminalHero />
      <ExperienceSection />
      <PublicationsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
