import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://swarm-squad.com'),
  title: {
    default: 'Swarm Squad — A simulation framework for multi-agent systems',
    template: '%s — Swarm Squad',
  },
  description:
    'Open source tools for designing, running, and evaluating multi-agent systems — from formation control under jamming to real-time agent dialogue.',
  openGraph: {
    title: 'Swarm Squad',
    description:
      'Open source tools for designing, running, and evaluating multi-agent systems — from formation control under jamming to real-time agent dialogue.',
    url: 'https://swarm-squad.com',
    siteName: 'Swarm Squad',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Swarm Squad',
    description: 'An open source simulation framework for multi-agent systems.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <div
            aria-hidden
            className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
