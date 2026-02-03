import { CheckCircle, Zap, BarChart3 } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

interface LandingProps {
  onStart: () => void;
  onSelectCaseStudy: (description: string) => void;
}

export function Landing({ onStart, onSelectCaseStudy }: LandingProps) {
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
      <div className="section-card max-w-2xl text-center bg-eu-light-blue border-eu-blue border-2 mb-16">
        <h3 className="text-xl font-semibold text-eu-blue mb-3">About This Tool</h3>
        <p className="text-gray-700">
          This compliance checker evaluates AI systems against the EU AI Act's risk categories:
          <span className="font-semibold"> Minimal, Limited, High, and Prohibited</span>.
          It provides transparent explanations of risk classifications to help organizations understand their regulatory obligations.
        </p>
      </div>

      {/* Case Studies Section */}
      <div className="w-full max-w-6xl mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-eu-blue mb-4">Case Studies & Demo</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how the EU AI Act applies to real-world AI systems from major companies.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:border-eu-blue transition-all duration-300 group">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img
                  src={study.imageUrl}
                  alt={study.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="bg-eu-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {study.company}
                  </span>
                </div>
              </div>

              <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{study.title}</h3>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {study.riskCategory}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {study.longDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onSelectCaseStudy(study.systemDescription)}
                    className="flex-1 bg-eu-blue text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Try {study.company.split(' ')[0]} Demo
                  </button>
                  <div className="flex-none bg-gray-50 border border-gray-100 py-3 px-6 rounded-xl">
                    <span className="text-sm text-gray-500 block uppercase tracking-tighter font-bold">Risk Score</span>
                    <span className="text-xl font-bold text-eu-blue">{study.score}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12">
        <p>EU AI Act Compliance Checker v1.0.0</p>
      </div>
    </div>
  );
}
