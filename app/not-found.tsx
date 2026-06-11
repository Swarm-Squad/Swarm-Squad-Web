import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Drone } from '@/components/drone';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Drone className="w-40 text-muted-foreground/60" />
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        404 — Signal lost
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
        This page is off the grid
      </h1>
      <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="transition-transform active:scale-[0.98]">
          <Link href="/">Back to home</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-transparent transition-transform active:scale-[0.98]"
        >
          <Link href="/docs">Read the docs</Link>
        </Button>
      </div>
    </div>
  );
}
