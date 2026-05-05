import { describe, expect, it } from 'vitest'
import { filterPostsByTitle, formatPostDate } from './blog'
import type { BlogPost } from './cms/types'

const posts: BlogPost[] = [
  {
    _uid: 'one',
    thumbnail_url: '/one.png',
    thumbnail_alt: 'First image',
    title: 'How AI is transforming roof inspections',
    excerpt: 'First excerpt',
    date: '2024-03-15',
    url: '/one'
  },
  {
    _uid: 'two',
    thumbnail_url: '/two.png',
    thumbnail_alt: 'Second image',
    title: 'Why oblique imagery matters for insurance',
    date: '2024-02-28',
    url: '/two'
  }
]

describe('filterPostsByTitle', () => {
  it('returns every post for an empty query', () => {
    expect(filterPostsByTitle(posts, '')).toEqual(posts)
    expect(filterPostsByTitle(posts, '   ')).toEqual(posts)
  })

  it('matches titles case-insensitively', () => {
    expect(filterPostsByTitle(posts, 'OBLIQUE')).toEqual([posts[1]])
  })

  it('returns no posts when titles do not match', () => {
    expect(filterPostsByTitle(posts, 'zoning')).toEqual([])
  })
})

describe('formatPostDate', () => {
  it('formats CMS dates for display', () => {
    expect(formatPostDate('2024-03-15')).toBe('MAR 15, 2024')
  })

  it('handles missing and invalid dates', () => {
    expect(formatPostDate(null)).toBeNull()
    expect(formatPostDate('not-a-date')).toBeNull()
  })
})
