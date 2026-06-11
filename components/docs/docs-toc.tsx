'use client';

import { useEffect, useState } from 'react';
import type { DocHeading } from '@/lib/docs';
import { cn } from '@/lib/utils';

export function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Highlight the first visible heading, in document order.
        for (const heading of headings) {
          if (visible.has(heading.id)) {
            setActiveId(heading.id);
            return;
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        On this page
      </h4>
      <ul className="mt-3 space-y-0.5 border-l border-border/60 text-sm">
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                '-ml-px block border-l py-1 pr-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                heading.level === 3 ? 'pl-7' : 'pl-4',
                activeId === heading.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
