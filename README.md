# bitburner

My personal collection of TypeScript scripts for [Bitburner](https://bitburner-official.github.io/) — a programming-based incremental game where you write code to hack, automate, and progress through the game's world.

Scripts are written in TypeScript, bundled with [tsup](https://tsup.egoist.dev/), and synced live into the game via the [bitburner-filesync](https://github.com/RyanWalker/bitburner-filesync).

## 📁 Structure

```
.
├── bin/                     # Entry point scripts — each file here becomes a runnable in-game script
│   └── template.ts
├── lib/                     # Shared library code, imported by scripts in bin/
│   └── react.ts
├── dist/                    # Compiled JS output, synced into the game (gitignored)
├── biome.json               # Biome config (linting + formatting)
├── filesync.json            # Config for bitburner-filesync (Remote API sync)
├── mise.toml                # Task runner + Node version pinning (via mise)
├── tsconfig.json            # TypeScript config, incl. path aliases
├── tsup.config.ts           # Build config — bundles bin/*.ts into dist/
└── package.json
```

### How it fits together

- **`bin/*.ts`** are treated as individual entry points and compiled 1:1 into `dist/*.js`, which are the scripts you actually `run` in-game.
- **`lib/`** holds shared code that gets imported into `bin/` scripts — useful for anything reusable, like the React helper that binds to the game's injected `window.React` / `window.ReactDOM`.
- **`NetscriptDefinitions.d.ts`** (gitignored, generated) provides the `@ns` type import used for the `NS` type — kept in sync automatically by [bitburner-filesync](https://github.com/RyanWalker/bitburner-filesync).
- **Path aliases** are set up in `tsconfig.json`:
  - `@ns` → Netscript type definitions
  - `@/*` → `lib/*`

## 🚀 Usage

This project uses [mise](https://mise.jdx.dev/) to manage the Node version and run tasks, and [pnpm](https://pnpm.io/) for dependencies.

```bash
pnpm install
mise run start
```

`mise run start` runs both:

- `watch` → `tsup --watch`, rebuilding `dist/` on file changes
- `sync` → `bitburner-filesync`, pushing `dist/*.js` into the game over the Remote API (port `12525`) and keeping `NetscriptDefinitions.d.ts` up to date

Once running, edit files in `bin/`/`lib/`, and changes will automatically rebuild and sync into your in-game home server.

## 🛠 Tooling

- **[tsup](https://tsup.egoist.dev/)** — bundles each `bin/*.ts` entry into a standalone ESM file
- **[bitburner-filesync](https://www.npmjs.com/package/bitburner-filesync)** — syncs `dist/` into the game via Remote API
- **[biome](https://biomejs.dev/)** — linting & formatting (tabs, double quotes, organized imports)
- **[mise](https://mise.jdx.dev/)** — Node version pinning + task runner
- **[pnpm](https://pnpm.io/)** — Package manager

## 📄 License

[MIT](./LICENSE) © Ar4ys
