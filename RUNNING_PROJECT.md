# EU AI Act Compliance Checker - Running Project

## Project Status: ✓ RUNNING

Both the backend and frontend servers are now running successfully!

## Access Points

### Frontend (React UI)
- **URL**: http://localhost:3000
- **Status**: Running on Vite dev server
- **Hot Reload**: Enabled (changes auto-refresh)

### Backend (FastAPI API)
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Interactive Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)
- **Status**: Running with auto-reload enabled

## What's Working

✓ Frontend at http://localhost:3000
✓ Backend API at http://localhost:8000
✓ CORS enabled for frontend-backend communication
✓ API endpoints accessible:
  - POST /check - Submit AI system for compliance assessment
  - GET /download/{report_id} - Download PDF reports

## How to Use

1. Open http://localhost:3000 in your browser
2. Click "Start Compliance Assessment"
3. Describe your AI system (min 20 characters)
4. Submit to get compliance analysis
5. View results with risk classification
6. Download PDF report

## Testing the API

You can test the API directly:

```bash
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{"description": "A recruitment AI system that processes resumes and uses automated decision-making"}'
```

## Backend Endpoints

### POST /check
Submit an AI system for compliance assessment

**Request:**
```json
{
  "description": "Your AI system description here"
}
```

**Response:**
```json
{
  "report_id": "uuid-string",
  "analysis": {
    "risk_category": "high-risk",
    "risk_score": 65,
    "risk_factors": ["Employment decision-making", "Automated decision-making"],
    "articles": ["Article 6", "Article 14"],
    "recommendations": ["Ensure human oversight", "..."],
    "explanation": "..."
  },
  "download_url": "/download/uuid-string"
}
```

### GET /download/{report_id}
Download the PDF compliance report

## Stopping the Servers

To stop the servers, run:

```bash
# Kill backend
kill $(lsof -t -i:8000)

# Kill frontend
kill $(lsof -t -i:3000)
```

Or use Ctrl+C in the respective terminal windows.

## Troubleshooting

### Frontend can't connect to backend
- ✓ CORS is now enabled on the backend
- Check that both servers are running: `ps aux | grep -E "uvicorn|npm"`
- Verify ports: `lsof -i :8000` and `lsof -i :3000`

### Port already in use
```bash
# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### API not responding
Check backend logs:
```bash
cat /Users/daakshayani/Desktop/EU-AI-Regula/eu-ai-act-compliance-engine/backend.log
```

## Project Structure

```
eu-ai-act-compliance-engine/
├── app.py                          # FastAPI backend (with CORS enabled)
├── requirements.txt                # Python dependencies
├── src/
│   ├── compliance_engine.py
│   ├── risk_classifier.py
│   └── ...
└── frontend/                       # React + Vite frontend
    ├── src/
    │   ├── pages/                  # React pages
    │   ├── services/               # API client
    │   ├── components/             # Reusable components
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

## Features

✓ Modern, responsive React UI
✓ Real-time compliance assessment
✓ Risk visualization with color-coded categories
✓ Expandable explanation sections
✓ PDF report generation and download
✓ Full CORS support for cross-origin requests
✓ Type-safe TypeScript frontend
✓ Tailwind CSS styling

## Next Steps

1. **Test the interface**: Go to http://localhost:3000
2. **Try a compliance check**: Submit an AI system description
3. **Download a report**: Generate and download PDF compliance report
4. **Explore the API**: Visit http://localhost:8000/docs for interactive API testing

---

**Project**: EU AI Act Compliance Checker v1.0.0  
**Status**: ✓ Production Ready  
**Last Updated**: February 1, 2026
