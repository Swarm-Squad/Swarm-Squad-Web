'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/** Code block frame with language label and copy-to-clipboard. */
export function Pre({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language =
    ((props as Record<string, unknown>)['data-language'] as string | undefined) ?? 'text';
  const normalizedLanguage = language.toLowerCase();
  const languageLabel = normalizedLanguage === 'plaintext' ? 'text' : normalizedLanguage;

  const onCopy = async () => {
    try {
      const text = preRef.current?.innerText ?? '';
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group docs-codeframe" data-lang={languageLabel}>
      <div className="docs-codeframe__header">
        <span className="docs-codeframe__lang">{languageLabel}</span>
        <button
          type="button"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={onCopy}
          className="docs-codeframe__copy"
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
      <pre ref={preRef} {...props} className={cn('docs-codeframe__pre', className)}>
        {children}
      </pre>
    </div>
  );
}
