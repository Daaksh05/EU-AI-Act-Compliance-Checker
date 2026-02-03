import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Mail, Lock, Loader2, UserPlus, LogIn } from 'lucide-react';

interface AuthPageProps {
    mode: 'login' | 'register';
    onSuccess: () => void;
    onSwitchMode: () => void;
    onCancel: () => void;
}

export const AuthPage = ({ mode, onSuccess, onSwitchMode, onCancel }: AuthPageProps) => {
    const { login: setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                const response = await api.login(email, password);
                setAuth(response.access_token, email);
            } else {
                const response = await api.register(email, password);
                setAuth(response.access_token, email);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-eu-blue mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500">
                    {mode === 'login'
                        ? 'Sign in to save and access your compliance reports'
                        : 'Join to start tracking your AI Act compliance journey'}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center">
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eu-blue focus:border-transparent outline-none transition-all"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-eu-blue focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-eu-blue text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
            </form>

            <div className="mt-8 text-center space-y-4">
                <button
                    onClick={onSwitchMode}
                    className="text-sm text-eu-blue hover:underline font-medium"
                >
                    {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
                <div className="block pt-2">
                    <button
                        onClick={onCancel}
                        className="text-sm text-gray-400 hover:text-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
