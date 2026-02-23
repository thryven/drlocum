import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
      <p className="text-muted-foreground">
        {"The event you're looking for doesn't exist or may have been removed."}
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4 hover:text-primary/80"
      >
        <ArrowLeft className="size-4" />
        Back to events
      </Link>
    </main>
  );
}
