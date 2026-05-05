'use client'

import { FormEvent, useState } from 'react'
import { BlogCard } from './BlogCard'
import { getVisibleBlogPosts } from '../../lib/blog'
import type { BlogListBlock } from '../../lib/cms/types'

type BlogListProps = {
  block: BlogListBlock
}

export function BlogList({ block }: BlogListProps) {
  const [searchInput, setSearchInput] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [showAllPosts, setShowAllPosts] = useState(false)
  const visiblePosts = getVisibleBlogPosts(
    block.items,
    submittedSearch,
    showAllPosts
  )
  const isSearching = Boolean(submittedSearch.trim())
  const remainingPostCount = block.items.length - visiblePosts.length
  const shouldShowLoadMore =
    !isSearching && !showAllPosts && remainingPostCount > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedSearch(searchInput)
  }

  function handleSearchInput(value: string) {
    setSearchInput(value)

    if (!value.trim()) {
      setSubmittedSearch('')
    }
  }

  return (
    <section className="blog-list" aria-labelledby="blog-list-title">
      <h2 id="blog-list-title" className="blog-list__title">
        {block.title}
      </h2>
      <form className="blog-list__search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="blog-search">
          Search posts by title
        </label>
        <input
          id="blog-search"
          name="search"
          type="search"
          placeholder="Search posts..."
          value={searchInput}
          onChange={(event) => handleSearchInput(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="blog-list__grid">
        {visiblePosts.map((post) => (
          <BlogCard key={post._uid} post={post} />
        ))}
        {shouldShowLoadMore ? (
          <div className="blog-list__load-more">
            <p>
              + {remainingPostCount} more{' '}
              {remainingPostCount === 1 ? 'post' : 'posts'} from{' '}
              <code>page.json</code>
            </p>
            <button type="button" onClick={() => setShowAllPosts(true)}>
              Load posts
            </button>
          </div>
        ) : null}
      </div>
      {visiblePosts.length === 0 ? (
        <p className="blog-list__empty">No posts match your search.</p>
      ) : null}
    </section>
  )
}
