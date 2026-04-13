const TYPE_ORDER = [
  "deep_focus",
  "collab_spark",
  "systems_orchestrator",
  "nimble_navigator",
  "people_connector",
  "independent_owner",
];

const TYPE_META = {
  deep_focus: {
    slug: "deep-focus",
    title: "The Deep Focus Builder",
    tagline:
      'You think best when your calendar stops pretending "quick sync" is harmless.',
    strengths: [
      "You ship work that holds up—because you got 90-minute blocks, not 90 Slack pings.",
      "Async threads and written briefs: you answer when you're sharp, not when the red dot screams.",
      'Hard problems get easier when nobody expects a "hop on a call?" for every tiny question.',
    ],
    watchOuts: [
      "When the week fills with meetings, you quietly check out—then feel guilty for craving silence.",
      "You can hold an idea until it feels polished—while someone else already shipped version one.",
    ],
    environment:
      'Headphones on, Slack status honest, and a "no meeting" window that actually exists on the calendar—not just in your head.',
    collaboration:
      'Decisions in writing, deadlines attached, and live calls as exceptions—like a 30-minute slot with an agenda, not a surprise brainstorm tax.',
  },
  collab_spark: {
    slug: "collab-spark",
    title: "The Collaborative Spark",
    tagline:
      "You turn a stale doc into momentum with a 20-minute whiteboard and three bold ideas.",
    strengths: [
      "You align a room fast: energy up, next steps clear, nobody leaves pretending they understood.",
      "Live riffing is your cheat code—when you're in the room, the project stops feeling stuck.",
      "You read the room: who's quiet, who's blocking, who needs a nudge—not just the loudest voice.",
    ],
    watchOuts: [
      "Your calendar can look like a nightclub—every hour live, every day.",
      "You may move before there's a paper trail—then someone says, \"Wait… what did we decide?\"",
    ],
    environment:
      "A team that actually talks in real time: co-working blocks, high-trust calls, or a floor where turning around fixes a misunderstanding in sixty seconds.",
    collaboration:
      "Short syncs, shared screens, \"let's decide in the room\"—not a week of async ping-pong while the deadline laughs at you.",
  },
  systems_orchestrator: {
    slug: "systems-orchestrator",
    title: "The Systems Orchestrator",
    tagline: "If nobody owns the task, you don't relax—you write the RACI and finally sleep.",
    strengths: [
      'You kill "we should" with owners, dates, and a checklist that survives the handoff.',
      "Your write-ups stop the same misunderstanding from spawning in three Slack channels.",
      "When things go sideways, people open your doc—because it's actually true, not vibes.",
    ],
    watchOuts: [
      'Ambiguity feels like sand in your shoes—you can slow the room by asking for structure "too early."',
      'When everything changes overnight, you risk looking "rigid" for wanting one stable plan on paper.',
    ],
    environment:
      "Roles visible on the wall, rituals you can predict (standups, docs, handoffs), and decisions that don't live only inside someone's memory.",
    collaboration:
      'Written decisions, shared templates, and a clear who-owns-what-by-when—no mystery heroes, no "someone will handle it."',
  },
  nimble_navigator: {
    slug: "nimble-navigator",
    title: "The Nimble Navigator",
    tagline:
      "You'd rather ship a tiny test today than polish a slide deck nobody will open.",
    strengths: [
      "You pivot without drama when the data changes—no ego, just the next move.",
      "Fast experiments beat long debates: you're the one who says, \"Try it for a week.\"",
      "You stay useful when the roadmap is fiction—because you never fully trusted it anyway.",
    ],
    watchOuts: [
      'Docs can lag behind reality—"what we actually do" lives in your head, not Notion.',
      "Teammates who crave stability may feel whiplash when you change direction… again.",
    ],
    environment:
      "Teams that reward learning speed, tolerate a little mess, and don't punish a quick pivot when the world shifts.",
    collaboration:
      "Short feedback loops, small bets, and messages that say \"here's what we learned\"—not a committee for every tweak.",
  },
  people_connector: {
    slug: "people-connector",
    title: "The People Connector",
    tagline:
      "You fix the mood before the meeting—because nobody does good work when they feel unsafe.",
    strengths: [
      "You notice who goes quiet when the loudest voice wins—and you make space for the real answer.",
      "Conflict doesn't scare you: you go private first, then bring the room back to something honest.",
      "When trust is low, you're the glue—people actually tell you what's broken.",
    ],
    watchOuts: [
      "You can carry other people's stress—then realize you forgot your own boundary.",
      "Harmony can delay a hard call: \"let's circle back\" becomes never.",
    ],
    environment:
      'Teams where feedback is normal, 1:1s matter, and "how are you?" isn't only performative small talk.',
    collaboration:
      "Direct, respectful, context-rich—you'd rather hear an awkward truth in ten minutes than polish a polite lie for ten days.",
  },
  independent_owner: {
    slug: "independent-owner",
    title: "The Independent Owner",
    tagline:
      "Give you a goal and a deadline—micromanagement reads like a bug, not a feature.",
    strengths: [
      "End-to-end ownership: messy problem to shipped outcome, without someone holding your hand on every step.",
      "You communicate enough to unblock others—without turning your day into status theater.",
      "When the path is fuzzy, you still move—because waiting for perfect instructions isn't your sport.",
    ],
    watchOuts: [
      "You might forget to broadcast progress until someone panics—then it looks like you went dark.",
      "When you're in flow, collaboration can feel like tax—you don't always pick up the social signal.",
    ],
    environment:
      "Clear outcomes, real autonomy, and managers who don't need to see every cursor move to trust you.",
    collaboration:
      "Lightweight check-ins, explicit ownership boundaries, and \"tell me when you're blocked\"—not \"prove you're busy every hour.\"",
  },
};

