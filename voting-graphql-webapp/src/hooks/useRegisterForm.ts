import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthFormState, RegistrationStep } from '../types';

export const useRegisterForm = (onSuccess?: () => void) => {
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
    confirmationCode: ''
  });
  const [step, setStep] = useState<RegistrationStep>('form');
  const [error, setError] = useState<string | null>(null);
  const { register, verifyEmail, resendVerificationCode } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (step === 'form') {
        await register(formState.email, formState.password);
        setStep('confirmation');
      } else {
        await verifyEmail(formState.email, formState.confirmationCode || '');
        setFormState({ email: '', password: '', confirmationCode: '' });
        setStep('form');
        onSuccess?.();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const handleResendCode = async () => {
    try {
      await resendVerificationCode(formState.email);
      setError('A new confirmation code has been sent to your email');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend code');
    }
  };

  return {
    formState,
    setFormState,
    step,
    error,
    handleSubmit,
    handleResendCode
  };
};