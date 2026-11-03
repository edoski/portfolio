import type { ReactNode } from "react"

import { TracedRuleBlock } from "@/components/traced-rule-block"
import { cn } from "@/lib/utils"

/**
 * TracedRuleField: a lowercase label beside its value, with the Traced Rule on the left.
 *
 * Rows sit on a 24px line box so that the 8px row gaps and 32px group gaps the caller sets
 * read as groups (Carbon spacing-03, proximity in Apple HIG and Atlassian). The label is
 * 14/600, the emphasis weight of the type scale, and sits 4px above the value on mobile.
 * Values keep their full width so one-line facts stay on one line.
 */
interface TracedRuleFieldProps {
  label: string
  children: ReactNode
  className?: string
}

export function TracedRuleField({
  label,
  children,
  className,
}: TracedRuleFieldProps) {
  return (
    <TracedRuleBlock className={cn("font-mono text-sm leading-6", className)}>
      <div className="grid gap-1 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
        <p className="traced-rule-label inline-block font-semibold lowercase leading-6">
          {label}
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </TracedRuleBlock>
  )
}
