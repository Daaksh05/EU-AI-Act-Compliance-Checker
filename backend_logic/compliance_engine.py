def analyze_ai_system(description: str) -> dict:
    description_lower = description.lower()

    risk_factors = []
    articles = []
    score = 0

    # 1. Check for Prohibited Practices (Article 5)
    prohibited_keywords = [
        "social scoring", "subliminal", "manipulati", "exploit vulnerabilities", 
        "biometric categorization", "emotion recognition", "real-time remote biometric",
        "human rights violation"
    ]
    if any(kw in description_lower for kw in prohibited_keywords):
        category = "prohibited"
        score = 100
        risk_factors.append("Prohibited AI Practice (Article 5)")
        articles.append("Article 5 – Prohibited AI Practices")
        recommendations = [
            "DO NOT DEPLOY. This system is likely banned under the EU AI Act.",
            "Consult legal counsel immediately."
        ]
        return {
            "risk_category": category,
            "risk_score": score,
            "risk_factors": list(set(risk_factors)),
            "articles": list(set(articles)),
            "recommendations": recommendations,
            "explanation": "This system falls under Unacceptable Risk (Article 5) and is prohibited in the EU."
        }

    # 2. Check for High-Risk AI Systems (Article 6 & Annex III)
    high_risk_patterns = {
        "Biometrics": ["biometric", "recognition", "identification", "facial", "voice analysis", "fingerprint", "retina", "verify identity"],
        "Critical Infrastructure": ["critical infrastructure", "traffic", "water", "electricity", "gas", "power grid", "digital infrastructure", "heating"],
        "Education": ["education", "vocational", "training", "grading", "student", "admission", "exam", "test scoring", "school", "university"],
        "Employment": ["recruitment", "hiring", "screening", "application", "promotion", "termination", "monitoring", "worker", "employee", "candidate", "resume", "cv", "interview", "job"],
        "Public Services": ["credit", "social security", "welfare", "public housing", "benefits", "eligibility", "insurance", "loan", "mortgage", "banking"],
        "Law Enforcement": ["law enforcement", "police", "crime", "profiling", "surveillance", "predictive policing", "risk assessment", "reoffending"],
        "Migration": ["migration", "asylum", "border", "visa", "passport", "immigration"],
        "Justice": ["judicial", "court", "legal", "lawyer", "judge", "sentencing", "parole"]
    }

    # Check for High Risk matches
    is_high_risk = False
    for area, kws in high_risk_patterns.items():
        if any(kw in description_lower for kw in kws):
            is_high_risk = True
            risk_factors.append(f"High-Risk Area: {area}")
            articles.append("Article 6 – Classification of High-Risk AI Systems")
            articles.append("Annex III – High-Risk AI Areas")
            score = max(score, 75)  # Ensure at least 75 if high risk
    
    # Add generic scoring for other features
    if "automated" in description_lower or "decision" in description_lower:
        risk_factors.append("Automated Decision Making")
        articles.append("Article 14 – Human Oversight")
        score += 10

    if "personal data" in description_lower or "sensitive" in description_lower:
        risk_factors.append("Processing of Personal Data")
        articles.append("Article 10 – Data Governance")
        score += 10

    # Determine final category
    if is_high_risk or score >= 60:
        category = "high-risk"
        recommendations = [
            "Implement a Risk Management System (Art. 9)",
            "Ensure Data Governance & Quality (Art. 10)",
            "Create Technical Documentation (Art. 11)",
            "Enable Record Keeping & Logging (Art. 12)",
            "Ensure Transparency & Instructions (Art. 13)",
            "Guarantee Human Oversight (Art. 14)",
            "Register in EU High-Risk AI Database"
        ]
    elif score >= 30 or "chatbot" in description_lower or "deepfake" in description_lower:
        category = "limited-risk"
        risk_factors.append("Interaction with humans (Transparency)")
        articles.append("Article 50 – Transparency Obligations")
        recommendations = [
            "Disclose that content is AI-generated",
            "Inform users they are interacting with an AI system",
            "Label deepfakes/synthetic content clearly"
        ]
        score = max(score, 40)
    else:
        category = "minimal-risk"
        recommendations = [
            "Adhere to voluntary codes of conduct",
            "Ensure general GDPR compliance"
        ]

    explanation = f"The system is classified as {category.upper()}."
    if category == "high-risk":
        explanation += " It falls under specific critical areas (Annex III) requiring full conformity assessment."
    elif category == "limited-risk":
        explanation += " It presents transparency risks (e.g., chatbots, deepfakes)."
    
    return {
        "risk_category": category,
        "risk_score": min(score, 100),
        "risk_factors": list(set(risk_factors)),
        "articles": list(set(articles)),
        "recommendations": recommendations,
        "explanation": explanation
    }
