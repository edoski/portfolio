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
        "font-mono text-sm text-muted-foreground",
        className
      )}
    >
      <span className="text-foreground/80">{path}</span>
      {command && (
        <>
          <span className="text-muted-foreground/50"> $ </span>
          <span>{command}</span>
        </>
      )}
    </p>
  )
}
