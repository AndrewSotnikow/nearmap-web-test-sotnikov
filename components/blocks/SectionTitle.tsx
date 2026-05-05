import type { SectionTitleBlock } from '../../lib/cms/types'

type SectionTitleProps = {
  block: SectionTitleBlock
}

export function SectionTitle({ block }: SectionTitleProps) {
  return (
    <header>
      <p>{block.subtitle}</p>
      <h1>{block.title}</h1>
      <p>{block.description}</p>
    </header>
  )
}
