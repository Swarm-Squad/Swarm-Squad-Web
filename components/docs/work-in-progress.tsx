import { Drone } from '@/components/drone';

export function WorkInProgress({ repo }: { repo: string }) {
  return (
    <div className="my-10 rounded-lg border border-dashed border-border px-6 py-14 text-center">
      <Drone className="mx-auto w-24 text-muted-foreground/50" />
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        Page under construction
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        This section hasn&apos;t been written yet. Watch the{' '}
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
        >
          repository
        </a>{' '}
        for updates.
      </p>
    </div>
  );
}
