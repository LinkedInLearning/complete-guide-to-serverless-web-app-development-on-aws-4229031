import { config } from './config';
import { ApiService } from './types';
import { MockApiService } from './mock';
import { RealApiService } from './api';

const IS_SERVER_MOCK = config.isServerMock
const IS_AUTH_MOCK = config.isAuthMock

console.log('apiService', IS_SERVER_MOCK, IS_AUTH_MOCK);

// Note: Uncomment when you have implemented the RealApiService

export const apiService: ApiService = IS_SERVER_MOCK === true
  ? new MockApiService(IS_AUTH_MOCK)
  : new RealApiService();

//export const apiService: ApiService = new MockApiService(IS_AUTH_MOCK);