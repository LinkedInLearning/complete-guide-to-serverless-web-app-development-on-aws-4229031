import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../services/api/types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resendVerificationCode: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const initializeAuth = async () => {
      try {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
          const { user, token} = JSON.parse(savedAuth);
          setUser(user);
          setToken(token);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const saveAuth = (user: User | null, token: string | null) => {
    setUser(user);
    setToken(token);
    if (user && token) {
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem('auth');
    }
  };

  const register = async (email: string, password: string) => {
    await apiService.register(email, password);
  };

  const verifyEmail = async (email: string, code: string) => {
    const sucess = await apiService.confirmEmail(email, code);
    if (sucess) {
      return true;
    } else {
      return false;
    }
  };

  const resendVerificationCode = async (email: string) => {
    await apiService.resendConfirmationCode(email)
  };

  const login = async (email: string, password: string) => {
    const { user, token } = await apiService.login(email, password);
    saveAuth(user, token);
  };

  const logout = async () => {
     saveAuth(null, null);
    await apiService.logout();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        register, 
        verifyEmail,
        resendVerificationCode,
        logout, 
        isLoading,
        isAuthenticated: !!user && !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}