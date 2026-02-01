import React, { useState } from 'react';
import { ArrowLeft, Send, AlertCircle, Loader } from 'lucide-react';
import complianceAPI, { ComplianceResult } from '../services/api';

interface InputFormProps {
  onSuccess: (description: string, result: ComplianceResult, reportId: string) => void;
  onBack: () => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string) => void;
}

export function InputForm({ onSuccess, onBack, onLoading, onError }: InputFormProps) {
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Please describe your AI system');
      return;
    }

    if (description.trim().length < 20) {
      setError('Please provide a more detailed description (at least 20 characters)');
      return;
    }

    setLoading(true);
    onLoading(true);
    setError(null);

    try {
      const response = await complianceAPI.checkCompliance({ description });
      onSuccess(description, response.analysis, response.report_id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze compliance. Please try again.';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 fade-in">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-eu-blue">Describe Your AI System</h1>
        </div>

        {/* Form Card */}
        <div className="section-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                AI System Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError(null);
                }}
                placeholder="Describe your AI system, its purpose, how it works, what data it uses, who it impacts, and any automated decision-making involved..."
                className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eu-blue focus:border-transparent resize-none"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                {description.length} / 2000 characters
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Tips for Better Assessment
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• <strong>Purpose:</strong> What problem does the AI solve?</li>
                <li>• <strong>Context:</strong> Where and how is it deployed?</li>
                <li>• <strong>Data:</strong> What types of personal or sensitive data does it use?</li>
                <li>• <strong>Decisions:</strong> Does it make automated decisions affecting people?</li>
                <li>• <strong>Users:</strong> Who are the end users or affected individuals?</li>
              </ul>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !description.trim()}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing Compliance...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Check Compliance
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 section-card bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">How We Assess Compliance</h3>
          <p className="text-sm text-gray-600">
            Our system analyzes your AI system description against EU AI Act requirements, identifying risk factors such as automated decision-making, personal data processing, and high-impact applications. Based on this analysis, we classify your system's risk level and provide tailored recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
