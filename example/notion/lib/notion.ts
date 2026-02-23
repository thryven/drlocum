import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = "3102b197c4f1809ba46fd823432ebf80";

// ---- Types ----

export interface EventPost {
  id: string;
  slug: string;
  title: string;
  date: string | null;
  endDate: string | null;
  description: string;
  coverImage: string | null;
  tags: string[];
  location: string | null;
  status: string | null;
  lastEdited: string;
}

// ---- Helpers ----

function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return null;
}

function getPropertyValue(
  page: PageObjectResponse,
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const props = page.properties;
  // Case-insensitive property lookup
  const key = Object.keys(props).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  if (!key) return undefined;
  return props[key];
}

function extractTitle(page: PageObjectResponse): string {
  const props = page.properties;
  for (const key of Object.keys(props)) {
    const prop = props[key];
    if (prop.type === "title") {
      return extractPlainText(prop.title);
    }
  }
  return "Untitled";
}

function extractDate(page: PageObjectResponse): {
  start: string | null;
  end: string | null;
} {
  const prop =
    getPropertyValue(page, "Date") ??
    getPropertyValue(page, "Event Date") ??
    getPropertyValue(page, "date");
  if (prop?.type === "date" && prop.date) {
    return { start: prop.date.start, end: prop.date.end };
  }
  return { start: null, end: null };
}

function extractDescription(page: PageObjectResponse): string {
  const prop =
    getPropertyValue(page, "Description") ??
    getPropertyValue(page, "Summary") ??
    getPropertyValue(page, "description");
  if (prop?.type === "rich_text") {
    return extractPlainText(prop.rich_text);
  }
  return "";
}

function extractTags(page: PageObjectResponse): string[] {
  const prop =
    getPropertyValue(page, "Tags") ??
    getPropertyValue(page, "Category") ??
    getPropertyValue(page, "Type") ??
    getPropertyValue(page, "tags");
  if (prop?.type === "multi_select") {
    return prop.multi_select.map(
      (s: { name: string }) => s.name
    );
  }
  if (prop?.type === "select" && prop.select) {
    return [prop.select.name];
  }
  return [];
}

function extractLocation(page: PageObjectResponse): string | null {
  const prop =
    getPropertyValue(page, "Location") ??
    getPropertyValue(page, "Venue") ??
    getPropertyValue(page, "location");
  if (prop?.type === "rich_text") {
    const text = extractPlainText(prop.rich_text);
    return text || null;
  }
  if (prop?.type === "url") {
    return prop.url;
  }
  return null;
}

function extractStatus(page: PageObjectResponse): string | null {
  const prop =
    getPropertyValue(page, "Status") ??
    getPropertyValue(page, "status");
  if (prop?.type === "status" && prop.status) {
    return prop.status.name;
  }
  if (prop?.type === "select" && prop.select) {
    return prop.select.name;
  }
  return null;
}

function pageToEventPost(page: PageObjectResponse): EventPost {
  const title = extractTitle(page);
  const { start, end } = extractDate(page);
  return {
    id: page.id,
    slug: slugify(title) || page.id,
    title,
    date: start,
    endDate: end,
    description: extractDescription(page),
    coverImage: getCoverUrl(page),
    tags: extractTags(page),
    location: extractLocation(page),
    status: extractStatus(page),
    lastEdited: page.last_edited_time,
  };
}

// ---- Data Fetching ----

export async function getEvents(): Promise<EventPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    ],
    page_size: 100,
  });

  return response.results
    .filter((page): page is PageObjectResponse => "properties" in page)
    .map(pageToEventPost);
}

export async function getEventBySlug(
  slug: string
): Promise<EventPost | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getEventBlocks(
  pageId: string
): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(
      ...response.results.filter(
        (b): b is BlockObjectResponse => "type" in b
      )
    );

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}
