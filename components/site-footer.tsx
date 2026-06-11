import Link from 'next/link';

const PROJECT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Swarm-Squad', external: true },
  { label: 'Documentation', href: '/docs', external: false },
  { label: 'YouTube', href: 'https://www.youtube.com/@sang-buster', external: true },
];

const EPISODE_LINKS = [
  { label: 'Swarm Squad', href: 'https://github.com/Swarm-Squad/Swarm-Squad' },
  { label: 'Ep. I — Surviving the Jam', href: 'https://github.com/Swarm-Squad/Swarm-Squad-Ep1' },
  {
    label: 'Ep. II — The Digital Dialogue',
    href: 'https://github.com/Swarm-Squad/Swarm-Squad-Ep2',
  },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  const linkClasses =
    'rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
        {heading}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map(link => (
          <li key={link.label}>
            {link.external === false ? (
              <Link href={link.href} className={linkClasses}>
                {link.label}
              </Link>
            ) : (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <p className="font-mono text-sm font-semibold tracking-[0.25em]">SWARM SQUAD</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An open source multi-agent simulation framework by Sang-Buster.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-20">
            <FooterColumn heading="Project" links={PROJECT_LINKS} />
            <FooterColumn heading="Episodes" links={EPISODE_LINKS} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 border-t border-border/60 pt-6 text-center font-mono text-xs text-muted-foreground/70 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Swarm Squad — Sang-Buster</p>
          <p>Built in the open</p>
        </div>
      </div>
    </footer>
  );
}
