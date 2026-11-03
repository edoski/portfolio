/**
 * TerminalPathCue: a section header written as a bare working-directory path (`~/projects`).
 *
 * Anatomy: `<h2 data-slot="terminal-path-cue" class="terminal-cue">` holding (each home section's heading)
 *   1. prefix: the muted `~/`, so the eye lands on the directory name;
 *   2. directory: near-full foreground, wrapped in `TerminalCueCommand` so hovering it
 *      reveals the same blinking cursor the command cues use, now right after the path.
 *
 * Sizes: 16px / 400 on a tight (1.25) line box, the one cue style of the type scale
 * (16/400 cues, 14/400 body, 14/600 emphasis, 12/400 small; Carbon type tokens,
 * Material 3 type scale, Refactoring UI "two weights"). `TerminalCue` draws the same style
 * for prompts that keep a command, so every cue shares one line.
 */
import { TerminalCueCommand } from "@/components/terminal-cue-command"
import { cn } from "@/lib/utils"

interface TerminalPathCueProps {
  directory: string
  id?: string
  className?: string
}

export function TerminalPathCue({ directory, id, className }: TerminalPathCueProps) {
  return (
    <h2
      id={id}
      data-slot="terminal-path-cue"
      className={cn(
        "terminal-cue inline-block font-mono text-base leading-tight",
        className
      )}
    >
      <span className="text-muted-foreground">~/</span>
      <TerminalCueCommand className="text-foreground/90">
        {directory}
      </TerminalCueCommand>
    </h2>
  )
}
