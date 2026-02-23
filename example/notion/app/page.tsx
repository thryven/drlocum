import { getEvents } from "@/lib/notion";
import { EventCard } from "@/components/event-card";
import { Calendar } from "lucide-react";

export const revalidate = 60;

export default async function BlogPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-12 md:py-16">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Calendar className="size-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              Events
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Upcoming Events
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Stay up to date with our latest events, workshops, and community
            gatherings.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Calendar className="size-12 text-muted-foreground/40" />
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium text-foreground">
                No events yet
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon for upcoming events.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
