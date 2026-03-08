
// src/app/kb/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/features/knowledge-base/components/article-detail'
import { getArticleContent, getArticleMeta, getPublishedArticles } from '@/features/knowledge-base/lib/notion'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const article = await getArticleMeta(slug)
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }
  return {
    title: `${article.title} | Doses`,
    description: article.summary,
  }
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleMeta(params.slug)
  if (!article) {
    notFound()
  }

  const blocks = await getArticleContent(article.id)

  return <ArticleDetail article={article} blocks={blocks} />
}
