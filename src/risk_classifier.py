def classify_risk(description: str) -> dict:
    desc = description.lower()

    risk_score = 0
    factors = []

    if "recruitment" in desc or "hiring" in desc:
        risk_score += 30
        factors.append("Employment decision-making")

    if "automated" in desc:
        risk_score += 20
        factors.append("Fully automated decision-making")

    if "personal data" in desc or "resume" in desc:
        risk_score += 20
        factors.append("Uses personal data")

    if "biometric" in desc or "facial" in desc:
        risk_score += 30
        factors.append("Biometric processing")

    # Risk category
    if risk_score >= 60:
        category = "high-risk"
        articles = [
            "Article 6 – Classification of High-Risk AI Systems",
            "Article 10 – Data and Data Governance",
            "Article 14 – Human Oversight"
        ]
        recommendations = [
            "Ensure meaningful human oversight",
            "Maintain transparent training data documentation",
            "Perform regular bias and fairness audits",
            "Enable audit logging and traceability"
        ]
    elif risk_score >= 30:
        category = "limited-risk"
        articles = [
            "Article 52 – Transparency Obligations"
        ]
        recommendations = [
            "Inform users they are interacting with AI",
            "Provide explanations for automated outputs"
        ]
    else:
        category = "minimal-risk"
        articles = []
        recommendations = [
            "Voluntary code of conduct recommended"
        ]

    return {
        "risk_category": category,
        "risk_score": risk_score,
        "risk_factors": factors,
        "articles": articles,
        "recommendations": recommendations,
        "explanation": f"The system is classified as {category} based on detected risk indicators."
    }
