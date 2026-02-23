import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EventPost } from "@/lib/notion";

export function EventCard({ event }: { event: EventPost }) {
  const formattedDate = event.date
    ? format(new Date(event.date), "MMM d, yyyy")
    : null;

  return (
    <Link href={`/blog/${event.slug}`} className="group block">
      <Card className="overflow-hidden border-border/60 py-0 transition-all duration-300 hover:border-border hover:shadow-md">
        {event.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.coverImage}
              alt={event.title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {formattedDate && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3.5" />
                {formattedDate}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {event.location}
              </span>
            )}
          </div>

          <h2 className="text-lg font-semibold leading-snug text-foreground text-balance group-hover:text-primary/80 transition-colors">
            {event.title}
          </h2>

          {event.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          )}

          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
