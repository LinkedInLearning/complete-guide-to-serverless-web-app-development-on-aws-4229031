
import awsconfig from './aws-config'
Amplify.configure(awsconfig);

import { Amplify } from 'aws-amplify';
import { signIn, signUp, signOut, confirmSignUp, fetchAuthSession, getCurrentUser, resendSignUpCode } from 'aws-amplify/auth';

export const auth = {  
    async loginUser(email: string, password: string) {
    
        try {
            await signIn({ username: email, password });
            
            const session = await fetchAuthSession();    
            const user = await getCurrentUser();
                        
            return {
              user: {
                id: user.userId,
                email: email,
                isEmailVerified: true,
              },
              token: session.tokens?.idToken?.toString() || '',
            };
          } catch (error: any) {
            if (error.name === 'UserNotConfirmedException') {
              throw new Error('Please verify your email first');
            }
            throw new Error(error.message || 'Login failed');
          }
    },

    async registerUser(email: string, password: string) {
        console.log('register new user')
        try {
          await signUp({
            username: email,
            password: password,
            options: {
              userAttributes: {
                email: email,
              },
            },
          });
          
          return { success: true };
        } catch (error: any) {
          if (error.name === 'UsernameExistsException') {
            throw new Error('Email already registered');
          }
          throw new Error(error.message || 'Registration failed');
        }
    },

    async logout() {
        try {
            await signOut();
        } catch (error: any) {
            throw new Error(error.message || 'Logout failed');
        }
    },

    async verifyEmail(email: string, code: string) {
        console.log('send verify email')
        try {
          await confirmSignUp({
            username: email,
            confirmationCode: code,
          });
            return true
        } catch (error: any) {
          if (error.name === 'CodeMismatchException') {
            throw new Error('Invalid verification code');
          }
          throw new Error(error.message || 'Verification failed');
        }
    },

    async resendVerificationCode(email: string) {
        try {
            await resendSignUpCode({ username: email });
           return
          } catch (error: any) {
            throw new Error(error.message || 'Failed to resend verification code');
          }
    },

    async getCurrentUser() {
      try {
        const user = await getCurrentUser();
        return user;
      } catch (error: any) {
        throw new Error(error.message || 'Failed to get current user');
      }
    }
};