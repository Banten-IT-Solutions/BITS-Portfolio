// Nurul Imam — central content data. Edit this file, run `node site/generate.mjs`.
import { esc, slug, repoUrl } from './utils.mjs'

export const SITE = {
  name: 'Nurul Imam',
  title: 'Full-Stack & DevOps Engineer',
  tagline:
    'Building software, cloud platforms, networking tools, and open-source infrastructure that solve real problems for businesses and communities.',
  location: 'Banten, Indonesia',
  company: 'Banten IT Solutions',
  website: 'https://bits.co.id',
  email: 'nurulimamstudio@gmail.com',
  github: 'https://github.com/bitscoid',
  description:
    'Nurul Imam — Full-Stack & DevOps Engineer from Banten, Indonesia. Building web apps, cloud platforms, OpenWrt router firmware, VPN tooling, QRIS payments, and open-source software.',
  keywords:
    'Nurul Imam, full-stack engineer, DevOps engineer, software engineer, cloud engineer, Indonesia, Banten IT Solutions, open source',
  baseUrl: 'https://nurulimam.com',
  author: 'Nurul Imam',
  marquee: [
    'Product engineering',
    'Cloud & DevOps',
    'OpenWrt & Router firmware',
    'VPN & networking',
    'QRIS payments',
    'Serverless (Cloudflare Workers)',
    'SvelteKit & Sanity',
    'Open source',
  ],
}

export const SOCIALS = [
  { key: 'github', label: 'GitHub', handle: 'bitscoid', url: 'https://github.com/bitscoid' },
  { key: 'linkedin', label: 'LinkedIn', handle: 'nurulimamstudio', url: 'https://www.linkedin.com/in/nurulimamstudio' },
  { key: 'x', label: 'X', handle: 'nurulimamnotes', url: 'https://x.com/nurulimamnotes' },
  { key: 'instagram', label: 'Instagram', handle: 'nurulimamnotes', url: 'https://instagram.com/nurulimamnotes' },
  { key: 'threads', label: 'Threads', handle: 'nurulimamnotes', url: 'https://www.threads.net/@nurulimamnotes' },
  { key: 'facebook', label: 'Facebook', handle: 'nurulimamnotes', url: 'https://facebook.com/nurulimamnotes' },
  { key: 'tiktok', label: 'TikTok', handle: 'nurulimamnotes', url: 'https://www.tiktok.com/@nurulimamnotes' },
  { key: 'youtube', label: 'YouTube', handle: 'NurulImamdotcom', url: 'https://www.youtube.com/@NurulImamdotcom' },
  { key: 'telegram', label: 'Telegram', handle: 'bitscoid', url: 'https://t.me/bitscoid' },
  { key: 'whatsapp', label: 'WhatsApp', handle: '+62 819-6780-478', url: 'https://wa.me/62819678048' },
  { key: 'mail', label: 'Email', handle: 'nurulimamstudio@gmail.com', url: 'mailto:nurulimamstudio@gmail.com' },
]

export const CATEGORIES = {
  networking: 'VPN & Networking',
  router: 'OpenWrt & Router',
  web: 'Web & SaaS',
  payments: 'Payments',
  client: 'Client Sites',
  cloud: 'Cloud, DevOps & AI',
  tools: 'Automation & Tools',
}

// tools shown in the dock (home). `inv` adds an invert class in light/dark mode.
export const TOOLS = [
  { n: 'VS Code', f: 'vscode.svg', inv: '' },
  { n: 'Cursor', f: 'cursor.svg', inv: 'invert-in-light' },
  { n: 'Claude Code', f: 'claude-code.svg', inv: '' },
  { n: 'Docker', f: 'docker.svg', inv: 'invert-in-dark' },
  { n: 'Figma', f: 'figma.svg', inv: '' },
  { n: 'Notion', f: 'notion.svg', inv: 'invert-in-dark' },
  { n: 'Obsidian', f: 'obsidian.svg', inv: '' },
  { n: 'Termius', f: 'termius.svg', inv: 'invert-in-dark' },
  { n: 'Brave', f: 'brave-origin.svg', inv: '' },
  { n: 'Codex', f: 'codex.svg', inv: '' },
  { n: 'Kiro', f: 'kiro.svg', inv: 'invert-in-dark' },
  { n: 'Bitwarden', f: 'bitwarden.svg', inv: '' },
  { n: 'Discord', f: 'discord.svg', inv: '' },
  { n: 'VSCode', f: 'vscode.svg', inv: '' },
]

