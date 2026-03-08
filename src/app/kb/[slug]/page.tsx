// src/app/kb/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleDetail } from '@/features/knowledge-base/components/article-detail'
import { getArticle, getPublishedArticles } from '@/features/knowledge-base/lib/notion'

export const revalidate = 60

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
  const data = await getArticle(params.slug)
  if (!data) {
    notFound()
  }
  return <ArticleDetail article={data.article} blocks={data.blocks} />
}
