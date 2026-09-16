// Nurul Imam — HTML/XML template builders. Pure string functions; no side effects.
import { SITE, SOCIALS, CATEGORIES, PROJECTS, ALL_POSTS, FEATURED, FEATURED_POSTS, TOOLS } from './content.mjs'
import { esc, slug, dateFmt, repoUrl, cover } from './utils.mjs'
import { I, sun, moon } from './icons.mjs'

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
</style>
<noscript><style>[data-motion]{opacity:1!important;transform:none!important}</style></noscript>
<link rel="stylesheet" href="/assets/app.css"/>
<link rel="stylesheet" href="/assets/overrides.css"/>
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
<link rel="shortcut icon" href="/assets/metadata.webp"/>
<link rel="icon" href="/assets/metadata.webp" type="image/webp"/>
<link rel="apple-touch-icon" href="/assets/metadata.webp"/>
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
  return `<header class="nav" data-motion="nav"><a class="brand" href="/" aria-label="${esc(SITE.name)}, home"><i></i><i></i><i></i></a><nav aria-label="Primary navigation"><a href="/about">About</a><a href="/projects">Projects</a><a href="/blogs">Blogs</a></nav><div class="nav-actions"><button class="theme-trigger" type="button" aria-label="Toggle theme">${sun}${moon}</button><button class="lang-trigger" type="button" aria-label="Language">${I.globe}</button><button class="mobile-menu-trigger" type="button" aria-label="Menu">${I.menu}</button></div></header>`
}

