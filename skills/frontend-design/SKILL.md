---
name: frontend-design
description: >-
  Applies intentional frontend UI craft for HTML/CSS/JS and static sites: typography,
  color systems, layout rhythm, motion, accessibility, and anti-template guardrails.
  Use when building or redesigning landing pages, marketing sites, quizzes, dashboards,
  or when the user asks for distinctive UI, “not generic AI slop”, design systems,
  component polish, or references Anthropic-style frontend-design / skillsmp patterns.
---

# Frontend Design Skill

This skill guides implementation of **distinctive, production-grade** frontends. It is aligned with common patterns from **Anthropic-style “frontend-design”** skills (strong hierarchy, coherent tokens, intentional motion) and with this repo’s **`AGENTS.md`** constraints where applicable.

## When to Apply

- New page, redesign, or CSS/HTML refactor.
- User wants “better design”, “less template”, “more personality”, “Apple-like / 16P-like / brutalist / editorial” **without** copying third-party brands.
- Quiz, results, share cards, landing hero, proof strips, bento grids.

## Core Principles

1. **One clear visual idea** per screen (e.g. “warm paper + forest accent”, not five competing gradients).
2. **Typography is the UI**: pick a real scale (e.g. major third), limit font families (1–2), use weight contrast (400 vs 700/800).
3. **Color is semantic**: background / surface / text / border / primary / danger — name roles in `:root`, avoid magic hex sprinkled in rules.
4. **No dead flat fields**: subtle grain, layered gradients, or soft noise — not a single `#fff` wall unless intentional (e.g. brutal minimal).
5. **Motion with purpose**: prefer `cubic-bezier` over default `ease-in-out` for hovers; respect `prefers-reduced-motion`.
6. **Accessibility is not optional**: visible focus, label associations, contrast for text and controls.

## Layout & Composition

- Prefer **asymmetry** or **broken grids** over perfect 3× equal cards when the product calls for “non-template” (see `AGENTS.md`).
- Use **max-width** on readable text (roughly 60–75ch for body).
- **Spacing scale**: 4/8/12/16/24/32/48px (or one scale, used consistently).
- **Bento / uneven grids**: OK if the math adds up (e.g. 6-column grid with 4+2, then 2+2+2, then full bleed).

## Typography

- Avoid “everything Inter” as the only deliberate choice; pair **display + body** or one versatile family (e.g. DM Sans, Nunito Sans, Source Sans 3) with clear hierarchy.
- Headlines: tighter tracking (`letter-spacing: -0.02em` to `-0.03em`) for large sizes.
- Body: comfortable line-height (1.45–1.6).

## Color (this repo alignment)

- **`AGENTS.md`** forbids **#6366F1** and **#8B5CF6** as primary accents; avoid indigo/purple **as the main brand** unless the user explicitly overrides `AGENTS.md`.
- Prefer **forest / teal / amber / rust / sage** neutrals with warm paper backgrounds for the Work Style Quiz direction.
- If the user requests **PRD §2.3** (16Personalities-like): light mint-gray page, green CTA, purple-gray **headline ink** is allowed **as specified in PRD** — then **PRD wins** over generic `AGENTS.md` color bans for that product.

## Components

- **Buttons**: default / primary / outline; clear hover and focus; min touch target ~44px on mobile.
- **Cards**: border + shadow **or** border-only; avoid duplicating Shadcn/Material defaults pixel-for-pixel.
- **Forms / quiz options**: large hit areas, selected state must be obvious (border + background shift).

## Motion

- Hovers: small translate or shadow lift; duration ~150–250ms.
- Use named easings, e.g. `cubic-bezier(0.33, 1, 0.68, 1)` — not “always ease-in-out”.

## Imagery

- Prefer **original SVG/CSS scenes** or licensed assets; do not paste competitor marketing art.
- Optional stock: Pexels / Unsplash with a clear overlay so text stays readable.

## Anti-patterns (avoid)

- Purple–indigo gradient on white as the **only** “brand”.
- Hero + three equal cards as the **only** layout pattern.
- Lorem ipsum; passive corporate filler.
- Tiny click targets; missing focus styles.
- Animating large layout properties every frame without `prefers-reduced-motion` consideration.

## Repo-Specific SSOT

- **Product copy, quiz logic, disclaimers**: `docs/PRD-work-style.md` overrides casual tone rules when legally required (e.g. full disclaimer text).
- **Design taste rules**: root `AGENTS.md` for this workspace’s “anti-template” constraints.

## Checklist Before Shipping UI

- [ ] `:root` tokens for color, radius, shadow, font stacks.
- [ ] Focus visible on interactive elements.
- [ ] Mobile: no horizontal scroll; tap targets adequate.
- [ ] Lighthouse/a11y spot-check: headings order, alt text for non-decorative images.
- [ ] No banned hex in `AGENTS.md` unless PRD explicitly allows for that screen.

## References (optional reads in repo)

- `AGENTS.md` — workspace design guardrails.
- `docs/PRD-work-style.md` — Work Style Quiz product + landing structure.

---

*Inspiration: Anthropic Claude Code “frontend-design” style skills (structured UI craft + anti-slop guardrails). Not affiliated with Anthropic or skillsmp.com.*
