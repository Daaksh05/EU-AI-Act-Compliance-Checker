import './index.css';
import { useState } from 'react';
import { Landing } from './pages/Landing';
import { InputForm } from './pages/InputForm';
import { ResultsDashboard } from './pages/ResultsDashboard';
import { ReportPage } from './pages/ReportPage';
import { AuthPage } from './pages/AuthPage';
import { HistoryPage } from './pages/HistoryPage';
import { ComplianceResult, ReportRecord } from './services/api';
import { useAuth } from './context/AuthContext';
import { User, History, LogOut, ShieldCheck } from 'lucide-react';

export type PageType = 'landing' | 'input' | 'results' | 'report' | 'auth' | 'history';

export interface AppState {
  currentPage: PageType;
  systemDescription: string;
  complianceResult: ComplianceResult | null;
  reportId: string | null;
  error: string | null;
  loading: boolean;
  prefilledDescription?: string;
  authMode: 'login' | 'register';
}

function App() {
  const { user, isAuthenticated, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'landing',
    systemDescription: '',
    complianceResult: null,
    reportId: null,
    error: null,
    loading: false,
    authMode: 'login',
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

  const viewHistoryReport = (report: ReportRecord) => {
    setAppState(prev => ({
      ...prev,
      systemDescription: report.description,
      complianceResult: report.analysis_result,
      reportId: report.id,
      currentPage: 'results',
    }));
  };

  const resetWorkflow = () => {
    setAppState({
      currentPage: 'landing',
      systemDescription: '',
      complianceResult: null,
      reportId: null,
      error: null,
      loading: false,
      authMode: 'login',
    });
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAppState(prev => ({ ...prev, currentPage: 'auth', authMode: mode }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eu-light-blue to-white">
      {/* Global Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={resetWorkflow}
            >
              <ShieldCheck className="w-8 h-8 text-eu-blue" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">EU AI Regula</span>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigateTo('history')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <History className="w-4 h-4" />
                    <span className="text-sm font-medium">History</span>
                  </button>
                  <div className="h-6 w-px bg-gray-200 mx-2" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-eu-blue/10 rounded-full flex items-center justify-center text-eu-blue">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                      {user}
                    </span>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-400 hover:text-red-500 transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="px-4 py-2 text-gray-600 hover:text-eu-blue font-medium transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuth('register')}
                    className="px-5 py-2 bg-eu-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-20">
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
        {appState.currentPage === 'auth' && (
          <AuthPage
            mode={appState.authMode}
            onSuccess={() => navigateTo('landing')}
            onSwitchMode={() => setAppState(prev => ({ ...prev, authMode: prev.authMode === 'login' ? 'register' : 'login' }))}
            onCancel={() => navigateTo('landing')}
          />
        )}
        {appState.currentPage === 'history' && (
          <HistoryPage
            onViewReport={viewHistoryReport}
            onBack={() => navigateTo('landing')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
