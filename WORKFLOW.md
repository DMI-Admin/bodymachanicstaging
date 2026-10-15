# Workflow — Team Bodymechanik

How work gets from a laptop to staging to the live site. Read this before your
first deploy. Build details are in [README.md](README.md); the one-off sPanel
setup is in [DEPLOY.md](DEPLOY.md).

---

## The two repositories

| | Repo | Remote name | Deploys to |
| --- | --- | --- | --- |
| **Staging** | `DMI-Admin/bodymachanicstaging` | `staging` | staging.teambodymechanik.com |
| **Live** | `DMI-Admin/teambodymechanik` | `origin` | teambodymechanik.com |

Both are public and both use `main`. **All work goes to staging first.** Live is
only ever updated by pushing a reviewed `main`.

> **Current state:** staging has the full website. Live is still **6 commits
> behind**, serving the old coming-soon page. The first push to `origin` will
> replace it with the website — see *Going live* below.

### Getting set up

```bash
git clone https://github.com/DMI-Admin/bodymachanicstaging.git teambodymechanik
cd teambodymechanik
git remote add origin https://github.com/DMI-Admin/teambodymechanik.git
git remote rename origin live 2>/dev/null   # optional, if you prefer clearer names
npm install
cp .env.example .env.local                  # then fill it in, see below
npm run dev                                 # http://localhost:3000
```

Push targets are deliberately asymmetric so you can't publish by habit:

```bash
git push                 # -> staging   (safe)
git push origin main     # -> LIVE      (publishes to the public site)
```

Check which one you're about to hit with `git status -sb` — it names the
upstream branch.

### Requirements

- Node **20.9+** (the server runs 20.20.2; local dev on 22/24/26 is fine)
- No database, no services to run locally. Email needs a Resend key.

---

## Day-to-day loop

1. **Branch** off `main`: `git switch -c fix/pricing-band`
2. **Work.** Copy, prices, testimonials, FAQ and nav all live in
   [`src/lib/site.ts`](src/lib/site.ts) — most content changes need nothing else.
3. **Check before pushing:**
   ```bash
   npx tsc --noEmit
   npm run build
   ```
4. **Merge and push to staging:**
   ```bash
   git switch main && git merge fix/pricing-band && git push
   ```
5. **Deploy staging** (below), check it on the subdomain.
6. **Go live** when approved (below).

### Testing responsiveness

This design has bitten us three times at widths nobody checked. Before you push
a layout change, look at **360, 390, 768, 1024, 1280 and 1440px**, and confirm
the page never scrolls sideways:

```js
// paste in the browser console; 0 offenders expected
[...document.querySelectorAll('body *')]
  .filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
  .filter(e => { let p = e.parentElement; while (p && p !== document.body) { if (getComputedStyle(p).overflowX !== 'visible') return false; p = p.parentElement; } return true; })
```

---

## Environments on the server

SSH: `teambodymechanikcom@srv1541520`. Both apps run under PM2; the live one was
registered through sPanel's **NodeJS Manager**, which uses PM2 underneath, so
`pm2 list` shows both.

| | Live | Staging |
| --- | --- | --- |
| Folder | `~/apps/teambodymechanik` | `~/apps/staging` |
| Pulls from | `origin` (live repo) | `staging` repo |
| Port | **3002** | **3003** |
| PM2 name | `teambodymechanik` | `staging.teambodymechanik.com` |
| Indexed by Google | yes | no (`NOINDEX=true`) |

sPanel proxies each domain to its port. Ports must stay in **3000–3500**.

### `.env.local`

Lives on the server only — it is gitignored and never in a repo. It must exist
**before** you build, because the build copies it into the bundle and reads
`PORT` from it.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=info@devmasterinc.com
CONTACT_FROM_EMAIL="Team Bodymechanik <noreply@teambodymechanik.com>"

