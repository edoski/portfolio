"use client"

import { Button } from "@/components/ui/button"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import TiltedCard from "@/components/TiltedCard"
import StarBorder from "@/components/StarBorder"
import DecryptedText from "@/components/DecryptedText"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { PROJECTS } from "@/lib/constants"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-4 font-mono text-lg">
          <DecryptedText
            text="# projects"
            animateOn="view"
            sequential={true}
            speed={100}
            className="text-[color:var(--color-terminal-green)]"
          />
        </div>

        {/* Terminal header */}
        <TerminalChrome title="~/projects" className="mb-8" allowContentOverflow={true}>
          {/* Command prompt */}
          <div className="space-y-2">
            <TerminalPrompt path="~/projects" command="ls -la" />
          </div>

          {/* Project listings */}
          <div className="space-y-6 relative">
            {PROJECTS.map((project, index) => (
              <TiltedCard
                key={index}
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={3}
                invertTilt={true}
                showMobileWarning={false}
                showTooltip={false}
              >
                <StarBorder
                  as="div"
                  color="var(--color-terminal-green)"
                  speed="3s"
                  thickness={1}
                >
                  {/* File listing header */}
                  <div className="group">
                    <h3 className="text-xl font-bold font-mono text-foreground group-hover:text-[color:var(--color-terminal-green)] transition-colors mb-2">
                      {project.directory}/
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack - simplified */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-xs rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 font-mono text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[color:var(--color-terminal-green)] text-[color:var(--color-terminal-green)] hover:bg-[color:var(--color-terminal-green)]/10 bg-transparent cursor-pointer"
                        onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                      >
                        <SiGithub className="w-3 h-3 mr-2" />
                        <span>repo</span>
                      </Button>
                      {project.demo !== "#" && (
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer"
                          onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          <span>demo</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </StarBorder>
              </TiltedCard>
            ))}
          </div>

          {/* Footer prompt */}
          <div className="pt-4 border-t border-border/30">
            <TerminalPrompt path="~/projects" showCursor />
          </div>
        </TerminalChrome>
      </div>
    </section>
  )
}