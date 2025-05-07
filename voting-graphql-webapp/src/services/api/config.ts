// Type checking for required environment variables
interface Config {
  region: string;
  serverUrl: string;
  isServerMock: boolean;
  isAuthMock: boolean;
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId: string;
}

const getConfig = (): Config => {
  const region = import.meta.env.VITE_REGION;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const isServerMock = import.meta.env.VITE_IS_SERVER_MOCK  === 'true';
  const isAuthMock = import.meta.env.VITE_IS_AUTH_MOCK  === 'true';
  const userPoolId = import.meta.env.VITE_USER_POOL_ID;
  const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID;
  const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID;

  console.log('region', region);
  console.log('serverUrl', serverUrl);
  console.log('isServerMock', isServerMock);
  console.log('isAuthMock', isAuthMock);
  console.log('userPoolId', userPoolId);
  console.log('userPoolClientId', userPoolClientId);
  console.log('identityPoolId', identityPoolId);

  return {
    region,
    serverUrl,
    isServerMock,
    isAuthMock,
    userPoolId,
    userPoolClientId,
    identityPoolId
  };
};

export const config = getConfig();
