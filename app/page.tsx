import { SiteNav } from '@/components/site-nav';
import { Hero } from '@/components/hero';
import { ProductLineup } from '@/components/product-lineup';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <ProductLineup />
      </main>
      <SiteFooter />
    </div>
  );
}
