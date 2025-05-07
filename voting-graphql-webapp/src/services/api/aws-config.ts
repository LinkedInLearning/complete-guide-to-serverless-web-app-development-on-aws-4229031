import { config } from './config';

const awsconfig = {
		Auth: {
		  Cognito: {
			userPoolClientId: config.userPoolClientId,
			userPoolId: config.userPoolId,
			identityPoolId: config.identityPoolId,
			allowGuestAccess: true
		  },
		},
		API: {
			GraphQL: {
			  endpoint: config.serverUrl,
			  region: config.region,
			  defaultAuthMode: 'iam'
			}
		  }  
};

export default awsconfig;