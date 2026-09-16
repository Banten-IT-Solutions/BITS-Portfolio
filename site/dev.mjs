import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const DIR = fileURLToPath(new URL('..', import.meta.url))
const children = []

function run(cmd) {
  const p = spawn(cmd, { cwd: DIR, stdio: 'inherit', shell: true })
  children.push(p)
  p.on('exit', (code) => {
    if (code) children.forEach(c => c.kill())
  })
  return p
}

process.on('SIGINT', () => {
  children.forEach(c => c.kill())
  process.exit()
})

run('pnpm gen -- --watch')
run('pnpm dev')