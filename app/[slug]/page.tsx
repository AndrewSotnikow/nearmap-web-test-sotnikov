import { notFound } from 'next/navigation'
import { PageRenderer } from '../../components/cms/PageRenderer'
import { getPageBySlug, getPageSlugs } from '../../lib/cms/content'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPageSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return {}
  }

  return {
    title: page.name
  }
}

export default async function CmsPage({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return <PageRenderer page={page} />
}
