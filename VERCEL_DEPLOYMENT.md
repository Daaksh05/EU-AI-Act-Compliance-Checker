# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your project to GitHub, GitLab, or Bitbucket
3. **Node.js & npm**: Installed locally

## Deployment Steps

### Step 1: Push Your Project to Git

```bash
cd /Users/daakshayani/Desktop/EU-AI-Regula/eu-ai-act-compliance-engine
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your Git provider (GitHub/GitLab/Bitbucket)
3. Import your repository
4. Configure project settings:
   - **Project Name**: `eu-ai-act-compliance-engine`
   - **Framework Preset**: `Other` (monorepo with frontend and Python API)
   - **Root Directory**: `.` (or leave blank)

### Step 3: Environment Variables

Set the following environment variables in your Vercel project settings:

```
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

Or set it during the deployment wizard.

### Step 4: Build Settings

Ensure the following are configured in Vercel:

- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: (Leave empty - Vercel handles this)

These are already configured in `vercel.json`.

### Step 5: Deploy

1. Click **Deploy** button in Vercel
2. Wait for the build to complete (typically 2-5 minutes)
3. Your project will be live at `https://your-project-name.vercel.app`

## Project Structure for Vercel

```
.
├── vercel.json              (Vercel configuration)
├── .vercelignore            (Files to ignore during deployment)
├── frontend/                (React frontend)
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env.example
│   ├── .env.production
│   └── dist/               (Built output)
├── api/                    (Serverless API routes)
│   └── check.py           (Python API endpoint)
├── src/                    (Python backend logic)
│   ├── compliance_engine.py
│   ├── llm_bias_tester.py
│   ├── risk_classifier.py
│   └── ...
├── rules/                  (Configuration files)
└── requirements.txt        (Python dependencies)
```

## How It Works

### Frontend
- Built with Vite/React and deployed as static files
- Served from `frontend/dist`
- Automatically rebuilt on every git push

### API (Backend)
- Python code runs as Vercel Serverless Functions
- Entry point: `/api/check.py`
- Endpoints:
  - `POST /api/check` - Analyze AI system compliance
  - `GET /api/download/{report_id}` - Download PDF report

### API URL Configuration
The frontend automatically detects the API base URL:
- **Local**: Uses `VITE_API_BASE_URL` from `.env.local` or defaults to `http://localhost:8000`
- **Production**: Uses `VITE_API_BASE_URL` from `.env.production` (auto-set to your Vercel domain)

## Post-Deployment

### 1. Update Environment Variables
After first deployment, update the `VITE_API_BASE_URL` in Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Update `VITE_API_BASE_URL` to your Vercel domain
3. Redeploy (or push a new commit)

### 2. Monitor Deployment
- Go to **Deployments** tab to view build logs
- Check **Analytics** for usage metrics
- Monitor **Function** execution times and logs

### 3. Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Troubleshooting

### Build Fails
- Check **Build Logs** in Vercel dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify `vercel.json` configuration

### API Errors
- Check Vercel **Function Logs** for Python errors
- Ensure `api/check.py` is correct
- Verify CORS headers are set properly

### Frontend Issues
- Clear browser cache
- Check that `VITE_API_BASE_URL` is correctly set
- Review browser console for errors

### PDF Generation Issues
- PDF reports are stored in `/tmp` (temporary, short-lived)
- Consider integrating cloud storage (AWS S3, etc.) for persistent storage
- Serverless functions have limited disk space

## Performance Optimization

### For Better Performance:
1. Enable Vercel Analytics
2. Use Vercel's automatic image optimization
3. Consider caching strategy for PDF reports
4. Implement request deduplication

### Limits to Be Aware Of:
- Serverless function timeout: 10 seconds (Hobby) to 60 seconds (Pro)
- Request size limit: ~4.6MB
- Memory: varies by plan
- Cold start latency: 1-5 seconds

## Advanced: Persistent Storage for PDFs

For production use, consider integrating cloud storage:

```python
# Example: AWS S3 integration
import boto3

s3_client = boto3.client('s3')

def upload_pdf_to_s3(file_path, bucket_name):
    s3_client.upload_file(file_path, bucket_name, os.path.basename(file_path))
    return f"https://{bucket_name}.s3.amazonaws.com/{os.path.basename(file_path)}"
```

Add environment variables:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/functions/runtimes/python)
- [FastAPI on Vercel](https://vercel.com/guides/fastapi)
- [Troubleshooting Guide](https://vercel.com/docs/cli/troubleshoot)

## Summary

Your application is now ready for Vercel deployment! The key points:

✅ Frontend: React/Vite → Static files  
✅ Backend: Python/FastAPI → Serverless Functions  
✅ Auto-scaling: Handled by Vercel  
✅ SSL/HTTPS: Free included  
✅ CI/CD: Automatic on git push  

Happy deploying! 🚀
