// src/app/kb/[slug]/page.tsx

import { format } from 'date-fns'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { NotionRenderer } from '@/components/ui/notion-renderer'
import { getArticle, getPublishedArticles } from '@/lib/notion'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
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
  const { slug } = await params
  const data = await getArticle(slug)

  if (!data) {
    notFound()
  }

  const { article, blocks } = data

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <Link
        href='/kb'
        className='group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
      >
        <ArrowLeft className='size-4 transition-transform group-hover:-translate-x-0.5' />
        Back to Knowledge Base
      </Link>
      <article className='p-6 md:p-8 bg-card rounded-lg border'>
        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-3'>{article.title}</h1>
          <div className='flex items-center gap-4 text-muted-foreground text-sm'>
            <p>{format(new Date(article.publishedDate), 'MMMM d, yyyy')}</p>
            <Badge variant='outline'>{article.category}</Badge>
          </div>
        </header>
        <NotionRenderer blocks={blocks} />
      </article>
    </div>
  )
}
