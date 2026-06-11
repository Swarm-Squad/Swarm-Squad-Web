'use client';

import { useRef, useState } from 'react';

/** Code block frame with language label and copy-to-clipboard. */
export function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = (props as Record<string, unknown>)['data-language'] as string | undefined;

  const onCopy = async () => {
    const text = preRef.current?.innerText ?? '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative">
      {language && language !== 'plaintext' && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-12 top-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70"
        >
          {language}
        </span>
      )}
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy code'}
        onClick={onCopy}
        className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-border/70 bg-background/70 text-muted-foreground opacity-0 backdrop-blur transition-all hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring group-hover:opacity-100"
      >
        {copied ? (
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-2A1.5 1.5 0 0 0 9 2H4a1.5 1.5 0 0 0-1.5 1.5V9A1.5 1.5 0 0 0 4 10.5h1.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
