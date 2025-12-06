from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from src.compliance_engine import check_compliance

from reportlab.pdfgen import canvas
import uuid
import os

app = FastAPI(
    title="EU AI Act Compliance Checker",
    version="1.0.0",
    description="Runs compliance checks and generates a downloadable PDF report."
)

# ----------------------------
# Request Model
# ----------------------------
class AISystem(BaseModel):
    description: str


# ----------------------------
# PDF Report Generator
# ----------------------------
def generate_pdf_report(input_text: str, result: dict) -> str:
    report_id = str(uuid.uuid4())
    output_path = f"report_{report_id}.pdf"

    c = canvas.Canvas(output_path)
    c.setFont("Helvetica", 14)

    y = 800
    c.drawString(50, y, "EU AI Act Compliance Report")
    y -= 40

    c.drawString(50, y, f"Input Description: {input_text}")
    y -= 40

    # Safe lookup to prevent KeyError
    risk_category = result.get("risk_category", "Not Available")
    c.drawString(50, y, f"Risk Category: {risk_category}")
    y -= 40

    # Print each result line
    for key, value in result.items():
        c.drawString(50, y, f"{key}: {value}")
        y -= 25
        if y < 50:
            c.showPage()
            y = 800

    c.save()
    return output_path


# ----------------------------
# Root Endpoint
# ----------------------------
@app.get("/")
def home():
    return {"message": "EU AI Act Compliance Checker — API running"}


# ----------------------------
# Main API Endpoint
# ----------------------------
@app.post("/check")
def check_system(data: AISystem):
    result = check_compliance(data.description)

    pdf_path = generate_pdf_report(data.description, result)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="EU_AI_Compliance_Report.pdf"
    )
