// src/app/kb/page.tsx
import Link from 'next/link';
import { getPublishedArticles, type Article } from '@/lib/notion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const metadata = {
  title: 'Knowledge Base | Doses',
  description: 'A collection of medical information and clinical resources.',
}

export default async function KnowledgeBasePage() {
  const articles = await getPublishedArticles();

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground mt-2">
          Curated medical articles and clinical resources.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles published yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article: Article) => (
            <Link href={`/kb/${article.slug}`} key={article.id} className="focus-visible-ring rounded-lg group">
              <Card className="h-full transition-colors group-hover:border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">{article.title}</CardTitle>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <CardDescription>{article.summary}</CardDescription>
                  <p className="text-xs text-muted-foreground pt-2">
                    {format(new Date(article.publishedDate), 'MMMM d, yyyy')}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
