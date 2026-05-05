import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { CmsPageData, CmsStory } from './types'

const projectRoot = process.cwd()
const pageSources = [
  join(projectRoot, 'page.json'),
  ...getJsonFiles(join(projectRoot, 'content', 'pages'))
]

function getJsonFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => join(directory, fileName))
}

function readCmsPage(filePath: string): CmsPageData {
  return JSON.parse(readFileSync(filePath, 'utf8')) as CmsPageData
}

function getPages(): CmsPageData[] {
  return pageSources.map(readCmsPage)
}

export function getPageBySlug(slug: string): CmsStory | null {
  return getPages().find((page) => page.story.slug === slug)?.story ?? null
}

export function getPageSlugs(): string[] {
  return getPages().map((page) => page.story.slug)
}
