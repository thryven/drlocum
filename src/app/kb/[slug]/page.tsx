// src/app/kb/[slug]/page.tsx
import type { Metadata } from 'next'
import { ArticleDetail } from '@/features/knowledge-base/components/article-detail'
import { getArticle, getPublishedArticles } from '@/features/knowledge-base/lib/notion'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const data = await getArticle(slug)
  if (!data) {
    return {
      title: 'Article Not Found',
    }
  }
  return {
    title: `${data.article.title} | Doses`,
    description: data.article.summary,
  }
}

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  return <ArticleDetail slug={params.slug} />
}
