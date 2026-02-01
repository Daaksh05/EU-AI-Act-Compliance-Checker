# EU AI Act Compliance Checker
🔗 **DOI:** https://doi.org/10.5281/zenodo.18361776


[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18361776.svg)](https://doi.org/10.5281/zenodo.18361776)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)

**Automated Legal Risk Assessment for Artificial Intelligence Systems**

🚀 **Live Demo:** [Check Compliance Now](https://eu-ai-act-compliance-checker-daaksh05s-projects.vercel.app)

An automated web-based system that evaluates whether AI applications comply with EU AI Act regulations. The system accepts AI system descriptions as input, classifies risk levels, validates regulatory obligations, and generates structured compliance reports in PDF format.

## 🎯 Key Features

- **Automated Risk Classification**: Classifies AI systems into EU AI Act risk categories (Unacceptable, High, Limited, Minimal)
- **Regulatory Validation**: Checks compliance against YAML-encoded legal requirements
- **PDF Report Generation**: Creates professional compliance reports with detailed findings
- **REST API Interface**: FastAPI-based endpoints with automatic Swagger documentation
- **Modular Architecture**: Clean separation of concerns for maintainability and extensibility

## 🏗️ System Architecture

```
┌─────────────────┐
│   User Input    │
│ (AI System Desc)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FastAPI Layer  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Compliance     │
│  Engine         │
└────┬────────────┘
     │
     ├──> Risk Classifier
     ├──> Rules Validator
     └──> Report Generator
         │
         ▼
    ┌──────────┐
    │PDF Report│
    └──────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Virtual environment (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Daaksh05/EU-AI-Act-Compliance-Checker.git
cd EU-AI-Act-Compliance-Checker

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Application

```bash
# Start the FastAPI server
uvicorn app:app --reload

# Access the API documentation
# Open browser: http://localhost:8000/docs
```

### Example Usage

```python
import requests

# Prepare AI system description
system_description = {
    "name": "Resume Screening AI",
    "description": "AI system for automated resume screening in recruitment",
    "domain": "recruitment",
    "purpose": "candidate screening"
}

# Call compliance API
response = requests.post(
    "http://localhost:8000/assess-compliance",
    json=system_description
)

# Get compliance report
report = response.json()
print(f"Risk Level: {report['risk_level']}")
print(f"Compliance Status: {report['status']}")
```

## 📁 Project Structure

```
EU-AI-Act-Compliance-Checker/
├── api/                        # Vercel Serverless Functions (Python)
├── src/                        # React Frontend Source
├── backend_logic/              # Core Compliance Engine Logic
├── rules/                      # Legal requirements database (YAML)
├── index.html                  # Frontend Entry Point
├── package.json                # Node.js dependencies & scripts
├── requirements.txt            # Python dependencies
├── vercel.json                 # Vercel Deployment Configuration
├── CITATION.cff                # Citation metadata
└── README.md                   # This file
```

## ☁️ Deployment

The application is optimized for **Vercel** with a full-stack configuration:
- **Frontend**: React + Vite (Static Hosting)
- **Backend**: FastAPI (Serverless Functions)
- **Deployment**: Automatic CI/CD via GitHub

## 🔬 Research Context

This project was developed as part of a research investigation into AI governance challenges, specifically:

- **Deployment Drift Detection**: How AI systems evolve post-deployment
- **Context-Aware Risk Assessment**: Moving beyond static categorization
- **Continuous Compliance Monitoring**: Frameworks for ongoing governance

The research proposes extending static compliance checking to adaptive, context-aware governance systems that respond to real-world deployment patterns.

## 📊 Technology Stack

| Frontend Framework | React + Vite |
| Backend Framework | FastAPI |
| API Server | Vercel Serverless |
| Programming Language | Python 3.12+ & TypeScript |
| Rules Storage | YAML |
| Report Generation | ReportLab |
| API Documentation | Swagger/OpenAPI |

## 📖 Citation

If you use this software in your research or project, please cite it as:

```bibtex
@software{daakshayani2026euai,
  author  = {Daakshayani, N. S.},
  title   = {EU AI Act Compliance Checker: Automated Legal Risk Assessment for Artificial Intelligence Systems},
  year    = {2026},
  version = {1.0.4},
  doi     = {10.5281/zenodo.18361776},
  url     = {https://github.com/Daaksh05/EU-AI-Act-Compliance-Checker}
}
```

**APA Format:**
```
Daakshayani, N. S. (2026). EU AI Act Compliance Checker: Automated Legal Risk 
Assessment for Artificial Intelligence Systems (Version 1.0.4) [Computer software]. 
https://doi.org/10.5281/zenodo.18361776
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Daakshayani N S**
- Institution: Sri Shakthi Institute of Engineering and Technology, Coimbatore
- Email: daakshayanidaakshayani@gmail.com
- GitHub: [@Daaksh05](https://github.com/Daaksh05)

## 🙏 Acknowledgments

- European Commission for the EU AI Act framework
- Open-source developer community
- FastAPI and Python ecosystem contributors

## 📚 Further Reading

- [EU AI Act Official Text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021PC0206)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [AI Governance Research](https://www.oecd.org/digital/artificial-intelligence/)

---

**Note**: This is a research prototype demonstrating automated compliance checking concepts. For production deployment, additional security, scalability, and legal review are recommended.
