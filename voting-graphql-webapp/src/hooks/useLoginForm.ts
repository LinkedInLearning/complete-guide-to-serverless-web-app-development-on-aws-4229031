import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useLoginForm = (onSuccess?: () => void) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setEmail('');
      setPassword('');
      onSuccess?.();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit
  };
};