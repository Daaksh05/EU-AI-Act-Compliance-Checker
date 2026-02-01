# Project Structure for Vercel Deployment

## Overview

This project is configured for deployment on Vercel as a full-stack application with:
- **Frontend**: React + TypeScript + Vite (static site)
- **Backend**: Python + FastAPI (serverless functions)
- **Infrastructure**: Automatically managed by Vercel

## Directory Structure

```
eu-ai-act-compliance-engine/
│
├── 📋 Configuration Files
│   ├── vercel.json                  # Vercel deployment configuration
│   ├── .vercelignore                # Files to ignore during deployment
│   ├── requirements.txt             # Python dependencies
│   └── package.json                 # Root package config (if applicable)
│
├── 🎨 Frontend (React + TypeScript + Vite)
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/          # React components
│   │   │   ├── pages/               # Page components
│   │   │   ├── services/            # API client (api.ts)
│   │   │   ├── App.tsx              # Main app component
│   │   │   └── main.tsx             # Entry point
│   │   │
│   │   ├── dist/                    # Built output (created by build)
│   │   ├── public/                  # Static assets
│   │   ├── .env.example             # Environment variables template
│   │   ├── .env.production          # Production environment config
│   │   ├── package.json             # Dependencies & scripts
│   │   ├── vite.config.ts           # Vite build configuration
│   │   ├── tailwind.config.js       # Tailwind CSS config
│   │   └── tsconfig.json            # TypeScript config
│   │
│   └── Built for: /frontend/dist
│
├── 🐍 Backend (Python + FastAPI)
│   ├── api/
│   │   ├── check.py                 # Main API handler
│   │   └── __init__.py              # Package marker
│   │
│   ├── src/
│   │   ├── compliance_engine.py     # Core compliance logic
│   │   ├── llm_bias_tester.py       # LLM bias testing
│   │   ├── risk_classifier.py       # Risk classification
│   │   ├── report_generator.py      # Report generation
│   │   ├── metadata_extractor.py    # Metadata extraction
│   │   └── main.py                  # Main logic entry point
│   │
│   ├── rules/
│   │   ├── eu_ai_rules.json         # EU AI Act rules database
│   │   └── high_risk_rules.yaml     # High-risk rules
│   │
│   └── Deployed as: Vercel Serverless Functions
│
├── 📚 Documentation
│   ├── VERCEL_DEPLOYMENT.md         # Detailed deployment guide
│   ├── QUICK_START_VERCEL.md        # Quick 5-minute guide
│   ├── DEPLOYMENT_CHECKLIST.md      # Pre & post-deployment checklist
│   ├── docs/                        # Architecture & methodology
│   ├── README.md                    # Project overview
│   └── CHANGELOG.md                 # Version history
│
├── 🔧 Deployment Scripts
│   └── deploy-vercel.sh             # Setup & verification script
│
└── 📂 Other
    ├── reports/                     # Generated PDF reports (local dev only)
    └── .git/                        # Git repository
```

## How Vercel Handles This

### Build Process

```
vercel.json build command:
→ cd frontend && npm install && npm run build

Output:
→ frontend/dist/ (static files)

Routing:
→ Static files served from frontend/dist/
→ All /api/* routes served by api/check.py
```

### API Routes

All Python API requests go through `/api/` routes:
- `POST /api/check` → handled by `api/check.py` → `check_system()`
- `GET /api/download/{report_id}` → handled by `api/check.py` → `download_report()`

### Environment Variables

Frontend can access build-time environment variables:
```
VITE_API_BASE_URL = API base URL (set in Vercel dashboard)
```

## File Modifications for Vercel

### Files Changed
1. **vercel.json** - NEW: Deployment configuration
2. **.vercelignore** - NEW: Exclude files from deployment
3. **api/check.py** - NEW: FastAPI app structured for serverless
4. **frontend/.env.production** - NEW: Production environment file
5. **frontend/src/services/api.ts** - MODIFIED: Updated API endpoints to use `/api/*`
6. **frontend/package.json** - MODIFIED: Added type-check script

### Files Unchanged (No Breaking Changes)
- ✅ app.py (original local development file)
- ✅ src/* (all Python modules)
- ✅ requirements.txt (no changes needed)
- ✅ Frontend components (no changes needed)

## API Endpoint Changes

| Endpoint | Local Dev | Vercel |
|----------|-----------|--------|
| Check compliance | `http://localhost:8000/check` | `https://your-domain.vercel.app/api/check` |
| Download report | `http://localhost:8000/download/{id}` | `https://your-domain.vercel.app/api/download/{id}` |

The frontend `api.ts` automatically uses `/api/*` routes.

## Environment Variables

### Development (Local)
```
VITE_API_BASE_URL=http://localhost:3000
```

### Production (Vercel)
```
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

Set this in **Settings → Environment Variables** in Vercel dashboard.

## Deployment Workflow

```
Local Changes
    ↓
Git Commit & Push
    ↓
Vercel Detects Push
    ↓
Build Phase:
  - Install frontend dependencies
  - Build React app → dist/
  - Package Python functions
    ↓
Deploy Phase:
  - Upload static files
  - Deploy serverless functions
    ↓
Live at: https://your-project-name.vercel.app
```

## Performance Characteristics

| Metric | Value | Note |
|--------|-------|------|
| Cold Start | 1-5s | First request slower |
| Warm Start | 100-500ms | Subsequent requests |
| Timeout | 10s (Hobby) / 60s (Pro) | Compliance checks complete within this |
| Memory | 1GB (default) | Sufficient for compliance analysis |
| Storage | /tmp (temporary) | PDFs stored temporarily; consider S3 for persistence |

## Monitoring & Logs

### Vercel Dashboard
- **Deployments** tab: View build logs
- **Function** logs: See API execution details
- **Analytics**: Request counts, latency, error rates
- **Issues**: Failed builds or deployments

### Local Development
```bash
# Still works as before
python app.py

# Frontend dev server
cd frontend && npm run dev
```

## Troubleshooting Guide

### Build Fails
1. Check build logs: Vercel → Deployments → [latest] → Build logs
2. Verify `vercel.json` syntax: `vercel.json` must be valid JSON
3. Check Python dependencies: Add missing packages to `requirements.txt`

### API Returns 404
1. Verify endpoint is `/api/check`, not `/check`
2. Check `VITE_API_BASE_URL` is set correctly
3. Ensure Python code in `api/check.py` is correct
4. Check function logs for Python errors

### Frontend Can't Connect
1. Check network tab in browser dev tools
2. Verify CORS headers are present
3. Confirm `VITE_API_BASE_URL` environment variable
4. Redeploy after updating environment variables

### PDF Download Issues
1. PDFs stored in `/tmp` (temporary, short-lived)
2. Consider implementing cloud storage (AWS S3) for production
3. Set reasonable cache headers for reports

## Next Steps

### Immediate
- [ ] Review and follow `QUICK_START_VERCEL.md`
- [ ] Set up Git repository
- [ ] Deploy to Vercel

### Short-term
- [ ] Configure custom domain
- [ ] Set up error monitoring
- [ ] Enable analytics

### Long-term
- [ ] Implement persistent PDF storage
- [ ] Add database for report history
- [ ] Set up CI/CD for testing
- [ ] Monitor performance and optimize

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [FastAPI on Vercel](https://vercel.com/guides/fastapi)
- [Python Runtime Spec](https://vercel.com/docs/functions/runtimes/python)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Status**: ✅ Ready for Vercel deployment

**Configuration**: vercel.json, .vercelignore, and api/check.py

**Next Action**: Follow QUICK_START_VERCEL.md
