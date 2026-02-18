// src/app/blog/[slug]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

// Generate static paths for all blog posts at build time
export async function generateStaticParams() {
  try {
    const filenames = await fs.readdir(postsDirectory);
    return filenames
      .filter((filename) => filename.endsWith('.html'))
      .map((filename) => ({
        slug: filename.replace(/\.html$/, ''),
      }));
  } catch (error) {
    // If the directory doesn't exist, return no paths
    return [];
  }
}

// Fetch the content of a specific post
async function getPostContent(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.html`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    // Extract only the content within the <body> tag
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : content;
    return { content: bodyContent, rawHtml: content };
  } catch (error) {
    return null;
  }
}

// Generate metadata (title, description) for each blog post page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostContent(params.slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }
    const titleMatch = post.rawHtml.match(/<h1.*?>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1] : 'Blog Post';

    const descriptionMatch = post.rawHtml.match(/<p.*?>(.*?)<\/p>/i);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    return {
        title: `${title} | Doses Blog`,
        description,
    };
}

// The page component to render a single blog post
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostContent(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div 
      className="prose dark:prose-invert max-w-none" 
      dangerouslySetInnerHTML={{ __html: post.content }} 
    />
  );
}
