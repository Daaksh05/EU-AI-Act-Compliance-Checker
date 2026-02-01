#!/bin/bash

# Vercel Deployment Setup Script
# This script prepares your project for Vercel deployment

set -e

echo "🚀 Vercel Deployment Setup for EU AI Act Compliance Engine"
echo "=========================================================="
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git is installed${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm is installed${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js is installed ($(node --version))${NC}"

echo ""
echo "📦 Installing dependencies..."

# Install frontend dependencies
cd frontend
echo "Installing frontend dependencies..."
npm install

echo ""
echo "🔨 Building frontend..."
npm run build

cd ..

echo ""
echo -e "${GREEN}✓ Build successful!${NC}"
echo ""

# Verify deployment files
echo "📁 Verifying deployment configuration..."

files_to_check=(
    "vercel.json"
    ".vercelignore"
    "frontend/.env.example"
    "frontend/.env.production"
    "api/check.py"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file (missing)${NC}"
    fi
done

echo ""
echo "📝 Deployment Checklist:"
echo "========================"
echo ""
echo "Before deploying to Vercel, ensure:"
echo ""
echo "1. Git Configuration:"
echo "   □ Project pushed to GitHub/GitLab/Bitbucket"
echo "   □ Main branch is up to date"
echo ""
echo "2. Vercel Account:"
echo "   □ Create account at vercel.com"
echo "   □ GitHub/GitLab/Bitbucket account connected"
echo ""
echo "3. Environment Variables (set in Vercel dashboard):"
echo "   □ VITE_API_BASE_URL=https://your-domain.vercel.app"
echo ""
echo "4. Project Settings (verify in Vercel dashboard):"
echo "   □ Build Command: cd frontend && npm install && npm run build"
echo "   □ Output Directory: frontend/dist"
echo "   □ Install Command: (leave empty)"
echo ""
echo "5. Testing:"
echo "   □ Frontend builds locally: npm run build"
echo "   □ API routes are accessible"
echo "   □ CORS is properly configured"
echo ""

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo ""
echo "1. Initialize Git (if not already done):"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit for Vercel deployment'"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy on Vercel:"
echo "   Visit https://vercel.com/new"
echo "   Select your repository"
echo "   Click Deploy"
echo ""
echo "4. Configure environment variables in Vercel dashboard"
echo ""
echo "5. Your app will be live at: https://your-project-name.vercel.app"
echo ""

echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
echo ""
echo "For detailed instructions, see VERCEL_DEPLOYMENT.md"
