// src/lib/notion.ts
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const databaseId = process.env.NOTION_DATABASE_ID!;

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedDate: string;
}

function pageToArticle(page: PageObjectResponse): Article {
  const props = page.properties;
  const title = (props.Name?.type === 'title' && props.Name.title[0]?.plain_text) || '';
  const slug = (props.Slug?.type === 'rich_text' && props.Slug.rich_text[0]?.plain_text) || '';
  const summary = (props.Summary?.type === 'rich_text' && props.Summary.rich_text[0]?.plain_text) || '';
  const category = (props.Category?.type === 'select' && props.Category.select?.name) || 'Uncategorized';
  const publishedDate = (props.PublishedDate?.type === 'date' && props.PublishedDate.date?.start) || new Date().toISOString();

  return { id: page.id, title, slug, summary, category, publishedDate };
}


export async function getPublishedArticles(): Promise<Article[]> {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn("Notion API key or Database ID not set. Returning empty array.");
    return [];
  }
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    });
    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page && page.object === 'page')
      .map(pageToArticle);
  } catch (error) {
    console.error("Failed to fetch articles from Notion:", error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<{ article: Article, content: string } | null> {
  if (!slug || !databaseId || !process.env.NOTION_API_KEY) {
    return null;
  }
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }
    const page = response.results[0];
    if (!page) {
      return null;
    }
    if (!('properties' in page) || page.object !== 'page') {
      return null;
    }

    const article = pageToArticle(page);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      article,
      content: mdString.parent ?? '',
    };
  } catch (error) {
    console.error(`Failed to fetch article for slug "${slug}" from Notion:`, error);
    return null;
  }
}
