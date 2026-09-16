// Shared helpers — single source of truth for escaping, slugs, dates, URLs.
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export const repoUrl = (p) => `https://github.com/${p.owner}/${p.name}`

export const dateFmt = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export const cover = (cat) => `/Assets/covers/${cat}.webp`