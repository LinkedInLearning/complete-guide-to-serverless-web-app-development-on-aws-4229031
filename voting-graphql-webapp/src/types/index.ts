export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
}

export interface Feature {
  id: string;
  text: string;
  createdAt: string;
  endTime: string;
  status: 'OPEN' | 'CLOSED';
  voteCount: number;
  userId: string;
}

export interface AuthFormState {
  email: string;
  password: string;
  confirmationCode?: string;
}

export type RegistrationStep = 'form' | 'confirmation';