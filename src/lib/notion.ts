// src/lib/notion.ts
import { Client } from '@notionhq/client';
import type { BlockObjectResponse, PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY || '',
});

const databaseId = process.env.NOTION_DATABASE_ID!;

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedDate: string;
}

// ---- Helper Functions ----

function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join('');
}

function slugify(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPropertyValue(page: PageObjectResponse, name: string): any {
    const props = page.properties;
    // Case-insensitive property lookup
    const key = Object.keys(props).find(
      (k) => k.toLowerCase() === name.toLowerCase()
    );
    if (!key) return undefined;
    return props[key];
}

function pageToArticle(page: PageObjectResponse): Article {
  const titleProp = getPropertyValue(page, 'Name');
  const slugProp = getPropertyValue(page, 'Slug');
  const summaryProp = getPropertyValue(page, 'Summary');
  const categoryProp = getPropertyValue(page, 'Category');
  const publishedDateProp = getPropertyValue(page, 'PublishedDate');

  const title = (titleProp?.type === 'title' && extractPlainText(titleProp.title)) || '';
  
  // Try to get slug from 'Slug' property, otherwise generate from title.
  const slugSource = (slugProp?.type === 'rich_text' && extractPlainText(slugProp.rich_text)) || title;
  const slug = slugify(slugSource) || page.id;

  const summary = (summaryProp?.type === 'rich_text' && extractPlainText(summaryProp.rich_text)) || '';
  const category = (categoryProp?.type === 'select' && categoryProp.select?.name) || 'Uncategorized';
  const publishedDate = (publishedDateProp?.type === 'date' && publishedDateProp.date?.start) || new Date().toISOString();

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

export async function getArticle(slug: string): Promise<{ article: Article; blocks: BlockObjectResponse[] } | null> {
  if (!slug) {
    return null;
  }
  try {
    const articles = await getPublishedArticles();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
      return null;
    }

    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined = undefined;

    do {
        const response = await notion.blocks.children.list({
            block_id: article.id,
            start_cursor: cursor,
            page_size: 100, // Notion's max page size
        });

        blocks.push(
            ...response.results.filter(
                (b): b is BlockObjectResponse => 'type' in b
            )
        );

        cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);


    return {
      article,
      blocks,
    };
  } catch (error) {
    console.error(`Failed to fetch article for slug "${slug}" from Notion:`, error);
    return null;
  }
}
