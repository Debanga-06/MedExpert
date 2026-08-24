import * as THREE from "three";
import {
  LANGUAGES, UI, t, translateSymptom, translateCategory,
  translateDisease, translateRuleExplanation, translateWarning,
  translateCareTips, translateSeekCare,
} from "./i18n.js";

const CONFIG = {

  API_BASE: "https://medexpert-fpar.onrender.com",
};

const FALLBACK_SYMPTOMS = [
  ["fever", "Fever", "General"], ["chills", "Chills", "General"], ["fatigue", "Fatigue", "General"],
  ["body_pain", "Body pain", "General"], ["muscle_ache", "Muscle ache", "General"],
  ["sweating", "Excess sweating", "General"], ["rapid_heartbeat", "Rapid heartbeat", "General"],
  ["headache", "Headache", "Neurological"], ["light_sensitivity", "Sensitivity to light", "Neurological"],
  ["sound_sensitivity", "Sensitivity to sound", "Neurological"], ["dizziness", "Dizziness", "Neurological"],
  ["blurred_vision", "Blurred vision", "Neurological"],
  ["cough", "Cough", "Respiratory"], ["sore_throat", "Sore throat", "Respiratory"],
  ["sneezing", "Sneezing", "Respiratory"], ["runny_nose", "Runny nose", "Respiratory"],
  ["nasal_congestion", "Nasal congestion", "Respiratory"], ["wheezing", "Wheezing", "Respiratory"],
  ["shortness_of_breath", "Shortness of breath", "Respiratory"], ["chest_discomfort", "Chest discomfort", "Respiratory"],
  ["chest_pain", "Chest pain", "Respiratory"],
  ["itchy_eyes", "Itchy eyes", "Allergy"], ["watery_eyes", "Watery eyes", "Allergy"],
  ["nausea", "Nausea", "Digestive"], ["vomiting", "Vomiting", "Digestive"], ["diarrhea", "Diarrhea", "Digestive"],
  ["abdominal_pain", "Abdominal pain", "Digestive"], ["loss_of_appetite", "Loss of appetite", "Digestive"],
  ["dry_mouth", "Dry mouth", "Metabolic"], ["increased_thirst", "Increased thirst", "Metabolic"],
  ["frequent_urination", "Frequent urination", "Metabolic"], ["dark_urine", "Dark urine", "Metabolic"],
  ["unexplained_weight_loss", "Unexplained weight loss", "Metabolic"],
].map(([id, label, category]) => ({ id, label, category }));

const CATEGORY_ORDER = ["General", "Respiratory", "Neurological", "Allergy", "Digestive", "Metabolic"];

