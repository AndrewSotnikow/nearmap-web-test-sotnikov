import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogList } from './BlogList'
import type { BlogListBlock } from '../../lib/cms/types'

const block: BlogListBlock = {
  _uid: 'blog-list',
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
    },
    {
      _uid: 'post-2',
      thumbnail_url: '/post-2.png',
      thumbnail_alt: 'Post 2 thumbnail',
      title: 'Why oblique imagery matters for insurance',
      date: '2024-02-28',
      url: '/post-2'
    },
    {
      _uid: 'post-3',
      thumbnail_url: '/post-3.png',
      thumbnail_alt: 'Post 3 thumbnail',
      title: 'Sub-5cm resolution: what it means in practice',
      excerpt: 'Third excerpt',
      date: null,
      url: '/post-3'
    }
  ]
}

describe('BlogList', () => {
  it('renders the title and the first post in the collapsed default state', () => {
    render(<BlogList block={block} />)

    expect(
      screen.getByRole('heading', { name: 'Latest from Nearmap' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'How AI is transforming roof inspections'
      })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: 'Why oblique imagery matters for insurance'
      })
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/2 more posts from/i)
    ).toBeInTheDocument()
  })

  it('expands to show every post when "Load posts" is clicked', async () => {
    const user = userEvent.setup()
    render(<BlogList block={block} />)

    await user.click(screen.getByRole('button', { name: 'Load posts' }))

    for (const post of block.items) {
      expect(
        screen.getByRole('heading', { name: post.title })
      ).toBeInTheDocument()
    }
    expect(
      screen.queryByRole('button', { name: 'Load posts' })
    ).not.toBeInTheDocument()
  })

  it('filters across every post on submit, regardless of expanded state', async () => {
    const user = userEvent.setup()
    render(<BlogList block={block} />)

    await user.type(screen.getByRole('searchbox'), 'oblique')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(
      screen.getByRole('heading', {
        name: 'Why oblique imagery matters for insurance'
      })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: 'How AI is transforming roof inspections'
      })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/more posts from/i)
    ).not.toBeInTheDocument()
  })

  it('does not filter on keystroke alone — only on submit', async () => {
    const user = userEvent.setup()
    render(<BlogList block={block} />)

    await user.type(screen.getByRole('searchbox'), 'oblique')

    expect(
      screen.getByRole('heading', {
        name: 'How AI is transforming roof inspections'
      })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: 'Why oblique imagery matters for insurance'
      })
    ).not.toBeInTheDocument()
  })

  it('restores all posts when the input is cleared after expanding', async () => {
    const user = userEvent.setup()
    render(<BlogList block={block} />)

    await user.click(screen.getByRole('button', { name: 'Load posts' }))
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'oblique')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(
      screen.queryByRole('heading', {
        name: 'How AI is transforming roof inspections'
      })
    ).not.toBeInTheDocument()

    await user.clear(searchInput)

    for (const post of block.items) {
      expect(
        screen.getByRole('heading', { name: post.title })
      ).toBeInTheDocument()
    }
  })

  it('shows an empty message when no posts match the submitted query', async () => {
    const user = userEvent.setup()
    render(<BlogList block={block} />)

    await user.type(screen.getByRole('searchbox'), 'no-matches-here')
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('No posts match your search.')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        name: 'How AI is transforming roof inspections'
      })
    ).not.toBeInTheDocument()
  })
})
