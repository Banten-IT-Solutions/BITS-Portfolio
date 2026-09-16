// Nurul Imam — static site generator (zero deps). Run: `node site/generate.mjs`
// Clone of the mhdalif.id design (terminal cards, bento grid, ticker, dock, GitHub graph),
// driven by complete content data in site/content.mjs.
import { mkdirSync, writeFileSync, copyFileSync, rmSync, readdirSync, statSync } from 'node:fs'
import { SITE, SOCIALS, CATEGORIES, PROJECTS, POSTS, ROUNDUPS } from './content.mjs'

const PUBLIC = new URL('../public/', import.meta.url)
const STATIC = new URL('./static/', import.meta.url)

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const dateFmt = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const CNS = 'nurulimam.com'

const ALL_POSTS = [...ROUNDUPS, ...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
const FEATURED = [...PROJECTS].filter((p) => p.highlight).sort((a, b) => b.stars - a.stars).slice(0, 3)
const FEATURED_POSTS = ALL_POSTS.slice(0, 5)
const repoUrl = (p) => `https://github.com/${p.owner}/${p.name}`
const cover = (cat) => `/Assets/covers/${cat}.webp`

const TOOLS = [
  { n: 'VS Code', f: 'VSCode.svg', inv: '' },
  { n: 'Cursor', f: 'Cursor.svg', inv: 'invert-in-light' },
  { n: 'Claude Code', f: 'Claude Code.svg', inv: '' },
  { n: 'Docker', f: 'Docker.svg', inv: 'invert-in-dark' },
  { n: 'Figma', f: 'Figma.svg', inv: '' },
  { n: 'Notion', f: 'Notion.svg', inv: 'invert-in-dark' },
  { n: 'Obsidian', f: 'Obsidian.svg', inv: '' },
  { n: 'Termius', f: 'Termius.svg', inv: 'invert-in-dark' },
  { n: 'Brave', f: 'Brave Origin.svg', inv: '' },
  { n: 'Codex', f: 'Codex.svg', inv: '' },
  { n: 'Kiro', f: 'Kiro.svg', inv: 'invert-in-dark' },
  { n: 'Bitwarden', f: 'Bitwarden.svg', inv: '' },
  { n: 'Discord', f: 'Discord.svg', inv: '' },
  { n: 'VSCode', f: 'VSCode.svg', inv: '' },
]

// ---------- lucide icons ----------
const I = {
  msg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
  layers: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
  telescope: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-telescope" aria-hidden="true"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455Z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  funnel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel" aria-hidden="true"><path d="M22 3H2l8 9.46V19l4 2v-8.54Z"/></svg>',
  house: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house" aria-hidden="true"><path d="M3 10a2 2 0 0 0 .709 1.528l7 5.999a2 2 0 0 0 2.582 0l7-5.999A2 2 0 0 0 21 10V9a2 2 0 0 0-2-2h-4.586a1 1 0 0 1-.707-.293l-1.121-1.121A2 2 0 0 0 11.172 5H5a2 2 0 0 0-2 2Z"/><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/></svg>',
  cmd: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-command blog-search-command" aria-hidden="true"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>',
  pkg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-open" aria-hidden="true"><path d="M12 22v-9"/><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="m20 13.35-6.17 2.72a1.67 1.67 0 0 1-1.63 0z"/></svg>',
  cal: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-range" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M7 14h3"/><path d="M14 14h3"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
}

// ---------- shell ----------
function head(title, desc, path, img) {
  const url = SITE.baseUrl + path
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<script>(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}})();</script>
<style>
[data-motion="nav"]{opacity:0;transform:translateY(-12px)}
[data-motion="heroName"]{transform:translateY(110%)}
[data-motion="heroCopy"]{opacity:0;transform:translateY(24px)}
[data-motion="portrait"]{opacity:0;transform:scale(.96)}
[data-motion="sectionHead"],[data-motion="github"],[data-motion="article"],[data-motion="card"],[data-motion="bento"]{opacity:0;transform:translateY(20px)}
[data-motion="dock"]{opacity:0;transform:translateY(16px) scale(.85)}
.theme-trigger{width:36px;height:36px;color:var(--muted);cursor:pointer;border:0;border-radius:50%;justify-self:end;place-items:center;padding:0;transition:color .2s,transform .2s;display:grid;background:0 0!important}
.theme-trigger:hover{color:var(--ink)}
.theme-trigger .sun{display:none}
.theme-trigger .moon{display:inline}
html.dark .theme-trigger .sun{display:inline}
html.dark .theme-trigger .moon{display:none}
footer{border-top:1px solid var(--line);margin-top:40px}
header.nav{background:var(--shell);border-bottom:1px solid var(--line)}
:root{--font-sans:"Instrument Serif",Georgia,serif;--font-satoshi:"Instrument Serif",Georgia,serif;--font-display:"Instrument Serif",Georgia,serif}
body,p{letter-spacing:.02em}
nav nav{font-size:15px}
.work.section{padding-top:48px}
.braided-ticker{border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:6px;overflow:hidden;position:relative}
.braided-ticker .ticker-row{height:40px;overflow:hidden;display:flex;align-items:center;-webkit-mask-image:linear-gradient(90deg,#0000,#000 7% 93%,#0000);mask-image:linear-gradient(90deg,#0000,#000 7% 93%,#0000)}
.braided-ticker .ticker-row + .ticker-row{border-top:1px solid var(--line)}
.braided-ticker .ticker-track{display:flex;align-items:center;width:max-content;height:100%;will-change:transform;flex:none}
.braided-ticker .ticker-group{display:flex;align-items:center;flex:none}
.braided-ticker .ticker-group span{white-space:nowrap;display:flex;align-items:center;gap:28px;padding-right:28px;font:9px var(--font-mono);text-transform:uppercase;color:var(--muted)}
.braided-ticker .ticker-group i{flex:none;width:5px;height:5px;background:var(--ink);transform:rotate(45deg)}
.braided-ticker .t2{opacity:.65}
.braided-ticker .t1 .ticker-track{animation:42s linear infinite bfwd}
.braided-ticker .t2 .ticker-track{animation:26s linear infinite brev}
@keyframes bfwd{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes brev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@media (max-width:460px){.braided-ticker{margin-top:6px}.braided-ticker .ticker-row{height:32px}.braided-ticker .ticker-group span{gap:12px;padding-right:12px;font-size:8px}}
</style>
<noscript><style>[data-motion]{opacity:1!important;transform:none!important}</style></noscript>
<link rel="stylesheet" href="/assets/app.css"/>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,400&display=swap"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<link rel="author" href="${esc(SITE.baseUrl)}"/>
<meta name="author" content="${esc(SITE.author)}"/>
<meta name="keywords" content="${esc(SITE.keywords)}"/>
<meta name="creator" content="${esc(SITE.author)}"/>
<meta name="robots" content="index, follow"/>
<meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"/>
<link rel="canonical" href="${esc(url)}"/>
<link rel="alternate" type="application/rss+xml" href="${esc(SITE.baseUrl)}/feed.xml"/>
<link rel="shortcut icon" href="/Assets/Alif - Metadata.webp"/>
<link rel="icon" href="/Assets/Alif - Metadata.webp" type="image/webp"/>
<link rel="apple-touch-icon" href="/Assets/Alif - Metadata.webp"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:url" content="${esc(url)}"/>
<meta property="og:site_name" content="${esc(SITE.name)}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="${esc(SITE.baseUrl)}${img}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(desc)}"/>
<meta name="twitter:image" content="${esc(SITE.baseUrl)}${img}"/>
</head>`
}

function nav() {
  const sun = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
  const moon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
  return `<header class="nav" data-motion="nav"><a class="brand" href="/" aria-label="${esc(SITE.name)}, home"><i></i><i></i><i></i></a><nav aria-label="Primary navigation"><a href="/about">About</a><a href="/projects">Projects</a><a href="/blogs">Blogs</a></nav><div class="nav-actions"><button class="theme-trigger" type="button" aria-label="Toggle theme">${sun}${moon}</button><button class="lang-trigger" type="button" aria-label="Language">${I.globe}</button><button class="mobile-menu-trigger" type="button" aria-label="Menu">${I.menu}</button></div></header>`
}

function footer() {
  const five = SOCIALS.filter((s) => ['github', 'instagram', 'linkedin', 'x', 'threads'].includes(s.key))
  return `<footer><ul class="footer-social">${five.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer" aria-label="${esc(s.label)}" style="--mark:url(/Assets/platform/${s.key}.svg)"></a></li>`).join('')}</ul></footer>`
}

function page(title, desc, path, body, img) {
  return head(title, desc, path, img || '/Assets/Alif - Social Preview Seamless.webp') + '\n<body>\n<main class="portfolio" id="top">\n' + nav() + '\n' + body + '\n' + footer() + '\n</main>\n<script src="/assets/lenis.min.js"></script>\n<script src="/assets/app.js"></script>\n<script type="module" src="/assets/motion.js"></script>\n</body>\n</html>\n'
}

// ---------- cards ----------
function terminalCard(p, i = 0) {
  const tags = (p.topics || []).slice(0, 4)
  return `<article class="terminal-repo-card" data-motion="card" data-motion-delay="${i * 80}" id="project-${p.name.toLowerCase()}"><div class="terminal-header"><div class="terminal-dots"><i></i><i></i><i></i></div></div><div class="terminal-body"><div class="terminal-title"><h3><a class="terminal-card-link" href="/projects/${slug(p.name)}">${esc(p.name)}</a></h3></div><p class="terminal-desc">${esc(p.description)}</p><div class="terminal-footer"><div class="terminal-tags">${tags.map((t) => `<span class="terminal-tag">${esc(t)}</span>`).join('')}</div></div></div><div class="terminal-card-actions"><a href="${esc(repoUrl(p))}" target="_blank" rel="noreferrer" class="terminal-card-action" aria-label="Open ${esc(p.name)} GitHub repository" title="Open ${esc(p.name)} GitHub repository" tabindex="0"><span aria-hidden="true"><i class="github-mark"></i></span></a><button type="button" class="terminal-card-action" aria-label="Share project ${esc(p.name)}" title="Share project" data-share="${esc(SITE.baseUrl)}/projects/${slug(p.name)}" tabindex="0">${I.share}</button></div></article>`
}

function bentoCard(x, cls, i = 0) {
  return `<a class="bento-card ${cls}" data-motion="bento" data-motion-delay="${i * 70}" href="/blog/${slug(x.slug)}"><img alt="${esc(x.title)}" loading="lazy" class="bento-bg-img" src="${cover(x.category)}"/><div class="bento-overlay"></div><div class="bento-content"><h3>${esc(x.title)}</h3><div class="bento-meta-bar"><span class="bento-date">${dateFmt(x.date)}</span><i></i><span class="bento-date">${esc(x.read)}</span></div></div></a>`
}

function sectionLabel(n, text) {
  return `<span class="section-label">${n} / ${esc(text.toUpperCase())}</span>`
}

// ---------- home ----------
function ticker() {
  const items = SITE.marquee
  const spans = items.map((m) => `<span>${esc(m)}<i></i></span>`).join('')
  const group = `<div class="ticker-group">${spans}</div>`
  const track = (dir) => `<div class="ticker-track ${dir}">${group}${group}</div>`
  return `<div class="braided-ticker" aria-hidden="true"><div class="ticker-row t1">${track('fwd')}</div><div class="ticker-row t2">${track('rev')}</div></div>`
}

function hero() {
  return `<section class="hero"><div class="hero-copy" data-motion="heroCopy"><h1 class="hero-name"><span><span data-motion="heroName">${esc(SITE.name)}</span></span></h1><p class="hero-role"><em>${esc(SITE.title)}</em> ${esc(SITE.tagline)}</p><div class="hero-actions"><a class="hero-action-button primary-action" href="https://wa.me/62819678048" target="_blank" rel="noreferrer">${I.msg}<span>Discuss a Project</span></a><a class="hero-action-button primary-action" href="/projects">${I.layers}<span>Explore Projects</span></a></div></div><div class="portrait-wrap" data-motion="portrait"><div class="portrait-stage"><div class="portrait"><img alt="Portrait of ${esc(SITE.name)}" src="/Assets/Alif.webp"/></div></div></div></section>`
}

function githubGraph() {
  return `<section class="github-section section"><div class="section-head github-head-centered" data-motion="sectionHead"><div class="github-head-wrap"><div class="github-icon-badge"><img alt="GitHub Icon" class="github-header-svg" src="/Assets/github.svg"/></div><h2 class="github-heading">GitHub Contributions</h2><p class="github-subtext">Loading contributions…</p></div></div><div class="github-card" data-motion="github"><div class="github-graph-scroll" id="github-graph" data-lenis-prevent></div><div class="github-legend"><span>Less</span><div class="github-legend-squares"><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i></div><span>More</span></div></div></section>`
}

function home() {
  const work = `<section class="work section"><div class="section-head" data-motion="sectionHead"><div><span class="section-label">01 / SELECTED WORK</span><h2 class="recent-projects-heading">Featured Projects</h2></div><p>Selected product work across interfaces, systems, networking, and open source software.</p></div><div class="project-list terminal-grid">${FEATURED.map(terminalCard).join('')}</div><div class="explore-more-wrap"><a class="explore-more-link" href="/projects"><span>Explore All Projects</span>${I.telescope}</a></div></section>`

  const bentoCls = ['bento-card-main', 'bento-card-top-right', 'bento-card-sub1', 'bento-card-sub2', 'bento-card-tall']
  const blogs = `<section class="blogs section"><div class="blogs-section-head"><p class="blogs-head-desc">Thoughts on software engineering, cloud platforms, networking, and the projects in this portfolio.</p><div class="blogs-head-title"><span class="section-label">02 / FEATURED BLOGS</span><h2 class="recent-projects-heading">Featured Blogs</h2></div></div><div class="bento-container-card"><div class="bento-grid">${FEATURED_POSTS.map((x, i) => bentoCard(x, bentoCls[i] || 'bento-card-sub1', i)).join('')}</div></div><div class="explore-more-wrap"><a class="explore-more-link" href="/blogs"><span>Explore All Blogs</span>${I.telescope}</a></div></section>`

  const dock = `<div class="dock-wrapper"><div class="dock-stack">${TOOLS.map((t, i) => `<div class="dock-item-wrap" data-motion="dock" data-motion-delay="${i * 70}"><div class="dock-item-card"><img alt="${esc(t.n)}" loading="lazy" width="28" height="28" class="dock-item-icon ${t.inv}" src="/Assets/tools/${encodeURIComponent(t.f)}"/></div></div>`).join('')}</div></div><p class="tools-description">The software, apps, and tools I reach for daily when designing and engineering digital products.</p>`

  const quote = `<blockquote class="hero-quote github-quote"><p>“The happiness of your life depends upon the quality of your thoughts.”</p><cite>Marcus Aurelius</cite></blockquote>`

  return hero() + ticker() + work + blogs + githubGraph() + quote + dock
}

// ---------- collection (projects/blogs) ----------
function breadcrumb(label) {
  return `<nav class="collection-breadcrumb"><ol class="flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground"><li class="inline-flex items-center gap-1"><a class="transition-colors hover:text-foreground" href="/">${I.house}<span>Home</span></a></li><li class="[&amp;&gt;svg]:size-3.5"></li><li class="inline-flex items-center gap-1"><span>${esc(label)}</span></li></ol></nav>`
}

function toolbar(label, noun) {
  return `<div class="blog-index-toolbar"><span class="sr-only">${esc(noun)}</span><div class="blog-index-controls"><label class="blog-search">${I.search}<span class="sr-only">Search ${esc(label)}</span><input type="search" placeholder="Search ${esc(label.toLowerCase())}…" data-filter-input/>${I.cmd}</label><button class="blog-sort-trigger" type="button">${I.funnel}<span>Filter</span></button></div></div>`
}

function projectsIndex() {
  const body = `<section class="collection-page projects-collection-page"><header class="collection-head" data-motion="sectionHead">${breadcrumb('Projects')}<h1>Explore Projects</h1><p>Selected product work across interfaces, systems, networking, and open source software — public and private.</p></header>${toolbar('projects', 'projects')}<div class="project-list terminal-grid" data-filter-grid>${PROJECTS.map((p, i) => `<div data-cat="${esc(p.category)}" data-search="${esc((p.name + ' ' + p.description + ' ' + (p.topics || []).join(' ')).toLowerCase())}" class="filter-item">${terminalCard(p, i)}</div>`).join('')}</div></section>`
  return body
}

function blogsIndex() {
  const body = `<section class="collection-page blog-collection-page"><header class="collection-head" data-motion="sectionHead">${breadcrumb('Blogs')}<h1>Explore Blogs</h1><p>Thoughts on software engineering, cloud platforms, networking, and modern systems.</p></header>${toolbar('blogs', 'articles')}<div class="blog-index-grid" data-filter-grid>${ALL_POSTS.map((x, i) => `<article class="blog-index-card filter-item" data-motion="card" data-motion-delay="${i * 80}" data-cat="${esc(x.category)}" data-search="${esc((x.title + ' ' + x.summary + ' ' + x.tags.join(' ')).toLowerCase())}"><a href="/blog/${slug(x.slug)}"><div class="blog-index-cover"><img alt="${esc(x.title)}" loading="lazy" src="${cover(x.category)}"/></div><div class="blog-index-copy"><div class="blog-index-meta"><time>${dateFmt(x.date)}</time><i></i><span>${esc(x.read)}</span></div><h2>${esc(x.title)}</h2><p>${esc(x.summary)}</p></div></a></article>`).join('')}</div></section>`
  return body
}

// ---------- detail pages ----------
function projectDetail(p) {
  const related = ALL_POSTS.filter((x) => x.project === p.name)
  const body = `<article class="article project-detail"><header class="article-head project-detail-head" data-motion="article"><h1 class="article-title">${esc(p.name)}</h1><p class="project-detail-summary">${esc(p.description)}</p><div class="article-meta project-detail-meta"><a href="${esc(repoUrl(p))}" target="_blank" rel="noreferrer"><i class="github-mark"></i>Repository</a><span class="article-meta-item">${I.pkg}${p.private ? 'Private' : 'Open Source'}</span><button class="article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/projects/${slug(p.name)}">${I.share}<span>Share</span></button></div></header><div class="article-body project-detail-body"><p><strong>${esc(p.name)}</strong> is a project by ${esc(SITE.name)} under <code>${esc(p.owner)}</code>.</p><h2>About</h2><p>${esc(p.description)}</p><h2>Stack</h2><p>Primary language: <code>${esc(p.language || 'mixed')}</code>.${p.topics.length ? ' Topics: ' + p.topics.slice(0, 8).map((t) => `<code>${esc(t)}</code>`).join(', ') + '.' : ''}</p>${p.homepage && p.homepage.startsWith('http') ? `<h2>Live</h2><p><a href="${esc(p.homepage)}" target="_blank" rel="noreferrer">${esc(p.homepage)}</a></p>` : ''}${related.length ? `<h2>Write-up</h2><p>${related.map((x) => `<a href="/blog/${slug(x.slug)}">${esc(x.title)}</a>`).join('')}</p>` : ''}</div></article>`
  return body
}

function blogDetail(x) {
  const body = `<article class="article blog-detail"><header class="article-head" data-motion="article"><h1 class="article-title">${esc(x.title)}</h1><div class="article-meta"><span class="article-meta-item">${I.cal}<time class="article-date-long">${dateFmt(x.date)}</time><time class="article-date-short">${dateFmt(x.date)}</time></span><span class="article-meta-item">${I.clock}${esc(x.read)}</span><button class="article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/blog/${slug(x.slug)}">${I.share}<span>Share</span></button></div></header><div class="article-cover" data-motion="article"><img class="article-cover-img" alt="${esc(x.title)}" src="${cover(x.category)}"/></div><div class="article-body">${x.body}</div></article>`
  return body
}

// ---------- about ----------
function about() {
  const cats = Object.entries(CATEGORIES)
  const body = `<section class="about-page"><article class="about-hero" data-motion="heroCopy"><header class="about-hero-lead"><p class="about-eyebrow">About / Biography</p><div class="about-identity"><div class="about-portrait"><img alt="Portrait of ${esc(SITE.name)}" src="/Assets/Alif-identity.webp"/></div><div><h1 class="about-title"><span><span>${esc(SITE.name)}</span></span></h1><p class="about-role">${esc(SITE.title)} based in ${esc(SITE.location)}.</p></div></div></header><div class="about-hero-copy"><p>I build things, publish most of them openly, and keep the record here. Full-stack and DevOps engineer running ${esc(SITE.company)} — software, cloud, networking, and open source.</p><p>This page is the longer version: what I work on, the stack I reach for, and how I think about building.</p></div></article>
<section class="about-chapter about-build" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">01 / What I Do</p><h2>Software, infrastructure, and networking — end to end.</h2></div></header><ul class="about-interest-grid">${cats.map(([k, label], i) => `<li><small>0${i + 1}</small><strong>${esc(label)}</strong><span>${esc(catDesc(k))}</span></li>`).join('')}</ul></section>
<section class="about-chapter about-footprint" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">02 / Stack</p><h2>The tools I keep coming back to.</h2></div></header><p class="about-prose">Hono and TypeScript on the edge, SvelteKit and Sanity for content, Go and the sing-box kernel for networking, Docker for self-hosted, and OpenWrt for routers. One worker and one database wherever the product fits — because a system you can understand end to end is a system you can actually ship.</p></section>
<section class="about-chapter about-perspective" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">03 / Digital Footprint</p><h2>A record of the work, not just a resumé.</h2></div></header><p class="about-prose">Work has a habit of disappearing into private repositories and old folders. This site keeps <a href="/projects">projects</a> and <a href="/blogs">writing</a> in one place I control, where they compound into a record of what I built.</p></section></section>`
  return body
}
function catDesc(k) {
  const m = {
    networking: 'Serverless VPN relays, native clients, and Go rule-set builders.',
    router: 'Custom OpenWrt firmware, a branded theme, and drop-in LuCI apps.',
    web: 'SaaS platforms and apps on Cloudflare Workers, Hono, and D1.',
    payments: 'QRIS conversion, a payment gateway, and telco CLI tooling.',
    client: 'SvelteKit + Sanity + Cloudflare Pages sites for clients.',
    cloud: 'Docker-first, self-hosted services with observability built in.',
    tools: 'Python and CLI automation for the repetitive parts.',
  }
  return m[k] || ''
}

// ---------- write ----------
function write(path, content) {
  const file = new URL('../public/' + path, import.meta.url)
  mkdirSync(new URL('.', file).pathname, { recursive: true })
  writeFileSync(file, content)
}

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const e of readdirSync(src)) {
    const s = new URL(e + '/', src).pathname.replace(/\/$/, '')
    const sFull = src.pathname + e
    if (statSync(sFull).isDirectory()) { copyDir(new URL(e + '/', src), new URL(e + '/', dest)); continue }
    copyFileSync(sFull, new URL(e, dest))
  }
}

