from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .knowledge_base import SYMPTOMS
from .schemas import DiagnoseRequest, DiagnoseResponse, SymptomOut
from .engine import diagnose as run_inference

app = FastAPI(
    title="MedExpert API",
    description="Educational rule-based medical diagnosis expert system. "
                "Not a substitute for professional medical advice.",
    version="1.0.0",
)

# Wide-open for local demo purposes. Tighten this before deploying anywhere real.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/symptoms", response_model=list[SymptomOut])
def get_symptoms():
    return [SymptomOut(id=s.id, label=s.label, category=s.category) for s in SYMPTOMS]


@app.post("/api/diagnose", response_model=DiagnoseResponse)
def diagnose(payload: DiagnoseRequest):
    if not payload.symptoms:
        raise HTTPException(status_code=422, detail="Please select at least one symptom.")

    result = run_inference(payload.symptoms)

    if not result["diagnoses"] and not result["warnings"]:
        # PRD 16 — "No Rule Match" case. Still a 200: it's a valid, explainable outcome.
        pass

    return DiagnoseResponse(
        diagnoses=result["diagnoses"],
        warnings=result["warnings"],
    )
