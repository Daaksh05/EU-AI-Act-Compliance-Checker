from fastapi import FastAPI
from pydantic import BaseModel
from src.compliance_engine import check_compliance

app = FastAPI(title="EU AI Act Compliance Checker")

class AISystem(BaseModel):
    description: str

@app.post("/check")
def check_system(data: AISystem):
    result = check_compliance(data.description)
    return {"input": data.description, "result": result}

@app.get("/")
def root():
    return {"message": "EU AI Act Compliance Checker is running!"}
