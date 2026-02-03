from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from fastapi.responses import FileResponse
import uuid
import os
from textwrap import wrap
from typing import List, Optional
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session

# Import backend logic
try:
    from .compliance_engine import analyze_ai_system
except ImportError:
    from compliance_engine import analyze_ai_system

# Import models and auth from root
# On Vercel, the root directory is added to sys.path
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from models import Base, User, Report
    from auth import get_password_hash, verify_password, create_access_token, decode_access_token
except ImportError:
    # Fallback if pathing is different
    from ..models import Base, User, Report
    from ..auth import get_password_hash, verify_password, create_access_token, decode_access_token

# Database Setup - Using /tmp for Vercel serverless environment
# IMPORTANT: This is ephemeral and will reset periodically.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////tmp/compliance.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REPORT_DIR = "/tmp/reports"
os.makedirs(REPORT_DIR, exist_ok=True)

# Pydantic Models
class AIInput(BaseModel):
    description: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=64)

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., max_length=64)

class Token(BaseModel):
    access_token: str
    token_type: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        return None
    email = payload.get("sub")
    if not email:
        return None
    return db.query(User).filter(User.email == email).first()

# Helper functions
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

# Auth Routes
@app.post("/api/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(user.password)
        new_user = User(email=user.email, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        access_token = create_access_token(data={"sub": new_user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Core Routes
@app.post("/api/check")
def check_system(data: AIInput, db: Session = Depends(get_db), current_user: Optional[User] = Depends(get_current_user)):
    result = analyze_ai_system(data.description)
    pdf_path = generate_pdf_report(data.description, result)
    report_id = os.path.basename(pdf_path).replace(".pdf", "").replace("report_", "")

    if current_user:
        new_report = Report(
            id=report_id,
            user_id=current_user.id,
            description=data.description,
            analysis_result=result
        )
        db.add(new_report)
        db.commit()

    return {
        "report_id": report_id,
        "analysis": result,
        "download_url": f"/api/download/{report_id}"
    }

@app.get("/api/reports")
def get_user_reports(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    reports = db.query(Report).filter(Report.user_id == current_user.id).order_by(Report.created_at.desc()).all()
    return reports

@app.get("/api/download/{report_id}")
def download_report(report_id: str, db: Session = Depends(get_db)):
    pdf_path = os.path.join(REPORT_DIR, f"report_{report_id}.pdf")
    if not os.path.exists(pdf_path):
        report_data = db.query(Report).filter(Report.id == report_id).first()
        if report_data:
            pdf_path = generate_pdf_report(report_data.description, report_data.analysis_result)
        else:
            raise HTTPException(status_code=404, detail="Report not found")

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=os.path.basename(pdf_path)
    )

# Root-level endpoints (for Vercel rewrites if needed)
@app.get("/api")
async def root(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        db_status = "Connected"
    except Exception as e:
        db_status = f"Error: {str(e)}"
    
    return {
        "status": "ok", 
        "message": "EU AI Act Compliance API is running",
        "database": db_status
    }
