import './index.css';
import { useState } from 'react';
import { Landing } from './pages/Landing';
import { InputForm } from './pages/InputForm';
import { ResultsDashboard } from './pages/ResultsDashboard';
import { ReportPage } from './pages/ReportPage';
import { ComplianceResult } from './services/api';

export type PageType = 'landing' | 'input' | 'results' | 'report';

export interface AppState {
  currentPage: PageType;
  systemDescription: string;
  complianceResult: ComplianceResult | null;
  reportId: string | null;
  error: string | null;
  loading: boolean;
  prefilledDescription?: string;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'landing',
    systemDescription: '',
    complianceResult: null,
    reportId: null,
    error: null,
    loading: false,
  });

  const navigateTo = (page: PageType) => {
    setAppState(prev => ({ ...prev, currentPage: page, error: null }));
  };

  const startCompliance = (prefill?: string) => {
    setAppState(prev => ({ ...prev, currentPage: 'input', prefilledDescription: prefill }));
  };

  const submitCompliance = (description: string, result: ComplianceResult, reportId: string) => {
    setAppState(prev => ({
      ...prev,
      systemDescription: description,
      complianceResult: result,
      reportId,
      currentPage: 'results',
      loading: false,
    }));
  };

  const viewReport = () => {
    navigateTo('report');
  };

  const resetWorkflow = () => {
    setAppState({
      currentPage: 'landing',
      systemDescription: '',
      complianceResult: null,
      reportId: null,
      error: null,
      loading: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eu-light-blue to-white">
      {appState.currentPage === 'landing' && (
        <Landing onStart={() => startCompliance()} onSelectCaseStudy={(desc) => startCompliance(desc)} />
      )}
      {appState.currentPage === 'input' && (
        <InputForm
          initialDescription={appState.prefilledDescription}
          onSuccess={submitCompliance}
          onBack={() => navigateTo('landing')}
          onLoading={(loading) => setAppState(prev => ({ ...prev, loading }))}
          onError={(error) => setAppState(prev => ({ ...prev, error }))}
        />
      )}
      {appState.currentPage === 'results' && appState.complianceResult && (
        <ResultsDashboard
          description={appState.systemDescription}
          result={appState.complianceResult}
          reportId={appState.reportId}
          onViewReport={viewReport}
          onReset={resetWorkflow}
        />
      )}
      {appState.currentPage === 'report' && appState.reportId && (
        <ReportPage
          reportId={appState.reportId}
          result={appState.complianceResult}
          onBack={() => navigateTo('results')}
          onReset={resetWorkflow}
        />
      )}
    </div>
  );
}

export default App;
