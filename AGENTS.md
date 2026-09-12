# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.
- This is an Angular 9 app (see `package.json`) using `node-sass` 4.14.x, which only ships
  prebuilt native binaries through Node 14 — building on newer Node requires a working
  python2/gyp toolchain to compile from source, which usually isn't available. Local dev
  and CI should use Node 14.
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
- `flake.nix` provides an alternative local dev shell (`nix develop`) pinning Node 14 via
  nixpkgs `nixos-22.11` (the last release carrying `nodejs-14_x`, since Node 14 was later
  dropped from nixpkgs as EOL) — `npm install` and `npm start` work inside it without any
  native build toolchain. This doesn't replace the Docker dev environment above; use
  whichever fits.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
