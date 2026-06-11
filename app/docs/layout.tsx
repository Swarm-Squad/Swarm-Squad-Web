import type { Metadata } from 'next';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { DocsSidebarNav } from '@/components/docs/docs-sidebar-nav';
import { DocsTopBar } from '@/components/docs/docs-topbar';
import { DocsSearchProvider } from '@/components/docs/docs-search';

export const metadata: Metadata = {
  title: 'Documentation',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#docs-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteNav />
      <DocsSearchProvider>
        <div className="pt-14">
          <DocsTopBar />
          <div className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="hidden border-r border-border/60 lg:block">
              <div className="sticky top-14 max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-12 pr-6">
                <DocsSidebarNav />
              </div>
            </aside>
            <main id="docs-content" className="min-w-0">
              {children}
            </main>
          </div>
        </div>
      </DocsSearchProvider>
      <SiteFooter />
    </div>
  );
}
