import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-8 md:py-12">
        <Skeleton className="mb-8 h-4 w-32" />

        <Skeleton className="mb-8 aspect-[2/1] w-full rounded-xl" />

        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>

        <div className="border-t border-border/60 pt-8">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-4 w-full"
                style={{ width: `${70 + Math.random() * 30}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
