import { Navbar } from "@/components/navbar"
import { TerminalHero } from "@/components/terminal-hero"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Portfolio() {
  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <div className="site-shell-noise" aria-hidden="true" />
      <Navbar />
      <TerminalHero />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
