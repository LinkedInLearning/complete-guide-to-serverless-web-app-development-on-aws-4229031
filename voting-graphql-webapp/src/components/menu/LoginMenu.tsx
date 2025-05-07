import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const LoginMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {mode === 'login' ? (
          <LogIn className="w-4 h-4 mr-2" />
        ) : (
          <UserPlus className="w-4 h-4 mr-2" />
        )}
        {mode === 'login' ? 'Sign In' : 'Sign Up'}
      </Menu.Button>

      <Menu.Items
        className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        static
      >
        <div className="p-4">
          {mode === 'login' ? (
            <>
              <LoginForm onSuccess={() => setIsOpen(false)} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setMode('register')}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </>
          ) : (
            <>
              <RegisterForm onSuccess={() => setIsOpen(false)} />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setMode('login')}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};