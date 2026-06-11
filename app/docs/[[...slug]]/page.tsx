import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';
import { getAllDocSlugs, getDoc, getDocNavigation } from '@/lib/docs';
import { docHref } from '@/lib/docs-nav';
import { mdxComponents } from '@/components/docs/mdx-components';
import { DocsToc } from '@/components/docs/docs-toc';
import { DocsSearchBar } from '@/components/docs/docs-search';
import { OnThisPage } from '@/components/docs/docs-topbar';

type Params = Promise<{ slug?: string[] }>;

export async function generateStaticParams() {
  return getAllDocSlugs().map(slug => ({
    slug: slug === '' ? [] : slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug: slugParts } = await params;
  const doc = getDoc((slugParts ?? []).join('/'));
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

// Dual highlighting themes: min-light in light mode, min-dark in dark mode.
const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: 'min-light', dark: 'min-dark' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

export default async function DocPage({ params }: { params: Params }) {
  const { slug: slugParts } = await params;
  const slug = (slugParts ?? []).join('/');
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { current, group, prev, next } = getDocNavigation(slug);

  const { content } = await compileMDX({
    source: doc.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return (
    <div className="flex gap-12 py-8 lg:py-10 lg:pl-10">
      <article id="docs-article" className="min-w-0 max-w-3xl flex-1">
        {/* Desktop search row — scoped to the content column, sticks below the nav */}
        <div className="sticky top-14 z-30 mb-10 hidden items-center gap-5 bg-background/85 py-3 backdrop-blur-md lg:flex">
          <DocsSearchBar />
          <OnThisPage className="xl:hidden" />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
          <Link
            href="/docs"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Docs
          </Link>
          {group && current && (
            <>
              <span aria-hidden> / </span>
              {group.title}
            </>
          )}
        </p>

        <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {doc.frontmatter.description}
          </p>
        )}

        <div className="docs-prose mt-10">{content}</div>

        <div className="mt-16 flex items-center justify-between border-t border-border/60 pt-5">
          <a
            href={`https://github.com/Swarm-Squad/Web/blob/main/${doc.sourcePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Edit this page on GitHub
          </a>
        </div>

        <nav aria-label="Pagination" className="mt-6 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={docHref(prev.slug)}
              className="group rounded-lg border border-border/60 p-4 transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Previous
              </span>
              <span className="mt-1.5 block text-sm font-medium transition-transform duration-300 group-hover:-translate-x-0.5">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={docHref(next.slug)}
              className="group rounded-lg border border-border/60 p-4 text-right transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Next
              </span>
              <span className="mt-1.5 block text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-[7.25rem] max-h-[calc(100dvh-8.5rem)] overflow-y-auto">
          <DocsToc headings={doc.headings} />
        </div>
      </aside>
    </div>
  );
}
