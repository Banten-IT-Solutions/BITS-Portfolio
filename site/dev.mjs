import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const DIR = fileURLToPath(new URL('.', import.meta.url))

function run(cmd, args) {
  const p = spawn(cmd, args, { cwd: DIR+'..', stdio: 'inherit', shell: true })
  p.on('exit', (code) => process.exit(code ?? 1))
  return p
}

run('pnpm', ['gen', '--', '--watch'])
run('pnpm', ['dev'])