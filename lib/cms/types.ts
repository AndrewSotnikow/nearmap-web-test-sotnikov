export type CmsPageData = {
  story: CmsStory
}

export type CmsStory = {
  id: number
  name: string
  slug: string
  content: PageBlock
}

export type PageBlock = {
  component: 'page'
  body: CmsBlock[]
}

export type CmsBlock = SectionTitleBlock | BlogListBlock

export type SectionTitleBlock = {
  _uid: string
  component: 'section_title'
  title: string
  subtitle: string
  description: string
}

export type BlogListBlock = {
  _uid: string
  component: 'blog_list'
  title: string
  items: BlogPost[]
}

export type BlogPost = {
  _uid: string
  thumbnail_url: string
  thumbnail_alt: string
  title: string
  excerpt?: string
  date: string | null
  url: string
}
