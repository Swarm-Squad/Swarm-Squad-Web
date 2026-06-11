import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { Pre } from '@/components/docs/pre';
import { YouTube } from '@/components/docs/youtube';
import { WorkInProgress } from '@/components/docs/work-in-progress';

function AnchorHeading({
  as: Tag,
  id,
  children,
  ...props
}: {
  as: 'h2' | 'h3' | 'h4';
  id?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  if (!id) {
    return <Tag {...props}>{children}</Tag>;
  }
  return (
    <Tag id={id} {...props} className="group/heading">
      <a href={`#${id}`} className="no-underline">
        {children}
        <span
          aria-hidden
          className="ml-2 font-normal text-muted-foreground/0 transition-colors group-hover/heading:text-muted-foreground/60"
        >
          #
        </span>
      </a>
    </Tag>
  );
}

function DocsLink({
  href = '',
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith('/') || href.startsWith('#');
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/** Asymmetric bento-style grid for the docs landing feature list. */
function FeatureGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-10 grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  // children arrive as an MDX-generated <p>, so wrap in a div to keep HTML valid.
  return (
    <div className="bg-background p-6 transition-colors hover:bg-secondary/40">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: props => <AnchorHeading as="h2" {...props} />,
  h3: props => <AnchorHeading as="h3" {...props} />,
  h4: props => <AnchorHeading as="h4" {...props} />,
  a: DocsLink,
  pre: Pre,
  table: props => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  YouTube,
  WorkInProgress,
  FeatureGrid,
  Feature,
};