let QUESTIONS = [];
const state = {
  index: 0,
  answers: [],
};

const landingEl = document.getElementById("landing");
const landingDetailsEl = document.getElementById("landing-details");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const mainEl = document.getElementById("main-content");

const questionTitleEl = document.getElementById("question-title");
const optionsEl = document.getElementById("options");
const progressTextEl = document.getElementById("progress-text");
const answeredTextEl = document.getElementById("answered-text");
const progressBarEl = document.getElementById("progress-bar");

const resultTitleEl = document.getElementById("result-title");
const resultTaglineEl = document.getElementById("result-tagline");
const resultStrengthsEl = document.getElementById("result-strengths");
const resultWatchoutsEl = document.getElementById("result-watchouts");
const resultEnvironmentEl = document.getElementById("result-environment");
const resultCollaborationEl = document.getElementById("result-collaboration");
const feedbackEl = document.getElementById("feedback");
const loadErrorEl = document.getElementById("load-error");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shareBtn = document.getElementById("share-btn");
const copyBtn = document.getElementById("copy-btn");
const retakeBtn = document.getElementById("retake-btn");

function focusMainContent() {
  if (!mainEl) return;
  mainEl.setAttribute("tabindex", "-1");
  requestAnimationFrame(() => {
    mainEl.focus({ preventScroll: true });
  });
}

function showView(view) {
  const isLanding = view === "landing";
  landingEl.classList.toggle("hidden", !isLanding);
  if (landingDetailsEl) {
    landingDetailsEl.classList.toggle("hidden", !isLanding);
  }
  quizEl.classList.toggle("hidden", view !== "quiz");
  resultEl.classList.toggle("hidden", view !== "result");
}

function renderQuestion() {
  const question = QUESTIONS[state.index];
  const answer = state.answers[state.index];

  questionTitleEl.textContent = `Q${state.index + 1}. ${question.text}`;
  optionsEl.innerHTML = "";

  const fieldset = document.createElement("fieldset");
  fieldset.className = "options-fieldset";
  const legend = document.createElement("legend");
  legend.className = "visually-hidden";
  legend.textContent = `Question ${state.index + 1}: ${question.text}`;
  fieldset.appendChild(legend);

  question.options.forEach((option, optionIndex) => {
    const id = `q${state.index}-o${optionIndex}`;
    const wrapper = document.createElement("label");
    wrapper.className = "option";
    wrapper.setAttribute("for", id);
    wrapper.innerHTML = `
      <input type="radio" id="${id}" name="q${state.index}" value="${optionIndex}" ${answer === optionIndex ? "checked" : ""} />
      <span>${option.text}</span>
    `;
    wrapper.querySelector("input").addEventListener("change", () => {
      state.answers[state.index] = optionIndex;
      updateProgress();
      updateButtons();
    });
    fieldset.appendChild(wrapper);
  });

  optionsEl.appendChild(fieldset);
  updateProgress();
  updateButtons();
}

function updateProgress() {
  const answeredCount = state.answers.filter((v) => v !== null).length;
  progressTextEl.textContent = `Question ${state.index + 1} / ${QUESTIONS.length}`;
  answeredTextEl.textContent = `Answered ${answeredCount} / ${QUESTIONS.length}`;
  const pct = ((state.index + 1) / QUESTIONS.length) * 100;
  progressBarEl.style.width = `${pct}%`;
  const track = progressBarEl.parentElement;
  if (track && track.getAttribute("role") === "progressbar") {
    track.setAttribute("aria-valuenow", String(Math.round(pct)));
  }
}

function updateButtons() {
  prevBtn.disabled = state.index === 0;
  const hasAnswer = state.answers[state.index] !== null;
  nextBtn.disabled = !hasAnswer;
  nextBtn.textContent =
    state.index === QUESTIONS.length - 1 ? "See result" : "Next";
}