function footer() {
  const five = SOCIALS.filter((s) => ['github', 'instagram', 'linkedin', 'x', 'threads'].includes(s.key))
  return `<footer><ul class="footer-social">${five.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer" aria-label="${esc(s.label)}" style="--mark:url(/assets/platform/${s.key}.svg)"></a></li>`).join('')}</ul></footer>`
}

export function page(title, desc, path, body, img) {
  return head(title, desc, path, img || '/assets/og.webp') + '\n<body>\n<main class="portfolio" id="top">\n' + nav() + '\n' + body + '\n' + footer() + '\n</main>\n<script src="/assets/lenis.min.js"></script>\n<script src="/assets/app.js"></script>\n<script type="module" src="/assets/motion.js"></script>\n</body>\n</html>\n'
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
  return `<section class="hero"><div class="hero-copy" data-motion="heroCopy"><h1 class="hero-name"><span><span data-motion="heroName">${esc(SITE.name)}</span></span></h1><p class="hero-role"><em>${esc(SITE.title)}</em> ${esc(SITE.tagline)}</p><div class="hero-actions"><a class="hero-action-button primary-action" href="https://wa.me/62819678048" target="_blank" rel="noreferrer">${I.msg}<span>Discuss a Project</span></a><a class="hero-action-button primary-action" href="/projects">${I.layers}<span>Explore Projects</span></a></div></div><div class="portrait-wrap" data-motion="portrait"><div class="portrait-stage"><div class="portrait"><img alt="Portrait of ${esc(SITE.name)}" src="/assets/avatar.webp"/></div></div></div></section>`
}

function githubGraph() {
  return `<section class="github-section section"><div class="section-head github-head-centered" data-motion="sectionHead"><div class="github-head-wrap"><div class="github-icon-badge"><img alt="GitHub Icon" class="github-header-svg" src="/assets/github.svg"/></div><h2 class="github-heading">GitHub Contributions</h2><p class="github-subtext">Loading contributions…</p></div></div><div class="github-card" data-motion="github"><div class="github-graph-scroll" id="github-graph" data-lenis-prevent></div><div class="github-legend"><span>Less</span><div class="github-legend-squares"><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i></div><span>More</span></div></div></section>`
}

export function home() {
  const work = `<section class="work section"><div class="section-head" data-motion="sectionHead"><div><span class="section-label">01 / SELECTED WORK</span><h2 class="recent-projects-heading">Featured Projects</h2></div><p>Selected product work across interfaces, systems, networking, and open source software.</p></div><div class="project-list terminal-grid">${FEATURED.map(terminalCard).join('')}</div><div class="explore-more-wrap"><a class="explore-more-link" href="/projects"><span>Explore All Projects</span>${I.telescope}</a></div></section>`

  const bentoCls = ['bento-card-main', 'bento-card-top-right', 'bento-card-sub1', 'bento-card-sub2', 'bento-card-tall']
  const blogs = `<section class="blogs section"><div class="blogs-section-head"><p class="blogs-head-desc">Thoughts on software engineering, cloud platforms, networking, and the projects in this portfolio.</p><div class="blogs-head-title"><span class="section-label">02 / FEATURED BLOGS</span><h2 class="recent-projects-heading">Featured Blogs</h2></div></div><div class="bento-container-card"><div class="bento-grid">${FEATURED_POSTS.map((x, i) => bentoCard(x, bentoCls[i] || 'bento-card-sub1', i)).join('')}</div></div><div class="explore-more-wrap"><a class="explore-more-link" href="/blogs"><span>Explore All Blogs</span>${I.telescope}</a></div></section>`

  const dock = `<div class="dock-wrapper"><div class="dock-stack">${TOOLS.map((t, i) => `<div class="dock-item-wrap" data-motion="dock" data-motion-delay="${i * 70}"><div class="dock-item-card"><img alt="${esc(t.n)}" loading="lazy" width="28" height="28" class="dock-item-icon ${t.inv}" src="/assets/tools/${encodeURIComponent(t.f)}"/></div></div>`).join('')}</div></div><p class="tools-description">The software, apps, and tools I reach for daily when designing and engineering digital products.</p>`

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

export function projectsIndex() {
  return `<section class="collection-page projects-collection-page"><header class="collection-head" data-motion="sectionHead">${breadcrumb('Projects')}<h1>Explore Projects</h1><p>Selected product work across interfaces, systems, networking, and open source software — public and private.</p></header>${toolbar('projects', 'projects')}<div class="project-list terminal-grid" data-filter-grid>${PROJECTS.map((p, i) => `<div data-cat="${esc(p.category)}" data-search="${esc((p.name + ' ' + p.description + ' ' + (p.topics || []).join(' ')).toLowerCase())}" class="filter-item">${terminalCard(p, i)}</div>`).join('')}</div></section>`
}

export function blogsIndex() {
  return `<section class="collection-page blog-collection-page"><header class="collection-head" data-motion="sectionHead">${breadcrumb('Blogs')}<h1>Explore Blogs</h1><p>Thoughts on software engineering, cloud platforms, networking, and modern systems.</p></header>${toolbar('blogs', 'articles')}<div class="blog-index-grid" data-filter-grid>${ALL_POSTS.map((x, i) => `<article class="blog-index-card filter-item" data-motion="card" data-motion-delay="${i * 80}" data-cat="${esc(x.category)}" data-search="${esc((x.title + ' ' + x.summary + ' ' + x.tags.join(' ')).toLowerCase())}"><a href="/blog/${slug(x.slug)}"><div class="blog-index-cover"><img alt="${esc(x.title)}" loading="lazy" src="${cover(x.category)}"/></div><div class="blog-index-copy"><div class="blog-index-meta"><time>${dateFmt(x.date)}</time><i></i><span>${esc(x.read)}</span></div><h2>${esc(x.title)}</h2><p>${esc(x.summary)}</p></div></a></article>`).join('')}</div></section>`
}

// ---------- detail pages ----------
export function projectDetail(p) {
  const related = ALL_POSTS.filter((x) => x.project === p.name)
  return `<article class="article project-detail"><header class="article-head project-detail-head" data-motion="article"><h1 class="article-title">${esc(p.name)}</h1><p class="project-detail-summary">${esc(p.description)}</p><div class="article-meta project-detail-meta"><a href="${esc(repoUrl(p))}" target="_blank" rel="noreferrer"><i class="github-mark"></i>Repository</a><span class="article-meta-item">${I.pkg}${p.private ? 'Private' : 'Open Source'}</span><button class="article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/projects/${slug(p.name)}">${I.share}<span>Share</span></button></div></header><div class="article-body project-detail-body"><p><strong>${esc(p.name)}</strong> is a project by ${esc(SITE.name)} under <code>${esc(p.owner)}</code>.</p><h2>About</h2><p>${esc(p.description)}</p><h2>Stack</h2><p>Primary language: <code>${esc(p.language || 'mixed')}</code>.${p.topics.length ? ' Topics: ' + p.topics.slice(0, 8).map((t) => `<code>${esc(t)}</code>`).join(', ') + '.' : ''}</p>${p.homepage && p.homepage.startsWith('http') ? `<h2>Live</h2><p><a href="${esc(p.homepage)}" target="_blank" rel="noreferrer">${esc(p.homepage)}</a></p>` : ''}${related.length ? `<h2>Write-up</h2><p>${related.map((x) => `<a href="/blog/${slug(x.slug)}">${esc(x.title)}</a>`).join('')}</p>` : ''}</div></article>`
}

export function blogDetail(x) {
  return `<article class="article blog-detail"><header class="article-head" data-motion="article"><h1 class="article-title">${esc(x.title)}</h1><div class="article-meta"><span class="article-meta-item">${I.cal}<time class="article-date-long">${dateFmt(x.date)}</time><time class="article-date-short">${dateFmt(x.date)}</time></span><span class="article-meta-item">${I.clock}${esc(x.read)}</span><button class="article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/blog/${slug(x.slug)}">${I.share}<span>Share</span></button></div></header><div class="article-cover" data-motion="article"><img class="article-cover-img" alt="${esc(x.title)}" src="${cover(x.category)}"/></div><div class="article-body">${x.body}</div></article>`
}

// ---------- about ----------
export function about() {
  const cats = Object.entries(CATEGORIES)
  return `<section class="about-page"><article class="about-hero" data-motion="heroCopy"><header class="about-hero-lead"><p class="about-eyebrow">About / Biography</p><div class="about-identity"><div class="about-portrait"><img alt="Portrait of ${esc(SITE.name)}" src="/assets/identity.webp"/></div><div><h1 class="about-title"><span><span>${esc(SITE.name)}</span></span></h1><p class="about-role">${esc(SITE.title)} based in ${esc(SITE.location)}.</p></div></div></header><div class="about-hero-copy"><p>I build things, publish most of them openly, and keep the record here. Full-stack and DevOps engineer running ${esc(SITE.company)} — software, cloud, networking, and open source.</p><p>This page is the longer version: what I work on, the stack I reach for, and how I think about building.</p></div></article>
