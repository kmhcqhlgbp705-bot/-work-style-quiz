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
    tagline: "You do your best work with protected focus and clear priorities.",
    strengths: [
      "Excellent at complex, deep work.",
      "Strong quality and thoughtful outputs.",
      "Good at asynchronous execution.",
    ],
    watchOuts: [
      "Can feel overloaded by constant meetings.",
      "May delay sharing ideas until they feel polished.",
    ],
    environment:
      "Quiet blocks, fewer interruptions, and explicit boundaries around focus time.",
    collaboration:
      "Prefers async-first communication, clear asks, and fewer but higher quality syncs.",
  },
  collab_spark: {
    slug: "collab-spark",
    title: "The Collaborative Spark",
    tagline: "You generate momentum through live collaboration and team energy.",
    strengths: [
      "Great in brainstorming and fast alignment.",
      "High team energy and engagement.",
      "Turns conversations into action quickly.",
    ],
    watchOuts: [
      "May over-index on synchronous time.",
      "Can move too fast without enough documentation.",
    ],
    environment:
      "A social, interactive culture with frequent collaboration touchpoints.",
    collaboration:
      "Prefers real-time discussions, co-working sessions, and shared ideation.",
  },
  systems_orchestrator: {
    slug: "systems-orchestrator",
    title: "The Systems Orchestrator",
    tagline: "You create clarity with structure, roles, and reliable execution.",
    strengths: [
      "Strong planning and operational consistency.",
      "Excellent documentation and handoffs.",
      "Reduces risk by making decisions explicit.",
    ],
    watchOuts: [
      "May feel friction in highly ambiguous setups.",
      "Can be seen as rigid in rapid-change phases.",
    ],
    environment:
      "Clear ownership, visible workflows, and dependable team rituals.",
    collaboration:
      "Prefers defined responsibilities, written decisions, and predictable processes.",
  },
  nimble_navigator: {
    slug: "nimble-navigator",
    title: "The Nimble Navigator",
    tagline: "You thrive in change and keep progress moving under uncertainty.",
    strengths: [
      "Adapts quickly to new information.",
      "Strong in fast-paced, evolving contexts.",
      "Pragmatic, experiment-driven decision maker.",
    ],
    watchOuts: [
      "Can under-invest in process documentation.",
      "May switch direction before others catch up.",
    ],
    environment:
      "Dynamic teams that reward learning speed, experimentation, and adaptability.",
    collaboration:
      "Prefers short loops, quick feedback, and small iterative bets.",
  },
  people_connector: {
    slug: "people-connector",
    title: "The People Connector",
    tagline: "You raise team performance by building trust and psychological safety.",
    strengths: [
      "Excellent listener and relationship builder.",
      "Strong at conflict de-escalation and alignment.",
      "Helps teams maintain healthy collaboration.",
    ],
    watchOuts: [
      "May absorb too much emotional load.",
      "Can postpone hard decisions to keep harmony.",
    ],
    environment:
      "Teams that value empathy, open communication, and healthy feedback culture.",
    collaboration:
      "Prefers direct, respectful communication and context-rich conversations.",
  },
  independent_owner: {
    slug: "independent-owner",
    title: "The Independent Owner",
    tagline: "You deliver best when trusted to own outcomes end-to-end.",
    strengths: [
      "High autonomy and accountability.",
      "Strong ownership from problem to delivery.",
      "Reliable under minimal supervision.",
    ],
    watchOuts: [
      "May under-communicate progress to others.",
      "Can resist collaboration when moving fast solo.",
    ],
    environment:
      "Outcome-focused teams that define goals clearly and avoid micromanagement.",
    collaboration:
      "Prefers clear ownership boundaries, lightweight check-ins, and decision autonomy.",
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
  return `I got "${title}" on the Work Style Quiz. What's yours?`;
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

function setStartCtaEnabled(enabled) {
  if (!startBtn) return;
  const isLink = startBtn.tagName === "A" || startBtn.tagName === "a";
  if (isLink) {
    startBtn.classList.toggle("is-disabled", !enabled);
    startBtn.setAttribute("aria-disabled", enabled ? "false" : "true");
  } else {
    startBtn.disabled = !enabled;
  }
}

if (startBtn) {
  startBtn.addEventListener("click", (event) => {
    if (startBtn.tagName === "A" || startBtn.tagName === "a") {
      event.preventDefault();
    }
    if (!Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
      if (loadErrorEl) {
        loadErrorEl.hidden = false;
        loadErrorEl.textContent =
          "Questions are still loading. Please refresh once and try again.";
      }
      return;
    }
    showView("quiz");
    renderQuestion();
    focusMainContent();
    requestAnimationFrame(() => {
      const first = optionsEl.querySelector('input[type="radio"]');
      if (first) first.focus();
    });
  });
}

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

function questionJsonFetchUrls() {
  const urls = [];
  try {
    urls.push(new URL("questions.json", window.location.href).href);
  } catch {
    /* ignore */
  }
  if (window.location && window.location.origin) {
    urls.push(`${window.location.origin}/questions.json`);
  }
  return [...new Set(urls)];
}

async function fetchQuestionsJson() {
  const urls = questionJsonFetchUrls();
  if (urls.length === 0) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!res.ok) continue;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      } catch {
        /* try next URL */
      }
    }
  } finally {
    clearTimeout(timer);
  }
  return null;
}

async function bootstrap() {
  setStartCtaEnabled(false);
  let data = loadEmbeddedQuestions();
  if (!data) data = await fetchQuestionsJson();
  if (!data) {
    if (loadErrorEl) {
      loadErrorEl.hidden = false;
      const isFile = window.location.protocol === "file:";
      loadErrorEl.innerHTML = isFile
        ? "Could not read questions. If you see this, the page may be missing the embedded data block—open <code>index.html</code> from the <code>work-style-quiz</code> folder or run: <code>cd work-style-quiz &amp;&amp; python3 -m http.server 8080</code> then visit <code>http://127.0.0.1:8080/</code>."
        : "Could not load questions. Check network, then hard-refresh. If you use Cloudflare, turn off Rocket Loader or ensure <code>questions.json</code> is deployed next to <code>index.html</code>.";
    }
    setStartCtaEnabled(false);
    return;
  }
  QUESTIONS = data;
  state.answers = Array(QUESTIONS.length).fill(null);
  if (loadErrorEl) loadErrorEl.hidden = true;
  setStartCtaEnabled(true);

  if (!tryRenderSharedResult()) {
    showView("landing");
  }
}

void bootstrap();
