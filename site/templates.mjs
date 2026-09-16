// Nurul Imam — HTML/XML template builders. Pure string functions; no side effects.
import { SITE, SOCIALS, CATEGORIES, PROJECTS, ALL_POSTS, FEATURED, FEATURED_POSTS, TOOLS } from './content.mjs'
import { esc, slug, dateFmt, repoUrl } from './utils.mjs'
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
[data-motion="sectionHead"],[data-motion="github"],[data-motion="article"],[data-motion="card"]{opacity:0;transform:translateY(20px)}
[data-motion="dock"]{opacity:0;transform:translateY(16px) scale(.85)}
</style>
<noscript><style>[data-motion]{opacity:1!important;transform:none!important}</style></noscript>
<link rel="stylesheet" href="/assets/app.css"/>
<link rel="stylesheet" href="/assets/overrides.css"/>
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
  return `<header class="nav" data-motion="nav"><a class="brand" href="/" aria-label="${esc(SITE.name)}, home"><i></i><i></i><i></i></a><nav aria-label="Primary navigation"><a href="/about">About</a><a href="/projects">Projects</a><a href="/blogs">Blogs</a></nav><div class="nav-actions"><button class="theme-trigger" type="button" aria-label="Toggle theme">${sun}${moon}</button><button class="mobile-menu-trigger" type="button" aria-label="Menu">${I.menu}</button></div></header>`
}

