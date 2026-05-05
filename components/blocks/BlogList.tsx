'use client'

import { FormEvent, useState } from 'react'
import { BlogCard } from './BlogCard'
import { filterPostsByTitle } from '../../lib/blog'
import type { BlogListBlock } from '../../lib/cms/types'

type BlogListProps = {
  block: BlogListBlock
}

export function BlogList({ block }: BlogListProps) {
  const [searchInput, setSearchInput] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const visiblePosts = filterPostsByTitle(block.items, submittedSearch)

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
      </div>
      {visiblePosts.length === 0 ? (
        <p className="blog-list__empty">No posts match your search.</p>
      ) : null}
    </section>
  )
}
