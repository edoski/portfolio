interface TracedRuleTextProps {
  segments: readonly {
    text: string
    emphasis: boolean
  }[]
}

export function TracedRuleText({ segments }: TracedRuleTextProps) {
  return segments.map((segment) =>
    segment.emphasis ? (
      <strong key={segment.text} className="traced-rule-emphasis">
        {segment.text}
      </strong>
    ) : (
      <span key={segment.text} className="traced-rule-row-copy">
        {segment.text}
      </span>
    )
  )
}
