# ✅ EU-AI-ACT-COMPLIANCE-CHECKER

**Ensure AI Compliance, Empower Responsible Innovation**

![Last Commit](https://img.shields.io/github/last-commit/Daaksh05/EU-AI-Act-Compliance-Checker)
![Python](https://img.shields.io/badge/python-100%25-blue)
![Languages](https://img.shields.io/badge/languages-1-orange)

Built with the tools and technologies:

![JSON](https://img.shields.io/badge/JSON-black)
![Markdown](https://img.shields.io/badge/Markdown-black)
![FastAPI](https://img.shields.io/badge/FastAPI-green)
![NumPy](https://img.shields.io/badge/NumPy-blue)
![Python](https://img.shields.io/badge/Python-blue)
![Pandas](https://img.shields.io/badge/Pandas-purple)
![Pydantic](https://img.shields.io/badge/Pydantic-red)
![YAML](https://img.shields.io/badge/YAML-darkred)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contribution](#contribution)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## 📌 Overview

EU-AI-Act-Compliance-Checker is a comprehensive developer tool designed to facilitate AI compliance with the **European Union Artificial Intelligence Act (2024)**. It offers automated risk classification, regulatory verification, bias and safety testing for large language models, and generates detailed compliance reports to support responsible AI deployment.

---

### ❓ Why EU-AI-Act-Compliance-Checker?

This project simplifies regulatory adherence and risk management for AI systems. The core features include:

- 🧪 **Risk Assessment** – Classifies AI risks and verifies compliance with EU standards  
- 📄 **Automated Reporting** – Generates detailed, downloadable PDF and textual reports  
- 🔍 **Bias & Safety Testing** – Performs lightweight evaluations of LLM safety and bias metrics  
- 🔗 **API Integration** – Provides seamless endpoints for AI system evaluations  
- 🗂️ **Metadata Extraction** – Structures model documentation for transparency  
- 🛡️ **Regulatory Rules Support** – Supports EU high-risk compliance validation  

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Programming Language:** Python  
- **Package Manager:** pip  

---

## 🚀 Quick Start (Example)

```bash
# Clone repository
git clone https://github.com/Daaksh05/EU-AI-Act-Compliance-Checker.git
cd EU-AI-Act-Compliance-Checker

# (Optional) Create & activate virtual environment
python -m venv .venv
.venv/Scripts/activate      # Windows PowerShell
# or: source .venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app:app --reload

# System Architecture – EU AI Act Compliance Checker

This system evaluates AI models and applications against the regulatory
requirements of the EU AI Act. The system consists of five major
components:

---

## 🧩 1. Input Layer
Accepts:
- AI system description  
- Model card  
- Intended use-case  
- Source URL or text metadata  

---

## 🧩 2. Metadata Extractor (`src/metadata_extractor.py`)
Functions:
- Extracts keywords  
- Identifies domain (health, hiring, surveillance, etc.)
- Detects whether the system fits high-risk categories  

Output example:
```json
{
  "domain": "hiring",
  "high_risk_flag": true
}


### **📌 Content to paste:**

```md
# User Guide – EU AI Act Compliance Checker

This guide explains how to install, run, and use the compliance
checker application.

---

## 🔧 Requirements
- Python 3.10+
- pip
- Git

---

## ✅ 1. Clone the Repository

```bash
git clone https://github.com/Daaksh05/EU-AI-Act-Compliance-Checker
cd EU-AI-Act-Compliance-Checker
 
## 📁 Project Structure

EU-AI-Act-Compliance-Checker/
│── app.py                     # FastAPI backend  
│── requirements.txt           # Python dependencies  
│── README.md                  # Documentation  
│── rules/
│     └── high_risk_rules.yaml # EU AI Act rules  
│── src/
│     ├── __init__.py
│     ├── compliance_engine.py # Main logic  
│     ├── metadata_extractor.py
│     ├── risk_classifier.py
│     └── report_generator.py  # PDF report creator
│── docs/
      └── project_report.pdf   # You can upload your final PDF
## 📘 API Documentation

FastAPI automatically provides interactive API docs:

- Swagger UI: http://127.0.0.1:8000/docs  
- Redoc UI:   http://127.0.0.1:8000/redoc  

## ⚙️ How the Compliance Engine Works

1. **User submits an AI system description.**
2. System extracts keywords → classifies risk level:
   - Unacceptable
   - High risk
   - Limited risk
   - Minimal risk
3. Loads rules from `high_risk_rules.yaml`.
4. For each EU AI Act requirement:
   - Checks if the system meets the requirement.
   - Marks each item as ✔ compliant or ❌ missing.
5. Generates a final JSON + PDF downloadable report:
   - Risk category  
   - Compliance score  
   - Missing requirements  
   - Recommendations

## Generated Reports
Compliance reports are generated dynamically as PDF files and stored locally
in the `reports/` directory. These files are intentionally excluded from
version control.

