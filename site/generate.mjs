// Nurul Imam — build pipeline. Run: `node site/generate.mjs`
// Copies static assets into public/, then writes every page + feed.
import { mkdirSync, writeFileSync, copyFileSync, rmSync, readdirSync, statSync } from 'node:fs'
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
    const s = new URL(e + '/', src).pathname.replace(/\/$/, '')
    const sFull = src.pathname + e
    if (statSync(sFull).isDirectory()) { copyDir(new URL(e + '/', src), new URL(e + '/', dest)); continue }
    copyFileSync(sFull, new URL(e, dest))
  }
}

rmSync(PUBLIC, { recursive: true, force: true })
mkdirSync(new URL('assets/', PUBLIC), { recursive: true })

// css
copyFileSync(new URL('chunk.css', STATIC), new URL('assets/app.css', PUBLIC))
copyFileSync(new URL('overrides.css', STATIC), new URL('assets/overrides.css', PUBLIC))
// platform logos, tool icons, covers, misc svg
copyDir(new URL('platform/', STATIC), new URL('Assets/platform/', PUBLIC))
copyDir(new URL('tools/', STATIC), new URL('Assets/tools/', PUBLIC))
copyDir(new URL('covers/', STATIC), new URL('Assets/covers/', PUBLIC))
copyFileSync(new URL('github.svg', STATIC), new URL('Assets/github.svg', PUBLIC))
// portrait/metadata/og images (kept under the original Alif* filenames)
copyFileSync(new URL('images/avatar.webp', STATIC), new URL('Assets/Alif.webp', PUBLIC))
copyFileSync(new URL('images/metadata.webp', STATIC), new URL('Assets/Alif - Metadata.webp', PUBLIC))
copyFileSync(new URL('images/og.webp', STATIC), new URL('Assets/Alif - Social Preview Seamless.webp', PUBLIC))
copyFileSync(new URL('images/identity.webp', STATIC), new URL('Assets/Alif-identity.webp', PUBLIC))
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

console.log(`Generated ${ALL_POSTS.length} posts, ${PROJECTS.length} projects.`)