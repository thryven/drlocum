import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "@/lib/utils";

function renderRichText(richText: RichTextItemResponse[]) {
  return richText.map((text, i) => {
    if (text.type !== "text") {
      return <span key={i}>{text.plain_text}</span>;
    }

    let content: React.ReactNode = text.plain_text;

    if (text.annotations.bold) {
      content = <strong key={`b-${i}`}>{content}</strong>;
    }
    if (text.annotations.italic) {
      content = <em key={`i-${i}`}>{content}</em>;
    }
    if (text.annotations.strikethrough) {
      content = <s key={`s-${i}`}>{content}</s>;
    }
    if (text.annotations.underline) {
      content = <u key={`u-${i}`}>{content}</u>;
    }
    if (text.annotations.code) {
      content = (
        <code
          key={`c-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
        >
          {content}
        </code>
      );
    }

    if (text.text.link) {
      return (
        <a
          key={i}
          href={text.text.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {content}
        </a>
      );
    }

    return <span key={i}>{content}</span>;
  });
}

function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph":
      if (block.paragraph.rich_text.length === 0) {
        return <div className="h-4" />;
      }
      return (
        <p className="leading-relaxed text-foreground">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    case "heading_1":
      return (
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-2 text-balance">
          {renderRichText(block.heading_1.rich_text)}
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-xl font-semibold tracking-tight text-foreground mt-6 mb-2 text-balance">
          {renderRichText(block.heading_2.rich_text)}
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-lg font-semibold text-foreground mt-4 mb-1 text-balance">
          {renderRichText(block.heading_3.rich_text)}
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li className="ml-6 list-disc leading-relaxed text-foreground">
          {renderRichText(block.bulleted_list_item.rich_text)}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="ml-6 list-decimal leading-relaxed text-foreground">
          {renderRichText(block.numbered_list_item.rich_text)}
        </li>
      );

    case "to_do":
      return (
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            readOnly
            className="mt-1.5 size-4 rounded border-border"
          />
          <span
            className={cn(
              "leading-relaxed",
              block.to_do.checked && "text-muted-foreground line-through"
            )}
          >
            {renderRichText(block.to_do.rich_text)}
          </span>
        </div>
      );

    case "toggle":
      return (
        <details className="group">
          <summary className="cursor-pointer font-medium text-foreground leading-relaxed">
            {renderRichText(block.toggle.rich_text)}
          </summary>
        </details>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground leading-relaxed">
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );

    case "callout":
      return (
        <div className="flex gap-3 rounded-lg border bg-muted/50 p-4">
          {block.callout.icon?.type === "emoji" && (
            <span className="text-xl" role="img">
              {block.callout.icon.emoji}
            </span>
          )}
          <div className="leading-relaxed text-foreground">
            {renderRichText(block.callout.rich_text)}
          </div>
        </div>
      );

    case "code":
      return (
        <div className="rounded-lg border bg-muted/50 overflow-hidden">
          {block.code.language && (
            <div className="border-b bg-muted px-4 py-1.5">
              <span className="text-xs font-mono text-muted-foreground">
                {block.code.language}
              </span>
            </div>
          )}
          <pre className="overflow-x-auto p-4">
            <code className="text-sm font-mono text-foreground leading-relaxed">
              {block.code.rich_text.map((t) => t.plain_text).join("")}
            </code>
          </pre>
        </div>
      );

    case "divider":
      return <hr className="border-border" />;

    case "image": {
      const src =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption =
        block.image.caption.length > 0
          ? block.image.caption.map((t) => t.plain_text).join("")
          : null;
      return (
        <figure className="my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={caption || "Content image"}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl =
        block.video.type === "external"
          ? block.video.external.url
          : block.video.file.url;
      // YouTube / Vimeo embed
      if (
        videoUrl.includes("youtube.com") ||
        videoUrl.includes("youtu.be") ||
        videoUrl.includes("vimeo.com")
      ) {
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={videoUrl}
              className="absolute inset-0 size-full"
              allowFullScreen
              title="Embedded video"
            />
          </div>
        );
      }
      return (
        <video
          src={videoUrl}
          controls
          className="w-full rounded-lg"
        />
      );
    }

    case "bookmark":
      return (
        <a
          href={block.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border p-4 text-sm text-primary underline-offset-4 hover:bg-muted/50 transition-colors"
        >
          {block.bookmark.url}
        </a>
      );

    case "table_of_contents":
      return null;

    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: { blocks: BlockObjectResponse[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
