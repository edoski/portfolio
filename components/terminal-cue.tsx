import { cn } from "@/lib/utils"

interface TerminalCueProps {
  path?: string
  command?: string
  className?: string
}

export function TerminalCue({
  path = "~",
  command,
  className,
}: TerminalCueProps) {
  return (
    <p
      className={cn(
        "font-mono text-md leading-tight text-foreground md:text-md",
        className
      )}
    >
      <span className="text-foreground/70">{path}</span>
      {command && (
        <>
          <span className="text-muted-foreground/55"> $ </span>
          <span className="text-foreground">{command}</span>
        </>
      )}
    </p>
  )
}