# staging only:
NOINDEX=true
PORT=3003
```

---

## Deploying

### Staging

```bash
cd ~/apps/staging
git pull
npm ci
npm run build:standalone          # expect: ✓ default port set to 3003 (from env file)
pm2 restart staging.teambodymechanik.com
```

Verify:

```bash
pm2 list                                        # online
curl -sI http://127.0.0.1:3003 | head -1        # HTTP/1.1 200 OK
curl -sI https://staging.teambodymechanik.com | grep -i x-robots-tag
```

That last line **must** print `noindex, nofollow`. If it doesn't, staging is
being indexed as a duplicate of the live site — stop and fix it.

### Live

```bash
cd ~/apps/teambodymechanik
git pull
npm ci
npm run build:standalone
cp .env.local .next/standalone/.env.local
PORT=3002 pm2 restart teambodymechanik --update-env
```

Keep `PORT=3002` on that line. With `--update-env` and no `PORT`, PM2 drops the
variable, the app falls back to 3000 and the proxy starts returning 503.

A config-only change (e.g. a new API key) needs just the `cp` and the restart —
no rebuild.

### After any deploy

```bash
curl -sI https://teambodymechanik.com | head -1     # 200
```

Then in a browser: load the page, open the menu on a phone width, and **send one
test enquiry of each type** (coaching application, general question, recipe
signup). All three should arrive at `CONTACT_TO_EMAIL`.

---

## Going live for the first time

This replaces the coming-soon page with the website.

```bash
git push origin main      # from your machine
```

Then run the **Live** deploy steps above. Check the site loads, then send a test
enquiry — the contact form is the thing most likely to be broken, because it
depends on a working Resend key.

### Rolling back

```bash
git revert -m 1 889ed0a   # the "Launch the Team Bodymechanik website" merge
git push origin main
```

Then redeploy live. That restores the coming-soon page.

---

## Things that will cost you an afternoon

**Never use `fetch` on the server.** This host caps per-process virtual memory,
and Node's `fetch` (undici) parses HTTP with a WebAssembly module it then can't
allocate. Every call fails with `WebAssembly.instantiate(): Out of memory`,
while the same `fetch` works fine in a short-lived `node -e` test on the same
box. Use `node:https` — see `postJson` in [`src/lib/mail.ts`](src/lib/mail.ts).

**Don't name a CSS class after a Tailwind utility.** Project classes live in
`@layer components`, so any Tailwind utility of the same name wins. A class
named `.collapse` silently applied `visibility: collapse` and hid a form field
while keeping its space. Hence `.field-reveal`.

**`.btn` sets `min-width: fit-content`.** It hides overflow for the hover
streak, so a flex parent that shrinks it clips the label instead of wrapping it.
If you add a long button label, give it `whitespace-normal` too.

**`main` uses `overflow-x: clip`.** Scroll-reveal animations start elements
offset sideways; without clipping they widen the page on phones. It must stay
`clip`, not `hidden`, or the sticky column in the enquiry section stops sticking.

**Images are pre-sized WebP** in `public/images`, built by
`scripts/optimize-images.mjs` from `team-bodymechanik-step6/assets/`, which is
**not in git** — ask for the folder before regenerating images. Next's runtime
image optimisation is off on purpose.

**sPanel's NodeJS Manager starts `server.js` without `PORT`.** It falls back to
3000, finds it taken and crash-loops. That's why the build bakes `PORT` from
`.env.local` into the bundle. In the panel, *Application root* must be the
`.next/standalone` folder with nothing appended — adding `app.yml` produces a
doubled path and an error.

---

## Where things are

| Path | What |
| --- | --- |
| [`src/lib/site.ts`](src/lib/site.ts) | All copy, nav, pricing, testimonials, FAQ |
| `src/components/sections/` | One file per page section |
| [`src/components/sections/Enquiry.tsx`](src/components/sections/Enquiry.tsx) | Combined application + contact form |
| [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) | The single form endpoint (`kind`: apply / contact / recipes) |
| [`src/lib/mail.ts`](src/lib/mail.ts) | Resend over `node:https` |
| [`scripts/build-standalone.mjs`](scripts/build-standalone.mjs) | Assembles the deployable bundle |

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Domain shows **404** | No proxy for that domain yet — sPanel NodeJS Manager entry missing |
| Domain shows **503** | Proxy exists, app is down or on the wrong port. `pm2 list`, then `ss -ltnp \| grep :<port>` |
| Form returns **503** | `.next/standalone/.env.local` missing — rebuild, or `cp` it in |
| Form returns **502** | Send failed; the app log gives the real status: 401 bad API key, 403 unverified sender domain, 422 Resend test mode (only delivers to the Resend account's own address) |
| App log: `EADDRINUSE :3000` | Started without `PORT`; see the NodeJS Manager note above |
| Unstyled page | `.next/static` not copied — re-run `npm run build:standalone` |
| Build killed | Out of memory; see the `NODE_OPTIONS` note in DEPLOY.md |

Logs: `pm2 logs teambodymechanik --lines 40 --nostream` (or
`staging.teambodymechanik.com`), or the NodeJS Manager UI.
