import type { SectionTitleBlock } from '../../lib/cms/types'

type SectionTitleProps = {
  block: SectionTitleBlock
}

export function SectionTitle({ block }: SectionTitleProps) {
  return (
    <header className="section-title">
      <p className="section-title__eyebrow">{block.subtitle}</p>
      <h1 className="section-title__heading">{block.title}</h1>
      <p className="section-title__description">{block.description}</p>
    </header>
  )
}