function footer() {
  return `<footer><ul class="footer-social">${SOCIALS.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer" aria-label="${esc(s.label)}" style="--mark:url(/assets/platform/${s.key}.svg)"></a></li>`).join('')}</ul></footer>`
}

export function page(title, desc, path, body, img) {
  return head(title, desc, path, img || '/assets/og.webp') + '\n<body>\n<main class="portfolio" id="top">\n' + nav() + '\n' + body + '\n' + footer() + '\n</main>\n<script src="/assets/lenis.min.js"></script>\n<script src="/assets/app.js"></script>\n<script type="module" src="/assets/motion.js"></script>\n</body>\n</html>\n'
}

// ---------- cards ----------
// language dot colors (GitHub linguist palette)
const LANG_COLORS = { Go: '#00add8', TypeScript: '#3178c6', Svelte: '#ff3e00', Kotlin: '#7f52ff', Python: '#3776ab', Shell: '#89e051', CSS: '#663399', JavaScript: '#f1e05a', Vue: '#41b883', PHP: '#777bb4', HTML: '#e34c26', Dockerfile: '#384d54' }

function workRow(p, i = 0, attrs = '') {
  const langColor = LANG_COLORS[p.language] || 'var(--muted)'
  const stars = p.stars > 0 ? `<span class="work-row-stars">★ ${p.stars}</span>` : ''
  const cat = CATEGORIES[p.category] || p.category
  return `<li data-motion="card" data-motion-delay="${i * 90}"${attrs}><a class="work-row" href="/projects/${slug(p.name)}"><span class="work-row-index">${String(i + 1).padStart(2, '0')}</span><span class="work-row-main"><h3 class="work-row-title">${esc(p.name)}</h3><p class="work-row-desc">${esc(p.description)}</p></span><span class="work-row-meta"><span class="work-row-cat">${esc(cat)}</span><span class="work-row-lang"><i style="--lang:${langColor}"></i>${esc(p.language || '')}</span>${stars}</span><span class="work-row-arrow" aria-hidden="true">→</span></a></li>`
}

function postRow(x, i = 0, attrs = '') {
  return `<li data-motion="card" data-motion-delay="${i * 90}"${attrs}><a class="work-row post-row" href="/blogs/${slug(x.slug)}"><span class="work-row-index">${String(i + 1).padStart(2, '0')}</span><span class="work-row-main"><h3 class="work-row-title post-row-title">${esc(x.title)}</h3></span><span class="work-row-meta"><span>${dateFmt(x.date)}</span><span>${esc(x.read)}</span></span><span class="work-row-arrow" aria-hidden="true">→</span></a></li>`
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
  const wa = SOCIALS.find((s) => s.key === 'whatsapp')?.url || ''
  return `<section class="hero"><div class="hero-copy" data-motion="heroCopy"><h1 class="hero-name"><span><span data-motion="heroName">${esc(SITE.name)}</span></span></h1><p class="hero-role"><em>${esc(SITE.title)}</em> ${esc(SITE.tagline)}</p><div class="hero-actions"><a class="hero-action-button primary-action" href="${esc(wa)}" target="_blank" rel="noreferrer">${I.msg}<span>Discuss a Project</span></a><a class="hero-action-button primary-action" href="/projects">${I.layers}<span>Explore Projects</span></a></div></div><div class="portrait-wrap" data-motion="portrait"><div class="portrait-stage"><div class="portrait"><img alt="Portrait of ${esc(SITE.name)}" src="/assets/avatar.webp"/></div></div></div></section>`
}

function githubGraph() {
  return `<section class="github-section section"><div class="section-head github-head-centered" data-motion="sectionHead"><div class="github-head-wrap"><div class="github-icon-badge"><img alt="GitHub Icon" class="github-header-svg" src="/assets/github.svg"/></div><h2 class="github-heading">GitHub Contributions</h2><p class="github-subtext">Loading contributions…</p></div></div><div class="github-card" data-motion="github"><div class="github-graph-scroll" id="github-graph" data-lenis-prevent></div><div class="github-legend"><span>Less</span><div class="github-legend-squares"><i class="level-0"></i><i class="level-1"></i><i class="level-2"></i><i class="level-3"></i><i class="level-4"></i></div><span>More</span></div></div></section>`
}

export function home() {
  const work = `<section class="work section"><div class="section-head work-head" data-motion="sectionHead"><div><h2 class="work-heading">Featured Projects</h2></div><p><em>A selection of things I’ve designed, built, and shipped.</em></p></div><ol class="work-list">${FEATURED.map(workRow).join('')}</ol><div class="explore-more-wrap"><a class="explore-more-link" href="/projects"><span>Explore All Projects</span><span class="explore-more-arrow" aria-hidden="true">→</span></a></div></section>`

  const blogs = `<section class="blogs section"><div class="section-head work-head" data-motion="sectionHead"><div><h2 class="work-heading">Recent Posts</h2></div><p><em>What I’ve been learning and writing about.</em></p></div><ol class="work-list post-list">${FEATURED_POSTS.map(postRow).join('')}</ol><div class="explore-more-wrap"><a class="explore-more-link" href="/blogs"><span>Explore All Blogs</span><span class="explore-more-arrow" aria-hidden="true">→</span></a></div></section>`

  const dock = `<div class="dock-wrapper"><div class="dock-stack">${TOOLS.map((t, i) => `<div class="dock-item-wrap" data-motion="dock" data-motion-delay="${i * 70}"><div class="dock-item-card"><img alt="${esc(t.n)}" loading="lazy" width="28" height="28" class="dock-item-icon ${t.inv}" src="/assets/tools/${encodeURIComponent(t.f)}"/></div></div>`).join('')}</div></div><p class="tools-description"><em>The software, apps, and tools I reach for daily when designing and engineering digital products.</em></p>`

  return hero() + ticker() + work + blogs + githubGraph() + dock
}

// ---------- collection (projects/blogs) ----------
function breadcrumb(label) {
  return `<nav class="collection-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">${I.house}<span>Home</span></a></li><li class="crumb-sep" aria-hidden="true">/</li><li><span class="crumb-current">${esc(label)}</span></li></ol></nav>`
}

function collectionHead(title, lede) {
  return `<div class="section-head work-head" data-motion="sectionHead"><div><h1 class="work-heading">${esc(title)}</h1></div><p><em>${esc(lede)}</em></p></div>`
}

function toolbar(label, noun) {
  return `<div class="blog-index-toolbar"><span class="sr-only">${esc(noun)}</span><div class="blog-index-controls"><label class="blog-search">${I.search}<span class="sr-only">Search ${esc(label)}</span><input type="search" placeholder="Search ${esc(label.toLowerCase())}…" data-filter-input/>${I.cmd}</label><button class="blog-sort-trigger" type="button">${I.funnel}<span>Filter</span></button></div></div>`
}

const filterAttrs = (cat, text) => ` class="filter-item" data-cat="${esc(cat)}" data-search="${esc(text.toLowerCase())}"`

export function projectsIndex() {
  return `<section class="collection-page projects-collection-page">${breadcrumb('Projects')}${collectionHead('Explore Projects', 'Every project, public and private — interfaces, systems, networking, and open source software.')}${toolbar('projects', 'projects')}<ol class="work-list" data-filter-grid>${PROJECTS.map((p, i) => workRow(p, i, filterAttrs(p.category, p.name + ' ' + p.description + ' ' + (p.topics || []).join(' ')))).join('')}</ol></section>`
}

export function blogsIndex() {
  return `<section class="collection-page blog-collection-page">${breadcrumb('Blogs')}${collectionHead('Explore Blogs', 'Thoughts on software engineering, cloud platforms, networking, and modern systems.')}${toolbar('blogs', 'articles')}<ol class="work-list post-list" data-filter-grid>${ALL_POSTS.map((x, i) => postRow(x, i, filterAttrs(x.category, x.title + ' ' + x.summary + ' ' + x.tags.join(' ')))).join('')}</ol></section>`
}

// ---------- detail pages ----------
function detailChip(s) {
  return `<span class="detail-chip">${s}</span>`
}

export function projectDetail(p) {
  const related = ALL_POSTS.filter((x) => x.project === p.name)
  const chips = [
    `<a class="detail-chip" href="${esc(repoUrl(p))}" target="_blank" rel="noreferrer"><i class="github-mark"></i>Repository</a>`,
    detailChip(esc(CATEGORIES[p.category] || p.category)),
    p.language ? detailChip(esc(p.language)) : '',
    p.stars > 0 ? detailChip(`★ ${p.stars}`) : '',
    detailChip(p.private ? 'Private' : 'Open Source'),
    `<button class="detail-chip article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/projects/${slug(p.name)}">${I.share}<span>Share</span></button>`,
  ]
  return `<article class="article project-detail">${breadcrumb('Projects')}<header class="section-head work-head" data-motion="article"><div><h1 class="work-heading">${esc(p.name)}</h1></div><p><em>${esc(p.description)}</em></p><div class="detail-meta">${chips.join('')}</div></header><div class="article-body project-detail-body"><p><strong>${esc(p.name)}</strong> is a project by ${esc(SITE.name)} under <code>${esc(p.owner)}</code>.</p><h2>About</h2><p>${esc(p.description)}</p><h2>Stack</h2><p>Primary language: <code>${esc(p.language || 'mixed')}</code>.${p.topics.length ? ' Topics: ' + p.topics.slice(0, 8).map((t) => `<code>${esc(t)}</code>`).join(', ') + '.' : ''}</p>${p.homepage && p.homepage.startsWith('http') ? `<h2>Live</h2><p><a href="${esc(p.homepage)}" target="_blank" rel="noreferrer">${esc(p.homepage)}</a></p>` : ''}${related.length ? `<h2>Write-up</h2><p>${related.map((x) => `<a href="/blogs/${slug(x.slug)}">${esc(x.title)}</a>`).join('')}</p>` : ''}</div></article>`
}

export function blogDetail(x) {
  const chips = [
    detailChip(dateFmt(x.date)),
    detailChip(esc(x.read)),
    detailChip(esc(CATEGORIES[x.category] || x.category)),
    `<button class="detail-chip article-share-trigger" type="button" data-share="${esc(SITE.baseUrl)}/blogs/${slug(x.slug)}">${I.share}<span>Share</span></button>`,
  ]
  return `<article class="article blog-detail">${breadcrumb('Blogs')}<header class="section-head work-head" data-motion="article"><div><h1 class="work-heading">${esc(x.title)}</h1></div><p><em>${esc(x.summary)}</em></p><div class="detail-meta">${chips.join('')}</div></header><div class="article-body">${x.body}</div></article>`
}

// ---------- about ----------
export function about() {
  const cats = [...Object.entries(CATEGORIES).map(([k, label]) => [label, catDesc(k)]), ['Open Source', 'Most of the work ships public — maintained in the open across three GitHub orgs.']]
  return `<section class="about-page"><div class="section-head work-head" data-motion="sectionHead"><div><h1 class="work-heading">About</h1></div><p><em>I design, build, and ship software end to end — ${esc(SITE.title)} from ${esc(SITE.location)}, running ${esc(SITE.company)}.</em></p><div class="detail-meta">${detailChip(esc(SITE.location))}${detailChip(esc(SITE.company))}<a class="detail-chip" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></div></div>
