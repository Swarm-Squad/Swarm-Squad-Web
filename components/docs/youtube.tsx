export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <figure className="my-8">
      <div className="aspect-video overflow-hidden rounded-lg border border-border/60 bg-secondary/20">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {title}
      </figcaption>
    </figure>
  );
}
