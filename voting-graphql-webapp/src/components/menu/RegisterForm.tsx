import React from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { UserPlus, Mail, RotateCw } from 'lucide-react';
import { FormInput } from '../ui/FormInput';

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { 
    formState, 
    setFormState, 
    step, 
    error, 
    handleSubmit,
    handleResendCode
  } = useRegisterForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        {step === 'form' ? 'Create an account' : 'Verify your email'}
      </h2>
      
      {error && (
        <div className="p-2 text-sm text-red-600 bg-red-50 rounded">
          {error}
        </div>
      )}

      {step === 'form' ? (
        <>
          <FormInput
            id="register-email"
            type="email"
            label="Email"
            value={formState.email}
            onChange={(email) => setFormState(prev => ({ ...prev, email }))}
            required
          />
          <FormInput
            id="register-password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={(password) => setFormState(prev => ({ ...prev, password }))}
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            We've sent a confirmation code to {formState.email}. Please enter it below to verify your email address.
          </p>
          <FormInput
            id="confirmation-code"
            type="text"
            label="Confirmation Code"
            value={formState.confirmationCode || ''}
            onChange={(code) => setFormState(prev => ({ ...prev, confirmationCode: code }))}
            required
          />
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Verify Email
            </button>
            <button
              type="button"
              onClick={handleResendCode}
              className="w-full flex items-center justify-center px-4 py-2 text-blue-500 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Resend Code
            </button>
          </div>
        </>
      )}
    </form>
  );
};