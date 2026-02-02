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
│   ├── package.json                 # Frontend dependencies & scripts
│   ├── tsconfig.json                # TypeScript config
│   └── vite.config.ts               # Vite build configuration
│
├── 🎨 Frontend (React + TypeScript + Vite)
│   ├── src/                         # React components & pages
│   ├── public/                      # Static assets
│   ├── index.html                   # Frontend entry point
│   └── dist/                        # Built output (created by build)
│
├── 🐍 Backend (Python + FastAPI)
│   ├── api/
│   │   ├── index.py                 # Main API handler
│   │   └── __init__.py              # Package marker
│   │
│   ├── backend_logic/               # Core compliance logic
│   │   ├── compliance_engine.py
│   │   ├── llm_bias_tester.py
│   │   ├── risk_classifier.py
│   │   ├── report_generator.py
│   │   └── ...
│   │
│   ├── rules/                       # Compliance rules (JSON/YAML)
│   │
│   └── Deployed as: Vercel Serverless Functions
│
├── 📚 Documentation
│   ├── VERCEL_DEPLOYMENT.md
│   ├── QUICK_START_VERCEL.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   └── README.md
│
└── 🔧 Deployment Scripts
    └── deploy-vercel.sh
```

## How Vercel Handles This

### Build Process

```
vercel.json build command:
→ npm install && npm run build

Output:
→ dist/ (static files)

Routing:
→ Static files served from dist/
→ All /api/* routes served by api/index.py
```

### API Routes

All Python API requests go through `/api/` routes:
- `POST /api/check` → handled by `api/index.py` → `check_system()`
- `GET /api/download/{report_id}` → handled by `api/index.py` → `download_report()`

### Environment Variables

Frontend can access build-time environment variables:
```
VITE_API_BASE_URL = API base URL (set in Vercel dashboard)
```

## File Modifications for Vercel

### Files Changed
1. **vercel.json** - Updated for root build
2. **.vercelignore** - Updated for root build
3. **api/index.py** - FastAPI app for serverless
4. **package.json** - Added type-check script

### Files Unchanged (No Breaking Changes)
- ✅ app.py (original local development file)
- ✅ src/* (all Python modules)
- ✅ requirements.txt (no changes needed)
- ✅ Frontend components (no changes needed)

## API Endpoint Changes

| Endpoint | Local Dev | Vercel |
|----------|-----------|--------|
| Check compliance | `http://localhost:3000/api/check` | `https://your-domain.vercel.app/api/check` |
| Download report | `http://localhost:3000/api/download/{id}` | `https://your-domain.vercel.app/api/download/{id}` |

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
3. Ensure Python code in `api/index.py` is correct
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
