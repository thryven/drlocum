
// src/features/knowledge-base/lib/notion.ts
import { Client } from '@notionhq/client'
import type { BlockObjectResponse, PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY || '',
})

// const databaseId = process.env.NOTION_DATABASE_ID!;
const databaseId = '3102b197c4f1809ba46fd823432ebf80'

export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  publishedDate: string
}

// ---- Helper Functions ----

function extractPlainText(richText: RichTextItemResponse[]): string {
  if (!richText) return ''
  return richText.map((t) => t.plain_text).join('')
}

function slugify(text: string): string {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars except -
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPropertyValue(page: PageObjectResponse, name: string): any {
  const props = page.properties
  // Case-insensitive property lookup
  const key = Object.keys(props).find((k) => k.toLowerCase() === name.toLowerCase())
  if (!key) return undefined
  return props[key]
}

// More robust function to find the title property, as seen in the example
function extractTitle(page: PageObjectResponse): string {
  const props = page.properties
  for (const key of Object.keys(props)) {
    const prop = props[key]
    if (prop && prop.type === 'title') {
      return extractPlainText(prop.title)
    }
  }
  return '' // Return empty string for better slug handling
}

function pageToArticle(page: PageObjectResponse): Article {
  const title = extractTitle(page)
  const summaryProp = getPropertyValue(page, 'Summary')
  const categoryProp = getPropertyValue(page, 'Category')
  const publishedDateProp = getPropertyValue(page, 'PublishedDate')

  // Use page ID as slug if title is empty to guarantee a unique slug
  const slug = title ? slugify(title) : page.id

  const summary = (summaryProp?.type === 'rich_text' && extractPlainText(summaryProp.rich_text)) || ''
  const category = (categoryProp?.type === 'select' && categoryProp.select?.name) || 'Uncategorized'
  const publishedDate =
    (publishedDateProp?.type === 'date' && publishedDateProp.date?.start) || new Date().toISOString()

  return { id: page.id, title, slug, summary, category, publishedDate }
}

const getPublishedArticlesFn = async (): Promise<Article[]> => {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn('Notion API key or Database ID not set. Returning empty array.')
    return []
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
    })
    return response.results
      .filter((page): page is PageObjectResponse => 'properties' in page && page.object === 'page')
      .map(pageToArticle)
  } catch (error) {
    console.error('Failed to fetch articles from Notion:', error)
    return []
  }
}
export const getPublishedArticles = cache(getPublishedArticlesFn)

// This function is no longer cached directly to avoid potential nested cache issues.
// It relies on the cached `getPublishedArticles` function.
export const getArticleMeta = async (slug: string): Promise<Article | null> => {
  if (!slug) {
    return null
  }
  try {
    const articles = await getPublishedArticles()
    const article = articles.find((a) => a.slug === slug)
    return article || null
  } catch (error) {
    console.error(`Failed to fetch article metadata for slug "${slug}" from Notion:`, error)
    return null
  }
}

const getArticleContentFn = async (articleId: string): Promise<BlockObjectResponse[]> => {
  if (!articleId) return []
  try {
    const blocks: BlockObjectResponse[] = []
    let cursor: string | undefined

    do {
      const response = await notion.blocks.children.list({
        block_id: articleId,
        page_size: 100, // Notion's max page size
        ...(cursor && { start_cursor: cursor }),
      })

      blocks.push(...response.results.filter((b): b is BlockObjectResponse => 'type' in b))

      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)

    return blocks
  } catch (error) {
    console.error(`Failed to fetch blocks for article ID "${articleId}" from Notion:`, error)
    return [] // Return empty array on error
  }
}
export const getArticleContent = cache(getArticleContentFn)
