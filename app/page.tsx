import { Navbar } from "@/components/navbar"
import { TerminalHero } from "@/components/terminal-hero"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <TerminalHero />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
