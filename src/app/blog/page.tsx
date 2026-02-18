// src/app/blog/page.tsx
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata = {
  title: 'Blog | Doses',
  description: 'Clinical articles and updates.',
};

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  try {
    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith('.html'))
        .map(async (filename) => {
          const filePath = path.join(postsDirectory, filename);
          const content = await fs.readFile(filePath, 'utf-8');
          
          const titleMatch = content.match(/<h1.*?>(.*?)<\/h1>/i);
          const title = titleMatch ? titleMatch[1].trim() : 'Untitled Post';

          const descriptionMatch = content.match(/<p.*?>(.*?)<\/p>/i);
          const description = descriptionMatch ? descriptionMatch[1].trim() : 'No description available.';

          const slug = filename.replace(/\.html$/, '');

          return { slug, title, description };
        })
    );
    return posts;
  } catch (error) {
    // If the directory doesn't exist, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        return [];
    }
    console.error('Could not read blog posts:', error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-2">A collection of clinical articles and updates.</p>
      </header>

      {posts.length === 0 ? (
        <p>No blog posts have been added yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="focus-visible-ring rounded-lg">
              <Card interactive>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