<section class="about-chapter"><h2 class="about-chapter-title" data-motion="sectionHead">What I Do</h2><ul class="about-grid">${cats.map(([label, desc], i) => `<li data-motion="card" data-motion-delay="${i * 60}"><small>${String(i + 1).padStart(2, '0')}</small><strong>${esc(label)}</strong><span>${esc(desc)}</span></li>`).join('')}</ul></section>
<section class="about-chapter"><h2 class="about-chapter-title" data-motion="sectionHead">Stack</h2><p class="about-lede"><em>Hono and TypeScript on the edge, SvelteKit and Sanity for content, Go and the sing-box kernel for networking, Docker for self-hosted, and OpenWrt for routers — one worker and one database wherever the product fits.</em></p><div class="detail-meta">${TOOLS.map((t) => detailChip(esc(t.n))).join('')}</div></section>
<section class="about-chapter"><h2 class="about-chapter-title" data-motion="sectionHead">A Record, Not a Resumé</h2><p class="about-lede"><em>Work has a habit of disappearing into private repositories and old folders. This site keeps <a href="/projects">projects</a> and <a href="/blogs">writing</a> in one place I control, where they compound into a record of what I built.</em></p></section>
<section class="about-chapter"><h2 class="about-chapter-title" data-motion="sectionHead">Elsewhere</h2><div class="detail-meta">${SOCIALS.map((s) => `<a class="detail-chip" href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.label)}</a>`).join('')}</div></section></section>`
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
  const items = ALL_POSTS.slice(0, 20).map((x) => `<item><title>${esc(x.title)}</title><link>${SITE.baseUrl}/blogs/${slug(x.slug)}</link><guid>${SITE.baseUrl}/blogs/${slug(x.slug)}</guid><pubDate>${new Date(x.date + 'T00:00:00Z').toUTCString()}</pubDate><description>${esc(x.summary)}</description></item>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(SITE.name)}</title><link>${SITE.baseUrl}</link><description>${esc(SITE.description)}</description><atom:link href="${SITE.baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`
}

export function sitemap() {
  const urls = [SITE.baseUrl + '/', SITE.baseUrl + '/about', SITE.baseUrl + '/projects', ...PROJECTS.map((p) => SITE.baseUrl + '/projects/' + slug(p.name)), SITE.baseUrl + '/blogs', ...ALL_POSTS.map((x) => SITE.baseUrl + '/blogs/' + slug(x.slug))]
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}\n</urlset>`
}