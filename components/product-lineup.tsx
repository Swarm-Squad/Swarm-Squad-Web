import { Reveal } from '@/components/reveal';

type Repo = {
  index: string;
  episode: string;
  title: string;
  description: string;
  tagline: string;
  tags: string[];
  href: string;
};

const REPOS: Repo[] = [
  {
    index: '01',
    episode: 'The base',
    title: 'Swarm Squad',
    description:
      'The foundational simulation framework — agents, environments, physics, and visualization for studying swarm behavior at scale.',
    tagline: 'A simulation framework for multi-agent systems.',
    tags: ['Python', 'Simulation'],
    href: 'https://github.com/Swarm-Squad/Swarm-Squad',
  },
  {
    index: '02',
    episode: 'Episode I',
    title: 'Surviving the Jam',
    description:
      'A hybrid control architecture pairing behavior-based formation control with LLM decision making — built for swarms that keep flying when communication gets jammed.',
    tagline: 'Chaos erupts, AI swarms react… can they escape the gridlock?',
    tags: ['Python', 'LLM control'],
    href: 'https://github.com/Swarm-Squad/Swarm-Squad-Ep1',
  },
  {
    index: '03',
    episode: 'Episode II',
    title: 'The Digital Dialogue',
    description:
      'Real-time dialogue between agents and operators — WebSocket communication, a FastAPI backend, and a Next.js interface for talking to the swarm.',
    tagline: 'AI agents speak, but can they truly understand?',
    tags: ['TypeScript', 'Realtime'],
    href: 'https://github.com/Swarm-Squad/Swarm-Squad-Ep2',
  },
];

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M5.5 4.5h6v6" />
    </svg>
  );
}

function Statement() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span aria-hidden className="h-px w-10 bg-foreground/40" />
            About
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 max-w-4xl text-pretty text-2xl font-light leading-snug tracking-tight md:text-4xl">
            Testing a swarm in the real world is slow, expensive, and occasionally catastrophic.{' '}
            <span className="text-muted-foreground">
              Swarm Squad is a controlled virtual environment for designing, running, and evaluating
              multi-agent behavior — formation control under jamming, agent-to-human dialogue, and
              everything in between.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function RepoRow({ repo, delay }: { repo: Repo; delay: number }) {
  return (
    <Reveal delay={delay}>
      <a
        href={repo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group -mx-4 grid gap-5 border-b border-border/60 px-4 py-10 transition-colors duration-300 hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:-mx-6 md:grid-cols-12 md:gap-6 md:px-6 md:py-14"
      >
        <div className="flex items-baseline justify-between md:col-span-2 md:block">
          <span className="font-mono text-sm text-muted-foreground">{repo.index}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 md:mt-3 md:block">
            {repo.episode}
          </span>
        </div>

        <div className="md:col-span-7">
          <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-4xl">
            {repo.title}
            <ArrowUpRight className="h-5 w-5 shrink-0 opacity-40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 md:h-6 md:w-6" />
          </h3>
          <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
            {repo.description}
          </p>
          <p className="mt-5 font-mono text-xs italic text-muted-foreground/70">“{repo.tagline}”</p>
        </div>

        <div className="flex flex-wrap items-start gap-2 md:col-span-3 md:justify-end">
          {repo.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </Reveal>
  );
}

export function ProductLineup() {
  return (
    <>
      <Statement />

      <section id="lineup">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span aria-hidden className="h-px w-10 bg-foreground/40" />
                  The lineup
                </p>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
                  Three episodes, one framework
                </h2>
              </div>
              <span className="hidden font-mono text-sm text-muted-foreground/70 md:block">
                01 — 03
              </span>
            </div>
          </Reveal>

          <div className="mt-14 border-t border-border/60 md:mt-20">
            {REPOS.map((repo, i) => (
              <RepoRow key={repo.index} repo={repo} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
