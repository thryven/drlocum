import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { getEventBySlug, getEventBlocks, getEvents } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { NotionRenderer } from "@/components/notion-renderer";
import type { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.description || `Details for ${event.title}`,
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const blocks = await getEventBlocks(event.id);

  const formattedDate = event.date
    ? format(new Date(event.date), "MMMM d, yyyy")
    : null;

  const formattedEndDate = event.endDate
    ? format(new Date(event.endDate), "MMMM d, yyyy")
    : null;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-8 md:py-12">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to events
        </Link>

        <article>
          {event.coverImage && (
            <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.coverImage}
                alt={event.title}
                className="size-full object-cover"
              />
            </div>
          )}

          <header className="mb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {formattedDate && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {formattedDate}
                  {formattedEndDate && ` - ${formattedEndDate}`}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {event.location}
                </span>
              )}
              {event.status && (
                <Badge variant="outline" className="text-xs">
                  {event.status}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {event.title}
            </h1>

            {event.description && (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            )}

            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {blocks.length > 0 && (
            <div className="border-t border-border/60 pt-8">
              <NotionRenderer blocks={blocks} />
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
