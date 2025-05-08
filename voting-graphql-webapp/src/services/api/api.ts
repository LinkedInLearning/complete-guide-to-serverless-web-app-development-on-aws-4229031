// NOTE: Uncomment as you implement each function

import { ApiService, Feature, LoginResponse } from './types';
import { generateClient } from 'aws-amplify/api';
import { auth } from './auth';
import { listFeatures } from '../../graphql/queries'
import { CreateFeatureInput, FeatureStatus, UpdateFeatureInput } from './graphqlAPI';
import { createFeature, updateFeature, sendFeature } from '../../graphql/mutations';

export class RealApiService implements ApiService {
  
  async createFeature(text: string, userId: string) : Promise<Feature> {
    const client = generateClient();

    const input : CreateFeatureInput= {
      text: text,
      createdAt: new Date().toISOString(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),     
      status: FeatureStatus.OPEN,
      voteCount: 0,
      owner: userId
    }

    const response = await client.graphql({
      query: createFeature, 
      variables: {
        input: input
      }});
  
    const newFeature = response.data.createFeature
    return newFeature;
  }

  async getFeatures(): Promise<Feature[]> {
    const client = generateClient();
    const response = await client.graphql({ query: listFeatures });
    const features = response.data?.listFeatures?.items
    return features;
  }
  
  async voteForFeature(featureId: string, currentVotes: number) : Promise<void> {
    const client = generateClient();
    const incVotes = currentVotes + 1
    const input : UpdateFeatureInput= {
      id: featureId,
      voteCount: incVotes,
    }

    await client.graphql({
      query: updateFeature, 
      variables: {
        input: input
      }});

    return;
  }

  async notifyMe(featureId: string, text: string, currentVotes: number) : Promise<void> { // COMPLETE
    const client = generateClient();

    const user = await auth.getCurrentUser();
    const email = user.signInDetails?.loginId || '';
    console.log('email', email);

    const response = await client.graphql({
      query: sendFeature,
      variables: {
        id: featureId,
        text: text,
        voteCount: currentVotes, 
        email: email
      }});

    console.log('response', response.data.sendFeature);
    return response.data.sendFeature;
  }

  async login(email: string, password: string) : Promise<LoginResponse> {
    return auth.loginUser(email, password);
  }

  async register(email: string, password: string): Promise<void> {
    auth.registerUser(email, password);
  }
  
  async confirmEmail(email: string, code: string) : Promise<Boolean>{
    return auth.verifyEmail(email, code);
  }

  async resendConfirmationCode(email: string): Promise<void> {
    return auth.resendVerificationCode(email);
  }

  async logout() : Promise<void> {
    await auth.logout();
  }
}