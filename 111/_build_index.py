#!/usr/bin/env python3
"""Assemble index.html with embedded questions.json for file:// fallback."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
questions = json.loads(ROOT.joinpath("questions.json").read_text(encoding="utf-8"))
embed = json.dumps(questions, ensure_ascii=False, indent=2)

HTML_BEFORE = r"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f7f4ef" />
    <title>Work Style Quiz</title>
    <meta
      name="description"
      content="30 questions, ~8 minutes. A blunt, specific read on how you work—no corporate fluff."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:ital,wght@0,400..700;1,400..700&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="grain" aria-hidden="true"></div>

    <a class="skip-link" href="#main-content">Skip to main content</a>

    <header class="site-header">
      <div class="header-inner">
        <a href="./index.html" class="logo" aria-label="Work Style Quiz home">
          <span class="logo-mark" aria-hidden="true">
            <span class="sq"></span><span class="sq"></span><span class="sq"></span><span class="sq"></span>
          </span>
          <span class="logo-text">Work Style Quiz</span>
        </a>
        <nav class="header-nav" aria-label="Site">
          <span class="nav-muted">Free · No signup</span>
        </nav>
      </div>
    </header>

    <main id="main-content" class="main" tabindex="-1">
      <p id="load-error" class="load-error" role="alert" hidden></p>

      <div class="container">
        <section
          id="landing"
          class="landing-hero"
          aria-label="Introduction"
        >
          <div class="landing-hero-inner">
            <div class="landing-copy">
              <p class="landing-eyebrow">8–12 minutes · 30 questions</p>
              <h1>What is your Work Style?</h1>
              <p class="landing-lead">
                Answer 30 quick questions to discover your strengths, ideal work
                environment, and collaboration style—plain English, not HR poetry.
              </p>
              <div class="landing-cta-row">
                <button id="start-btn" class="btn btn-cta" type="button" disabled>
                  See My Work Style
                </button>
              </div>
              <p class="landing-meta">
                30 questions · 8–12 min · No signup
              </p>
            </div>
            <div class="landing-art" aria-hidden="true">
              <div class="art-scene">
                <div class="art-blob art-blob--1"></div>
                <div class="art-blob art-blob--2"></div>
                <div class="art-line"></div>
              </div>
            </div>
          </div>

          <div class="proof-strip" role="group" aria-label="Quiz facts">
            <div class="proof-item">
              <span class="proof-value">30</span>
              <span class="proof-label">Questions</span>
            </div>
            <div class="proof-item">
              <span class="proof-value">6</span>
              <span class="proof-label">Work styles</span>
            </div>
            <div class="proof-item">
              <span class="proof-value">8–12</span>
              <span class="proof-label">Minutes</span>
            </div>
            <div class="proof-item">
              <span class="proof-value">0</span>
              <span class="proof-label">Login</span>
            </div>
          </div>
        </section>

        <section id="landing-details" class="card landing-details">
          <h2 class="section-title">Six work styles</h2>
          <p class="section-sub">
            Six archetypes. No “synergy.” No fake science—just a short story about
            how you show up at work.
          </p>
          <div id="style-preview" class="landing-preview-grid">
            <article class="preview-card preview-card--a">
              <h3>The Deep Focus Builder</h3>
              <p>
                When your calendar stops pretending “quick sync” is harmless.
              </p>
            </article>
            <article class="preview-card preview-card--b">
              <h3>The Collaborative Spark</h3>
              <p>Turns a 20-minute whiteboard into momentum—not another doc.</p>
            </article>
            <article class="preview-card preview-card--c">
              <h3>The Systems Orchestrator</h3>
              <p>Writes the RACI so nobody “circles back” in three channels.</p>
            </article>
            <article class="preview-card preview-card--d">
              <h3>The Nimble Navigator</h3>
              <p>Ships a tiny test today—that deck isn’t reading itself.</p>
            </article>
            <article class="preview-card preview-card--e">
              <h3>The People Connector</h3>
              <p>Fixes the room before the meeting—vibes are data too.</p>
            </article>
            <article class="preview-card preview-card--f">
              <h3>The Independent Owner</h3>
              <p>Give them a goal and get out of the way—no hover-managing.</p>
            </article>
          </div>
          <div class="result-sample">
            <p class="eyebrow">Sample result</p>
            <h3>The Deep Focus Builder</h3>
            <p>
              You think best when your calendar stops pretending “quick sync” is
              harmless—90-minute blocks, not 90 Slack pings.
            </p>
          </div>

          <p class="disclaimer disclaimer-subtle">
            This quiz is for entertainment and self-reflection only. It is not
            professional career, psychological, or legal advice.
          </p>
        </section>

        <section
          id="quiz"
          class="card card-quiz hidden"
          aria-labelledby="quiz-heading"
        >
          <h2 id="quiz-heading" class="visually-hidden">Quiz</h2>
          <div class="progress-wrap">
            <div class="progress-meta">
              <span id="progress-text">Question 1 / 30</span>
              <span id="answered-text">Answered 0 / 30</span>
            </div>
            <div
              class="progress-track"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="0"
              aria-label="Quiz progress"
            >
              <div id="progress-bar" class="progress-bar"></div>
            </div>
          </div>

          <h2 id="question-title" class="question-title"></h2>
          <div id="options" class="options-wrap"></div>

          <div class="actions">
            <button id="prev-btn" class="btn btn-outline" type="button">
              Previous
            </button>
            <button id="next-btn" class="btn btn-cta btn-cta-inline" type="button">
              Next
            </button>
          </div>
        </section>

        <section
          id="result"
          class="card card-result hidden"
          aria-label="Your result"
        >
          <div class="result-hero">
            <p class="eyebrow">Your result</p>
            <h2 id="result-title" class="result-headline" tabindex="-1"></h2>
            <p id="result-tagline" class="result-tagline"></p>
          </div>

          <div class="result-grid">
            <div class="result-panel">
              <h3>Strengths</h3>
              <ul id="result-strengths"></ul>
            </div>
            <div class="result-panel">
              <h3>Watch-outs</h3>
              <ul id="result-watchouts"></ul>
            </div>
            <div class="result-panel">
              <h3>Best environment</h3>
              <p id="result-environment"></p>
            </div>
            <div class="result-panel">
              <h3>Collaboration style</h3>
              <p id="result-collaboration"></p>
            </div>
          </div>

          <div class="actions">
            <button id="share-btn" class="btn btn-cta" type="button">Share</button>
            <button id="copy-btn" class="btn btn-outline" type="button">
              Copy result link
            </button>
            <button id="retake-btn" class="btn btn-outline" type="button">
              Retake
            </button>
          </div>
          <p id="feedback" class="feedback" aria-live="polite"></p>
          <p class="disclaimer">
            This quiz is for entertainment and self-reflection only. It is not
            professional career, psychological, or legal advice.
          </p>
        </section>
      </div>
    </main>

    <footer class="site-footer">
      <p>
        For fun and reflection only—not affiliated with any third-party assessment.
      </p>
    </footer>

    <script type="application/json" id="questions-embed">
"""

HTML_AFTER = r"""    </script>
    <script src="./app.js"></script>
  </body>
</html>
"""

out = HTML_BEFORE + embed + "\n" + HTML_AFTER
ROOT.joinpath("index.html").write_text(out, encoding="utf-8")
print("Wrote index.html")
