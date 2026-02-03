import { useState, useEffect } from 'react';
import api, { ReportRecord } from '../services/api';
import { History, Search, ArrowRight, Download, FileText, Loader2, Calendar } from 'lucide-react';

interface HistoryPageProps {
    onViewReport: (report: ReportRecord) => void;
    onBack: () => void;
}

export const HistoryPage = ({ onViewReport, onBack }: HistoryPageProps) => {
    const [reports, setReports] = useState<ReportRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await api.getReports();
                setReports(data);
            } catch (err) {
                console.error('Failed to fetch reports', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const filteredReports = reports.filter(r =>
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <History className="w-8 h-8 text-eu-blue" />
                        Compliance History
                    </h1>
                    <p className="text-gray-500 mt-2">Access and manage your previous AI Act compliance assessments</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-gray-600 hover:bg-white rounded-xl border border-gray-200 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by description or report ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-eu-blue focus:border-transparent outline-none transition-all"
                />
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-eu-blue animate-spin mb-4" />
                    <p className="text-gray-500">Loading your reports...</p>
                </div>
            ) : filteredReports.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${report.analysis_result.risk_category === 'high-risk' ? 'bg-red-100 text-red-700' :
                                                report.analysis_result.risk_category === 'limited-risk' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {report.analysis_result.risk_category}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(report.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-2">
                                        {report.description}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                        Score: {report.analysis_result.risk_score} | {report.analysis_result.risk_factors.length} risk factors detected
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onViewReport(report)}
                                        className="p-3 bg-eu-blue/10 text-eu-blue rounded-xl hover:bg-eu-blue hover:text-white transition-all"
                                        title="View Online"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                    <a
                                        href={api.getReportUrl(report.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                                        title="Download PDF"
                                    >
                                        <Download className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
                    <p className="text-gray-500">
                        {searchTerm ? 'Try a different search term' : "You haven't run any compliance checks yet"}
                    </p>
                </div>
            )}
        </div>
    );
};