function calculateResultTypeId() {
  const scores = Object.fromEntries(TYPE_ORDER.map((typeId) => [typeId, 0]));
  const selectedTypeIdsByQuestion = [];

  state.answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null) return;
    const selectedTypeId = QUESTIONS[questionIndex].options[answerIndex].typeId;
    selectedTypeIdsByQuestion.push(selectedTypeId);
    scores[selectedTypeId] += 1;
  });

  const maxScore = Math.max(...Object.values(scores));
  const topTypeIds = TYPE_ORDER.filter((typeId) => scores[typeId] === maxScore);
  if (topTypeIds.length === 1) return topTypeIds[0];

  for (let i = selectedTypeIdsByQuestion.length - 1; i >= 0; i -= 1) {
    if (topTypeIds.includes(selectedTypeIdsByQuestion[i])) {
      return selectedTypeIdsByQuestion[i];
    }
  }

  return TYPE_ORDER.find((typeId) => topTypeIds.includes(typeId)) ?? TYPE_ORDER[0];
}

function renderResult(typeId) {
  const profile = TYPE_META[typeId];
  resultTitleEl.textContent = profile.title;
  resultTaglineEl.textContent = profile.tagline;

  resultStrengthsEl.innerHTML = profile.strengths
    .map((item) => `<li>${item}</li>`)
    .join("");
  resultWatchoutsEl.innerHTML = profile.watchOuts
    .map((item) => `<li>${item}</li>`)
    .join("");
  resultEnvironmentEl.textContent = profile.environment;
  resultCollaborationEl.textContent = profile.collaboration;

  const url = new URL(window.location.href);
  url.searchParams.set("result", profile.slug);
  window.history.replaceState({}, "", url);
}

function shareText(typeId) {
  const title = TYPE_META[typeId].title;
  return `I'm "${title}" on the Work Style Quiz—30 questions, ~8 minutes, no corporate fluff. What are you?`;
}

async function onShare(typeId) {
  const url = window.location.href;
  const text = shareText(typeId);
  try {
    if (navigator.share) {
      await navigator.share({ title: "Work Style Quiz", text, url });
      feedbackEl.textContent = "Shared.";
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    feedbackEl.textContent = "Share text copied to clipboard.";
  } catch {
    feedbackEl.textContent = "Share canceled or unavailable.";
  }
}

async function onCopy() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    feedbackEl.textContent = "Result link copied.";
  } catch {
    feedbackEl.textContent = "Unable to copy link in this browser.";
  }
}

function goToResult(typeId) {
  renderResult(typeId);
  showView("result");
  feedbackEl.textContent = "";
  shareBtn.onclick = () => onShare(typeId);
  requestAnimationFrame(() => {
    resultTitleEl.focus({ preventScroll: true });
  });
}

function tryRenderSharedResult() {
  const slug = new URLSearchParams(window.location.search).get("result");
  if (!slug) return false;
  const matchedTypeId = Object.keys(TYPE_META).find(
    (typeId) => TYPE_META[typeId].slug === slug
  );
  if (!matchedTypeId) return false;
  goToResult(matchedTypeId);
  return true;
}

startBtn.addEventListener("click", () => {
  showView("quiz");
  renderQuestion();
  focusMainContent();
  requestAnimationFrame(() => {
    const first = optionsEl.querySelector('input[type="radio"]');
    if (first) first.focus();
  });
});

prevBtn.addEventListener("click", () => {
  if (state.index === 0) return;
  state.index -= 1;
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (state.answers[state.index] === null) return;
  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }
  const typeId = calculateResultTypeId();
  goToResult(typeId);
});

copyBtn.addEventListener("click", onCopy);

retakeBtn.addEventListener("click", () => {
  state.index = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  const url = new URL(window.location.href);
  url.searchParams.delete("result");
  window.history.replaceState({}, "", url);
  showView("landing");
  feedbackEl.textContent = "";
});

function loadEmbeddedQuestions() {
  const el = document.getElementById("questions-embed");
  if (!el) return null;
  const raw = (el.textContent || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function bootstrap() {
  /* Must read embedded JSON FIRST. If we await fetch() first, some browsers leave
     the request pending on file:// or odd origins — and we never enable the CTA. */
  let data = loadEmbeddedQuestions();
  if (!data) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch("./questions.json", {
        cache: "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (res.ok) data = await res.json();
    } catch {
      /* timeout, file://, offline */
    }
  }
  if (!data) {
    if (loadErrorEl) {
      loadErrorEl.hidden = false;
      const isFile = window.location.protocol === "file:";
      loadErrorEl.innerHTML = isFile
        ? "Could not read questions. If you see this, the page may be missing the embedded data block—open <code>index.html</code> from the <code>work-style-quiz</code> folder or run: <code>cd work-style-quiz &amp;&amp; python3 -m http.server 8080</code> then visit <code>http://127.0.0.1:8080/</code>."
        : "Could not load questions.json. Check that you are serving this folder over HTTP (e.g. <code>python3 -m http.server</code> from the <code>work-style-quiz</code> folder) and refresh.";
    }
    if (startBtn) startBtn.disabled = true;
    return;
  }
  QUESTIONS = data;
  state.answers = Array(QUESTIONS.length).fill(null);
  if (loadErrorEl) loadErrorEl.hidden = true;
  if (startBtn) startBtn.disabled = false;

  if (!tryRenderSharedResult()) {
    showView("landing");
  }
}

bootstrap();

window.addEventListener("load", () => {
  if (QUESTIONS.length === 0) void bootstrap();
});
