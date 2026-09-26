import type { ReactNode } from "react"

import { TracedRuleBlock } from "@/components/traced-rule-block"
import { cn } from "@/lib/utils"

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
    <TracedRuleBlock className={cn("font-mono text-sm leading-7", className)}>
      <div className="grid gap-2 md:grid-cols-[6rem_minmax(0,1fr)] md:items-start md:gap-6">
        <p className="traced-rule-label inline-block pb-0.5 font-bold lowercase leading-6">
          {label}
        </p>
        <div className="min-w-0">{children}</div>
      </div>
    </TracedRuleBlock>
  )
}
