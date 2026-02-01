import React from 'react';
import { CheckCircle, Zap, BarChart3 } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 fade-in">
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-eu-blue rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-eu-blue mb-4">
          EU AI Act Compliance Checker
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Assess your AI system's compliance with the European Union's AI Regulation in seconds. Get instant risk classification, regulatory requirements, and actionable recommendations.
        </p>

        <button
          onClick={onStart}
          className="btn-primary text-lg mb-8"
        >
          Start Compliance Assessment
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mb-12">
        <div className="section-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-eu-light-blue rounded-lg mb-4">
            <Zap className="w-6 h-6 text-eu-blue" />
          </div>
          <h3 className="text-lg font-semibold text-eu-blue mb-2">
            Instant Analysis
          </h3>
          <p className="text-gray-600">
            Get immediate risk classification and regulatory assessment based on your AI system details.
          </p>
        </div>

        <div className="section-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-eu-light-blue rounded-lg mb-4">
            <BarChart3 className="w-6 h-6 text-eu-blue" />
          </div>
          <h3 className="text-lg font-semibold text-eu-blue mb-2">
            Detailed Insights
          </h3>
          <p className="text-gray-600">
            Understand risk factors, applicable articles, and specific compliance requirements.
          </p>
        </div>

        <div className="section-card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-eu-light-blue rounded-lg mb-4">
            <CheckCircle className="w-6 h-6 text-eu-blue" />
          </div>
          <h3 className="text-lg font-semibold text-eu-blue mb-2">
            PDF Reports
          </h3>
          <p className="text-gray-600">
            Download professional compliance reports for documentation and audit trails.
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="section-card max-w-2xl text-center bg-eu-light-blue border-eu-blue border-2">
        <h3 className="text-xl font-semibold text-eu-blue mb-3">About This Tool</h3>
        <p className="text-gray-700">
          This compliance checker evaluates AI systems against the EU AI Act's risk categories: 
          <span className="font-semibold"> Minimal, Limited, High, and Prohibited</span>. 
          It provides transparent explanations of risk classifications to help organizations understand their regulatory obligations.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12">
        <p>EU AI Act Compliance Checker v1.0.0</p>
      </div>
    </div>
  );
}
