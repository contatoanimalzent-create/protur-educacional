<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Fluxo de trabalho deste repositório

- Toda tarefa (correção, melhoria, nova função) vira **Issue** antes de virar código.
- Trabalho acontece em branch (`feature/...`, `fix/...`), nunca direto na `main`.
- Entra por **Pull Request**, e a descrição do PR referencia a Issue (`Closes #N`).
- Não fazer merge de PR com build, lint ou typecheck quebrados.

# Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion +
Phosphor Icons. Paleta e conteúdo derivados do material real da marca (carrosséis do
Instagram @protureducacional) em `public/brand/`.

