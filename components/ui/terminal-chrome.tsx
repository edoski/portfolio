import { ReactNode } from "react"

interface TerminalChromeProps {
  title?: string
  children: ReactNode
  className?: string
}

export function TerminalChrome({ title, children, className = "" }: TerminalChromeProps) {
  return (
    <div className={`terminal-window p-0 relative overflow-hidden ${className}`}>
      {/* Terminal header */}
      <div className="relative z-10 flex items-center justify-between px-4 h-10 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        {title && (
          <div className="text-xs font-mono text-muted-foreground">
            {title}
          </div>
        )}
        <div className="w-16" />
      </div>
      {/* Terminal content */}
      <div className="relative z-10 p-6 space-y-6">
        {children}
      </div>
    </div>
  )
}
