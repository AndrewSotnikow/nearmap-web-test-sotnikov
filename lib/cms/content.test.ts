import { describe, expect, it } from 'vitest'
import { getPageBySlug, getPageSlugs } from './content'

describe('content loader', () => {
  it('loads pages by CMS slug', () => {
    const page = getPageBySlug('ground-truth')

    expect(page?.name).toBe('Ground Truth')
    expect(page?.content.body).toHaveLength(2)
  })

  it('returns null for missing pages', () => {
    expect(getPageBySlug('missing-page')).toBeNull()
  })

  it('exposes known slugs for static generation', () => {
    expect(getPageSlugs()).toContain('ground-truth')
  })
})
