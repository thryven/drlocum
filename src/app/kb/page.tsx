// src/app/kb/page.tsx
import { ArticleList } from '@/features/knowledge-base/components/article-list'

export const metadata = {
  title: 'Knowledge Base | Doses',
  description: 'A collection of medical information and clinical resources.',
}

export default function KnowledgeBasePage() {
  return <ArticleList />
}
