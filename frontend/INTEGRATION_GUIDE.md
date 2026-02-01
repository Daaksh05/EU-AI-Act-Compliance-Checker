# EU AI Act Compliance Checker - Frontend Integration Guide

## Overview

This guide explains how to integrate and manage the frontend independently of the backend.

## ✅ Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Backend running on `localhost:8000` (or configured URL)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured
- [ ] Development server started (`npm run dev`)

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Configure Backend URL

Edit `.env.local`:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🏗️ Project Structure Explanation

### `/src/pages/`
- **Landing.tsx**: Initial landing page with feature overview
- **InputForm.tsx**: Multi-step form for AI system input
- **ResultsDashboard.tsx**: Results visualization with expandable sections
- **ReportPage.tsx**: PDF report preview and download interface

### `/src/services/`
- **api.ts**: Complete API client handling all backend communication

### `/src/components/`
- **Common.tsx**: Reusable UI components (badges, alerts, spinners)

## 🔄 Workflow

1. **Landing Page**
   - User sees project overview
   - Clicks "Check AI Compliance"

2. **Input Form**
   - User describes their AI system
   - Validation ensures minimum 20 characters
   - Form shows helpful tips

3. **Results Dashboard**
   - Risk category prominently displayed
   - Risk score progress bar
   - Three expandable sections:
     - Why this risk level was assigned
     - Applicable EU AI Act articles
     - Recommended actions
   - Option to view PDF report

4. **Report Page**
   - PDF preview
   - Download button
   - Report details summary

## 🎯 Key Features

### Explainability Focus

Each compliance decision includes:
- **Clear Explanation**: Why the risk level was assigned
- **Risk Factors**: Specific detected risk indicators
- **Applicable Articles**: Relevant EU AI Act articles
- **Recommendations**: Actionable next steps

### Error Handling

- Network errors handled gracefully
- User-friendly error messages
- Retry options available
- Loading states clearly indicated

### Responsive Design

- Mobile-first approach
- Touch-friendly buttons
- Optimized for all screen sizes
- Accessible color contrasts

## 🔧 Configuration Options

### API Base URL

The frontend can connect to different backend instances:

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:8000
```

**Remote Server:**
```
VITE_API_BASE_URL=https://api.example.com
```

**Docker Container:**
```
VITE_API_BASE_URL=http://compliance-backend:8000
```

## 📦 Building for Production

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output: `dist/` directory ready for deployment

### Preview Production Build

```bash
npm run preview
```

## 🚢 Deployment Examples

### Vercel

1. Connect your repository to Vercel
2. Set environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-api.com
   ```
3. Deploy automatically on push

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable in Netlify UI
5. Deploy

### Self-Hosted

1. Build locally: `npm run build`
2. Copy `dist/` contents to web server
3. Configure web server to serve `index.html` for SPA routing
4. Set backend URL in environment variables

## 🧩 Integration with Backend

### API Contract

The frontend expects these backend endpoints:

**POST /check**
- Input: `{ description: string }`
- Output: `{ report_id, analysis, download_url }`

**GET /download/{report_id}**
- Output: PDF file

### CORS Requirements

Ensure backend CORS is configured to accept requests from frontend domain:

```python
# Backend app.py example
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔐 Security Considerations

- No sensitive data stored in browser
- API calls use secure HTTPS in production
- Environment variables not exposed to client
- XSS protection via React escaping
- CSRF handled by backend

## 🧪 Development Workflow

### Code Style

- TypeScript for type safety
- React functional components with hooks
- Tailwind CSS for styling
- Consistent naming conventions

### Adding New Features

1. Create component in `/src/components/`
2. Import in appropriate page
3. Update state management in `App.tsx` if needed
4. Test with dev server

### Debugging

Enable React DevTools browser extension for easier debugging.

## 📊 Performance

- Vite provides instant HMR (Hot Module Replacement)
- Lazy loading for routes via code splitting
- Optimized bundle size (~150KB gzipped)
- No unnecessary re-renders with React.memo

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to API"
**Solution**: Check `VITE_API_BASE_URL` in `.env.local` and verify backend is running

### Issue: "Port 3000 already in use"
**Solution**: `npm run dev -- --port 3001`

### Issue: "CORS error in browser console"
**Solution**: Configure CORS on backend to accept frontend domain

### Issue: "PDF download not working"
**Solution**: Verify backend can access reports directory

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Support

For issues or questions:
1. Check this guide
2. Review inline code comments
3. Check backend documentation
4. Open an issue with detailed steps to reproduce

---

**Last Updated**: February 2026
