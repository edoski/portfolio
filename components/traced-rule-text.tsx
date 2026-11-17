import type { TextSegment } from "@/lib/portfolio-content"

interface TracedRuleTextProps {
  segments: readonly TextSegment[]
}

export function TracedRuleText({ segments }: TracedRuleTextProps) {
  return segments.map((segment) => {
    const className = segment.emphasis ? "traced-rule-emphasis" : "traced-rule-row-copy"
    const Tag = segment.emphasis ? "strong" : "span"
    const content = <Tag key={segment.text} className={className}>{segment.text}</Tag>

    return segment.href ? (
      <a key={segment.text} href={segment.href} target="_blank" rel="noopener noreferrer" className="traced-rule-link">
        {content}
      </a>
    ) : (
      content
    )
  })
}
