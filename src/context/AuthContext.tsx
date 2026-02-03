import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: string | null; // Just storing email as identifier for now
    isAuthenticated: boolean;
    login: (token: string, email: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const email = localStorage.getItem('user_email');
        if (token && email) {
            setUser(email);
        }
        setLoading(false);
    }, []);

    const login = (token: string, email: string) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_email', email);
        setUser(email);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
