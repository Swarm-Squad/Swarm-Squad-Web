<div align="center">
<img src="./public/favicon.png" width=20% alt="logo">
<h1>Swarm Squad | Web</h1>
<p>Landing page and documentation for the Swarm Squad project, served at <a href="https://swarm-squad.com">swarm-squad.com</a> (docs live under <code>/docs</code>).</p>
</div>

## 🧱 Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v3** with shadcn/ui primitives (Radix UI)
- **Geist / Geist Mono** via `next/font`
- **next-themes** — dark theme by default, light theme via the nav toggle
- **MDX docs** — `next-mdx-remote` + `remark-gfm` + `rehype-slug` + `rehype-pretty-code` (shiki, `min-dark` theme)

## ⚙️ Prerequisites

- Node.js (v20 or higher)
- pnpm (Make sure pnpm is installed globally)

## 🛠️ Project Setup

We recommend using Node Version Manager (NVM) to manage Node.js versions:

1.  **Install NVM and pnpm (if you haven't already):**

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

    curl -fsSL https://get.pnpm.io/install.sh | sh -
    ```

2.  **Install and use a suitable Node.js version (e.g., v22):**

    ```bash
    nvm install 22
    nvm use 22
    ```

3.  **Verify installations:**
    ```bash
    node --version
    pnpm --version
    ```

## 🚀 Getting Started

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone https://github.com/Swarm-Squad/Web.git
    cd Web
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

    The site is served at `http://localhost:3000` — the landing page at `/` and the docs at `/docs`.

4.  **Building for Production:**

    ```bash
    pnpm run build
    ```

    The build statically pre-renders the landing page and every docs page (one route per MDX file, via `generateStaticParams`).

5.  **Running Production Build:**

    ```bash
    pnpm run start
    ```

6.  **Linting & Formatting:**
    ```bash
    pnpm lint
    pnpm format
    ```

## 📁 Project Structure

```
Web
├── app/
│   ├── page.tsx                  # Landing page (hero, lineup, footer)
│   ├── layout.tsx                # Root layout: fonts, theme, metadata
│   ├── globals.css               # Theme tokens, animations, docs prose styles
│   ├── not-found.tsx             # Custom 404
│   └── docs/
│       ├── layout.tsx            # Docs shell (sidebar + mobile menu)
│       └── [[...slug]]/page.tsx  # Renders MDX for every docs route
├── components/
│   ├── drone.tsx                 # Outline quadcopter SVG (animated props)
│   ├── drone-swarm.tsx           # Hero swarm choreography
│   ├── hero.tsx / product-lineup.tsx / site-nav.tsx / site-footer.tsx
│   ├── docs/                     # Sidebar, TOCs, search, code blocks, MDX components
│   └── ui/                       # shadcn/ui primitives
├── content/
│   └── docs/                     # All documentation content (MDX)
├── lib/
│   ├── docs-nav.ts               # Docs sidebar structure and ordering
│   └── docs.ts                   # MDX loading, frontmatter, headings, search index
└── public/
```

Plus `app/docs-index.json/route.ts`, which emits the static search index (see below).

## 📝 Writing Documentation

Docs are plain MDX files in `content/docs/`. The URL mirrors the file path:

| File                                           | URL                                 |
| ---------------------------------------------- | ----------------------------------- |
| `content/docs/index.mdx`                       | `/docs`                             |
| `content/docs/gallery.mdx`                     | `/docs/gallery`                     |
| `content/docs/swarm-squad/index.mdx`           | `/docs/swarm-squad`                 |
| `content/docs/swarm-squad/getting-started.mdx` | `/docs/swarm-squad/getting-started` |

### Adding a page

1.  Create an `.mdx` file under `content/docs/` with frontmatter:

    ```mdx
    ---
    title: My new page
    description: One-line summary shown under the title and in metadata.
    ---

    ## First section

    Regular markdown works, including GFM tables and fenced code blocks.
    ```

2.  Register it in the sidebar by adding an entry to `DOCS_NAV` in `lib/docs-nav.ts` (the order there controls the sidebar, breadcrumbs, and prev/next pagination).

3.  Done — the page is statically generated on the next build, with table of contents, heading anchors, and syntax highlighting handled automatically.

### Custom MDX components

Available in every docs page without imports (see `components/docs/mdx-components.tsx`):

```mdx
<YouTube id="BSm4PPgCu2Y" title="Initial demo" />

<WorkInProgress repo="https://github.com/Swarm-Squad/Swarm-Squad" />

<FeatureGrid>
  <Feature title="Swarm simulation">Evaluate multi-agent systems.</Feature>
  <Feature title="Live dashboards">Visualize telemetry with Plotly Dash.</Feature>
</FeatureGrid>
```

Code blocks are highlighted with shiki (`min-light` in light mode, `min-dark` in dark mode). Hover a block for the copy button.

## 🔍 Docs Search & Indexing

Search is fully local — no Algolia, no cloud service, nothing leaves the browser.

### How the index is built

1. At build time, `buildSearchIndex()` in `lib/docs.ts` walks every page registered in `DOCS_NAV`, splits its MDX into sections at each `##`/`###` heading, and strips the markdown down to plain text.
2. Each section becomes one record: page title, sidebar group, heading text, anchor URL (`/docs/page#heading`), and body text.
3. `app/docs-index.json/route.ts` (`dynamic = 'force-static'`) serializes those records, so `pnpm build` prerenders the whole index as a static file served at `/docs-index.json`.

### How search works at runtime

- The index is fetched lazily the first time the search dialog opens, then cached in memory for the session.
- Queries are tokenized and matched with AND semantics; results are scored (title match > heading match > body occurrences), and matched terms are highlighted in the result cards.
- Open with the search bar above the article (desktop), the magnifier icon in the docs bar (mobile), or <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd>. Navigate with <kbd>↑</kbd> <kbd>↓</kbd> and <kbd>Enter</kbd>, close with <kbd>Esc</kbd>.

### Reindexing

There is no separate indexing command:

- **Production** — the index is regenerated automatically on every `pnpm build`.
- **Development** — `/docs-index.json` is computed on request, so content edits are picked up on refresh.

A page is only indexed (and only routable) if it is listed in `DOCS_NAV` in `lib/docs-nav.ts` — if a new page doesn't show up in search, check that it's registered there.