const Scene = (() => {
  const canvas = document.getElementById("bg-canvas");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const rig = new THREE.Group();
  scene.add(rig);

  // glow sprite texture, generated once on a canvas 
  function makeGlowTexture() {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = makeGlowTexture();

  // ---- ambient particle field ----
  const FIELD_COUNT = reduceMotion ? 260 : 900;
  const fieldGeo = new THREE.BufferGeometry();
  const fieldPos = new Float32Array(FIELD_COUNT * 3);
  const fieldColor = new Float32Array(FIELD_COUNT * 3);
  const palette = [new THREE.Color("#35e6ff"), new THREE.Color("#9b6bff"), new THREE.Color("#ff5fae")];
  for (let i = 0; i < FIELD_COUNT; i++) {
    const r = 6 + Math.random() * 16;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    fieldPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    fieldPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    fieldPos[i * 3 + 2] = r * Math.cos(phi) - 6;
    const col = palette[i % palette.length];
    fieldColor[i * 3] = col.r; fieldColor[i * 3 + 1] = col.g; fieldColor[i * 3 + 2] = col.b;
  }
  fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPos, 3));
  fieldGeo.setAttribute("color", new THREE.BufferAttribute(fieldColor, 3));
  const fieldMat = new THREE.PointsMaterial({
    size: 0.09, map: glowTex, transparent: true, depthWrite: false,
    vertexColors: true, opacity: 0.36, blending: THREE.AdditiveBlending,
  });
  const field = new THREE.Points(fieldGeo, fieldMat);
  rig.add(field);

  // reasoning core: wireframe icosahedron + node particles on its vertices
  const core = new THREE.Group();
  core.position.set(0, 0.3, 0);
  rig.add(core);

  const icoGeo = new THREE.IcosahedronGeometry(2.15, 1);
  const edges = new THREE.EdgesGeometry(icoGeo);
  const coreLineMat = new THREE.LineBasicMaterial({ color: 0x35e6ff, transparent: true, opacity: 0.35 });
  const coreLines = new THREE.LineSegments(edges, coreLineMat);
  core.add(coreLines);

  const innerGeo = new THREE.IcosahedronGeometry(1.35, 0);
  const innerEdges = new THREE.EdgesGeometry(innerGeo);
  const innerMat = new THREE.LineBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.4 });
  const innerLines = new THREE.LineSegments(innerEdges, innerMat);
  core.add(innerLines);

  const nodePositions = icoGeo.attributes.position.array;
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nodePositions), 3));
  const nodeMat = new THREE.PointsMaterial({
    size: 0.22, map: glowTex, color: 0x9be9ff, transparent: true,
    depthWrite: false, opacity: 0.9, blending: THREE.AdditiveBlending,
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  core.add(nodes);

  // core center glow
  const centerGeo = new THREE.SphereGeometry(0.5, 24, 24);
  const centerMat = new THREE.MeshBasicMaterial({ color: 0x35e6ff, transparent: true, opacity: 0.12 });
  const centerGlow = new THREE.Mesh(centerGeo, centerMat);
  core.add(centerGlow);

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onResize);

  // subtle camera parallax on pointer move — "camera-like transitions"
  let targetX = 0, targetY = 0;
  window.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.35;
  });

  // engine energy state, animated toward a target
  let energy = 0.15;    
  let hue = 0;       
  let targetEnergy = 0.15;
  let targetHue = 0;

  function setEngineState(state) {
    // state: "idle" | "thinking" | "warn" | "danger"
    if (state === "thinking") { targetEnergy = 1; targetHue = 0; }
    else if (state === "warn") { targetEnergy = 0.55; targetHue = 1; }
    else if (state === "danger") { targetEnergy = 0.85; targetHue = 2; }
    else { targetEnergy = 0.15; targetHue = 0; }
  }

  const hueColors = [
    { line: new THREE.Color(0x35e6ff), inner: new THREE.Color(0x9b6bff), node: new THREE.Color(0x9be9ff) },
    { line: new THREE.Color(0xffb84d), inner: new THREE.Color(0xffb84d), node: new THREE.Color(0xffd39b) },
    { line: new THREE.Color(0xff4d5e), inner: new THREE.Color(0xff4d5e), node: new THREE.Color(0xff9aa4) },
  ];

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta(), 0.05);

    energy += (targetEnergy - energy) * 0.04;
    hue += (targetHue - hue) * 0.06;

    if (!reduceMotion) {
      core.rotation.y = t * (0.06 + energy * 0.35);
      core.rotation.x = Math.sin(t * 0.2) * 0.15;
      field.rotation.y = t * 0.01;
      rig.rotation.y += (targetX - rig.rotation.y) * 0.02;
      rig.rotation.x += (-targetY - rig.rotation.x) * 0.02;
    }

    const pulse = 1 + Math.sin(t * (1.5 + energy * 4)) * 0.05 * (0.4 + energy);
    core.scale.setScalar(pulse);

    const lo = Math.floor(hue), hi = Math.min(lo + 1, 2), f = hue - lo;
    const cLine = hueColors[lo].line.clone().lerp(hueColors[hi].line, f);
    const cInner = hueColors[lo].inner.clone().lerp(hueColors[hi].inner, f);
    const cNode = hueColors[lo].node.clone().lerp(hueColors[hi].node, f);
    coreLineMat.color = cLine; coreLineMat.opacity = 0.18 + energy * 0.34;
    innerMat.color = cInner; innerMat.opacity = 0.2 + energy * 0.3;
    nodeMat.color = cNode; nodeMat.opacity = 0.42 + energy * 0.36;
    centerMat.opacity = 0.05 + energy * 0.14;

    renderer.render(scene, camera);
  }
  animate();

  return { setEngineState };
})();

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function showToast(message, ms = 4200) {
  const el = $("#toast");
  el.textContent = message;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("is-visible"));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.classList.remove("is-visible");
    setTimeout(() => { el.hidden = true; }, 300);
  }, ms);
}

