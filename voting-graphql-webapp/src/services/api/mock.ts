import { ApiService, Feature, LoginResponse } from './types';
import { auth } from './auth';


const mockUsers = new Map<string, { email: string; password: string; isEmailVerified: boolean }>([
  ['user-1', { email: 'john@example.com', password: 'password123', isEmailVerified: true }],
  ['user-2', { email: 'jane@example.com', password: 'password123', isEmailVerified: true }],
  ['user-3', { email: 'bob@example.com', password: 'password123', isEmailVerified: true }]
]);

const mockFeatures: Feature[] = [
  {
    id: 'feature-1',
    text: 'Add REST endpoint for integrations',
    createdAt: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    status: 'OPEN',
    voteCount: 5,
    userId: 'user-1'
  },
  {
    id: 'feature-2',
    text: 'Dark mode support',
    createdAt: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    status: 'OPEN',
    voteCount: 3,
    userId: 'user-2'
  }
];

const pendingRegistrations = new Map<string, { password: string; confirmationCode: string }>();

export class MockApiService implements ApiService {

  private isAuthMock: boolean;

  constructor(isAuthMock: boolean) {
    this.isAuthMock = isAuthMock;
  }

  async createFeature(text: string, userId: string): Promise<Feature> {
    console.log('createfeature ', text, userId)
    const newFeature: Feature = {
      id: 'feature-' + Math.random().toString(36).substr(2, 9),
      text,
      createdAt: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      status: 'OPEN',
      voteCount: 0,
      userId
    };
    mockFeatures.push(newFeature);
    return newFeature;
  }

  async getFeatures(): Promise<Feature[]> {
    return mockFeatures;
  }

  async voteForFeature(featureId: string, currentVotes: number): Promise<void> {
    const feature = mockFeatures.find(f => f.id === featureId);
    if (feature && feature.status === 'OPEN') {
      feature.voteCount += 1;
    }
  }

  async notifyMe (featureId: string, text: string, currentVotes: number): Promise<void> {
    // In the backend sends an email to the user about this feature
    return Promise.resolve();
  }

  async login(email: string, password: string) : Promise<LoginResponse> {
    if (!this.isAuthMock)  {  
      return auth.loginUser(email, password);
    } else {
      const userEntry = Array.from(mockUsers.entries()).find(([, u]) => u.email === email);
      if (!userEntry || userEntry[1].password !== password) {
        throw new Error('Invalid credentials');
      }
      const user = {
        id: userEntry[1].email,
        email: userEntry[1].email,
        isEmailVerified: userEntry[1].isEmailVerified
      }
      return {
        user: user,
        token: `mock-token-${userEntry[1].email}`
      };
    }
  }

  async logout() : Promise<void> {
    if (!this.isAuthMock) {
      return auth.logout();
    }
  }

  async register(email: string, password: string): Promise<void> {
    if (!this.isAuthMock) {
      auth.registerUser(email, password);
    } else {

      if (Array.from(mockUsers.values()).some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      pendingRegistrations.set(email, { password, confirmationCode });
      console.log(`Confirmation code for ${email}: ${confirmationCode}`);
    }
  }

  async confirmEmail(email: string, code: string) : Promise<Boolean>{
    if (!this.isAuthMock) {
      return auth.verifyEmail(email, code);
    } else {
      const registration = pendingRegistrations.get(email);
      if (!registration || registration.confirmationCode !== code) {
        throw new Error('Invalid confirmation code');
      }
      const userId = 'user-' + Math.random().toString(36).substr(2, 9);
      mockUsers.set(userId, {
        email,
        password: registration.password,
        isEmailVerified: true
      });
      pendingRegistrations.delete(email);
     return true;
    }
  }

  async resendConfirmationCode(email: string) :Promise<void> {
    if (!this.isAuthMock) {
      return auth.resendVerificationCode(email)
    } else {
      const registration = pendingRegistrations.get(email);
      if (!registration) {
        throw new Error('No pending registration found');
      }
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      pendingRegistrations.set(email, { ...registration, confirmationCode: newCode });
      console.log(`New confirmation code for ${email}: ${newCode}`);
      return;
    }
  
  }
}