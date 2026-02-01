# Quick Start: Deploy to Vercel in 5 Minutes

## Step 1: Prepare Your Local Project

```bash
cd /Users/daakshayani/Desktop/EU-AI-Regula/eu-ai-act-compliance-engine

# Make the deployment script executable
chmod +x deploy-vercel.sh

# Run the setup script
./deploy-vercel.sh
```

## Step 2: Push to GitHub

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: EU AI Act Compliance Engine - Ready for Vercel"

# Set main branch
git branch -M main

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy on Vercel

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub/GitLab/Bitbucket

2. **Import Repository**
   - Select your `eu-ai-act-compliance-engine` repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `eu-ai-act-compliance-engine` (or your choice)
   - **Framework Preset**: Select "Other" (monorepo)
   - Leave other settings as defaults

4. **Set Environment Variables**
   - Click "Environment Variables" section
   - Add variable:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: Leave empty or use placeholder (will update after deployment)
   - Click "Add"

5. **Deploy**
   - Click the "Deploy" button
   - Wait 2-5 minutes for build to complete
   - You'll see a success message with your URL

## Step 4: Update Environment Variable

After deployment completes:

1. Go to **Settings** → **Environment Variables**
2. Update `VITE_API_BASE_URL`:
   - Change value to: `https://your-project-name.vercel.app`
   - (Replace `your-project-name` with your actual project name)
3. Save changes
4. Go to **Deployments** and redeploy:
   - Click the three dots on the latest deployment
   - Select "Redeploy"

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Fill in a sample AI system description
3. Click "Check Compliance"
4. Verify the results appear and you can download the PDF report

## Troubleshooting

**Build Failed?**
- Check build logs in Vercel dashboard
- Ensure `requirements.txt` has all dependencies
- Verify `vercel.json` is correct

**API Not Responding?**
- Check that environment variable `VITE_API_BASE_URL` is set
- Redeploy after updating environment variable
- Check function logs in Vercel dashboard

**Frontend Can't Connect to API?**
- Verify `VITE_API_BASE_URL` matches your Vercel domain
- Ensure it includes `https://`
- Check browser console for network errors

## What's Deployed?

✅ **Frontend**: React app built with Vite (static files)  
✅ **Backend**: Python API running as Vercel Serverless Functions  
✅ **Scaling**: Automatic - no servers to manage  
✅ **SSL/HTTPS**: Free and automatic  
✅ **Deployments**: Automatic on every git push  

## Next Steps

- Set up custom domain (optional): Settings → Domains
- Configure analytics: Analytics tab
- Set up error monitoring (optional): Integrations
- Read full guide: `VERCEL_DEPLOYMENT.md`

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Python Runtime: [vercel.com/docs/functions/runtimes/python](https://vercel.com/docs/functions/runtimes/python)
- Issues: Check deployment logs in Vercel dashboard

---

**Your app is now live! 🚀**

Share your Vercel URL: `https://your-project-name.vercel.app`
