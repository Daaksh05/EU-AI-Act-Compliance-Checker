# Deployment Checklist for Vercel

## Pre-Deployment

- [ ] All code committed to Git
- [ ] `.env.production` configured with correct `VITE_API_BASE_URL`
- [ ] No sensitive data in code or `.env` files
- [ ] Frontend builds successfully locally: `npm run build`
- [ ] Python dependencies updated: `pip freeze > requirements.txt`
- [ ] All tests passing
- [ ] API routes return expected responses
- [ ] No linting errors or warnings

## Vercel Setup

- [ ] Vercel account created at vercel.com
- [ ] Git provider (GitHub/GitLab/Bitbucket) connected
- [ ] Repository pushed to Git provider
- [ ] Project imported in Vercel dashboard

## Configuration

- [ ] Build command set: `cd frontend && npm install && npm run build`
- [ ] Output directory set: `dist`
- [ ] Install command: `npm install` (or leave empty for automatic)
- [ ] Build command: `npm run build`
- [ ] Environment Variables: `VITE_API_BASE_URL` set to production domain
- [ ] `.vercelignore` file present and configured
- [ ] `vercel.json` present and valid

## Deployment

- [ ] Click "Deploy" in Vercel dashboard
- [ ] Monitor build logs for errors
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Verify deployment is successful

## Post-Deployment Testing

- [ ] Frontend loads without errors
- [ ] Navigation between pages works
- [ ] API endpoint `/api/check` responds
- [ ] Compliance check functionality works
- [ ] PDF download works correctly
- [ ] CORS headers are present
- [ ] No console errors in browser dev tools

## Monitoring

- [ ] Check Vercel deployment logs
- [ ] Monitor function execution times
- [ ] Set up error alerts (optional)
- [ ] Review analytics dashboard

## Performance & Optimization

- [ ] First load time acceptable
- [ ] No 404 errors for assets
- [ ] API responses complete within timeout
- [ ] Consider adding caching headers (advanced)

## Security

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] API keys/secrets in environment variables only
- [ ] CORS configured appropriately
- [ ] No debug logging in production

## Documentation

- [ ] Update README with deployed URL
- [ ] Document any environment-specific configurations
- [ ] Provide deployment rollback procedure

## Notes

```
Deployed URL: https://____________________________
Date: ____________________
Notes: ____________________
```
