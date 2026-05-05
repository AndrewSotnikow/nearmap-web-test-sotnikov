import { BlockRenderer } from './BlockRenderer'
import type { CmsStory } from '../../lib/cms/types'

type PageRendererProps = {
  page: CmsStory
}

export function PageRenderer({ page }: PageRendererProps) {
  return (
    <main>
      {page.content.body.map((block) => (
        <BlockRenderer key={block._uid} block={block} />
      ))}
    </main>
  )
}