function setEngineLabel(uiKey, mode) {
  State.engineKey = uiKey;
  State.engineMode = mode;
  const dot = $("#engine-dot");
  const label = $("#engine-label");
  label.textContent = t(uiKey, State.lang);
  dot.className = "engine-dot" + (mode ? ` is-${mode}` : "");
  Scene.setEngineState(mode === "live" ? "thinking" : mode === "warn" ? "warn" : mode === "danger" ? "danger" : "idle");
}

const pages = $$(".page");
const navButtons = $$("[data-nav]");

function navigateTo(name) {
  pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === name));
  $$(".nav-link").forEach((b) => b.classList.toggle("is-active", b.dataset.nav === name));
  window.scrollTo({ top: 0 });
}
navButtons.forEach((btn) => btn.addEventListener("click", () => navigateTo(btn.dataset.nav)));

function detectLang() {
  const saved = localStorage.getItem("medexpert_lang");
  if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2);
  return LANGUAGES.some((l) => l.code === nav) ? nav : "en";
}

const State = {
  symptoms: [],          // [{id,label,category}]
  selected: new Set(),
  activeCategory: "All",
  searchTerm: "",
  lang: detectLang(),
  lastResults: null,  
  engineKey: "engine_idle",
  engineMode: null,
};

async function loadSymptoms() {
  try {
    const res = await fetch(`${CONFIG.API_BASE}/api/symptoms`, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    State.symptoms = await res.json();
  } catch (err) {
    State.symptoms = FALLBACK_SYMPTOMS;
    showToast(t("toast_offline", State.lang).replace("{base}", CONFIG.API_BASE), 6000);
  }
  $("#stat-symptoms").textContent = State.symptoms.length;
  buildCategoryFilters();
  renderSymptomGroups();
}

function buildCategoryFilters() {
  const wrap = $("#category-filters");
  const cats = ["All", ...CATEGORY_ORDER.filter((c) => State.symptoms.some((s) => s.category === c))];
  wrap.innerHTML = "";
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-chip" + (cat === State.activeCategory ? " is-active" : "");
    btn.textContent = cat === "All" ? t("category_all", State.lang) : translateCategory(cat, State.lang);
    btn.dataset.cat = cat;
    btn.addEventListener("click", () => {
      State.activeCategory = cat;
      $$(".filter-chip", wrap).forEach((b) => b.classList.toggle("is-active", b.dataset.cat === cat));
      renderSymptomGroups();
    });
    wrap.appendChild(btn);
  });
}

