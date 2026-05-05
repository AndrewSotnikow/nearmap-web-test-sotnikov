import pageJson from '../../page.json'
import type { CmsPageData, CmsStory } from './types'

const pages: CmsPageData[] = [pageJson as CmsPageData]

export function getPageBySlug(slug: string): CmsStory | null {
  return pages.find((page) => page.story.slug === slug)?.story ?? null
}

export function getPageSlugs(): string[] {
  return pages.map((page) => page.story.slug)
}
