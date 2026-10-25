# Coolify theme

A neutral, shadcn-style theme for the [Coolify](https://coolify.io) dashboard, with an accordion sidebar. It is injected by a Cloudflare Snippet, so it applies to everyone who opens your Coolify instance without forking or rebuilding Coolify.

![Metrics page with the theme](docs/metrics.png)

<img src="docs/sidebar-accordion.gif" alt="Sidebar group opening and closing as an accordion" width="257">

## What it changes

- **Colors**: shadcn's neutral palette in dark and light mode. No purple tint in the sidebar, buttons, cards or command palette.
- **Primary buttons**: white on dark, black on light, no gradient.
- **Flat buttons**: no 3D depth shadow, hover lift or press bounce.
- **Sidebar**: 16rem wide, 14px labels, always-visible chevrons, clearer hover and active states.
- **Accordion submenus**: sidebar groups (Monitoring, Integrations, Settings, …) expand in place instead of swapping to a separate menu. Animated, respects reduced motion, and works in the mobile menu. The collapsed icon-only sidebar keeps Coolify's original behavior.
- **Flat nav items by default**: browsers that never picked a style start with flat nav items. Anyone can still choose 3D under Appearance.

## Install

All options need your Coolify domain proxied through Cloudflare. The two Snippet options need a plan with Snippets (Pro or higher).

### Option 1: auto-updating (recommended)

Paste [`dist/loader.js`](dist/loader.js) into a Cloudflare Snippet once. On every page load it fetches the theme build that matches your Coolify version from this repo's GitHub Pages and inlines it, so the page is themed from the first paint. When the theme gets updated, or you update Coolify, your dashboard follows automatically.

### Option 2: self-contained (no remote code)

If you'd rather not run code from this repo on every page load, paste [`dist/<version>/snippet.js`](dist/latest/snippet.js) for your Coolify version instead. Everything is inlined and nothing is fetched. Read it, paste it, and update it yourself when you want to.

### Option 3: CSS only

No Cloudflare? Put [`dist/<version>/style.css`](dist/latest/style.css) into a user-style browser extension such as Stylus. You get the colors and layout, but not the accordion or the flat-nav default.

### Cloudflare setup (options 1 and 2)

1. Cloudflare dashboard → your zone → **Rules → Snippets → Create Snippet**.
2. Paste the file and give the snippet a name.
3. **Snippet rule** → Edit expression:
   ```
   (http.host eq "coolify.example.com" and any(http.request.headers["accept"][*] contains "text/html"))
   ```
   Replace the host with your Coolify domain. Matching only HTML requests keeps WebSockets and assets out of the snippet.
4. Deploy. To undo, disable or delete the snippet.

## How version matching works

Each Coolify version the theme was checked against gets its own build in `dist/<version>/`, and older builds are never changed. The browser script reads the running Coolify version from the sidebar, picks the newest theme build at or below it from [`dist/versions.json`](dist/versions.json), and stores it in a `coolify-theme` cookie. The loader reads that cookie on the next page load. After a Coolify update, the first page load still uses the previous build, then it switches.

A new Coolify release automatically uses the newest older build until a dedicated one exists. A daily workflow opens an issue in this repo when Coolify ships a new version.

## Versioning

A build covers a range of Coolify versions: `dist/4.5.0/` serves 4.5.0 and every later version until the next build. A new build is only made when a Coolify release breaks the theme.

Fixes go forward: they land in the newest build, and older builds stay exactly as they were tested. Installs on an older Coolify get fixes by updating Coolify.

Every build has a git tag, `coolify-<version>`, pointing at the commit whose `src/` produced it. Use the tags to browse the source of any build or to compare two, for example [`coolify-4.5.0...main`](https://github.com/Livog/coolify-theme/compare/coolify-4.5.0...main).

## Security

Code injected into the Coolify dashboard runs as the logged-in user, who can deploy, read secrets and manage servers. With option 1 you trust whoever controls this repo, the same as with any auto-updating dependency. If that's not acceptable, use option 2 or 3 and review what you paste.

## Customizing

The colors are tokens in [`src/css/tokens.css`](src/css/tokens.css): `:root` for light mode and `.dark` for dark mode. `--ui-brand` is the blue used for links and the focus ring. To run your own variant, fork the repo, change `THEME_URL` in `src/loader.js` to your fork's Pages URL, and build.

## Development

```
bun run build.ts 4.5.0
```

Builds `src/` into `dist/4.5.0/` (`style.css`, `script.js`, `snippet.js`), updates `dist/versions.json`, `dist/loader.js` and `dist/latest/`. Commit `src/` and `dist/` together and push: GitHub Pages deploys, and the `coolify-4.5.0` tag moves to that commit.

### Releasing for a new Coolify version

When the daily check opens an issue for a new Coolify release, update your Coolify and look over the theme:

- **Still works**: close the issue. No build is needed.
- **Something broke**: fix `src/`, run `bun run build.ts <new-version>`, commit and push.

`src/` always targets the newest build. Rebuilding an older version from it is refused, because it would overwrite that build with CSS written for a newer Coolify.

### Patching an older build

Rarely needed, since fixes go forward. To patch `4.5.0` after newer builds exist:

```
git worktree add ../coolify-theme-4.5.0 coolify-4.5.0
cd ../coolify-theme-4.5.0
git switch -c patch-4.5.0
# fix src/, then:
bun run build.ts 4.5.0
git commit -am "fix(4.5.0): describe the fix"
git tag -f coolify-4.5.0 && git push -f origin coolify-4.5.0

cd -
git checkout patch-4.5.0 -- dist/4.5.0
git commit -m "fix(4.5.0): describe the fix" && git push
git worktree remove ../coolify-theme-4.5.0 && git branch -D patch-4.5.0
```

The tag keeps the patched source reachable, and the tag workflow leaves tags that point outside `main` alone.

| Path | What it is |
|---|---|
| `src/css/` | The theme, one file per area, imported in order by `src/theme.css` |
| `src/js/accordion.js` | Turns sidebar submenus into accordions |
| `src/js/version-sync.js` | Keeps the `coolify-theme` cookie on the right build (option 1 only) |
| `src/loader.js` | Template for the auto-updating snippet |
| `src/snippet.js` | Template for the self-contained snippet |
