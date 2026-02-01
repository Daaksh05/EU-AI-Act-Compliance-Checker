import React, { useState } from 'react';
import { ArrowLeft, Download, ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react';
import { ComplianceResult } from '../services/api';

interface ResultsDashboardProps {
  description: string;
  result: ComplianceResult;
  reportId: string | null;
  onViewReport: () => void;
  onReset: () => void;
}

const getRiskConfig = (risk: string) => {
  const configs: Record<string, { color: string; bgColor: string; icon: React.ReactNode; level: number }> = {
    'minimal-risk': {
      color: 'text-compliance-minimal',
      bgColor: 'bg-green-50 border-green-200',
      icon: '✓',
      level: 1,
    },
    'limited-risk': {
      color: 'text-compliance-limited',
      bgColor: 'bg-yellow-50 border-yellow-200',
      icon: '⚠',
      level: 2,
    },
    'high-risk': {
      color: 'text-compliance-high',
      bgColor: 'bg-red-50 border-red-200',
      icon: '!',
      level: 3,
    },
    'prohibited': {
      color: 'text-compliance-prohibited',
      bgColor: 'bg-red-100 border-red-400',
      icon: '✕',
      level: 4,
    },
  };
  return configs[risk] || configs['minimal-risk'];
};

const getRiskLabel = (risk: string): string => {
  return risk.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

interface ExpandableSection {
  title: string;
  content: string[] | string;
  icon: React.ReactNode;
}

export function ResultsDashboard({
  description,
  result,
  reportId,
  onViewReport,
  onReset,
}: ResultsDashboardProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('risk');
  const riskConfig = getRiskConfig(result.risk_category);

  const sections: Record<string, ExpandableSection> = {
    risk: {
      title: 'Why This Risk Level?',
      content: [
        result.explanation,
        `Risk Score: ${result.risk_score}/100`,
        'Key Factors:',
        ...result.risk_factors.map(f => `• ${f}`),
      ],
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    articles: {
      title: 'Applicable EU AI Act Articles',
      content: result.articles.length > 0 
        ? result.articles 
        : ['No specific articles triggered for this risk level'],
      icon: <Info className="w-5 h-5" />,
    },
    recommendations: {
      title: 'Recommended Actions',
      content: result.recommendations,
      icon: <Download className="w-5 h-5" />,
    },
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onReset}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back to start"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-eu-blue">Compliance Assessment Results</h1>
            <p className="text-gray-600 text-sm mt-1">Your AI system's regulatory classification and recommendations</p>
          </div>
        </div>

        {/* Risk Category Card */}
        <div className={`border-2 rounded-xl p-8 mb-8 ${riskConfig.bgColor}`}>
          <div className="flex items-start gap-4">
            <div className={`text-4xl font-bold ${riskConfig.color}`}>
              {riskConfig.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {getRiskLabel(result.risk_category)} Risk
              </h2>
              <p className="text-gray-700 mb-4">
                {result.explanation}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Risk Score</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        result.risk_score < 30
                          ? 'bg-compliance-minimal'
                          : result.risk_score < 60
                          ? 'bg-compliance-limited'
                          : 'bg-compliance-high'
                      }`}
                      style={{ width: `${Math.min(result.risk_score, 100)}%` }}
                    />
                  </div>
                  <p className="text-right text-sm font-semibold mt-1">{result.risk_score}/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Summary */}
        <div className="section-card mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">System Description</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-8">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="section-card">
              <button
                onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                className="w-full flex items-center justify-between hover:text-eu-blue transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-eu-blue">{section.icon}</span>
                  <h3 className="font-semibold text-gray-900 text-left">{section.title}</h3>
                </div>
                {expandedSection === key ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSection === key && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {Array.isArray(section.content) ? (
                    section.content.map((item, idx) => (
                      <p
                        key={idx}
                        className={`text-gray-700 ${
                          item.startsWith('•') ? 'ml-4' : item.includes(':') ? 'font-semibold' : ''
                        }`}
                      >
                        {item}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={onViewReport}
            className="btn-primary flex items-center justify-center gap-2"
            disabled={!reportId}
          >
            <Download className="w-5 h-5" />
            View & Download PDF Report
          </button>
          <button
            onClick={onReset}
            className="btn-secondary"
          >
            Check Another System
          </button>
        </div>

        {/* Info Box */}
        <div className="section-card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-eu-blue mb-2">Understanding Your Results</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><strong>Minimal Risk:</strong> Limited regulatory requirements. Recommended: voluntary compliance best practices.</li>
            <li><strong>Limited Risk:</strong> Transparency obligations. Must inform users about AI use and provide explanations.</li>
            <li><strong>High Risk:</strong> Significant obligations. Requires risk management, monitoring, human oversight, and documentation.</li>
            <li><strong>Prohibited:</strong> Cannot be deployed in the EU. Requires fundamental redesign.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
