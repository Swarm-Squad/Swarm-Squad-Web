'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav';
import { DocsSearchIconButton } from '@/components/docs/docs-search';
import { cn } from '@/lib/utils';

function MenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex items-center gap-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Open docs navigation"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2.5 4.5h11" />
          <path d="M2.5 8h7" />
          <path d="M2.5 11.5h9" />
        </svg>
        Menu
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto border-border/60 p-6">
        <SheetHeader className="text-left">
          <SheetTitle className="font-mono text-xs font-semibold tracking-[0.25em]">
            DOCS
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <DocsSidebarNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

type PageHeading = { id: string; text: string; level: number };

/**
 * "On this page" dropdown. Headings are read from the rendered article DOM.
 * The popup spans the full width of the nearest positioned ancestor, so the
 * parent row/bar must be `relative` (or otherwise positioned).
 */
export function OnThisPage({ className }: { className?: string }) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<PageHeading[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const elements = document.querySelectorAll('#docs-article h2[id], #docs-article h3[id]');
    setHeadings(
      Array.from(elements).map(el => ({
        id: el.id,
        text: (el.textContent ?? '').replace(/\s*#\s*$/, '').trim(),
        level: el.tagName === 'H2' ? 2 : 3,
      }))
    );
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-sm font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        On this page
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn('h-3 w-3 transition-transform duration-300', open && 'rotate-180')}
        >
          <path d="M3.5 6 8 10.5 12.5 6" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close table of contents"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          {/* Full-width popup, anchored to the positioned parent bar/row */}
          <div className="absolute inset-x-0 top-[calc(100%+1px)] z-50 max-h-[min(60vh,420px)] overflow-y-auto rounded-b-lg border border-border bg-popover p-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setOpen(false);
              }}
              className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary/60"
            >
              Return to top
            </button>
            <div aria-hidden className="mx-3 my-1 h-px bg-border/60" />
            <ul>
              {headings.map(heading => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground',
                      heading.level === 3 && 'pl-7'
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

/** Mobile-only sticky bar: Menu left, search + On this page right. */
export function DocsTopBar() {
  return (
    <div className="sticky top-14 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md lg:hidden">
      <div className="relative mx-auto flex h-11 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <MenuButton />
        <div className="flex-1" />
        <DocsSearchIconButton />
        <OnThisPage />
      </div>
    </div>
  );
}