rmSync(PUBLIC, { recursive: true, force: true })
mkdirSync(new URL('assets/', PUBLIC), { recursive: true })

// css chunk -> assets/app.css
copyFileSync(new URL('chunk.css', STATIC), new URL('assets/app.css', PUBLIC))
// platform, tools, misc svg
copyDir(new URL('platform/', STATIC), new URL('Assets/platform/', PUBLIC))
copyDir(new URL('tools/', STATIC), new URL('Assets/tools/', PUBLIC))
copyDir(new URL('covers/', STATIC), new URL('Assets/covers/', PUBLIC))
copyFileSync(new URL('github.svg', STATIC), new URL('Assets/github.svg', PUBLIC))
copyFileSync(new URL('pc-and-desktop-gray.svg', STATIC), new URL('Assets/pc-and-desktop-gray.svg', PUBLIC))
// avatar images (kept under the original Alif* filenames)
copyFileSync(new URL('images/avatar.webp', STATIC), new URL('Assets/Alif.webp', PUBLIC))
copyFileSync(new URL('images/metadata.webp', STATIC), new URL('Assets/Alif - Metadata.webp', PUBLIC))
copyFileSync(new URL('images/og.webp', STATIC), new URL('Assets/Alif - Social Preview Seamless.webp', PUBLIC))
copyFileSync(new URL('images/identity.webp', STATIC), new URL('Assets/Alif-identity.webp', PUBLIC))
// app.js + motion.js + lenis
copyFileSync(new URL('app.js', SITEDIR()), new URL('assets/app.js', PUBLIC))
copyFileSync(new URL('motion.js', SITEDIR()), new URL('assets/motion.js', PUBLIC))
copyFileSync(new URL('lenis.min.js', STATIC), new URL('assets/lenis.min.js', PUBLIC))

