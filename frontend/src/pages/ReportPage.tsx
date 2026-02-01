import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Loader, AlertCircle } from 'lucide-react';
import complianceAPI from '../services/api';
import { ComplianceResult } from '../services/api';

interface ReportPageProps {
  reportId: string;
  result: ComplianceResult | null;
  onBack: () => void;
  onReset: () => void;
}

export function ReportPage({ reportId, result, onBack, onReset }: ReportPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportUrl = complianceAPI.getReportUrl(reportId);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const blob = await complianceAPI.downloadReport(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EU-AI-Compliance-Report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-eu-blue">PDF Compliance Report</h1>
            <p className="text-gray-600 text-sm mt-1">Professional documentation of your compliance assessment</p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="section-card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Preview</h2>
          
          {/* PDF Preview Container */}
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 mb-6 text-center min-h-96 flex items-center justify-center">
            <div>
              <p className="text-gray-600 mb-4">
                Your compliance report is ready for download. The PDF includes:
              </p>
              <ul className="text-left text-gray-700 space-y-2 mb-6 inline-block">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-eu-blue rounded-full" />
                  Your AI system description
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-eu-blue rounded-full" />
                  Risk category and score
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-eu-blue rounded-full" />
                  Identified risk factors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-eu-blue rounded-full" />
                  Applicable EU AI Act articles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-eu-blue rounded-full" />
                  Compliance recommendations
                </li>
              </ul>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Download Button */}
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </>
              )}
            </button>
            <a
              href={reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Open in Browser
            </a>
          </div>
        </div>

        {/* Report Details */}
        {result && (
          <div className="space-y-4">
            <div className="section-card">
              <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Risk Category</p>
                  <p className="font-semibold text-gray-900">{result.risk_category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Risk Score</p>
                  <p className="font-semibold text-gray-900">{result.risk_score}/100</p>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h3 className="font-semibold text-gray-900 mb-3">Key Findings</h3>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Risk Factors</p>
                <ul className="space-y-1">
                  {result.risk_factors.map((factor, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-eu-blue rounded-full" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <button onClick={onBack} className="btn-secondary">
            Back to Results
          </button>
          <button onClick={onReset} className="btn-secondary">
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
