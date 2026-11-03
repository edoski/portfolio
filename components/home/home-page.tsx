import { ContactSection } from "@/components/home/contact-section"
import { ExperienceSection } from "@/components/home/experience-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { PublicationsSection } from "@/components/home/publications-section"
import { TerminalHero } from "@/components/home/terminal-hero"

export function HomePage() {
  return (
    <main className="pb-16 md:pb-24">
      <TerminalHero />
      <ExperienceSection />
      <PublicationsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
