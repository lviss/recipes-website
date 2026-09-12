# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.
- This is an Angular 9 app (see `package.json`) using `node-sass` 4.14.x, which only ships
  prebuilt native binaries through Node 14 — building on newer Node requires a working
  python2/gyp toolchain to compile from source, which usually isn't available. Local dev
  and CI should use Node 14. On a NixOS sandbox with no `nodejs-14_x` in the current
  channel and no Docker, get Node 14 via a pinned older channel, e.g.
  `nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/refs/heads/nixos-22.05.tar.gz -p nodejs-14_x`
  — a generic-linux Node (or Chrome) tarball downloaded straight from upstream won't run on
  NixOS (wrong ELF interpreter), so prefer a nixpkgs-built binary over a raw tarball.
- To visually verify UI changes with `chrome-devtools-axi` on a NixOS sandbox where the
  tool's bundled Puppeteer Chrome won't launch (same ELF-interpreter issue as above),
  `nix-shell -p chromium` gives a working browser; point the bridge at it by setting
  `CHROME_DEVTOOLS_AXI_MCP_PATH` to a small wrapper script that pushes
  `--executablePath=<nix store chromium path>` onto `process.argv` before importing the
  real `chrome-devtools-mcp`'s `bin/chrome-devtools-mcp-main.js` (that flag doesn't conflict
  with the bridge's default `--isolated --headless` args).
- Build output goes to `dist/recipes` (`angular.json` → `architect.build.options.outputPath`),
  matching the `public` dir in `firebase.json`. A production Firebase Hosting deploy should
  build with `ng build --configuration production` (plain `ng build`/`npm run build` defaults
  to an unoptimized dev build in this Angular 9 setup — there's no `defaultConfiguration`).
- Deploys to Firebase Hosting (project `recipes-hosting`) run via
  `.github/workflows/deploy.yml` on push to `master`, using
  `FirebaseExtended/action-hosting-deploy` and secret `FIREBASE_SERVICE_ACCOUNT_RECIPES_HOSTING`
  (a Firebase/GCP service-account JSON) — must exist as a repo secret or the workflow fails.
- `docker-compose.yml` / `Dockerfile` / `dockerfile-dev-env` provide an optional local dev
  container (`docker-compose build && docker-compose up -d`); see README "Run in docker".

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
