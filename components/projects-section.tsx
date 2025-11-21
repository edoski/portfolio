"use client"

import { Button } from "@/components/ui/button"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import DecryptedText from "@/components/DecryptedText"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import StarBorder from "@/components/StarBorder"
import TiltedCard from "@/components/TiltedCard"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { PROJECTS } from "@/lib/constants"
import {useMediaQuery} from "@/hooks/use-media-query";

export function ProjectsSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <section id="projects" className="pt-12 pb-20 px-2 md:px-6 overflow-visible">
      <div className="max-w-6xl mx-auto overflow-visible">
        {/* Section header */}
        <div className="font-mono text-lg ml-12 mt-15 mb-[-95]">
          <DecryptedText
            text="# projects"
            animateOn="view"
            sequential={true}
            speed={100}
            className="text-[color:var(--color-terminal-green)]"
          />
        </div>

        {/* ScrollStack with project cards */}
        <ScrollStack
          useWindowScroll={true}
          className="min-h-0 overflow-visible"
          itemDistance={40}
          itemStackDistance={20}
          stackPosition="20%"
          baseScale={0.9}
          rotationAmount={0}
          blurAmount={0.5}
        >
          {PROJECTS.map((project, index) => (
            <ScrollStackItem key={index} itemClassName="p-0 h-auto shadow-none rounded-none my-0">
              <TiltedCard
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                scaleOnHover={1.02}
                invertTilt={true}
                rotateAmplitude={8}
                showMobileWarning={false}
                showTooltip={false}
              >
                <StarBorder
                  as="div"
                  color="var(--color-terminal-green)"
                  thickness={2}
                  speed={"4s"}
                >
                <TerminalChrome
                  title={`~/projects/${project.directory}`}
                  hideTrafficLights={true}
                  allowContentOverflow={false}
                  className="w-full"
                >
                <TerminalPrompt
                  path="~/projects"
                  command={`cat ${project.directory}/README.md`}
                  className="text-sm mb-6"
                />
                {/* Project content - preserve existing internal layout */}
                <div className="group">
                  <h3 className="text-xl font-bold font-mono text-foreground group-hover:text-[color:var(--color-terminal-green)] transition-colors mb-2">
                    {project.directory}/
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
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
              </TerminalChrome>
                </StarBorder>
              </TiltedCard>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}