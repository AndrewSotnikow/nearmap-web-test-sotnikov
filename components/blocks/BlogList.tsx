import type { BlogListBlock } from '../../lib/cms/types'

type BlogListProps = {
  block: BlogListBlock
}

export function BlogList({ block }: BlogListProps) {
  return (
    <section>
      <h2>{block.title}</h2>
      <div>
        {block.items.map((item) => (
          <article key={item._uid}>
            <img src={item.thumbnail_url} alt={item.thumbnail_alt} />
            {item.date ? <time dateTime={item.date}>{item.date}</time> : null}
            <h3>{item.title}</h3>
            {item.excerpt ? <p>{item.excerpt}</p> : null}
            <a href={item.url}>Read more</a>
          </article>
        ))}
      </div>
    </section>
  )
}
