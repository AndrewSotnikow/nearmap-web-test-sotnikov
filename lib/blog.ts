import type { BlogPost } from './cms/types'

export function filterPostsByTitle(posts: BlogPost[], query: string): BlogPost[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return posts
  }

  return posts.filter((post) =>
    post.title.toLowerCase().includes(normalizedQuery)
  )
}

export function getVisibleBlogPosts(
  posts: BlogPost[],
  query: string,
  showAll: boolean
): BlogPost[] {
  const filteredPosts = filterPostsByTitle(posts, query)

  if (query.trim() || showAll) {
    return filteredPosts
  }

  return filteredPosts.slice(0, 1)
}

export function formatPostDate(date: string | null): string | null {
  if (!date) {
    return null
  }

  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
    .format(new Date(year, month - 1, day))
    .toUpperCase()
}
