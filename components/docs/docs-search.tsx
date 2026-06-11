'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { SearchRecord } from '@/lib/docs';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------------ */
/* Local index loading                                                      */
/* ------------------------------------------------------------------------ */

let indexCache: SearchRecord[] | null = null;

async function loadIndex(): Promise<SearchRecord[]> {
  if (!indexCache) {
    const res = await fetch('/docs-index.json');
    indexCache = (await res.json()) as SearchRecord[];
  }
  return indexCache;
}

/* ------------------------------------------------------------------------ */
/* Search scoring                                                           */
/* ------------------------------------------------------------------------ */

type SearchResult = SearchRecord & { score: number; excerpt: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scoreRecord(record: SearchRecord, tokens: string[]): number {
  const page = record.page.toLowerCase();
  const heading = (record.heading ?? '').toLowerCase();
  const text = record.text.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    const inPage = page.includes(token);
    const inHeading = heading.includes(token);

    let count = 0;
    let pos = text.indexOf(token);
    while (pos !== -1 && count < 5) {
      count += 1;
      pos = text.indexOf(token, pos + token.length);
    }

    // Every token must appear somewhere (AND semantics).
    if (!inPage && !inHeading && count === 0) return 0;
    score += (inPage ? 8 : 0) + (inHeading ? 5 : 0) + count;
  }
  return score;
}

function makeExcerpt(text: string, tokens: string[]): string {
  if (!text) return '';
  const lower = text.toLowerCase();

  let first = -1;
  for (const token of tokens) {
    const idx = lower.indexOf(token);
    if (idx !== -1 && (first === -1 || idx < first)) first = idx;
  }
  if (first === -1) return text.slice(0, 140);

  const start = Math.max(0, first - 50);
  const slice = text.slice(start, start + 170);
  return `${start > 0 ? '… ' : ''}${slice}${start + 170 < text.length ? ' …' : ''}`;
}

function searchDocs(index: SearchRecord[], query: string): SearchResult[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];
  for (const record of index) {
    const score = scoreRecord(record, tokens);
    if (score > 0) {
      results.push({ ...record, score, excerpt: makeExcerpt(record.text, tokens) });
    }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 12);
}

/* ------------------------------------------------------------------------ */
/* Highlighting                                                             */
/* ------------------------------------------------------------------------ */

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0 || !text) return <>{text}</>;
  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-[3px] bg-foreground/20 px-0.5 text-foreground">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Icons                                                                    */
/* ------------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.75" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Context: one dialog + one hotkey shared by all triggers                  */
/* ------------------------------------------------------------------------ */

const DocsSearchContext = createContext<{ openSearch: () => void }>({
  openSearch: () => {},
});

export function DocsSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Global Ctrl/Cmd+K hotkey.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(value => !value);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <DocsSearchContext.Provider value={{ openSearch: () => setOpen(true) }}>
      {children}
      <SearchDialog open={open} onOpenChange={setOpen} />
    </DocsSearchContext.Provider>
  );
}

/** Full-width input lookalike for desktop. */
export function DocsSearchBar({ className }: { className?: string }) {
  const { openSearch } = useContext(DocsSearchContext);
  const [modKey, setModKey] = useState('Ctrl');

  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)) {
      setModKey('⌘');
    }
  }, []);

  return (
    <button
      type="button"
      onClick={openSearch}
      className={cn(
        'flex h-9 w-full items-center gap-2.5 rounded-md border border-border/70 bg-secondary/30 px-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className
      )}
    >
      <SearchIcon className="h-3.5 w-3.5 shrink-0" />
      <span>Search documentation…</span>
      <kbd className="ml-auto rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        {modKey} K
      </kbd>
    </button>
  );
}

/** Compact icon trigger for the mobile bar. */
export function DocsSearchIconButton({ className }: { className?: string }) {
  const { openSearch } = useContext(DocsSearchContext);

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search documentation"
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className
      )}
    >
      <SearchIcon className="h-4 w-4" />
    </button>
  );
}

/* ------------------------------------------------------------------------ */
/* Dialog                                                                   */
/* ------------------------------------------------------------------------ */

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchRecord[] | null>(null);
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Lazy-load the local index the first time the dialog opens.
  useEffect(() => {
    if (open && !index) {
      loadIndex()
        .then(setIndex)
        .catch(() => setIndex([]));
    }
    if (open) {
      setQuery('');
      setSelected(0);
    }
  }, [open, index]);

  const tokens = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);
  const results = useMemo(
    () => (index && query.trim() ? searchDocs(index, query) : []),
    [index, query]
  );

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [selected, results]);

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelected(value => Math.min(value + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected(value => Math.max(value - 1, 0));
    } else if (event.key === 'Enter' && results[selected]) {
      event.preventDefault();
      navigate(results[selected].href);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-3 z-50 w-[calc(100vw-1.5rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-background focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 sm:top-[10vh]">
          <DialogPrimitive.Title className="sr-only">Search documentation</DialogPrimitive.Title>

          <div className="flex items-center gap-2.5 border-b border-border/60 px-3.5">
            <DialogPrimitive.Close
              aria-label="Close search"
              className="-ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground sm:hidden"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M10 3.5 5.5 8 10 12.5" />
              </svg>
            </DialogPrimitive.Close>
            <SearchIcon className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
            <input
              autoFocus
              value={query}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search documentation…"
              aria-label="Search documentation"
              className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="m4 4 8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
            <kbd className="hidden rounded border border-border bg-secondary/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
              Esc
            </kbd>
          </div>

          <div ref={listRef} className="max-h-[min(64vh,480px)] overflow-y-auto p-2">
            {!query.trim() && (
              <p className="px-3 py-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Type to search the docs
              </p>
            )}

            {query.trim() && index && results.length === 0 && (
              <p className="px-3 py-10 text-center text-sm text-muted-foreground">
                No results for “{query}”
              </p>
            )}

            {query.trim() && !index && (
              <p className="px-3 py-10 text-center text-sm text-muted-foreground">Loading index…</p>
            )}

            <div className="space-y-2">
              {results.map((result, i) => (
                <a
                  key={`${result.href}-${i}`}
                  href={result.href}
                  data-selected={i === selected}
                  onMouseMove={() => setSelected(i)}
                  onClick={event => {
                    event.preventDefault();
                    navigate(result.href);
                  }}
                  className={cn(
                    'block rounded-lg border border-border/60 px-3.5 py-3 transition-colors',
                    i === selected && 'border-foreground/50 bg-secondary/40'
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                    <span aria-hidden className="font-mono text-muted-foreground/60">
                      #
                    </span>
                    <span className="truncate">
                      <Highlight text={result.page} tokens={tokens} />
                    </span>
                    {result.heading && (
                      <>
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 text-muted-foreground/60"
                        >
                          <path d="m6 3.5 4.5 4.5L6 12.5" />
                        </svg>
                        <span className="truncate text-muted-foreground">
                          <Highlight text={result.heading} tokens={tokens} />
                        </span>
                      </>
                    )}
                  </div>
                  {result.excerpt && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      <Highlight text={result.excerpt} tokens={tokens} />
                    </p>
                  )}
                </a>
              ))}
            </div>

            {results.length > 0 && (
              <p className="mt-3 border-t border-border/60 px-3 pb-1 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                ↑↓ to navigate · Enter to open · Esc to close
              </p>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
