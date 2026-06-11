import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { DOCS_NAV, FLAT_DOCS_NAV, type DocNavGroup, type DocNavItem } from '@/lib/docs-nav';

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

export type DocFrontmatter = {
  title: string;
  description?: string;
};

export type DocHeading = {
  level: number;
  text: string;
  id: string;
};

export type Doc = {
  slug: string;
  frontmatter: DocFrontmatter;
  content: string;
  headings: DocHeading[];
  /** Path relative to the repo root, for "edit on GitHub" links. */
  sourcePath: string;
};

function slugToFilePath(slug: string): string | null {
  const candidates = slug === '' ? ['index.mdx'] : [`${slug}.mdx`, path.join(slug, 'index.mdx')];
  for (const candidate of candidates) {
    const filePath = path.join(DOCS_DIR, candidate);
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
}

/** Extracts h2/h3 headings, skipping fenced code blocks, with rehype-slug-compatible ids. */
export function extractHeadings(markdown: string): DocHeading[] {
  const slugger = new GithubSlugger();
  const headings: DocHeading[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^(```|~~~)/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[2].replace(/[*_`]/g, '').trim();
      headings.push({ level: match[1].length, text, id: slugger.slug(text) });
    }
  }

  return headings;
}

export function getDoc(slug: string): Doc | null {
  const filePath = slugToFilePath(slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as DocFrontmatter,
    content,
    headings: extractHeadings(content),
    sourcePath: path.relative(process.cwd(), filePath),
  };
}

export function getAllDocSlugs(): string[] {
  return FLAT_DOCS_NAV.map(item => item.slug);
}

export type SearchRecord = {
  /** Page title. */
  page: string;
  /** Sidebar group the page belongs to. */
  group: string;
  /** Section heading text, or null for the page intro. */
  heading: string | null;
  /** Target URL, including the heading anchor when applicable. */
  href: string;
  /** Plain-text content of the section. */
  text: string;
};

/** Strips markdown/MDX syntax down to plain searchable text. */
function toPlainText(markdown: string): string {
  return (
    markdown
      // JSX/HTML tags (keep children text)
      .replace(/<[^>]+>/g, ' ')
      // fenced code blocks: keep the code text itself
      .replace(/^(```|~~~).*$/gm, ' ')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*_~>#]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/** Splits every doc into per-section records for client-side search. */
export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const group of DOCS_NAV) {
    for (const item of group.items) {
      const doc = getDoc(item.slug);
      if (!doc) continue;

      const baseHref = item.slug === '' ? '/docs' : `/docs/${item.slug}`;
      const lines = doc.content.split('\n');
      const slugger = new GithubSlugger();

      let currentHeading: string | null = null;
      let currentId: string | null = null;
      let buffer: string[] = [];
      let inFence = false;

      const flush = () => {
        const text = toPlainText(buffer.join('\n'));
        if (text || currentHeading) {
          records.push({
            page: doc.frontmatter.title,
            group: group.title,
            heading: currentHeading,
            href: currentId ? `${baseHref}#${currentId}` : baseHref,
            text,
          });
        }
        buffer = [];
      };

      for (const line of lines) {
        if (/^(```|~~~)/.test(line.trim())) {
          inFence = !inFence;
          buffer.push(line);
          continue;
        }
        const match = !inFence && /^(#{2,3})\s+(.+?)\s*$/.exec(line);
        if (match) {
          flush();
          currentHeading = match[2].replace(/[*_`]/g, '').trim();
          currentId = slugger.slug(currentHeading);
        } else {
          buffer.push(line);
        }
      }
      flush();
    }
  }

  return records;
}

export function getDocNavigation(slug: string): {
  current: DocNavItem | null;
  group: DocNavGroup | null;
  prev: DocNavItem | null;
  next: DocNavItem | null;
} {
  const index = FLAT_DOCS_NAV.findIndex(item => item.slug === slug);
  if (index === -1) return { current: null, group: null, prev: null, next: null };

  const group = DOCS_NAV.find(g => g.items.some(item => item.slug === slug)) ?? null;

  return {
    current: FLAT_DOCS_NAV[index],
    group,
    prev: index > 0 ? FLAT_DOCS_NAV[index - 1] : null,
    next: index < FLAT_DOCS_NAV.length - 1 ? FLAT_DOCS_NAV[index + 1] : null,
  };
}
