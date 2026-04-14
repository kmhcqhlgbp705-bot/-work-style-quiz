# Work Style Quiz (Static MVP)

Source of truth: `../docs/PRD-work-style.md`. Questions are generated from the PRD into `questions.json`.

## Run locally

**Option A — local server (recommended for sharing links and matching production):**

```bash
cd work-style-quiz
python3 -m http.server 8080
```

Then open: `http://127.0.0.1:8080/` or `http://localhost:8080/`

If the page **does not load** or you see “connection reset” / empty reply, **port 8080 is often taken** by another program. Use another port (example):

```bash
python3 -m http.server 9333
```

Then open `http://127.0.0.1:9333/`. To see what is using 8080: `lsof -iTCP:8080 -sTCP:LISTEN`.

**Option B — open `index.html` directly:**  
The page also embeds the same question data, so double‑clicking `index.html` usually works. If anything fails, use Option A.

## Deploy (production)

This folder is static assets only. Any static host works; production URLs use **HTTPS** and usually **port 443** (not 9333 — that port is only for your local `http.server`).

**Netlify (repo root = this monorepo)**  
Push the repo to GitHub/GitLab, import in [Netlify](https://www.netlify.com/). The repo already includes `netlify.toml` at the parent folder with `publish = "work-style-quiz"`, so no build step is required.

**Netlify (only this folder)**  
Zip `work-style-quiz` or drag the folder onto [Netlify Drop](https://app.netlify.com/drop). Publish directory is the folder root.

**Vercel**  
New Project → import repo → set **Root Directory** to `work-style-quiz` → Framework **Other** → leave build command empty → Deploy.

**Cloudflare Pages**  
Create project → connect repo → **Build command** empty → **Build output directory** `work-style-quiz`.

**GitHub Pages**  
Repo **Settings → Pages**: deploy the `work-style-quiz` contents (e.g. upload to `gh-pages` branch or use Actions with artifact path `work-style-quiz`). Site URL will be like `https://<user>.github.io/<repo>/` unless you use a custom domain at repo root.

## Files

| File | Role |
|------|------|
| `index.html` | Structure, landmarks, skip link, a11y attributes |
| `styles.css` | Tokens, focus-visible, reduced motion, touch targets |
| `app.js` | Fetch questions, scoring, tie-break, share, focus management |
| `questions.json` | 30 questions (sync with PRD §7) |

## UI/UX notes

- Skip link, `main` focus target, `fieldset`/`legend` for quiz options
- Progress `role="progressbar"` with `aria-valuenow`
- Touch targets ≥ 44px, `touch-action: manipulation`
- `prefers-reduced-motion` reduces transitions and noise opacity
- Focus moves to result title after completion (keyboard / SR friendly)
