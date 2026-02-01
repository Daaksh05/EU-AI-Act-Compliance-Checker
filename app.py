from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from fastapi.responses import FileResponse
import uuid
import os
from textwrap import wrap

from src.compliance_engine import analyze_ai_system

app = FastAPI(
    title="EU AI Act Compliance Checker",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REPORT_STORE = {}

REPORT_DIR = "reports"
os.makedirs(REPORT_DIR, exist_ok=True)

class AIInput(BaseModel):
    description: str


def draw_wrapped_text(c, text, x, y, max_width, leading=14):
    lines = wrap(text, max_width)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def generate_pdf_report(description: str, result: dict) -> str:
    report_id = str(uuid.uuid4())
    file_path = os.path.join(REPORT_DIR, f"report_{report_id}.pdf")

    c = canvas.Canvas(file_path, pagesize=A4)
    width, height = A4

    x_margin = 50
    y = height - 50

    c.setFont("Helvetica-Bold", 18)
    c.drawString(x_margin, y, "EU AI Act Compliance Report")

    y -= 40
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Input Description")

    y -= 20
    c.setFont("Helvetica", 11)
    y = draw_wrapped_text(c, description, x_margin, y, 90)

    y -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Risk Category")

    y -= 20
    c.setFont("Helvetica", 11)
    c.drawString(x_margin, y, result["risk_category"])

    y -= 30
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Risk Score")

    y -= 20
    c.setFont("Helvetica", 11)
    c.drawString(x_margin, y, str(result["risk_score"]))

    y -= 30
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Risk Factors")

    y -= 20
    c.setFont("Helvetica", 11)
    for factor in result["risk_factors"]:
        c.drawString(x_margin, y, f"- {factor}")
        y -= 14

    y -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Applicable EU AI Act Articles")

    y -= 20
    c.setFont("Helvetica", 11)
    for article in result["articles"]:
        c.drawString(x_margin, y, f"- {article}")
        y -= 14

    y -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Recommendations")

    y -= 20
    c.setFont("Helvetica", 11)
    for rec in result["recommendations"]:
        y = draw_wrapped_text(c, f"- {rec}", x_margin, y, 90)

    y -= 20
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x_margin, y, "Explanation")

    y -= 20
    c.setFont("Helvetica", 11)
    draw_wrapped_text(c, result["explanation"], x_margin, y, 90)

    c.showPage()
    c.save()

    return file_path


@app.post("/check")
def check_system(data: AIInput):
    result = analyze_ai_system(data.description)

    pdf_path = generate_pdf_report(data.description, result)
    report_id = os.path.basename(pdf_path).replace(".pdf", "")

    REPORT_STORE[report_id] = pdf_path

    return {
        "report_id": report_id,
        "analysis": result,
        "download_url": f"/download/{report_id}"
    }


@app.get("/download/{report_id}")
def download_report(report_id: str):
    pdf_path = REPORT_STORE.get(report_id)

    if not pdf_path or not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="Report not found")

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=os.path.basename(pdf_path)
    )
