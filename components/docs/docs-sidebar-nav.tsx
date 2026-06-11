'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_NAV, docHref } from '@/lib/docs-nav';
import { cn } from '@/lib/utils';

export function DocsSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="space-y-9">
      {DOCS_NAV.map(group => (
        <div key={group.title}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            {group.title}
          </h4>
          <ul className="mt-3 space-y-0.5 border-l border-border/60">
            {group.items.map(item => {
              const href = docHref(item.slug);
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      '-ml-px block border-l py-1.5 pl-4 pr-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                      active
                        ? 'border-foreground font-medium text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
