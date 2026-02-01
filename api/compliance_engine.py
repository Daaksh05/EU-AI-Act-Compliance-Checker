def analyze_ai_system(description: str) -> dict:
    description_lower = description.lower()

    risk_factors = []
    articles = []
    score = 0

    if "recruitment" in description_lower or "hiring" in description_lower:
        risk_factors.append("Employment decision-making")
        articles.append("Article 6 – Classification of High-Risk AI Systems")
        score += 30

    if "automated" in description_lower:
        risk_factors.append("Fully automated decision-making")
        articles.append("Article 14 – Human Oversight")
        score += 20

    if "personal data" in description_lower or "resumes" in description_lower:
        risk_factors.append("Uses personal data")
        articles.append("Article 10 – Data and Data Governance")
        score += 20

    if score >= 60:
        category = "high-risk"
    elif score >= 30:
        category = "limited-risk"
    else:
        category = "minimal-risk"

    recommendations = [
        "Ensure meaningful human oversight",
        "Maintain transparent training data documentation",
        "Perform regular bias and fairness audits",
        "Enable audit logging and traceability"
    ]

    return {
        "risk_category": category,
        "risk_score": score,
        "risk_factors": list(set(risk_factors)),
        "articles": list(set(articles)),
        "recommendations": recommendations,
        "explanation": f"The system is classified as {category} based on detected risk indicators."
    }
