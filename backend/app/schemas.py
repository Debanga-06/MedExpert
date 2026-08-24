from pydantic import BaseModel, Field


class SymptomOut(BaseModel):
    id: str
    label: str
    category: str


class DiagnoseRequest(BaseModel):
    symptoms: list[str] = Field(..., min_length=1)


class MatchedRule(BaseModel):
    rule_id: str
    explanation: str


class DiagnosisOut(BaseModel):
    disease: str
    disease_code: str  # stable rule id (e.g. "R001") — frontend uses this to localize
    score: int
    matched_symptoms: list[str]
    matched_rules: list[MatchedRule]
    safety_level: str
    care_tips: list[str] = []   # general self-care pointers — not a treatment plan
    seek_care: list[str] = []   # red-flag signs to stop self-managing and see a professional


class WarningOut(BaseModel):
    code: str  # stable key — frontend uses this to localize
    level: str
    message: str


class DiagnoseResponse(BaseModel):
    diagnoses: list[DiagnosisOut]
    warnings: list[WarningOut]
    disclaimer: str = (
        "MedExpert is an educational rule-based demo. Results are generated from "
        "predefined IF-THEN rules and rule-match scores, not a medical diagnosis. "
        "Always consult a qualified healthcare professional."
    )
