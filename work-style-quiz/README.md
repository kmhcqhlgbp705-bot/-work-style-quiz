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
