import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function Loading() {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-border/60"
            >
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-1.5 pt-1">
                  <Skeleton className="h-5 w-14 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
