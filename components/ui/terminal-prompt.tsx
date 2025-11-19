import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TerminalPromptProps {
  path?: string
  command?: string | ReactNode
  showCursor?: boolean
  className?: string
}

export function TerminalPrompt({
  path = "~",
  command = "",
  showCursor = false,
  className = ""
}: TerminalPromptProps) {
  return (
    <div className={cn("font-mono text-sm", className)}>
      <span className="text-[color:var(--color-terminal-green)]">edo@portfolio</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-accent">{path}</span>
      <span className="text-muted-foreground">$ </span>
      {command && (
        typeof command === "string" ? (
          <span className="text-foreground">{command}</span>
        ) : (
          <span className="text-foreground">{command}</span>
        )
      )}
      {showCursor && (
        <span className="text-[color:var(--color-terminal-cursor)] terminal-cursor">▌</span>
      )}
    </div>
  )
}
