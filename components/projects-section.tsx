"use client"

import { Button } from "@/components/ui/button"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import { ExternalLink, Github, Folder, FileCode } from "lucide-react"
import { PROJECTS } from "@/lib/constants"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Terminal header */}
        <TerminalChrome title="~/projects" className="mb-8">
            {/* Command prompt */}
            <div className="space-y-2">
              <TerminalPrompt path="~/projects" command="ls -la" />
              <div className="font-mono text-xs text-muted-foreground">
                total {PROJECTS.length} projects
              </div>
            </div>

            {/* Project listings */}
            <div className="space-y-6">
              {PROJECTS.map((project, index) => (
                <div
                  key={index}
                  className="group border border-border rounded-lg p-6 hover:border-[color:var(--color-terminal-orange)]/50 transition-all bg-background/50 hover:bg-card/50"
                >
                  {/* File listing header */}
                  <div className="flex items-start gap-3 mb-4">
                    <Folder className="w-5 h-5 text-[color:var(--color-terminal-orange)] mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm text-muted-foreground mb-1">
                        drwxr-xr-x  {project.tech.length} edo staff  {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </div>
                      <h3 className="text-xl font-bold font-mono text-[color:var(--color-terminal-orange)] group-hover:text-[color:var(--color-terminal-green)] transition-colors mb-2">
                        ./{project.directory}/
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* README preview */}
                      <div className="bg-background border border-border/50 rounded p-4 mb-4 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <FileCode className="w-4 h-4 text-[color:var(--color-terminal-green)]" />
                          <span className="font-mono text-xs text-muted-foreground">README.md</span>
                        </div>
                        <div className="font-mono text-xs space-y-1">
                          <div>
                            <span className="text-[color:var(--color-terminal-green)]">## Tech Stack</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-muted/50 text-[color:var(--color-terminal-orange)] text-xs rounded font-mono border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 font-mono text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[color:var(--color-terminal-green)] text-[color:var(--color-terminal-green)] hover:bg-[color:var(--color-terminal-green)]/10 bg-transparent group/btn"
                        >
                          <Github className="w-3 h-3 mr-2" />
                          <span className="group-hover/btn:mr-1 transition-all">git clone</span>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground group/btn"
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          <span className="group-hover/btn:mr-1 transition-all">./demo.sh</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
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
