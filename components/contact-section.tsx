"use client"

import { Button } from "@/components/ui/button"
import { TerminalChrome } from "@/components/ui/terminal-chrome"
import { TerminalPrompt } from "@/components/ui/terminal-prompt"
import { Download, Send, Mail } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Terminal window */}
        <TerminalChrome title="~/contact">
            {/* Command prompt */}
            <div className="space-y-2">
              <TerminalPrompt
                path="~/contact"
                command="./connect.sh --info"
                className="text-sm"
              />
            </div>

            {/* Connection status */}
            <div className="border border-[color:var(--color-terminal-green)]/30 rounded-lg p-6 bg-background/50 space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-[color:var(--color-terminal-green)] font-mono text-sm mt-1">
                  ➜
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-lg font-bold text-foreground">
                    Connection Status: <span className="text-[color:var(--color-terminal-green)]">READY</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono leading-relaxed">
                    Always open to discussing new opportunities, collaborations,
                    or just having a chat about technology. Feel free to reach out
                    through any of the channels below.
                  </div>
                </div>
              </div>
            </div>

            {/* Available commands */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-muted-foreground">
                Available commands:
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* Email command */}
                <div className="border border-border rounded-lg p-4 hover:border-[color:var(--color-terminal-orange)]/50 transition-all bg-background/50 group">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-[color:var(--color-terminal-orange)]" />
                    <span className="font-mono text-sm text-[color:var(--color-terminal-orange)] group-hover:text-[color:var(--color-terminal-green)] transition-colors">
                      ./send-email.sh
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Send me a direct message
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-mono text-xs group/btn"
                  >
                    <Send className="w-3 h-3 mr-2" />
                    Execute
                  </Button>
                </div>

                {/* Resume command */}
                <div className="border border-border rounded-lg p-4 hover:border-[color:var(--color-terminal-orange)]/50 transition-all bg-background/50 group">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-4 h-4 text-[color:var(--color-terminal-orange)]" />
                    <span className="font-mono text-sm text-[color:var(--color-terminal-orange)] group-hover:text-[color:var(--color-terminal-green)] transition-colors">
                      ./download-cv.sh
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Download resume/CV
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-[color:var(--color-terminal-green)] text-[color:var(--color-terminal-green)] hover:bg-[color:var(--color-terminal-green)]/10 bg-transparent font-mono text-xs"
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Execute
                  </Button>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="border-t border-border/30 pt-6 space-y-3">
              <div className="font-mono text-xs text-muted-foreground">
                Social connections:
              </div>

              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.slice(0, 3).map(({ platform, label, url, icon: Icon }) => {
                  const colorMap: Record<string, string> = {
                    github: "text-[color:var(--color-terminal-green)]",
                    linkedin: "text-accent",
                    twitter: "text-[color:var(--color-terminal-orange)]",
                  }
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-[color:var(--color-terminal-orange)]/50 transition-all bg-background/50 group"
                    >
                      <Icon className={`w-4 h-4 ${colorMap[platform]}`} />
                      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Footer prompt */}
            <div className="pt-4 border-t border-border/30">
              <TerminalPrompt
                path="~/contact"
                showCursor
                className="text-sm"
              />
            </div>
        </TerminalChrome>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-[color:var(--color-terminal-green)]">✓</span> All systems operational • Ready to connect
          </p>
        </div>
      </div>
    </section>
  )
}
