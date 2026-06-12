'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const EXTERNAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Swarm-Squad' },
  { label: 'YouTube', href: 'https://www.youtube.com/@sang-buster' },
];

export function SiteNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const onDocs = pathname.startsWith('/docs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-sm font-mono text-xs font-semibold tracking-[0.25em] transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:text-sm"
        >
          <Image
            src="/favicon.svg"
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="h-6 w-6 shrink-0 contrast-125 dark:invert"
          />
          SWARM SQUAD
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 sm:flex sm:gap-7">
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
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill="currentColor" />
            </svg>
          </button>
        </nav>

        <div className="sm:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95',
                  mobileMenuOpen && 'bg-secondary/60 text-foreground'
                )}
              >
                <span className="relative block h-3.5 w-3.5" aria-hidden>
                  <span
                    className={cn(
                      'absolute left-0 top-[2px] h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out',
                      mobileMenuOpen && 'top-1/2 -translate-y-1/2 rotate-45'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-200 ease-out',
                      mobileMenuOpen && 'opacity-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute bottom-[2px] left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ease-out',
                      mobileMenuOpen && 'bottom-1/2 translate-y-1/2 -rotate-45'
                    )}
                  />
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto border-border/60 p-6">
              <SheetHeader className="text-left">
                <SheetTitle className="font-mono text-xs font-semibold tracking-[0.25em]">
                  MENU
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile main" className="mt-6 space-y-0.5 border-l border-border/60">
                {EXTERNAL_LINKS.map(link => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-ml-px block border-l border-transparent py-2 pl-4 pr-2 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/docs"
                    aria-current={onDocs ? 'page' : undefined}
                    className={cn(
                      '-ml-px block border-l py-2 pl-4 pr-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                      onDocs
                        ? 'border-foreground font-medium text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    Docs
                  </Link>
                </SheetClose>
              </nav>

              <div className="mt-6 border-t border-border/60 pt-4">
                <SheetClose asChild>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <span>{resolvedTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}</span>
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <circle
                        cx="8"
                        cy="8"
                        r="6.25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill="currentColor" />
                    </svg>
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
