import { BlogList } from '../blocks/BlogList'
import { SectionTitle } from '../blocks/SectionTitle'
import type { CmsBlock } from '../../lib/cms/types'

type BlockRendererProps = {
  block: CmsBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.component) {
    case 'section_title':
      return <SectionTitle block={block} />
    case 'blog_list':
      return <BlogList block={block} />
    default:
      return null
  }
}
