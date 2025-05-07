import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Vote } from 'lucide-react';
import { LoginMenu } from './menu/LoginMenu';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm mb-8">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Vote className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-900">Feature Voting</h1>
        </div>
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <LoginMenu />
        )}
      </div>
    </header>
  );
};