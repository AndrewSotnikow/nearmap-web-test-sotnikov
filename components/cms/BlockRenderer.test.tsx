import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockRenderer } from './BlockRenderer'
import type { CmsBlock } from '../../lib/cms/types'

describe('BlockRenderer', () => {
  it('renders a SectionTitle for section_title blocks', () => {
    const block: CmsBlock = {
      _uid: 'section',
      component: 'section_title',
      title: 'Ground Truth',
      subtitle: 'A blog by Nearmap',
      description: 'Latest perspectives in location intelligence.'
    }

    render(<BlockRenderer block={block} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Ground Truth' })
    ).toBeInTheDocument()
    expect(screen.getByText('A blog by Nearmap')).toBeInTheDocument()
  })

  it('renders a BlogList for blog_list blocks', () => {
    const block: CmsBlock = {
      _uid: 'list',
      component: 'blog_list',
      title: 'Latest from Nearmap',
      items: [
        {
          _uid: 'post-1',
          thumbnail_url: '/post-1.png',
          thumbnail_alt: 'Post 1 thumbnail',
          title: 'How AI is transforming roof inspections',
          excerpt: 'First excerpt',
          date: '2024-03-15',
          url: '/post-1'
        }
      ]
    }

    render(<BlockRenderer block={block} />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Latest from Nearmap' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Search' })
    ).toBeInTheDocument()
  })

  it('renders nothing for unsupported block components', () => {
    const unknownBlock = {
      _uid: 'unknown',
      component: 'mystery_block'
    } as unknown as CmsBlock

    const { container } = render(<BlockRenderer block={unknownBlock} />)

    expect(container).toBeEmptyDOMElement()
  })
})
