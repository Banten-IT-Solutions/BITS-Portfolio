// Nurul Imam — build pipeline. Run: `node site/generate.mjs`
// Copies static assets into public/, then writes every page + feed.
import { mkdirSync, writeFileSync, copyFileSync, rmSync, readdirSync, statSync, watch } from 'node:fs'
import sharp from 'sharp'
import { SITE, PROJECTS, ALL_POSTS } from './content.mjs'
import { slug, cover } from './utils.mjs'
import { page, home, about, projectsIndex, blogsIndex, projectDetail, blogDetail, rss, sitemap } from './templates.mjs'

const PUBLIC = new URL('../public/', import.meta.url)
const STATIC = new URL('./static/', import.meta.url)
const SITEDIR = new URL('./', import.meta.url)

function write(path, content) {
  const file = new URL('../public/' + path, import.meta.url)
  mkdirSync(new URL('.', file).pathname, { recursive: true })
  writeFileSync(file, content)
}

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const e of readdirSync(src)) {
    const sFull = src.pathname + e
    if (statSync(sFull).isDirectory()) { copyDir(new URL(e + '/', src), new URL(e + '/', dest)); continue }
    copyFileSync(sFull, new URL(e, dest))
  }
}

let FIRST = true
async function generate() {
if (!FIRST) rmSync(PUBLIC, { recursive: true, force: true }); FIRST = false
mkdirSync(new URL('assets/', PUBLIC), { recursive: true })

// css
copyFileSync(new URL('chunk.css', STATIC), new URL('assets/app.css', PUBLIC))
copyFileSync(new URL('overrides.css', STATIC), new URL('assets/overrides.css', PUBLIC))
// platform logos, tool icons, covers, misc svg
copyDir(new URL('platform/', STATIC), new URL('assets/platform/', PUBLIC))
copyDir(new URL('tools/', STATIC), new URL('assets/tools/', PUBLIC))
copyDir(new URL('covers/', STATIC), new URL('assets/covers/', PUBLIC))
copyFileSync(new URL('github.svg', STATIC), new URL('assets/github.svg', PUBLIC))
// portrait/identity/metadata/og — all derived from avatar with appropriate sizes
const img = (name) => new URL('images/' + name, STATIC).pathname
await sharp(img('avatar.webp')).toFile(new URL('assets/avatar.webp', PUBLIC).pathname)
await sharp(img('avatar.webp')).resize(768, 768).toFile(new URL('assets/identity.webp', PUBLIC).pathname)
await sharp(img('avatar.webp')).resize(512, 512).toFile(new URL('assets/metadata.webp', PUBLIC).pathname)
// OG image — kartu nama style: compact, text left, avatar right
const ogW = 1200, ogH = 630
const avS = 280, avPad = 55
const textX = 60
const svg = `<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2b2c26"/><stop offset="100%" stop-color="#0d0e0c"/></linearGradient>
  </defs>
  <rect width="${ogW}" height="${ogH}" fill="url(#g)"/>
  <line x1="${textX}" y1="390" x2="635" y2="390" stroke="#30322d" stroke-width="1"/>
  <text x="${textX}" y="245" font-family="Georgia,serif" font-size="56" font-weight="700" fill="#f3f4ee">Nurul Imam</text>
  <text x="${textX}" y="295" font-family="monospace" font-size="17" fill="#96998f">Full-Stack &amp; DevOps Engineer</text>
  <text x="${textX}" y="325" font-family="monospace" font-size="13" fill="#6f716a">Banten, Indonesia</text>
  <text x="${textX}" y="425" font-family="monospace" font-size="11" fill="#6f716a">github.com/bitscoid</text>
  <text x="${textX}" y="445" font-family="monospace" font-size="11" fill="#6f716a">bits.co.id</text>
</svg>`
await sharp(Buffer.from(svg))
  .composite([{ input: await sharp(img('avatar.webp')).resize(avS, avS).toBuffer(), top: (ogH - avS) / 2, left: ogW - avS - avPad }])
  .webp()
  .toFile(new URL('assets/og.webp', PUBLIC).pathname)
// client js
copyFileSync(new URL('app.js', SITEDIR), new URL('assets/app.js', PUBLIC))
copyFileSync(new URL('motion.js', SITEDIR), new URL('assets/motion.js', PUBLIC))
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

console.log(`Generated ${ALL_POSTS.length} posts, ${PROJECTS.length}.`)
}

// first run
await generate()

// watch
if (process.argv.includes('--watch')) {
  const dirs = [SITEDIR.pathname, STATIC.pathname]
  console.log('Watching site/ for changes...')
  for (const dir of dirs) {
    watch(dir, { recursive: true }, async (_, fn) => {
      if (fn?.startsWith('.')) return
      console.log(`Change: ${fn}, regenerating...`)
      try { await generate() } catch (e) { console.error('Regen error:', e) }
    })
  }
}