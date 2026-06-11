export type DocNavItem = {
  title: string;
  /** Slug relative to /docs — empty string is the docs root. */
  slug: string;
};

export type DocNavGroup = {
  title: string;
  items: DocNavItem[];
};

/** Explicit nav order, mirroring the original VitePress sidebar. */
export const DOCS_NAV: DocNavGroup[] = [
  {
    title: 'Introduction',
    items: [
      { title: 'What is Swarm Squad?', slug: '' },
      { title: 'Gallery', slug: 'gallery' },
    ],
  },
  {
    title: 'Swarm Squad',
    items: [
      { title: 'Overview', slug: 'swarm-squad' },
      { title: 'Getting started', slug: 'swarm-squad/getting-started' },
      { title: 'Architecture', slug: 'swarm-squad/architecture' },
      { title: 'Configuration', slug: 'swarm-squad/configuration' },
      { title: 'Changelog', slug: 'swarm-squad/changelog' },
      { title: 'Demo', slug: 'swarm-squad/demo' },
    ],
  },
  {
    title: 'Episode I — Surviving the Jam',
    items: [
      { title: 'Overview', slug: 'swarm-squad-ep1' },
      { title: 'Getting started', slug: 'swarm-squad-ep1/getting-started' },
      { title: 'Architecture', slug: 'swarm-squad-ep1/architecture' },
      { title: 'Configuration', slug: 'swarm-squad-ep1/configuration' },
      { title: 'Changelog', slug: 'swarm-squad-ep1/changelog' },
      { title: 'Demo', slug: 'swarm-squad-ep1/demo' },
    ],
  },
  {
    title: 'Episode II — The Digital Dialogue',
    items: [
      { title: 'Overview', slug: 'swarm-squad-ep2' },
      { title: 'Getting started', slug: 'swarm-squad-ep2/getting-started' },
      { title: 'Architecture', slug: 'swarm-squad-ep2/architecture' },
      { title: 'Configuration', slug: 'swarm-squad-ep2/configuration' },
      { title: 'Changelog', slug: 'swarm-squad-ep2/changelog' },
      { title: 'Demo', slug: 'swarm-squad-ep2/demo' },
    ],
  },
];

export const FLAT_DOCS_NAV: DocNavItem[] = DOCS_NAV.flatMap(group => group.items);

export function docHref(slug: string): string {
  return slug === '' ? '/docs' : `/docs/${slug}`;
}
