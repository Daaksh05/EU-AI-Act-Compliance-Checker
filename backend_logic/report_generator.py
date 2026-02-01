from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from textwrap import wrap
import os

def generate_pdf_report(system_description: str, analysis: dict, report_id: str) -> str:
    filename = f"report_{report_id}.pdf"
    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4

    y = height - 2 * cm

    def draw_heading(text):
        nonlocal y
        c.setFont("Helvetica-Bold", 14)
        c.drawString(2 * cm, y, text)
        y -= 1 * cm

    def draw_text(text):
        nonlocal y
        c.setFont("Helvetica", 11)
        lines = wrap(text, 90)
        for line in lines:
            if y < 2 * cm:
                c.showPage()
                y = height - 2 * cm
            c.drawString(2 * cm, y, line)
            y -= 0.6 * cm

    # -------- TITLE --------
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width / 2, y, "EU AI Act Compliance Report")
    y -= 2 * cm

    # -------- CONTENT --------
    draw_heading("Input Description")
    draw_text(system_description)

    draw_heading("Risk Category")
    draw_text(analysis["risk_category"])

    draw_heading("Risk Score")
    draw_text(str(analysis["risk_score"]))

    draw_heading("Risk Factors")
    for factor in analysis["risk_factors"]:
        draw_text(f"- {factor}")

    draw_heading("Applicable EU AI Act Articles")
    for article in analysis["articles"]:
        draw_text(f"- {article}")

    draw_heading("Recommendations")
    for rec in analysis["recommendations"]:
        draw_text(f"- {rec}")

    draw_heading("Explanation")
    draw_text(analysis["explanation"])

    c.save()
    return os.path.abspath(filename)
