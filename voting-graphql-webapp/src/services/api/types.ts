// API Service Types
export interface ApiService {
  // Feature Operations
  createFeature: (text: string, userId: string) => Promise<Feature>;
  getFeatures: () => Promise<Feature[]>;
  voteForFeature: (featureId: string, currentVotes: number) => Promise<void>;
  notifyMe: (featureId: string, text: string, currentVotes: number) => Promise<void>;

  // Auth Operations
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (email: string, password: string) => Promise<void>;
  confirmEmail: (email: string, code: string) => Promise<Boolean>;
  resendConfirmationCode: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface VerificationData {
  email: string;
  code: string;
}

// GraphQL Types
export interface Feature {
  id: string;
  text: string;
  createdAt: string;
  endTime: string;
  status: 'OPEN' | 'CLOSED';
  voteCount: number;
  userId: string;
}

export interface Vote {
  id: string;
  featureId: string;
  userId: string;
  createdAt: string;
}