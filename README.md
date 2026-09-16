<div align="center">
  <h1>BITS Portfolio</h1>
  <p>
    <a href="https://imam.bits.co.id">
      <img src="https://img.shields.io/badge/BITS%20Portfolio-00C853?style=for-the-badge&logo=cloudflare&logoColor=white" alt="BITS Portfolio" />
    </a>
  </p>
  <p>
    Personal portfolio & blog — a static site served from Hono on Cloudflare Workers with a GitHub contributions API and static site generation.
  </p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=flat&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
    <img src="https://img.shields.io/badge/Hono-E36002?style=flat&logo=hono&logoColor=white" alt="Hono" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat" alt="MIT License" />
  </p>
</div>

---

## ✨ Features

| Feature                         | Description                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| **Static Site Generation**      | Builds HTML pages, RSS feed, and sitemap via `node site/generate.mjs` for 30+ project pages and blog posts |
| **GitHub Contributions API**    | Fetches and caches contribution data from jogruber mirror API — serves as JSON endpoint   |
| **Dark / Light Theme**          | Persistent theme toggle with system preference detection and smooth transition             |
| **Smooth Scroll & Motion**      | Lenis-powered smooth scroll with staggered reveal animations on cards, sections, and hero  |
| **SEO & Open Graph**            | Canonical URLs, OG tags, Twitter cards, RSS feed, sitemap                                  |
| **Responsive Terminal Cards**   | Project cards with terminal aesthetic — category filter, search, and share                  |
| **Bento Blog Grid**             | Featured blog posts in a bento-style layout with cover images and category overlays         |
| **Tool Dock**                   | Bottom-anchored tool dock with staggered reveal animation and icon display                  |
| **Cloudflare Native**           | Single Worker deploy, Assets binding, `run_worker_first`, and observability                 |

## 🛠️ Tech Stack

| Layer        | Technology                                    |
| ------------ | --------------------------------------------- |
| **Runtime**  | Cloudflare Workers                            |
| **Backend**  | Hono, Fetch API, Cache API                    |
| **Language** | TypeScript                                    |
| **Frontend** | Vanilla CSS + JS, Instrument Serif font       |
| **Build**    | Node.js static site generator, Wrangler 4     |
| **Tooling**  | pnpm, Wrangler 4                            |

---

## 📁 Project Structure

```text
BITS-Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml         # workflow_dispatch — generate + wrangler deploy
├── site/                      # Static site generator
│   ├── content.mjs            # Central content data (projects, posts, socials)
│   ├── templates.mjs          # HTML/XML template builders
│   ├── generate.mjs           # Entry point — builds all pages
│   ├── utils.mjs              # Shared utilities (slug, date, etc.)
│   ├── icons.mjs              # SVG icon definitions
│   ├── app.js                 # Client-side JS (theme, filter, share)
│   ├── motion.js              # Scroll-triggered reveal animations
│   ├── app.css                # Global styles
│   └── static/                # Static assets (images, fonts)
├── src/
│   └── index.ts               # Worker entry — API + asset serving
├── public/                    # Generated static output
├── wrangler.jsonc              # Wrangler configuration
├── package.json
├── tsconfig.json
├── .env.example
├── LICENSE
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js LTS (20+)
- pnpm (or npm)
- Wrangler 4 (`pnpm add -g wrangler` or use via `npx`)

### Setup

```bash
# Install dependencies
pnpm install

# Generate static site
pnpm run gen

# Start local dev server
pnpm run dev

# Deploy to Cloudflare Workers
pnpm run deploy
```

### Environment Variables

| Variable                | Description                                |
| ----------------------- | ------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API token with Workers permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID                      |

Set via GitHub Secrets → Settings → Secrets and variables → Actions.

---

## 📄 License

MIT License. See [LICENSE](LICENSE).

---

<div align="center">
  BITS Portfolio · Developed with ❤️ by Banten IT Solutions
</div>