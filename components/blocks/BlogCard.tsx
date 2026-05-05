import type { BlogPost } from '../../lib/cms/types'
import { formatPostDate } from '../../lib/blog'

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = formatPostDate(post.date)

  return (
    <article className="blog-card">
      <img
        className="blog-card__image"
        src={post.thumbnail_url}
        alt={post.thumbnail_alt}
      />
      <div className="blog-card__content">
        {formattedDate ? (
          <time className="blog-card__date" dateTime={post.date ?? undefined}>
            {formattedDate}
          </time>
        ) : null}
        <h3 className="blog-card__title">{post.title}</h3>
        {post.excerpt ? (
          <p className="blog-card__excerpt">{post.excerpt}</p>
        ) : null}
        <a className="blog-card__link" href={post.url}>
          Read more <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </article>
  )
}
