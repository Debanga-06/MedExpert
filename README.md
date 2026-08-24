# MedExpert — Reasoning Engine

A rule-based medical-symptom expert system, built as an educational demo
(see `PRD.md` — not included here, but this implements it). Not a diagnostic
tool. Every result names the exact rule that produced it.

```
medexpert/
├── backend/     FastAPI + a small forward-chaining rule engine
├── frontend/    Static HTML/CSS/JS — three.js "reasoning core" visuals,
│                no build step required
└── tests/       pytest — rule-engine and API tests (PRD section 19)
```

## Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- `GET  /api/health`     → `{"status": "ok"}`
- `GET  /api/symptoms`   → the full symptom list
- `POST /api/diagnose`   → `{"symptoms": ["fever", "cough", "fatigue"]}`
- Interactive docs at `http://127.0.0.1:8000/docs`

CLI demo (same engine, no server): `python run_cli.py`

## Run the tests

```bash
pip install -r backend/requirements.txt
python -m pytest tests/ -v
```

17 tests covering the 5 cases from PRD section 19 (Influenza, Common Cold,
Asthma-like symptoms, no symptoms submitted, no rule match) plus API-level
checks (validation errors, warning shape, disclaimer present).

## Run the frontend

Any static file server works — the page is plain HTML/CSS/JS with three.js
pulled from a CDN via an import map, so there's nothing to build.

```bash
cd frontend
python3 -m http.server 8080
# open http://127.0.0.1:8080
```

By default the frontend calls the API at `http://127.0.0.1:8000`. Change
`CONFIG.API_BASE` at the top of `app.js` if your backend runs elsewhere.
If the backend isn't reachable, the UI still renders (using a bundled
symptom list) and tells you how to start it — it won't just dead-end.

## Design notes

- **Frontend**: dark cinematic glassmorphism — floating glass panels over a
  persistent WebGL background (`three.js`): an ambient particle field plus a
  "reasoning core," a glowing wireframe orb whose rotation speed, color, and
  pulse react to the actual engine state (idle → reasoning → result/warning).
  It's a literal stand-in for the inference pipeline, not decoration.
- **Backend**: a dependency-free forward-chaining engine (facts → rule match →
  fire → score → explain) instead of the `experta` package, which is
  unmaintained and doesn't install cleanly on modern Python. The rule
  *shape* (core/supporting symptoms, weight, explanation, safety level)
  mirrors what the PRD specifies.
- Every page carries the medical disclaimer; the results page separately
  surfaces safety warnings (e.g. chest pain + shortness of breath) above
  the ranked conditions, regardless of which disease rules fired.
- **Language**: EN / हिंदी / বাংলা, switchable from the top bar (`i18n.js`).
  Defaults to the browser's language when it's Hindi or Bengali, otherwise
  English; the choice is remembered on the device. Symptom names, disease
  names, rule explanations, and safety warnings are translated client-side
  via id-keyed lookup tables, since the API itself only returns English.
