// src/app/kb/[slug]/page.tsx
import { getArticle } from '@/lib/notion';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getArticle(params.slug);
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const data = await getArticle(params.slug);

  if (!data) {
    notFound();
  }

  const { article, content } = data;

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <Card>
        <article className="p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{article.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <p>{format(new Date(article.publishedDate), 'MMMM d, yyyy')}</p>
              <Badge variant="outline">{article.category}</Badge>
            </div>
          </header>
          <div className="prose dark:prose-invert max-w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>
      </Card>
    </div>
  );
}