export const PROJECTS = [
  // ---------- bitscoid (personal) ----------
  {
    name: 'Ah-Si-Ata', owner: 'bitscoid', private: false, language: 'Python', stars: 1,
    description: 'Ah-Si-Ata · Python CLI client untuk MyXL (XL Axiata) — beli paket, kelola kuota, Family Plan & Circle dari terminal',
    topics: ['api-client', 'cli', 'indonesia', 'myxl', 'otp', 'python', 'qris', 'telco', 'terminal', 'xl-axiata'],
    homepage: 'https://github.com/bitscoid/Ah-Si-Ata', category: 'tools',
  },
  {
    name: 'BITS-Box-Core', owner: 'bitscoid', private: false, language: 'Go', stars: 1,
    description: 'Reusable Go core components for BITS Box proxy, VPN, networking, platform integration, and diagnostics.',
    topics: ['go', 'proxy', 'vpn', 'sing-box', 'networking'], homepage: 'https://bits.co.id', category: 'networking',
  },
  {
    name: 'BITS-GeoIP', owner: 'bitscoid', private: false, language: 'Go', stars: 1,
    description: 'Automated GeoIP database and sing-box rule-set builder for Indonesia and global country data.',
    topics: ['go', 'geoip', 'sing-box', 'ruleset', 'networking'], homepage: 'https://bits.co.id', category: 'networking',
  },
  {
    name: 'BITS-GeoSite', owner: 'bitscoid', private: false, language: 'Go', stars: 1,
    description: 'Automated GeoSite database and sing-box rule-set builder for global domain data.',
    topics: ['go', 'geosite', 'sing-box', 'ruleset', 'networking'], homepage: 'https://bits.co.id', category: 'networking',
  },
  {
    name: 'ngonten.bits.co.id', owner: 'bitscoid', private: true, language: 'Svelte', stars: 1,
    description: 'Social media scheduling, publishing, and analytics across multiple platforms — public marketing site, user panel, admin panel, subscription billing, media library, scheduled publishing engine, analytics, and team workspaces.',
    topics: ['svelte', 'sveltekit', 'social-media', 'scheduling', 'billing', 'analytics', 'saas'],
    homepage: 'https://ngonten.bits.co.id', category: 'web', highlight: true,
  },
  {
    name: 'malesngoding.my.id', owner: 'bitscoid', private: true, language: 'TypeScript', stars: 0,
    description: 'Personal engineering blog platform for malesngoding.my.id.',
    topics: ['blog', 'typescript'], homepage: 'https://malesngoding.my.id', category: 'web',
  },
  {
    name: 'nurulimam.com', owner: 'bitscoid', private: false, language: 'HTML', stars: 0,
    description: 'This portfolio — a static site served from Hono on Cloudflare Workers with a GitHub contributions API.',
    topics: ['cloudflare-workers', 'hono', 'portfolio', 'static-site'], homepage: 'https://nurulimam.com', category: 'web',
  },

  // ---------- Banten-IT-Solutions ----------
  {
    name: 'BITS-VPN-Cloudflare', owner: 'Banten-IT-Solutions', private: false, language: 'TypeScript', stars: 26,
    description: 'High-performance Serverless VPN Relay for VLESS, VMess, and Trojan over Cloudflare Workers.',
    topics: ['bun', 'cloudflare-workers', 'hono', 'proxy', 'serverless', 'singbox', 'trojan', 'typescript', 'v2ray', 'vless', 'vmess', 'vpn', 'websocket'],
    homepage: 'https://yuliana.my.id', category: 'networking', highlight: true,
  },
  {
    name: 'BITS-Box', owner: 'Banten-IT-Solutions', private: false, language: 'Kotlin', stars: 1,
    description: 'Multi-protocol proxy / VPN client for Android powered by sing-box kernel.',
    topics: ['android', 'android-vpn', 'kotlin', 'proxy', 'shadowsocks', 'sing-box', 'trojan', 'v2ray', 'vpn'],
    homepage: 'https://bits.co.id', category: 'networking', highlight: true,
  },
  {
    name: 'BITS-WRT', owner: 'Banten-IT-Solutions', private: false, language: 'Shell', stars: 0,
    description: 'Custom OpenWrt firmware (BITS-WRT) for Amlogic routers — ImageBuilder build with tunneling (OpenClash/Nikki/Momo), Tailscale/Cloudflare, Docker, and a modern BITS LuCI theme.',
    topics: ['amlogic', 'arm64', 'custom-firmware', 'docker', 'firmware', 'github-actions', 'luci', 'mihomo', 'openclash', 'openwrt', 'router', 'sing-box', 'tailscale', 'vpn'],
    homepage: 'https://bits.co.id', category: 'router', highlight: true,
  },
  {
    name: 'BITS-Theme', owner: 'Banten-IT-Solutions', private: false, language: 'CSS', stars: 2,
    description: 'Modern green LuCI theme for OpenWrt (BITS-WRT) — all-in-one branding package (theme + banner + sysinfo + UI patches).',
    topics: ['luci', 'luci-theme', 'openwrt', 'openwrt-package', 'theme'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-WRT-Packages', owner: 'Banten-IT-Solutions', private: false, language: 'HTML', stars: 0,
    description: 'Self-hosted opkg feed for BITS OpenWrt packages — signed (usign), always-latest, served via GitHub Pages.',
    topics: ['feed', 'github-pages', 'ipk', 'luci', 'openwrt', 'openwrt-package', 'opkg', 'tailscale', 'telegram-bot'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-FileManager', owner: 'Banten-IT-Solutions', private: false, language: 'JavaScript', stars: 0,
    description: 'Native file manager for LuCI on OpenWrt — browse, upload, download, edit, rename, move, search and delete files from the web interface.',
    topics: ['file-manager', 'ipk', 'luci', 'luci-app', 'openwrt', 'openwrt-package'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-HiLink', owner: 'Banten-IT-Solutions', private: false, language: 'Shell', stars: 0,
    description: 'Drop-in LuCI app for Huawei HiLink modem on OpenWrt — monitor signal, SMS, and data usage from the web interface with a modern BITS theme.',
    topics: ['hilink', 'huawei', 'ipk', 'luci', 'luci-app', 'modem', 'openwrt', 'openwrt-package', 'sms'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-XL', owner: 'Banten-IT-Solutions', private: false, language: 'JavaScript', stars: 0,
    description: 'Drop-in LuCI app for XL (myXL) on OpenWrt — manage your XL account, quota, store, and payments from the web interface with a modern BITS theme.',
    topics: ['ipk', 'kuota', 'luci', 'luci-app', 'myxl', 'openwrt', 'openwrt-package', 'xl', 'xlaxiata'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-Tailscale', owner: 'Banten-IT-Solutions', private: false, language: 'Shell', stars: 1,
    description: 'Drop-in LuCI app for Tailscale on OpenWrt — manage your mesh VPN from the web interface with a modern BITS theme.',
    topics: ['ipk', 'luci', 'luci-app', 'mesh', 'openwrt', 'openwrt-package', 'tailscale', 'vpn', 'wireguard'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-Networks-Bot', owner: 'Banten-IT-Solutions', private: false, language: 'Python', stars: 0,
    description: 'Telegram management bot for OpenWrt routers (BITS-WRT) — monitor and control your device from Telegram with a clean LuCI config page.',
    topics: ['bot', 'ipk', 'luci', 'openwrt', 'openwrt-package', 'python', 'telegram', 'telegram-bot'],
    homepage: 'https://bits.co.id', category: 'router',
  },
  {
    name: 'BITS-Mail-Cloudflare', owner: 'Banten-IT-Solutions', private: false, language: 'Vue', stars: 1,
    description: 'Temporary email platform on Cloudflare Workers — single-worker API + frontend, D1, Telegram, Turnstile, and AI extraction.',
    topics: ['cloudflare', 'cloudflare-d1', 'cloudflare-email-routing', 'cloudflare-kv', 'cloudflare-workers', 'email', 'hono', 'mail-parser', 'sqlite', 'telegram-bot', 'temp-mail', 'turnstile', 'vite', 'vue', 'workers-ai'],
    homepage: 'https://mail.bits.co.id', category: 'web', highlight: true,
  },
  {
    name: 'BITS-Nota', owner: 'Banten-IT-Solutions', private: true, language: 'TypeScript', stars: 1,
    description: 'Invoicing & finance app on Cloudflare Workers — React SPA, tRPC, D1, R2, passkeys, Google OAuth, and Xendit payments.',
    topics: ['cloudflare', 'cloudflare-d1', 'cloudflare-r2', 'cloudflare-workers', 'drizzle-orm', 'finance', 'hono', 'invoicing', 'oauth', 'passkeys', 'react', 'sqlite', 'tailwindcss', 'trpc', 'typescript', 'vite'],
    homepage: 'https://nota.bits.co.id', category: 'web',
  },
  {
    name: 'BITS-Social-Manager', owner: 'Banten-IT-Solutions', private: false, language: 'TypeScript', stars: 1,
    description: 'Secure social account manager for organizing project credentials across teams.',
    topics: ['cloudflare-workers', 'd1', 'drizzle-orm', 'hono', 'jwt', 'react', 'sqlite', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://social.bits.co.id', category: 'web',
  },
  {
    name: 'BITS-Smart-Masjid', owner: 'Banten-IT-Solutions', private: true, language: 'Svelte', stars: 1,
    description: 'Offline-first smart mosque display platform — prayer times, signage, media playback & SaaS licensing.',
    topics: ['android', 'cloudflare', 'cloudflare-workers', 'd1', 'go', 'islamic', 'monorepo', 'mosque', 'offline-first', 'pnpm', 'prayer', 'prayer-times', 'raspberry-pi', 'sqlite', 'svelte', 'sveltekit', 'tailwindcss', 'typescript'],
    homepage: 'https://masjid.bits.co.id', category: 'web', highlight: true,
  },
  {
    name: 'BITS-Pay', owner: 'Banten-IT-Solutions', private: false, language: 'TypeScript', stars: 1,
    description: 'QRIS payment gateway untuk aplikasi kamu.',
    topics: ['qris', 'payment', 'gateway', 'typescript', 'cloudflare-workers'],
    homepage: 'https://bits.co.id', category: 'payments',
  },
  {
    name: 'BITS-QRIS-Converter', owner: 'Banten-IT-Solutions', private: false, language: 'TypeScript', stars: 2,
    description: 'QRIS Static → Dynamic converter — parse, validate, convert + cetak gambar struk. Hybrid of qris-dinamis + Dynamic-QRIS template engine.',
    topics: ['cloudflare', 'dynamic-qris', 'emvco', 'gpn', 'hono', 'indonesia', 'payment', 'pwa', 'qrcode', 'qris', 'qris-converter', 'struk', 'typescript', 'vite', 'workers'],
    homepage: 'https://qris.bits.co.id', category: 'payments', highlight: true,
  },
  {
    name: 'BITS-YouTube-Automation', owner: 'Banten-IT-Solutions', private: false, language: 'Python', stars: 1,
    description: 'Python automation for YouTube Studio draft processing, thumbnail upload, and scheduled publishing.',
    topics: ['automation', 'browser-automation', 'playwright', 'python', 'scheduling', 'thumbnail-generator', 'youtube', 'youtube-studio'],
    homepage: 'https://bits.co.id', category: 'tools',
  },

  // ---------- BITS-Client ----------
  {
    name: 'BITS-Web', owner: 'BITS-Client', private: false, language: 'Svelte', stars: 0,
    description: 'BITS Corporate Website — multilingual corporate site for Banten IT Solutions on SvelteKit + Cloudflare Pages with Sanity CMS, i18n, Resend contact form, and Sanity seed pipeline.',
    topics: ['cloudflare', 'cloudflare-pages', 'corporate-website', 'i18n', 'landing-page', 'resend', 'sanity', 'sanity-cms', 'seo', 'svelte', 'svelte-5', 'sveltekit', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://bits.co.id', category: 'client',
  },
  {
    name: 'BantenIT-Web', owner: 'BITS-Client', private: true, language: 'PHP', stars: 0,
    description: 'BITS Client Website — legacy Banten IT Solutions corporate site on latest WordPress, containerized with Docker (nginx + PHP-FPM + MariaDB 11.4).',
    topics: ['corporate-website', 'docker', 'docker-compose', 'legacy-website', 'mariadb', 'nginx', 'php-fpm', 'wordpress'],
    homepage: 'https://www.banten-it.com', category: 'client',
  },
  {
    name: 'BataBagus-Web', owner: 'BITS-Client', private: true, language: 'Svelte', stars: 1,
    description: 'BataBagus Website — premium red bricks & sand supplier landing page for BataBagus on SvelteKit + Cloudflare Pages with Sanity CMS, GSAP animations, Resend contact form.',
    topics: ['batabagus', 'cloudflare', 'cloudflare-pages', 'ecommerce', 'gsap', 'landing-page', 'resend', 'sanity-cms', 'seo', 'svelte', 'svelte-5', 'sveltekit', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://batabagus.com', category: 'client',
  },
  {
    name: 'CetakAjaOnline-Web', owner: 'BITS-Client', private: true, language: 'Svelte', stars: 0,
    description: 'Cetak Aja Online — Indonesian digital printing e-commerce on SvelteKit + Cloudflare Pages with Sanity CMS, dynamic pricing, WhatsApp ordering, and Resend contact form.',
    topics: ['cloudflare', 'cloudflare-pages', 'cloudflare-workers', 'ecommerce', 'landing-page', 'printing', 'resend', 'sanity', 'seo', 'svelte', 'svelte-5', 'sveltekit', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://cetakajaonline.my.id', category: 'client',
  },
  {
    name: 'PGPS-Web', owner: 'BITS-Client', private: true, language: 'Svelte', stars: 1,
    description: 'PGPS Landing Page — authorized smartphone distributor site on SvelteKit + Cloudflare Pages with neo-brutalism design, Resend contact form.',
    topics: ['cloudflare', 'cloudflare-pages', 'landing-page', 'neo-brutalism', 'pgps', 'resend', 'seo', 'smartphone', 'svelte', 'svelte-5', 'sveltekit', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://pgps.co.id', category: 'client',
  },
  {
    name: 'RizaPutra-Web', owner: 'BITS-Client', private: true, language: 'TypeScript', stars: 0,
    description: 'Riza Putra Web — digital printing & advertising e-commerce catalog for Riza Putra on SvelteKit + Cloudflare Pages with Sanity CMS, dynamic pricing, Resend contact form, WhatsApp ordering.',
    topics: ['cloudflare', 'cloudflare-pages', 'ecommerce', 'landing-page', 'printing', 'resend', 'rizaputra', 'sanity', 'sanity-cms', 'seo', 'svelte', 'svelte-5', 'sveltekit', 'tailwindcss', 'typescript', 'vite'],
    homepage: 'https://rizaputra.it.com', category: 'client',
  },

  // ---------- BITS-Cloud-Platform ----------
  {
    name: 'BITS-AI-Gateway', owner: 'BITS-Cloud-Platform', private: false, language: 'TypeScript', stars: 1,
    description: 'Docker-based AI gateway and routing proxy for secure service access.',
    topics: ['ai', 'ai-gateway', 'docker', 'docker-compose', 'nodejs', 'observability', 'proxy', 'routing', 'security', 'typescript'],
    homepage: 'https://ai.bits.co.id', category: 'cloud',
  },
  {
    name: 'BITS-Uptime-Monitoring', owner: 'BITS-Cloud-Platform', private: false, language: 'Dockerfile', stars: 1,
    description: 'Production uptime monitoring service for websites, APIs, and services maintained by Banten IT Solutions.',
    topics: ['docker', 'docker-compose', 'monitoring', 'observability', 'self-hosted', 'status-page', 'uptime-kuma', 'uptime-monitoring'],
    homepage: 'https://uptime.bits.co.id', category: 'cloud',
  },
  {
    name: 'BITS-Youtube-Mp3-Downloader', owner: 'BITS-Cloud-Platform', private: false, language: 'TypeScript', stars: 1,
    description: 'YouTube audio downloader with playlist support, cookie upload, and admin controls.',
    topics: ['celery', 'docker', 'downloader', 'fastapi', 'nextjs', 'redis', 'youtube', 'yt-dlp'],
    homepage: 'https://ytmp3.bits.co.id', category: 'cloud',
  },
]

// slug helper (shared in utils.mjs)

export const POSTS = PROJECTS.map((p, i) => {
  const flows = {
    networking: {
      h1: 'The problem split across tools',
      h2: 'How it fits the wider stack',
      take: 'The networking work here shares one principle: keep the control plane small, the data path fast, and every piece self-hostable.',
    },
    router: {
      h1: 'A router you can actually manage',
      h2: 'Baked into a reproducible build',
      take: 'Everything in the OpenWrt ecosystem is packaged, signed, and delivered the same way — so a router behaves like a real product, not a pile of patches.',
    },
    web: {
      h1: 'Why another SaaS',
      h2: 'One platform, one worker, one database',
      take: 'Keeping a product to a single worker and a local-first or D1 database is what makes these apps cheap to run and predictable to ship.',
    },
    payments: {
      h1: 'Payments are messy at the edges',
      h2: 'Parse, validate, convert',
      take: 'QRIS work is about exactness: bytes, checksums, and EMV tags matter more than a flashy UI.',
    },
    client: {
      h1: 'Sites that ship and scale',
      h2: 'Content, again and again',
      take: 'A shared SvelteKit + Sanity + Cloudflare Pages foundation turns client work from one-off pages into a repeatable delivery line.',
    },
    cloud: {
      h1: 'Run it yourself, watch it yourself',
      h2: 'Docker-first, observable by default',
      take: 'Self-hosting only works when you can see it — so observability ships as part of the platform, not as an afterthought.',
    },
    tools: {
      h1: 'Automate the boring part',
      h2: 'A small surface, a big time save',
      take: 'CLI and automation tools win by shrinking a repetitive job into one command that you can read and trust.',
    },
  }
  const f = flows[p.category] || flows.web
  return {
    slug: slug(p.name),
    title: titleFor(p),
    category: p.category,
    project: p.name,
    projectUrl: repoUrl(p),
    date: dateFor(i),
    read: readFor(p),
    tags: p.topics.slice(0, 5),
    summary: p.description,
    body: compose(p, f),
  }
})

function titleFor(p) {
  const map = {
    'BITS-VPN-Cloudflare': 'Running a High-Performance Serverless VPN on Cloudflare Workers',
    'BITS-WRT': 'Building a Custom OpenWrt Firmware for Amlogic Routers',
    'BITS-QRIS-Converter': 'From Static to Dynamic: Building a QRIS Payment Converter',
    'BITS-Mail-Cloudflare': 'A Temporary Email Platform on a Single Cloudflare Worker',
    'BITS-Nota': 'Shipping a Full-Stack Invoicing App on Cloudflare Workers',
    'BITS-Box': 'An Android VPN Client Powered by the sing-box Kernel',
    'BITS-Smart-Masjid': 'Offline-First Digital Signage for Mosques',
    'BITS-AI-Gateway': 'A Docker-Based AI Gateway and Routing Proxy',
    'BITS-Uptime-Monitoring': 'Self-Hosted Uptime Monitoring for Production Services',
    'BITS-YouTube-Automation': 'Automating the YouTube Studio Upload Pipeline',
    'BITS-Youtube-Mp3-Downloader': 'A YouTube Audio Downloader with Queue and Admin Controls',
    'Ah-Si-Ata': 'A Python CLI for XL Axiata, From the Terminal',
    'BITS-Web': 'A Multilingual Corporate Site on SvelteKit and Sanity',
    'ngonten.bits.co.id': 'A Social Media Scheduling and Analytics Platform',
    'BITS-Tailscale': 'Managing Tailscale From LuCI',
  }
  return map[p.name] || p.name
}

// deterministic spread of dates, newest first, ending recent (site "today" ~ Sep 2026)
function dateFor(i) {
  const base = new Date('2026-08-28T00:00:00Z')
  const d = new Date(base.getTime() - i * 2 * 86400000)
  return d.toISOString().slice(0, 10)
}

function readFor(p) {
  const topics = p.topics ? p.topics.length : 0
  const min = Math.max(3, Math.min(9, 3 + Math.round(topics / 6)))
  return min + ' Min Read'
}

function compose(p, f) {
  const stack = p.language ? `<p><strong>Stack.</strong> Built with ${esc(p.language)}${p.topics.length ? ' — ' + p.topics.slice(0, 6).map((t) => `<code>${esc(t)}</code>`).join(', ') : ''}.</p>` : ''
  return `
<p><strong>${esc(p.name)}</strong> — ${esc(p.description)}</p>
<h2>${f.h1}</h2>
<p>${esc(p.name)} exists because the work it automates is otherwise spread across too many tools. Rather than manually gluing together scripts, dashboards, and config files, the project folds the whole flow into a single, focused surface that stays out of the way.</p>
${stack}
<h2>${f.h2}</h2>
<p>Each <code>${esc(p.name)}</code> piece is deliberately narrow: it does one job and leaves the rest on an existing, proven path. That keeps upgrades contained and makes the project easy to reason about in production.</p>
<blockquote>${f.take}</blockquote>
`
}

// ---- thematic roundup posts (7) ----
export const ROUNDUPS = [
  {
    slug: 'the-bits-openwrt-ecosystem',
    title: 'The BITS OpenWrt Ecosystem: Firmware, Themes, and LuCI Apps',
    category: 'router',
    date: '2026-09-14',
    read: '8 Min Read',
    tags: ['openwrt', 'luci', 'firmware', 'router', 'self-hosted'],
    summary: 'How a custom firmware, a branded theme, a signed package feed, and a family of LuCI apps come together into a router you can actually manage.',
    body: `
<p>Routers shipped by vendors are usually the least-maintained device in a network. Firmware is stale, the interface is a guessing game, and anything beyond basic NAT means flashing third-party builds by hand.</p>
<p>The BITS OpenWrt ecosystem attacks that problem from four angles at once: a reproducible firmware build, a branded interface, a signed package feed, and a set of small LuCI apps that extend the device without breaking it.</p>
<h2>The firmware</h2>
<p><code>BITS-WRT</code> is an OpenWrt ImageBuilder build for Amlogic (arm64) routers. It bakes in tunneling (OpenClash, Mihomo, Momo), Tailscale and Cloudflare connectivity, Docker, and the BITS LuCI theme out of the box. Everything runs through GitHub Actions, so a rebuild is a commit, not a ritual.</p>
<h2>The interface</h2>
<p><code>BITS-Theme</code> is the branding layer: a modern green LuCI theme that ships as a theme + banner + sysinfo + UI patches package. <code>BITS-Tailscale</code>, <code>BITS-XL</code>, <code>BITS-HiLink</code>, and <code>BITS-FileManager</code> are drop-in LuCI apps — you manage mesh VPN, XL quota, Huawei modem state, or files straight from the web UI, each carrying the same visual language.</p>
<h2>The delivery line</h2>
<p><code>BITS-WRT-Packages</code> is a self-hosted opkg feed signed with usign and served via GitHub Pages, so every package stays at a known version and updates arrive as a normal <code>opkg update</code>.</p>
<blockquote>Packaged, signed, and rebuilt the same way every time — that is what turns a router into a product.</blockquote>
`,
  },
  {
    slug: 'the-bits-vpn-and-networking-stack',
    title: 'The BITS VPN & Networking Stack',
    category: 'networking',
    date: '2026-09-12',
    read: '8 Min Read',
    tags: ['vpn', 'serverless', 'sing-box', 'networking', 'cloudflare'],
    summary: 'From a serverless relay to a native Android client and Go rule-set builders — the pieces that make a self-owned network work across devices.',
    body: `
<p>A working VPN stack is rarely one product. It is a relay on the server, a client on the device, and a pile of routing rules that decide what traffic goes where.</p>
<p><code>BITS-VPN-Cloudflare</code> handles the serverless side: a high-performance relay for VLESS, VMess, and Trojan running on Cloudflare Workers, written in TypeScript with Hono. No VM to patch, no box to rent — just deploy a worker.</p>
<p><code>BITS-Box</code> is the client: a native Android app built on the sing-box kernel, supporting Shadowsocks, VMess, VLESS, and Trojan with the speed of a compiled core rather than a JS wrapper.</p>
<p>Underneath both sits <code>BITS-Box-Core</code>, the shared Go components for proxy, VPN, networking, platform integration, and diagnostics — one codebase so client and relay agree on behaviour.</p>
<h2>Rules that route themselves</h2>
<p><code>BITS-GeoIP</code> and <code>BITS-GeoSite</code> generate sing-box GeoIP and GeoSite databases automatically — splitting domestic and international traffic by country or by domain, rebuilt on a schedule so rules never go stale by hand.</p>
<blockquote>Keep the relay cheap, the client native, and the rules automatically fresh.</blockquote>
`,
  },
  {
    slug: 'cloudflare-workers-as-a-full-application-platform',
    title: 'Cloudflare Workers as a Full Application Platform',
    category: 'web',
    date: '2026-09-10',
    read: '7 Min Read',
    tags: ['cloudflare-workers', 'hono', 'd1', 'serverless', 'sqlite'],
    summary: 'Email, invoicing, and social-account management — each shipped as a single worker with D1 storage, passkeys, and Turnstile, not a VM fleet.',
    body: `
<p>Most of the products in this portfolio share an architecture bet: one Cloudflare Worker, one SQLite database (D1), object storage (R2) when needed, and as little server code as possible.</p>
<p><code>BITS-Mail-Cloudflare</code> is a temporary email platform where the API and the frontend live in a single worker. D1 stores mailboxes, Telegram handles delivery alerts, Turnstile stops bots at the door, and Workers AI extracts the useful bits of each message.</p>
<p><code>BITS-Nota</code> pushes the same idea into finance: a React SPA over tRPC, D1 and R2 for data, passkeys and Google OAuth for login, and Xendit for payments. Invoicing without a database server to babysit.</p>
<p><code>BITS-Social-Manager</code> stores project credentials across teams with JWT auth and Drizzle ORM — sensitive accounts protected behind a single, auditable worker.</p>
<h2>Why this wins</h2>
<p>One worker means one deploy, one cold-start path, one place to reason about security. D1 gives SQL without the ops. The trade-off is clear: you give up long-running processes, and you get a platform you can actually understand end to end.</p>
<blockquote>If the whole product fits in one worker and one database, ship it there.</blockquote>
`,
  },
  {
    slug: 'qris-and-payments-tooling-for-indonesia',
    title: 'QRIS & Payments Tooling for Indonesia',
    category: 'payments',
    date: '2026-09-08',
    read: '6 Min Read',
    tags: ['qris', 'payments', 'emvco', 'gpn', 'indonesia'],
    summary: 'Static-to-dynamic QRIS conversion, a payment gateway, and a telco CLI — the payment edge cases that become real products.',
    body: `
<p>QRIS unified Indonesian QR payments into one code, but the gap between a static merchant QR and a dynamic, per-transaction QR is where most small systems fall over.</p>
<p><code>BITS-QRIS-Converter</code> closes that gap: it parses a static QR, validates the EMV/GPN tags, converts it to a dynamic QR, and renders a printable receipt image. Built on Hono and Cloudflare Workers, it ships as a PWA so merchants can run it from a phone. The parsing and checksum logic matters more here than any amount of UI.</p>
<p><code>BITS-Pay</code> takes the next step and exposes that as a QRIS payment gateway other apps can call.</p>
<p>Rounding out the payment-adjacent tooling, <code>Ah-Si-Ata</code> is a Python CLI for XL Axiata — buying packages, checking quota, managing Family Plan and Circle from the terminal, with QRIS and OTP flows included.</p>
<blockquote>In payments, exactness beats decoration: bytes, tags, and checksums before pixels.</blockquote>
`,
  },
  {
    slug: 'sveltekit-and-sanity-for-client-work',
    title: 'SvelteKit + Sanity for Client Work',
    category: 'client',
    date: '2026-09-06',
    read: '6 Min Read',
    tags: ['sveltekit', 'sanity', 'cloudflare-pages', 'landing-page', 'seo'],
    summary: 'Brick suppliers, printing shops, phone distributors — one shared foundation turns client sites into a repeatable delivery line.',
    body: `
<p>Client work has a habit of becoming twenty different codebases doing the same five things: a landing page, editable content, a contact form, and a product catalog.</p>
<p>Every client-facing site here shares one foundation — SvelteKit, Tailwind, Sanity CMS for content, Resend for the contact form, and Cloudflare Pages for hosting.</p>
<p><code>BataBagus-Web</code> adds GSAP animations for a brick-and-sand supplier. <code>CetakAjaOnline-Web</code> and <code>RizaPutra-Web</code> handle digital-printing e-commerce with dynamic pricing and WhatsApp ordering. <code>PGPS-Web</code> runs a neo-brutalist landing page for a smartphone distributor, and <code>BITS-Web</code> is the multilingual corporate site.</p>
<p>The point is not that each is unique — it is that the hard 80% is solved once, so each new client only pays for the 20% that is truly theirs.</p>
<blockquote>A shared foundation turns one-off pages into a delivery line.</blockquote>
`,
  },
  {
    slug: 'self-hosted-cloud-devops-and-ai-platform',
    title: 'Self-Hosted Cloud, DevOps & AI Platform',
    category: 'cloud',
    date: '2026-09-04',
    read: '6 Min Read',
    tags: ['docker', 'self-hosted', 'monitoring', 'ai-gateway', 'observability'],
    summary: 'An AI gateway, uptime monitoring, and a media downloader — Docker-first services with observability built in from day one.',
    body: `
<p>Self-hosting only gets trustworthy when you can see what is happening. That is the thread through the cloud platform work.</p>
<p><code>BITS-Uptime-Monitoring</code> keeps every website, API, and service Banten IT Solutions runs under watch, with a public status page. <code>BITS-AI-Gateway</code> is a Docker-based routing proxy that sits in front of AI models — securing access, routing requests, and exposing observability. <code>BITS-Youtube-Mp3-Downloader</code> is a Full-stack downloader with FastAPI, Celery, Redis, and yt-dlp behind Next.js.</p>
<p>All three are Docker-first and observable by default: logs, metrics, and status are part of the deploy, not a feature you bolt on when something breaks at 2am.</p>
<blockquote>Observability ships as part of the platform, not as an afterthought.</blockquote>
`,
  },
  {
    slug: 'from-idea-to-production-how-i-ship',
    title: 'From Idea to Production: How I Ship',
    category: 'web',
    date: '2026-09-02',
    read: '5 Min Read',
    tags: ['workflow', 'devops', 'cloudflare', 'docker', 'automation'],
    summary: 'The recurring pattern behind the portfolio — small focused surfaces, boring-but-good defaults, and shipping the observability with the feature.',
    body: `
<p>Across 30+ repositories the same few decisions keep showing up, and they are deliberately boring.</p>
<h2>Ship the smallest surface that works</h2>
<p>Most products fit in one Cloudflare Worker and one database, or one Docker compose file. When a feature would demand a second service, I ask whether it truly earns it before adding the moving part.</p>
<h2>Prefer proven paths</h2>
<p>Hono and TypeScript for the edge, SvelteKit and Sanity for content, Go and sing-box for networking, Docker for self-hosted. No dependency is added for what a few lines already do.</p>
<h2>Build observability in, not on</h2>
<p>Uptime, logs, and a status page are part of the initial commit for anything public, because the first failure usually arrives before the second feature.</p>
<p>This site itself follows the rule: a Hono worker serving static assets plus one small API for the contribution graph. Nothing more than it needs.</p>
<blockquote>Boring defaults, small surfaces, and observability from day one.</blockquote>
`,
  },
]

// derived collections (newest first)
export const ALL_POSTS = [...ROUNDUPS, ...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
export const FEATURED = [...PROJECTS].filter((p) => p.highlight).sort((a, b) => b.stars - a.stars).slice(0, 3)
export const FEATURED_POSTS = ALL_POSTS.slice(0, 5)