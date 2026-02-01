import axios, { AxiosInstance } from 'axios';

export interface AISystemInput {
  description: string;
}

export interface ComplianceResult {
  risk_category: 'minimal-risk' | 'limited-risk' | 'high-risk' | 'prohibited';
  risk_score: number;
  risk_factors: string[];
  articles: string[];
  recommendations: string[];
  explanation: string;
}

export interface CheckResponse {
  report_id: string;
  analysis: ComplianceResult;
  download_url: string;
}

class ComplianceAPI {
  private client: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async checkCompliance(input: AISystemInput): Promise<CheckResponse> {
    try {
      const response = await this.client.post('/check', input);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 
          error.message || 
          'Failed to check compliance'
        );
      }
      throw error;
    }
  }

  async downloadReport(reportId: string): Promise<Blob> {
    try {
      const response = await this.client.get(`/download/${reportId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 
          'Failed to download report'
        );
      }
      throw error;
    }
  }

  getReportUrl(reportId: string): string {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    return `${baseURL}/download/${reportId}`;
  }
}

export default new ComplianceAPI();
