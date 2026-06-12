import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DroneSwarm } from '@/components/drone-swarm';

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-b border-border/60">
      {/* Faint engineering grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.035)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.035)_1px,transparent_1px)] bg-[size:72px_72px]"
      />
      {/* Static overhead glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-12%,hsl(var(--foreground)/0.07),transparent_70%)]"
      />
      {/* Dimmed brand watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
        <Image
          src="/favicon.svg"
          alt=""
          width={208}
          height={208}
          className="absolute -right-8 top-[25%] h-28 w-28 opacity-[0.12] dark:invert sm:right-[7%] sm:top-[30%] sm:h-40 sm:w-40 sm:opacity-[0.09] lg:h-52 lg:w-52"
        />
        <Image
          src="/favicon.svg"
          alt=""
          width={112}
          height={112}
          className="absolute bottom-[13%] left-[9%] hidden h-20 w-20 opacity-[0.07] dark:invert md:block"
        />
      </div>

      <DroneSwarm />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-48 pt-32 sm:pb-40">
        <p className="hero-enter flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[11px] sm:tracking-[0.3em]">
          <span aria-hidden className="h-px w-10 shrink-0 bg-foreground/40" />
          Open source · Multi-agent simulation
        </p>

        <h1 className="hero-enter mt-8 text-[clamp(3.75rem,13vw,10rem)] font-bold leading-[0.88] tracking-[-0.045em] [animation-delay:120ms]">
          SWARM
          <br />
          SQUAD
        </h1>

        <p className="hero-enter mt-10 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl [animation-delay:240ms]">
          A simulation framework for multi-agent systems. Three open source projects for building,
          breaking, and talking to autonomous swarms.
        </p>

        <div className="hero-enter mt-12 flex flex-wrap items-center gap-4 [animation-delay:360ms]">
          <Button asChild size="lg" className="transition-transform active:scale-[0.98]">
            <a href="https://github.com/Swarm-Squad" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent transition-transform active:scale-[0.98]"
          >
            <Link href="/docs">Read the Docs</Link>
          </Button>
        </div>

        <p className="hero-enter mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 [animation-delay:480ms]">
          Vehicle control · LLM decisions · Real-time dialogue
        </p>
      </div>

      <div className="hero-enter absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex [animation-delay:900ms]">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          Scroll
        </span>
        <span className="block h-10 w-px overflow-hidden bg-foreground/10">
          <span className="scroll-line block h-full w-full bg-foreground/50" />
        </span>
      </div>
    </section>
  );
}
