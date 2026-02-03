export interface CaseStudy {
    id: string;
    title: string;
    company: string;
    description: string;
    longDescription: string;
    riskCategory: 'high-risk' | 'limited-risk' | 'minimal-risk' | 'prohibited';
    score: number;
    imageUrl: string;
    systemDescription: string; // The text to pre-fill the compliance engine
}

export const caseStudies: CaseStudy[] = [
    {
        id: 'mcdonalds-recruitment',
        title: 'AI Recruitment & Screening',
        company: 'McDonald\'s (McHire)',
        description: 'AI-powered hiring assistant (Olivia) that automates screening and scheduling for millions of candidates.',
        longDescription: 'McDonald\'s utilizes "McHire," an AI-driven recruitment platform powered by Paradox.ai. The system uses an AI assistant named Olivia to communicate with candidates via text, screen resumes, and schedule interviews automatically.',
        riskCategory: 'high-risk',
        score: 85,
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
        systemDescription: 'An automated AI recruiting assistant (Olivia) used by McDonald\'s to screen candidates, process personal data from resumes, and make initial hiring decisions for restaurant staff roles across thousands of locations.'
    }
];
