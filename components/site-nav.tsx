'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const EXTERNAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Swarm-Squad' },
  { label: 'YouTube', href: 'https://www.youtube.com/@sang-buster' },
];

export function SiteNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const onDocs = pathname.startsWith('/docs');

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm font-mono text-xs font-semibold tracking-[0.25em] transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm"
        >
          SWARM SQUAD
        </Link>

        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7">
          {EXTERNAL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/docs"
            aria-current={onDocs ? 'page' : undefined}
            className={cn(
              'rounded-sm text-xs transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm',
              onDocs ? 'font-medium text-foreground' : 'text-muted-foreground'
            )}
          >
            Docs
          </Link>

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill="currentColor" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