function renderSymptomGroups() {
  const container = $("#symptom-groups");
  const term = State.searchTerm.trim().toLowerCase();

  const filtered = State.symptoms.filter((s) => {
    const label = translateSymptom(s.id, State.lang, s.label);
    const matchesTerm = !term || label.toLowerCase().includes(term) || s.label.toLowerCase().includes(term);
    const matchesCat = State.activeCategory === "All" || s.category === State.activeCategory;
    return matchesTerm && matchesCat;
  });

  $("#symptom-empty").hidden = filtered.length !== 0;
  container.innerHTML = "";

  const byCategory = new Map();
  filtered.forEach((s) => {
    if (!byCategory.has(s.category)) byCategory.set(s.category, []);
    byCategory.get(s.category).push(s);
  });

  const orderedCats = [...CATEGORY_ORDER.filter((c) => byCategory.has(c)), ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c))];

  orderedCats.forEach((cat) => {
    const group = document.createElement("div");
    const title = document.createElement("p");
    title.className = "symptom-group-title";
    title.textContent = translateCategory(cat, State.lang);
    const grid = document.createElement("div");
    grid.className = "symptom-grid";

    byCategory.get(cat).forEach((s) => {
      const chip = document.createElement("button");
      chip.className = "symptom-chip" + (State.selected.has(s.id) ? " is-selected" : "");
      chip.type = "button";
      chip.innerHTML = `${translateSymptom(s.id, State.lang, s.label)}<span class="dot" aria-hidden="true"></span>`;
      chip.addEventListener("click", () => toggleSymptom(s.id, chip));
      grid.appendChild(chip);
    });

    group.appendChild(title);
    group.appendChild(grid);
    container.appendChild(group);
  });
}

function toggleSymptom(id, chipEl) {
  if (State.selected.has(id)) State.selected.delete(id);
  else State.selected.add(id);
  chipEl.classList.toggle("is-selected");
  updateSelectionBar();
}

function updateSelectionBar() {
  const bar = $("#selection-bar");
  const count = State.selected.size;
  $("#selection-count-num").textContent = count;
  bar.classList.toggle("is-hidden", count === 0);
}

function updateSelectionBarTexts() {
  const suffix = $("#selection-suffix-text");
  const runText = $("#btn-run-inference-text");
  if (suffix) suffix.textContent = t("selection_suffix", State.lang);
  if (runText) runText.textContent = t("btn_run_inference", State.lang);
}

$("#symptom-search").addEventListener("input", (e) => {
  State.searchTerm = e.target.value;
  renderSymptomGroups();
});

/* ---- floating selection bar (built in JS to keep index.html lean) ---- */
(function buildSelectionBar() {
  const bar = document.createElement("div");
  bar.className = "selection-bar glass is-hidden";
  bar.id = "selection-bar";
  bar.innerHTML = `
    <span class="selection-count"><b id="selection-count-num">0</b> <span id="selection-suffix-text">symptom(s) selected</span></span>
    <button class="btn btn-primary" id="btn-run-inference"><span id="btn-run-inference-text">Run inference</span> <span class="btn-arrow">→</span></button>
  `;
  document.body.appendChild(bar);
  $("#btn-run-inference").addEventListener("click", runInference);
  updateSelectionBarTexts();
})();

const symptomLabel = (id) => translateSymptom(id, State.lang, State.symptoms.find((s) => s.id === id)?.label ?? id);

