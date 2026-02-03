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

export interface ReportRecord {
  id: string;
  user_id: number;
  description: string;
  analysis_result: ComplianceResult;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

class ComplianceAPI {
  private client: AxiosInstance;

  constructor() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || '';

    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include token in requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post('/api/register', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.detail || error.message);
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post('/api/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.detail || error.message);
      }
      throw error;
    }
  }

  async checkCompliance(input: AISystemInput): Promise<CheckResponse> {
    try {
      const response = await this.client.post('/api/check', input);
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

  async getReports(): Promise<ReportRecord[]> {
    try {
      const response = await this.client.get('/api/reports');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Failed to fetch reports');
      }
      throw error;
    }
  }

  async downloadReport(reportId: string): Promise<Blob> {
    try {
      const response = await this.client.get(`/api/download/${reportId}`, {
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
    const baseURL = import.meta.env.VITE_API_BASE_URL || '';
    return `${baseURL}/api/download/${reportId}`;
  }
}

export default new ComplianceAPI();