<section class="about-chapter about-build" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">01 / What I Do</p><h2>Software, infrastructure, and networking — end to end.</h2></div></header><ul class="about-interest-grid">${cats.map(([k, label], i) => `<li><small>0${i + 1}</small><strong>${esc(label)}</strong><span>${esc(catDesc(k))}</span></li>`).join('')}</ul></section>
<section class="about-chapter about-footprint" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">02 / Stack</p><h2>The tools I keep coming back to.</h2></div></header><p class="about-prose">Hono and TypeScript on the edge, SvelteKit and Sanity for content, Go and the sing-box kernel for networking, Docker for self-hosted, and OpenWrt for routers. One worker and one database wherever the product fits — because a system you can understand end to end is a system you can actually ship.</p></section>
<section class="about-chapter about-perspective" data-motion="sectionHead"><header class="about-chapter-head"><div><p class="about-chapter-index">03 / Digital Footprint</p><h2>A record of the work, not just a resumé.</h2></div></header><p class="about-prose">Work has a habit of disappearing into private repositories and old folders. This site keeps <a href="/projects">projects</a> and <a href="/blogs">writing</a> in one place I control, where they compound into a record of what I built.</p></section></section>`
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

// ---------- feeds ----------
export function rss() {
  const items = ALL_POSTS.slice(0, 20).map((x) => `<item><title>${esc(x.title)}</title><link>${SITE.baseUrl}/blog/${slug(x.slug)}</link><guid>${SITE.baseUrl}/blog/${slug(x.slug)}</guid><pubDate>${new Date(x.date + 'T00:00:00Z').toUTCString()}</pubDate><description>${esc(x.summary)}</description></item>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name)}</title><link>${SITE.baseUrl}</link><description>${esc(SITE.description)}</description><atom:link href="${SITE.baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
}

export function sitemap() {
  const urls = [SITE.baseUrl + '/', SITE.baseUrl + '/about', SITE.baseUrl + '/projects', ...PROJECTS.map((p) => SITE.baseUrl + '/projects/' + slug(p.name)), SITE.baseUrl + '/blogs', ...ALL_POSTS.map((x) => SITE.baseUrl + '/blog/' + slug(x.slug))]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}\n</urlset>`
}