async function runInference() {
  if (State.selected.size === 0) return;
  setEngineLabel("engine_thinking", "live");
  $("#btn-run-inference").disabled = true;

  try {
    const res = await fetch(`${CONFIG.API_BASE}/api/diagnose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: [...State.selected] }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.detail || `HTTP ${res.status}`);
    }
    const data = await res.json();
    State.lastResults = data;
    renderResults(data);
    navigateTo("results");
  } catch (err) {
    setEngineLabel("engine_idle", null);
    showToast(
      t("toast_fetch_error", State.lang).replace("{msg}", err.message).replace("{base}", CONFIG.API_BASE),
      6000
    );
  } finally {
    $("#btn-run-inference").disabled = false;
  }
}

function scoreColor(score, safetyLevel) {
  if (safetyLevel === "emergency") return "#ff4d5e";
  if (safetyLevel === "warning") return "#ffb84d";
  if (score >= 65) return "#35e6ff";
  return "#9b6bff";
}

function gaugeSVG(score, color) {
  const r = 40, c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return `
    <div class="gauge">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle class="gauge-track" cx="48" cy="48" r="${r}"></circle>
        <circle class="gauge-fill" cx="48" cy="48" r="${r}"
          stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="${c}"
          data-target-offset="${offset}"></circle>
      </svg>
      <div class="gauge-value">${score}%</div>
    </div>`;
}

function renderResults(data) {
  const { diagnoses, warnings } = data;
  const lang = State.lang;
  const hasEmergency = warnings.some((w) => w.level === "emergency");
  const hasWarning = warnings.some((w) => w.level === "warning");
  setEngineLabel(
    hasEmergency ? "engine_priority" : hasWarning ? "engine_advisory" : "engine_idle",
    hasEmergency ? "danger" : hasWarning ? "warn" : null
  );

  $("#results-heading").textContent = diagnoses.length
    ? t("results_heading_default", lang)
    : t("results_heading_none", lang);
  $("#results-sub").textContent = diagnoses.length
    ? t("results_sub_default", lang)
    : t("results_sub_none", lang);

  // warnings
  const warnStack = $("#warning-stack");
  warnStack.innerHTML = "";
  warnings.forEach((w) => {
    const banner = document.createElement("div");
    banner.className = `warning-banner level-${w.level}`;
    const msg = translateWarning(w.message, lang);
    banner.innerHTML = `<span class="warning-icon">${w.level === "emergency" ? "⚠" : "!"}</span><span>${msg}</span>`;
    warnStack.appendChild(banner);
  });

  // diagnosis cards
  const list = $("#results-list");
  list.innerHTML = "";

  if (!diagnoses.length) {
    const empty = document.createElement("div");
    empty.className = "results-empty glass";
    empty.innerHTML = `<strong>${t("results_empty_title", lang)}</strong>
      <p>${t("results_empty_body", lang)}</p>`;
    list.appendChild(empty);
    return;
  }

  diagnoses.forEach((d) => {
    const color = scoreColor(d.score, d.safety_level);
    const card = document.createElement("article");
    card.className = "result-card glass";
    const diseaseName = translateDisease(d.disease, lang);
    const safetyText = t(`safety_${d.safety_level}`, lang);
    const primaryRuleId = d.matched_rules[0]?.rule_id ?? d.disease_code;
    const ruleLines = d.matched_rules
      .map((r) => `<span class="rid">[${r.rule_id}]</span> ${translateRuleExplanation(r.rule_id, r.explanation, lang)}`)
      .join("\n");

    const careTips = translateCareTips(primaryRuleId, d.care_tips, lang);
    const seekCare = translateSeekCare(primaryRuleId, d.seek_care, lang);
    const nextStepsHTML = (careTips.length || seekCare.length) ? `
        <div class="next-steps">
          ${careTips.length ? `
          <p class="next-steps-label">${t("next_steps_label", lang)}</p>
          <ul class="next-steps-list">${careTips.map((tip) => `<li>${tip}</li>`).join("")}</ul>` : ""}
          ${seekCare.length ? `
          <p class="seek-care-label">${t("seek_care_label", lang)}</p>
          <ul class="seek-care-list">${seekCare.map((s) => `<li>${s}</li>`).join("")}</ul>` : ""}
        </div>` : "";

    card.innerHTML = `
      ${gaugeSVG(d.score, color)}
      <div class="result-body">
        <h3>${diseaseName}</h3>
        <p class="result-score-label">${t("result_score_label", lang)} · ${safetyText}</p>
        <div class="matched-chips">
          ${d.matched_symptoms.map((id) => `<span class="matched-chip">${symptomLabel(id)}</span>`).join("")}
        </div>
        <div class="rule-console">${ruleLines}</div>
        ${nextStepsHTML}
      </div>`;
    list.appendChild(card);
  });

  // animate gauges in on next frame
  requestAnimationFrame(() => {
    $$(".gauge-fill", list).forEach((circle) => {
      circle.style.strokeDashoffset = circle.dataset.targetOffset;
    });
  });
}

$("#btn-restart").addEventListener("click", () => {
  State.selected.clear();
  State.lastResults = null;
  updateSelectionBar();
  renderSymptomGroups();
  setEngineLabel("engine_idle", null);
  navigateTo("assess");
});

const NAV_KEYS = { home: "nav_home", assess: "nav_assess", how: "nav_how", about: "nav_about" };

function applyStaticTranslations(lang) {
  document.documentElement.lang = lang;

  $$(".nav-link").forEach((btn) => { btn.textContent = t(NAV_KEYS[btn.dataset.nav], lang); });
  $$(".lang-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === lang));

  // Home
  $("#home-eyebrow").textContent = t("eyebrow_home", lang);
  $("#hero-title").innerHTML = t("hero_title_html", lang);
  $("#hero-sub").textContent = t("hero_sub", lang);
  $("#btn-begin-text").textContent = t("btn_begin", lang);
  $("#btn-how").textContent = t("btn_how", lang);
  $("#stat-symptoms-label").textContent = t("stat_symptoms_label", lang);
  $("#stat-conditions-label").textContent = t("stat_conditions_label", lang);
  $("#stat-ml-label").textContent = t("stat_ml_label", lang);
  $("#scroll-cue-text").textContent = t("scroll_cue", lang);

  // Assessment
  $("#assess-eyebrow").textContent = t("eyebrow_assess", lang);
  $("#assess-title").textContent = t("assess_title", lang);
  $("#assess-sub").textContent = t("assess_sub", lang);
  $("#symptom-search").placeholder = t("search_placeholder", lang);
  $("#symptom-empty-text").textContent = t("symptom_empty", lang);

  // Results (defaults — overwritten by renderResults() if a result is already showing)
  $("#results-eyebrow").textContent = t("eyebrow_results", lang);
  $("#btn-adjust").textContent = t("btn_adjust", lang);
  $("#btn-restart").textContent = t("btn_restart", lang);
  if (!State.lastResults) {
    $("#results-heading").textContent = t("results_heading_default", lang);
    $("#results-sub").textContent = t("results_sub_default", lang);
  }

  // How it works
  $("#how-eyebrow").textContent = t("eyebrow_how", lang);
  $("#how-title").textContent = t("how_title", lang);
  $("#how-sub").textContent = t("how_sub", lang);
  for (let i = 1; i <= 5; i++) {
    $(`#pipe-${i}-title`).textContent = t(`pipe${i}_title`, lang);
    $(`#pipe-${i}-body`).textContent = t(`pipe${i}_body`, lang);
  }
  $("#example-rule-label").textContent = t("example_rule_label", lang);

  // About
  $("#about-eyebrow").textContent = t("eyebrow_about", lang);
  $("#about-title").textContent = t("about_title", lang);
  $("#about1-title").textContent = t("about1_title", lang);
  $("#about1-body").textContent = t("about1_body", lang);
  $("#about2-title").textContent = t("about2_title", lang);
  const stackItems = UI.about2_items[lang] ?? UI.about2_items.en;
  $("#about2-list").innerHTML = stackItems.map((item) => `<li>${item}</li>`).join("");
  $("#about3-title").textContent = t("about3_title", lang);
  $("#about3-body").textContent = t("about3_body", lang);
  $("#team-title").textContent = t("team_title", lang);
  $("#disclaimer-title").textContent = t("disclaimer_heading", lang);
  $("#disclaimer-body").textContent = t("disclaimer_body", lang);

  // Footer
  $("#footer-disclaimer-text").textContent = t("footer_disclaimer", lang);

  updateSelectionBarTexts();
}

function setLang(code) {
  if (!LANGUAGES.some((l) => l.code === code) || code === State.lang) return;
  State.lang = code;
  localStorage.setItem("medexpert_lang", code);
  applyStaticTranslations(code);
  buildCategoryFilters();
  renderSymptomGroups();
  if (State.lastResults) {
    renderResults(State.lastResults);
  } else {
    setEngineLabel(State.engineKey, State.engineMode);
  }
}

$$(".lang-btn").forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

applyStaticTranslations(State.lang);
setEngineLabel("engine_idle", null);
loadSymptoms();