// pages
write('index.html', page(`${SITE.name} - ${SITE.title}`, SITE.description, '/', home()))
write('about/index.html', page(`About | ${SITE.name}`, `About ${SITE.name}, ${SITE.title} from ${SITE.location}.`, '/about', about()))
write('projects/index.html', page('Projects | ' + SITE.name, 'All projects by ' + SITE.name, '/projects', projectsIndex()))
for (const p of PROJECTS) write('projects/' + slug(p.name) + '/index.html', page(`${p.name} | ${SITE.name}`, p.description, '/projects/' + slug(p.name), projectDetail(p)))
write('blogs/index.html', page('Blogs | ' + SITE.name, 'Blog by ' + SITE.name, '/blogs', blogsIndex()))
for (const x of ALL_POSTS) write('blog/' + slug(x.slug) + '/index.html', page(x.title, x.summary, '/blog/' + slug(x.slug), blogDetail(x), cover(x.category)))
write('404.html', page('404 | ' + SITE.name, 'Page not found', '/404', `<section class="section"><h1>404</h1><p class="muted">This page could not be found.</p></section>`))
write('feed.xml', rss())
write('sitemap.xml', sitemap())
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`)

function SITEDIR() { return new URL('./', import.meta.url) }

function rss() {
  const items = ALL_POSTS.slice(0, 20).map((x) => `<item><title>${esc(x.title)}</title><link>${SITE.baseUrl}/blog/${slug(x.slug)}</link><guid>${SITE.baseUrl}/blog/${slug(x.slug)}</guid><pubDate>${new Date(x.date + 'T00:00:00Z').toUTCString()}</pubDate><description>${esc(x.summary)}</description></item>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name)}</title><link>${SITE.baseUrl}</link><description>${esc(SITE.description)}</description><atom:link href="${SITE.baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
}
function sitemap() {
  const urls = [SITE.baseUrl + '/', SITE.baseUrl + '/about', SITE.baseUrl + '/projects', ...PROJECTS.map((p) => SITE.baseUrl + '/projects/' + slug(p.name)), SITE.baseUrl + '/blogs', ...ALL_POSTS.map((x) => SITE.baseUrl + '/blog/' + slug(x.slug))]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}\n</urlset>`
}

console.log(`Generated ${ALL_POSTS.length} posts, ${PROJECTS.length} projects.`)