#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CognitoStack } from '../lib/cognito-stack';
import { AmplifyHostingStack } from '../lib/amplify-stack';

const app = new cdk.App();

const cognitoStack = new CognitoStack(app, 'VotingWebAppCognitoStack', {});

const amplifyStack = new AmplifyHostingStack(app, 'VotingWebAppAmplifyStack', {
    userPoolId: cognitoStack.userPoolId.value,
    userPoolClientId: cognitoStack.userPoolClientId.value,
    identityPoolId: cognitoStack.identityPoolId.value
})