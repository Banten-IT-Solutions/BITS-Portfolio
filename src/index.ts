import { Hono } from 'hono'

type Env = {
  ASSETS: { fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> }
}

type Day = { date: string; count: number; level: number }
type ContribResponse = { success: boolean; total: number; weeks: Day[][] }

const GH_USER = 'bitscoid'
// ponytail: public 3rd-party mirror of the GitHub contribution graph. Swap for
// GitHub GraphQL + a PAT secret when you need exact private/org counts or the
// mirror goes down. Add when: jogruber unavailable or user wants own token.
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`
const TTL = 3600

const app = new Hono<{ Bindings: Env }>()

function buildWeeks(raw: { date: string; count: number; level: number }[]): ContribResponse {
  if (!raw.length) return { success: false, total: 0, weeks: [] }

  const map = new Map(raw.map((c) => [c.date, c]))
  const dates = raw.map((c) => c.date).sort()
  const end = new Date(dates[dates.length - 1] + 'T00:00:00Z')

  const sun = new Date(end)
  sun.setUTCDate(sun.getUTCDate() - sun.getUTCDay()) // start of current week (Sunday)

  const start = new Date(sun)
  start.setUTCDate(start.getUTCDate() - 51 * 7) // 52 weeks total

  const weeks: Day[][] = []
  let total = 0
  for (let w = 0; w < 52; w++) {
    const col: Day[] = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(start.getTime() + (w * 7 + d) * 86400000)
      const key = day.toISOString().slice(0, 10)
      const c = map.get(key)
      const count = c?.count ?? 0
      if (day.getTime() <= end.getTime()) total += count
      col.push({ date: key, count, level: c?.level ?? 0 })
    }
    weeks.push(col)
  }
  return { success: true, total, weeks }
}

async function getContribs(): Promise<ContribResponse> {
  let res: Response | undefined
  try {
    res = await caches.default.match(API_URL)
  } catch {
    // caches.default unavailable (some local/dev sandboxes) -> fall through to fetch
  }

  if (!res) {
    const upstream = await fetch(API_URL, { headers: { 'user-agent': 'nurulimam-com worker' } })
    if (!upstream.ok) return { success: false, total: 0, weeks: [] }
    const body = await upstream.text()
    res = new Response(body, {
      headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${TTL}` },
    })
    try {
      ;(async () => {
        await caches.default.put(API_URL, res!.clone())
      })().catch(() => {})
    } catch {}
  }

  const json = (await res.json()) as { contributions?: { date: string; count: number; level: number }[] }
  return buildWeeks(json.contributions ?? [])
}

app.get('/api/github-contributions', async (c) => {
  const data = await getContribs()
  return c.json(data, 200, { 'cache-control': 'public, max-age=300' })
})

app.all('*', async (c) => {
  let res = await c.env.ASSETS.fetch(c.req.raw)

  // extension-less route (e.g. /about) -> dir index.html fallback
  if (res.status === 404) {
    const u = new URL(c.req.url)
    if (!/\.[a-zA-Z0-9]+$/.test(u.pathname)) {
      const index = u.pathname.replace(/\/?$/, '/index.html')
      res = await c.env.ASSETS.fetch(new Request(new URL(index, u).toString(), c.req.raw))
    }
  }

  return res
})

export default app