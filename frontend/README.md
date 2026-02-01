# EU AI Act Compliance Checker - Frontend

Modern, research-grade React frontend for the EU AI Act Compliance Checker. This frontend provides an intuitive user interface for assessing AI systems' compliance with EU AI Act regulations.

## 🎯 Features

- **Intuitive Assessment Workflow**: Multi-step form guiding users through AI system description
- **Real-time Risk Classification**: Instant visual feedback on compliance status
- **Explainability Focus**: Clear explanations for each compliance decision
- **PDF Report Generation**: Download professional compliance reports
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Modern UI**: Clean, professional design following EU regulatory style guidelines
- **Error Handling**: Graceful handling of API errors with user-friendly messages

## 📋 Folder Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.tsx          # Welcome page with feature overview
│   │   ├── InputForm.tsx        # AI system description form
│   │   ├── ResultsDashboard.tsx # Compliance results display
│   │   └── ReportPage.tsx       # PDF report preview and download
│   ├── services/
│   │   └── api.ts              # Backend API client layer
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind CSS imports
├── public/                      # Static assets
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── .env.example                # Environment variable template
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- The backend running (see backend README for setup)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

4. Configure the backend API URL (if different from default):
```bash
# Edit .env.local
VITE_API_BASE_URL=http://localhost:8000
```

### Development Server

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000` with hot module reloading.

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables

The frontend uses the following environment variables:

- `VITE_API_BASE_URL` (default: `http://localhost:8000`)
  - Base URL for the backend API
  - Set to your backend's URL when deploying

### For Different Environments

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:8000
```

**Staging:**
```
VITE_API_BASE_URL=https://api-staging.example.com
```

**Production:**
```
VITE_API_BASE_URL=https://api.example.com
```

## 🏗️ Architecture

### Component Hierarchy

```
App (State Management)
├── Landing (Onboarding)
├── InputForm (Data Collection)
├── ResultsDashboard (Results Display)
└── ReportPage (Report Management)
```

### API Integration

The `src/services/api.ts` provides a clean abstraction layer over the backend:

```typescript
// Check compliance
const response = await complianceAPI.checkCompliance({
  description: "Your AI system description"
});

// Download report
const blob = await complianceAPI.downloadReport(reportId);
```

### Data Flow

1. User enters AI system description on InputForm
2. Frontend sends POST request to `/check` endpoint
3. Backend analyzes and returns ComplianceResult
4. Results display on ResultsDashboard with expandable sections
5. User can view/download PDF report from ReportPage

## 🎨 Design System

### Color Palette

- **Primary**: EU Blue (`#003399`)
- **Light Blue**: (`#E7F0FF`)
- **Risk Colors**:
  - Minimal Risk: Green (`#10B981`)
  - Limited Risk: Amber (`#F59E0B`)
  - High Risk: Red (`#EF4444`)
  - Prohibited: Dark Red (`#7C2D12`)

### Typography

- Font: Inter (imported from Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Components

All UI components use Tailwind CSS utility classes for consistent styling and responsive design.

## 🔌 API Endpoints

The frontend communicates with the following backend endpoints:

### POST `/check`

Submit an AI system for compliance assessment.

**Request:**
```json
{
  "description": "Your AI system description"
}
```

**Response:**
```json
{
  "report_id": "uuid",
  "analysis": {
    "risk_category": "high-risk",
    "risk_score": 65,
    "risk_factors": ["Employment decision-making", "Automated decision-making"],
    "articles": ["Article 6", "Article 14"],
    "recommendations": ["Ensure human oversight", "..."],
    "explanation": "..."
  },
  "download_url": "/download/uuid"
}
```

### GET `/download/{report_id}`

Download the PDF compliance report.

**Response:** PDF file

## 📱 Responsive Design

The frontend is optimized for:
- **Desktop** (1920px+): Full-width layouts, side-by-side cards
- **Tablet** (768px - 1024px): Adaptive grid layouts
- **Mobile** (320px - 767px): Stacked layouts, touch-friendly buttons

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios

## 🧪 Testing

Run linting:
```bash
npm run lint
```

## 🚢 Deployment

### Static Hosting (Vercel, Netlify, etc.)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to your hosting provider

3. Set environment variables on your hosting platform:
```
VITE_API_BASE_URL=https://your-backend-api.com
```

### Docker (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t eu-ai-compliance-frontend .
docker run -p 3000:3000 -e VITE_API_BASE_URL=http://backend:8000 eu-ai-compliance-frontend
```

## 🔐 Important Notes

- The frontend is completely separated from the backend
- No backend code modifications are required
- All API communication uses the configurable base URL
- Error responses are gracefully handled with user-friendly messages
- No sensitive data is stored on the client side

## 🐛 Troubleshooting

### API Connection Issues

If you see "Failed to check compliance":

1. Verify the backend is running:
```bash
curl http://localhost:8000/docs
```

2. Check the API base URL in `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8000
```

3. Ensure CORS is properly configured on the backend

### Port Already in Use

If port 3000 is already taken:
```bash
npm run dev -- --port 3001
```

## 📚 Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Lucide React**: Icon library

## 📄 License

MIT License - See LICENSE file in root directory

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows the existing style
- Components are TypeScript
- All new features have corresponding tests
- Accessibility guidelines are followed

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the backend README for API documentation
3. Open an issue on the repository

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready
