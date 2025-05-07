import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import { LogIn } from 'lucide-react';
import { FormInput } from '../ui/FormInput';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { email, password, setEmail, setPassword, handleSubmit } = useLoginForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2>
      <FormInput
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={setEmail}
        required
      />
      <FormInput
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        required
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </button>
    </form>
  );
};